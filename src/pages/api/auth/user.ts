import { setValue, existValue, getValue, deleteValue } from "datas/redis";
import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid'

interface UserInfoRow {
    email: string;
    platform_type: string;
    name: string;
    profileImage: string;
    created_at: string;
    accessLevel: string;
    inter_ticker: string;
    inter_kr_name: string;
    inter_name: string;
    port_ticker: string;
    port_kr_name: string;
    port_name: string;
    quantity: number;
};

interface UserInfo {
    email: string;
    platform_type: string;
    name: string;
    profileImage: string;
    created_at: string;
    accessLevel: string;
    interestedAssets: { name: string, krName: string, ticker: string }[];
    interestedResult: number;
    portfolio: { name: string, krName: string, ticker: string, quantity: number }[];
    portfolioResult: number;
    portfolioLevel: string;
    portfolioTime: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { session }: { session?: string } = req.query;

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

        const user = await getValue("users", session);
        // const user = null

        if (user === null || user === undefined || !user || user.length === 0) {
            const query = `
        SELECT 
          u.EMAIL AS email,
          u.PLATFORM AS platform_type,
          u.USER_NM AS name,
          u.IMG AS profileImage,
          u.CREATE_AT AS created_at,
          u.ACCESS_LV AS accessLevel,
          i.ITEM_CD_DL AS inter_ticker,
          i.ITEM_ENG_NM AS inter_name,
          i.ITEM_KR_NM as inter_kr_name,
          i.RISK_TOL as interestedResult,
          p.ITEM_CD_DL AS port_ticker,
          p.ITEM_ENG_NM AS port_name,
          p.ITEM_KR_NM as port_kr_name,
          p.ITEM_QTY AS quantity,
          p.PORT_CVaRNTS as portfolioResult,
          p.PORT_CVaR_LV as portfolioLevel,
          p.UPDATE_DT as portfolioTime
        FROM 
          RWC.RW_USER_INFO u
        LEFT JOIN 
          RWC.RW_USER_INTER i ON u.EMAIL = i.EMAIL AND i.IS_CURRENT = 1
        LEFT JOIN 
          RWC.RW_USER_PORT p ON u.EMAIL = p.EMAIL AND p.IS_CURRENT = 1
        WHERE 
          u.EMAIL = ?;
      `;

            const results = await executeQuery({ query, values: [session] });

            if (results.length === 0) {
                res.status(404).json({ message: "User not found in MySQL." });
                return;
            }

            const userInfo: UserInfo = {
                email: results[0].email,
                platform_type: results[0].platform_type,
                name: results[0].name,
                profileImage: String(results[0].profileImage),
                created_at: results[0].created_at,
                accessLevel: results[0].accessLevel,
                interestedAssets: [],
                interestedResult: results[0].interestedResult,
                portfolio: [],
                portfolioResult: results[0].portfolioResult,
                portfolioLevel: results[0].portfolioLevel,
                portfolioTime: results[0].portfolioTime
            };
            console.log("userInfo", userInfo)
            results.forEach((row: UserInfoRow) => {
                if (row.inter_ticker && row.inter_name) {
                    const asset = { name: row.inter_name, krName: row.inter_kr_name, ticker: row.inter_ticker };
                    if (!userInfo.interestedAssets.some(a => a.ticker === asset.ticker)) {
                        userInfo.interestedAssets.push(asset);
                    }
                }
                if (row.port_ticker && row.port_name && row.quantity) {
                    const asset = {
                        name: row.port_name,
                        krName: row.port_kr_name,
                        ticker: row.port_ticker,
                        quantity: row.quantity,
                    };
                    if (!userInfo.portfolio.some(a => a.ticker === asset.ticker)) {
                        userInfo.portfolio.push(asset);
                    }
                }
            });
            await setValue("users", session, userInfo);
            res.status(200).json({ user: userInfo });
            return;
        }

        res.status(200).json({ user });
    }

    else if (req.method === "POST") {
        try {
            if (!req.body) return res.status(404).json({ error: "Don't have login data" })
            const { newUser } = req.body;
            const newUserObj = {
                ...newUser,
                created_at: Date.now()
            }
            //@ts-ignore
            const userExistSql: unknown[] = await executeQuery({
                query: `SELECT EMAIL FROM RWC.RW_USER_INFO WHERE EMAIL = ?;`,
                values: [newUser.email]
            });

            const checkExisting = await existValue("users", newUser.email)
            if (checkExisting == true || userExistSql.length > 0) return res.status(422).json({ message: "User already exists" })

            const id = uuid();

            await executeQuery({
                query: `INSERT INTO RWC.RW_USER_INFO (EMAIL, USER_NM, MEMBERSHIP, PLATFORM, IMG, CREATE_AT, UPDATE_DT,ACCESS_LV) VALUES (?, ?, ?, ?, ?, NOW(), NOW(),1)`,
                values: [newUser.email, newUser.name || id?.toString(), newUser.accessLevel, newUser.platform_type, newUser.profileImage]
            });

            await setValue("users", newUser.email, newUserObj)

            res.status(200).json({ newUser: newUserObj })
        } catch (error) {
            console.error('Error in addUser:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    else if (req.method === "PUT") {
        const { session }: { session?: string } = req.query
        try {
            if (!req.body) return res.status(404).json({ error: "Don't have login data" })
            if (!session) {
                res.status(401).json({ message: "You must be logged in." });
                return;
            }
            const { enteredInput } = req.body;

            const userInfo: UserInfo = await getValue("users", session)

            if (!userInfo) {
                res.status(401).json({ message: "User not found." });
                return;
            }

            const userName = enteredInput?.name ? enteredInput?.name : "";
            const profileImage = enteredInput?.profileImage ? enteredInput?.profileImage : "";
            const interestedAssets = enteredInput?.interestedAssets ? enteredInput?.interestedAssets : ""
            const portfolio = enteredInput?.portfolio ? enteredInput?.portfolio : ""

            if (interestedAssets) {
                await executeQuery({ query: `UPDATE RWC.RW_USER_INTER SET IS_CURRENT = 0 WHERE EMAIL = ?`, values: [userInfo.email as string] })

                for (let i = 0; i < interestedAssets.length; i++) {
                    await executeQuery({
                        query: `INSERT INTO RWC.RW_USER_INTER VALUES (?, NOW(), ?, ?, ?, ?, ?)`,
                        values: [userInfo.email as string, decodeURIComponent(interestedAssets[i].ticker), decodeURIComponent(interestedAssets[i].name), decodeURIComponent(interestedAssets[i].krName), decodeURIComponent(enteredInput.interestedResult), 1]
                    });
                }
            } else if (portfolio) {
                await executeQuery({ query: `UPDATE RWC.RW_USER_PORT SET IS_CURRENT = 0 WHERE EMAIL = ?`, values: [userInfo.email as string] })

                for (let i = 0; i < portfolio.length; i++) {

                    await executeQuery({
                        query: `INSERT INTO RWC.RW_USER_PORT (EMAIL, UPDATE_DT, ITEM_CD_DL, ITEM_ENG_NM,ITEM_KR_NM, ITEM_QTY,PORT_CVaRNTS,PORT_CVaR_LV,IS_CURRENT) VALUES (?, NOW(), ?, ?, ?, ?, ?,?,?)`,
                        values: [userInfo.email, decodeURIComponent(portfolio[i].ticker), decodeURIComponent(portfolio[i].name), decodeURIComponent(portfolio[i].krName), portfolio[i].quantity, enteredInput.portfolioResult, enteredInput.portfolioLevel, 1]
                    });
                }
            }
            else if (userName && profileImage) {
                await executeQuery({
                    query: `UPDATE RWC.RW_USER_INFO SET IMG = ? WHERE EMAIL = ?`,
                    values: [profileImage, userInfo.email]
                });
            }

            else if (userName) {
                await executeQuery({
                    query: `UPDATE RWC.RW_USER_INFO SET USER_NM = ? WHERE EMAIL = ?`,
                    values: [userName, userInfo.email]
                });
            }
            if (userInfo?.email) {
                await setValue("users", userInfo.email, { ...userInfo, accessLevel: 2, ...enteredInput })
                await executeQuery({
                    query: `UPDATE RWC.RW_USER_INFO SET MEMBERSHIP = ? WHERE EMAIL = ?`,
                    values: [2, userInfo.email]
                })
            }

            res.status(200).json({ enteredInput: enteredInput })

        }
        catch (error) {
            console.error('Error in addUserInfo:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    else if (req.method === "DELETE") {
        try {
            const { session }: { session?: string } = req.query
            if (!session) {
                res.status(401).json({ message: "You must be logged in." });
                return;
            }


            await deleteValue("users", session)
            console.log("REDIS DELETE")
            await executeQuery({ query: `UPDATE RWC.RW_USER_INTER SET IS_CURRENT = 0 WHERE EMAIL = ?`, values: [session] })
            await executeQuery({ query: `UPDATE RWC.RW_USER_INTER SET IS_CURRENT = 0 WHERE EMAIL = ?`, values: [session] })

            console.log("INTER, PORT DELETE")
            await executeQuery({
                query: `DELETE FROM RWC.RW_USER_INFO 
    WHERE EMAIL = ?`, values: [session]
            })
            console.log("RDS DELETE")
            res.status(200).json({ deleteSuccess: true })
        }
        catch {
            res.status(500).json({ message: 'Internal server error' });

        }
    } else {
        res.status(405).json({ message: "Method not allowed" })
    }

}

