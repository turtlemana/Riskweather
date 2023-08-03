import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';
import { AssetInfo } from "interfaces/explore";

const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    
    try{

        const result:AssetInfo[]=await executeQuery({

            query: `SELECT al.ADJ_CLOSE_KRW, al.UDT_DT, al.LOC, al.ITEM_KR_NM,al.HR_ITEM_NM, al.LV_DSCP_KR, al.LV_DSCP_ENG, al.ITEM_ENG_NM, al.ITEM_CD_DL, al.CVaR_LV, al.CVaR_LV_KR, al.WTHR_KR_DL, al.CVaRNTS,al.EXP_CVaRNTS, al.ADJ_CLOSE, al.WTHR_ENG_NM,al.WTHR_ENG_DL,al.ADJ_CLOSE_USD,al.TRADE_VALUE
            FROM RMS.ALL_ASSETS al 
            WHERE CAT IN ('Stock','Crypto')
            ORDER BY CASE WHEN LOC = 'Korea (South)' OR CAT='Crypto' OR ITEM_ENG_NM IN ('Apple Inc','Netflix Inc','Meta Platforn Inc Class A','Nvdia Corp','Microsoft Corp','Amazon Com Inc','Alphabet Inc Class A','Tesla Inc','Taiwan Semiconductor Manufacturing') THEN 0 ELSE 1 END, TRADE_VALUE DESC
            LIMIT 20
            ;`
        })

        res.status(200).json([...result])
    } catch(err){
        console.log(err)
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;