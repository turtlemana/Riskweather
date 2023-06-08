import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';
import { AssetInfo } from "interfaces/explore";

const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    const {page,limit,search}=req.query
    const parsedPage = typeof page === 'string' ? parseInt(page, 10) : 1;
    const parsedLimit = typeof limit === 'string' ? parseInt(limit, 10) : 20;
  
    
    try{
        const rowNum=await executeQuery({
            query: `SELECT count(*) FROM RMS.ALL_ASSETS 
            WHERE 1=1
            AND CAT IN ('Crypto','Stock')
            ${!search ? "" :`AND MATCH(ITEM_CD_DL, ITEM_ENG_NM,ITEM_KR_NM) AGAINST('"${search}"' IN BOOLEAN MODE)`}


            ;`
        })
        const parsedRow=await JSON.parse(JSON.stringify(rowNum))
        const rowCount=parsedRow[0]['count(*)']
        const result:AssetInfo[]=await executeQuery({
    
            query: `SELECT * 
            FROM RMS.ALL_ASSETS al 
          
            WHERE 1=1
            AND CAT IN ('Crypto','Stock')

            ${!search ? "" : `AND MATCH(al.ITEM_CD_DL, al.ITEM_ENG_NM, al.ITEM_KR_NM) AGAINST('"${search}"' IN BOOLEAN MODE)`}
            ORDER BY CASE WHEN LOC = 'Korea (South)' OR CAT='Crypto' OR ITEM_ENG_NM IN ('Apple Inc','Netflix Inc','Meta Platforn Inc Class A','Nvdia Corp','Microsoft Corp','Amazon Com Inc','Alphabet Inc Class A','Tesla Inc','Taiwan Semiconductor Manufacturing') THEN 0 ELSE 1 END, TRADE_VALUE DESC
            LIMIT ${parsedLimit*(parsedPage-1)}, ${limit}
            ;`
        })

        res.status(200).json([{assets:[...result]},{rowCount:rowCount}])
    } catch(err){
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;