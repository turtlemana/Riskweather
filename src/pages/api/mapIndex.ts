import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next'
import { IndexData } from "interfaces/main";

const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    
    try{

        const result:IndexData[]=await executeQuery({

            query: `SELECT al.HR_ITEM_NM as exchg,  al.ITEM_KR_NM as assetKrName, al.ITEM_ENG_NM as assetName, al.ITEM_CD_DL as ticker,al.CVaR_LV as risk, al.CVaR_LV_KR as koreanRisk, al.CVaRNTS as maxLoss, al.EXP_CVaRNTS as EXP_CVaRNTS, al.WTHR_ENG_NM as weather, al.WTHR_ENG_DL as weatherExplain, al.WTHR_KR_DL as koreanWeatherExplain, al.LV_DSCP_ENG as riskDescriptionEn, al.LV_DSCP_KR as riskDescriptionKr
            FROM RMS.ALL_ASSETS al 
            WHERE 1=1 AND ITEM_CD_DL IN ("^BVSP","XU100.IS","^AXJO","^GSPTSE","PSI20.LS","TASE.TA","CEZ.PR","^HSI","^SET.BK","PSEI.PS","IMOEX.ME","^NSEI","399001.SZ","ENX.PA","^IXIC","^KS11","^N225","^GDAXI","^AEX","^TWII","^FTSE","^SSMI","^BFX","FTSEMIB.MI","^IBEX","^ATX","EXAE.AT","OSEBX.OL","^OMXC25","^OMXH25","^ISEQ","^NZ50","^JKSE","S68.SI","BOLSAA.MX","BVC.CL","JSE.JO")
       
            ORDER BY al.TRADE_VALUE DESC
            ;`
        })

        res.status(200).json([...result])
    } catch(err){
        console.log(err)
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;