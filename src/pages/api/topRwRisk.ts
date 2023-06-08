import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';
import { AssetInfo } from "interfaces/explore";

const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    
    try{

        const result:AssetInfo[]=await executeQuery({

            query: `SELECT HR_ITEM_NM, ITEM_CD_DL, ITEM_ENG_NM, ITEM_KR_NM, WTHR_KR_DL, WTHR_ENG_DL, WTHR_ENG_NM
            FROM RMS.ALL_ASSETS 
            WHERE EW_SGN = 1
            ;`
        })

        res.status(200).json([...result])
    } catch(err){
        console.log(err)
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;