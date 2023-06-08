import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';


const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    
    try{

        const result:string[]=await executeQuery({

            query: `SELECT al.ITEM_CD_DL as ticker
            FROM RMS.ALL_ASSETS al 
       WHERE CAT = "Crypto"
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