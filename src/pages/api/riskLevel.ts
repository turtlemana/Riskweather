import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';
import { RiskLevelData } from "interfaces/main";
const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    const {level}=req.query
    
    try{

        const result:RiskLevelData[]=await executeQuery({

            query: `SELECT *
            FROM RMS.ALL_ASSETS al 
            
            WHERE CAT IN ('Crypto','Stock')
            ${ level=="All"||!level ? "": `AND CVaR_LV = "${level}"` }  
            AND (HR_ITEM_NM IN ('Ethereum','BNB','NASDAQ','Russell 2000','NYSE COMPOSITE','FTSE 100','DAX','Euronext N.V.','KOSPI','KOSDAQ','Nikkei 225','TSEC','Hangseng','NIFTY 50') 
            OR HR_ITEM_NM IS NULL)
            AND ITEM_CD>40000000
       
            ORDER BY TRADE_VALUE DESC
            LIMIT 10
            ;`
        })

        res.status(200).json([...result])
    } catch(err){
        console.log(err)
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;