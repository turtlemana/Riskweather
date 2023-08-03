import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';
import { CorrData } from "interfaces/detail";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { ticker } = req.query
    try {

        const result: CorrData[] = await executeQuery({

            query: `SELECT cor.NP, cor.RANK_NUM, al.HR_ITEM_NM,al.ITEM_KR_NM ,al.LV_DSCP_KR, al.LV_DSCP_ENG,  al.ITEM_CD_DL, al.ITEM_ENG_NM, al.CVaRNTS, al.CVaR_LV, al.CVaR_LV_KR, al.WTHR_KR_NM, al.EXP_CVaRNTS,al.WTHR_ENG_NM, al.WTHR_KR_DL, al.WTHR_ENG_DL  
            FROM RMS.ALL_ASSETS al
            INNER JOIN(
                SELECT it.ITEM_CD, rc.RANK_NUM, rc.ITEM_CD_CORR, rc.NP
                FROM RMS.ITEM_INFO it 
                RIGHT JOIN RMS.RISK_CORR rc 
                ON it.ITEM_CD = rc.ITEM_CD
                WHERE it.ITEM_CD_DL = ?
                ORDER BY UDT_DT DESC
                LIMIT 40 
            ) cor
            ON al.ITEM_CD = cor.ITEM_CD_CORR 
            ;`
            , values: [ticker as string]
        })

        res.status(200).json([...result])
    } catch (err) {
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;