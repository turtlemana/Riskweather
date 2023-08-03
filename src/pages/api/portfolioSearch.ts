import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';
import { AssetInfo } from "interfaces/explore";

const removeSpecialCharacters = (str: string) => {
    return str.replace(/[&|*]/g, '');
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { page, limit, search } = req.query;
    const parsedPage = typeof page === 'string' ? parseInt(page, 10) : 1;
    const parsedLimit = typeof limit === 'string' ? parseInt(limit, 10) : 20;

    if (isNaN(parsedPage) || isNaN(parsedLimit)) {
        return res.status(400).json({ message: "Invalid page or limit value" });
    }

    const cleanedSearch = removeSpecialCharacters(search as string);

    let searchQuery = '';
    let searchValues: string[] = [];
    if (cleanedSearch) {
        searchQuery = `AND MATCH(ITEM_CD_DL, ITEM_ENG_NM, ITEM_KR_NM) AGAINST(? IN BOOLEAN MODE)`;
        if (cleanedSearch.includes(" ")) {
            searchValues.push(`"${cleanedSearch}*"`);
        } else {
            searchValues.push(`${cleanedSearch}*`);
        }
    }

    let limitValues = [Number(parsedLimit * (parsedPage - 1)), Number(parsedLimit)];
    let queryValues = cleanedSearch ? [...searchValues, ...limitValues] : limitValues;
    console.log("Query values:", queryValues);
    try {
        const rowNum = await executeQuery({
            query: `SELECT count(*) FROM RMS.ALL_ASSETS 
            WHERE 1=1
            AND CAT IN ('Crypto','Stock')
            ${searchQuery}
            ;`,
            values: searchValues
        });

        const parsedRow = await JSON.parse(JSON.stringify(rowNum));
        const rowCount = parsedRow[0]['count(*)'];

        const result: AssetInfo[] = await executeQuery({
            query: `SELECT * 
            FROM RMS.ALL_ASSETS
            WHERE 1=1
            AND CAT IN ('Crypto','Stock')
            ${searchQuery}
            ORDER BY CASE WHEN LOC = 'Korea (South)' OR CAT='Crypto' OR ITEM_ENG_NM IN ('Apple Inc','Netflix Inc','Meta Platforn Inc Class A','Nvdia Corp','Microsoft Corp','Amazon Com Inc','Alphabet Inc Class A','Tesla Inc','Taiwan Semiconductor Manufacturing') THEN 0 ELSE 1 END, TRADE_VALUE DESC
            LIMIT ${parsedLimit * (parsedPage - 1)}, ${limit}
            ;`,
            values: searchValues
        });

        res.status(200).json([{ assets: [...result] }, { rowCount: rowCount }]);
    } catch (err: any) {
        console.error("Error:", err);
        res.status(401).json({ message: "Can't find data", error: err.message });
    }
}
export default handler;