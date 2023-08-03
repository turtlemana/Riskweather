import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';
import { ResultItem } from "interfaces/layout";

const removeSpecialCharacters = (str: string) => {
    return str.replace(/[&|*]/g, '');
};

const isValidSearchTerm = (str: string) => {
    return str && str.trim() !== "";
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { search } = req.query;
    const cleanedSearch = removeSpecialCharacters(search as string);

    if (!isValidSearchTerm(cleanedSearch)) {
        return res.status(400).json({ message: "Invalid search term" });
    }

    let searchQuery = '';
    let searchValues: string[] = [];
    if (cleanedSearch.includes(" ")) {
        searchQuery = `AND MATCH(ITEM_CD_DL, ITEM_ENG_NM, ITEM_KR_NM) AGAINST(? IN BOOLEAN MODE)`;
        searchValues.push(`"${cleanedSearch}*"`);
    } else {
        searchQuery = `AND MATCH(ITEM_CD_DL, ITEM_ENG_NM, ITEM_KR_NM) AGAINST(? IN BOOLEAN MODE)`;
        searchValues.push(`${cleanedSearch}*`);
    }
    try {
        const result: ResultItem[] = await executeQuery({
            query: `
            SELECT ITEM_KR_NM, HR_ITEM_NM, LV_DSCP_KR, LV_DSCP_ENG, ITEM_CD_DL, ITEM_ENG_NM, CVaR_LV, WTHR_ENG_NM, WTHR_ENG_DL, CVaRNTS, EXP_CVaRNTS, ADJ_CLOSE, ADJ_CLOSE_USD, WTHR_KR_DL, CVaR_LV_KR
            FROM RMS.ALL_ASSETS
            WHERE 1=1
            ${searchQuery}
            ORDER BY CASE WHEN LOC = 'Korea (South)' OR CAT='Crypto' OR ITEM_ENG_NM IN ('Apple Inc','Netflix Inc','Meta Platforn Inc Class A','Nvdia Corp','Microsoft Corp','Amazon Com Inc','Alphabet Inc Class A','Tesla Inc','Taiwan Semiconductor Manufacturing') THEN 0 ELSE 1 END, TRADE_VALUE DESC
            LIMIT 20
            ;`,
            values: searchValues

        });

        res.status(200).json([...result]);
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;
