import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { ticker } = req.query
    try {

        const result: string[] = await executeQuery({

            query: `SELECT DATE_PlUS, WTHR_ENG_NM,WTHR_KR_DL, WTHR_ENG_DL
            FROM RMS.FORECAST_TMP 
            WHERE ITEM_CD_DL = ?
            ORDER BY UDT_DT DESC, DATE_PLUS ASC LIMIT 7;`
            , values: [ticker as string]
        })

        res.status(200).json([...result])
    } catch (err) {
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;