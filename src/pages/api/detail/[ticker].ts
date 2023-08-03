import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';
import { AssetInfo } from "interfaces/explore";


const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    const {ticker}=req.query
    try{
        const result:AssetInfo[]=await executeQuery({
            query: `SELECT al.*
            FROM RMS.ALL_ASSETS al 
            WHERE ITEM_CD_DL = ?  
            ;`,values:[ticker as string]
        })

        res.status(200).json([...result])
    } catch(err){
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;