import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next'
import { AssetInfo } from "interfaces/explore";

const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    const {mapSelect}=req.query
    
    try{

        const result:AssetInfo[]=await executeQuery({

            query: `
            SELECT al.ITEM_KR_NM,al.HR_ITEM_NM,al.EXP_CVaRNTS, al.ITEM_ENG_NM ,al.CAT,  al.TRADE_VALUE,al.ITEM_CD_DL ,al.CVaR_LV, al.CVaR_LV_KR, al.CVaRNTS,al.WTHR_ENG_NM, al.WTHR_ENG_DL, al.WTHR_KR_DL, al.LV_DSCP_ENG, al.LV_DSCP_KR 
            FROM RMS.ALL_ASSETS al 
            WHERE 1=1
            ${ mapSelect=="All"||!mapSelect ?  `AND al.CAT = "Index"` :`AND al.CAT="Index" AND al.LOC ='${mapSelect}'` }  

   
            UNION
            
            SELECT al.ITEM_KR_NM, al.HR_ITEM_NM, al.EXP_CVaRNTS, al.ITEM_ENG_NM ,al.CAT, al.TRADE_VALUE,al.ITEM_CD_DL ,al.CVaR_LV, al.CVaR_LV_KR, al.CVaRNTS, al.WTHR_ENG_NM, al.WTHR_ENG_DL, al.WTHR_KR_DL, al.LV_DSCP_ENG, al.LV_DSCP_KR 
            FROM RMS.ALL_ASSETS al 
            WHERE 1=1
            ${ mapSelect=="All"||!mapSelect ?  `AND al.CAT = "Index"` :`AND al.CAT="Stock" AND al.LOC ='${mapSelect}'` }

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