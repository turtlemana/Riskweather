import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next'
import { AssetInfo } from "interfaces/explore";

const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    const {search}=req.query

    const cleanedSearch = typeof search === 'string' ? search.replace(/^\s+|\s{2,}|\s+$/g, "") : "";

    try{
        
        const result:AssetInfo[]=await executeQuery({

            query: `SELECT ADJ_CLOSE_KRW, UDT_DT, LOC,HR_ITEM_NM,ITEM_KR_NM, LV_DSCP_KR, LV_DSCP_ENG, ITEM_CD_DL, ITEM_ENG_NM,CVaR_LV,WTHR_ENG_NM,WTHR_ENG_DL,CVaRNTS,EXP_CVaRNTS,ADJ_CLOSE,ADJ_CLOSE_USD,WTHR_KR_DL,CVaR_LV_KR,TRADE_VALUE
            FROM RMS.ALL_ASSETS
            WHERE 1=1
            AND CAT IN ('Crypto', 'Stock')
            ${cleanedSearch ? `AND MATCH(ITEM_CD_DL, ITEM_ENG_NM,ITEM_KR_NM) AGAINST('"${cleanedSearch}"' IN BOOLEAN MODE)` : "AND null"}
            ORDER BY CASE WHEN LOC = 'Korea (South)' OR CAT='Crypto' OR ITEM_ENG_NM IN ('Apple Inc','Netflix Inc','Meta Platforn Inc Class A','Nvdia Corp','Microsoft Corp','Amazon Com Inc','Alphabet Inc Class A','Tesla Inc','Taiwan Semiconductor Manufacturing') THEN 0 ELSE 1 END, TRADE_VALUE DESC
            ;`
        })

        res.status(200).json([...result])
    } catch(err){
        console.log(err)
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;