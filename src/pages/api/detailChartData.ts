import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';

const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    const {ticker}=req.query
    try{

        const result:string=await executeQuery({

            query: `SELECT prri.jo
            FROM RMS.ITEM_INFO it
            LEFT JOIN (
                    SELECT JSON_OBJECT('date', pr.BASE_DT, 'price', pr.ADJ_CLOSE, 'risk', ri.CVaRNTS) jo, pr.ITEM_CD
                    FROM RMS.PRICE pr
                    LEFT JOIN (
                        SELECT ITEM_CD, BASE_DT, CVaRNTS  
                        FROM RMS.RISK_IDX
                        WHERE STEP = 1 AND CL > 0.98 
                        ) ri
                    ON pr.ITEM_CD = ri.ITEM_CD AND pr.BASE_DT = ri.BASE_DT
                    WHERE ri.CVaRNTS IS NOT NULL AND pr.ADJ_CLOSE IS NOT NULL
                    ) prri
            ON it.ITEM_CD = prri.ITEM_CD 
            WHERE it.ITEM_CD_DL = '${ticker}';`
        })
        res.status(200).json(result)
    } catch(err){
        console.log(err)
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;




