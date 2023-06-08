import executeQuery from "datas/mysql";

import { NextApiRequest, NextApiResponse } from 'next';
import { AssetInfo } from "interfaces/explore";


const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    const {page,limit,loc,sect,weather,exchg,search,type,riskLv,priceOrder,lossOrder,priceChgOrder}=req.query
    // const cleanedSearch = search ? search.replace(/^\s+|\s{2,}|\s+$/g, "") : "";
    const parsedPage = typeof page === 'string' ? parseInt(page, 10) : 1;
    const parsedLimit = typeof limit === 'string' ? parseInt(limit, 10) : 20;
  
   
    try{
        const rowNum=await executeQuery({
            query: `SELECT count(*) FROM RMS.ALL_ASSETS 
            WHERE 1=1
            ${ type=="All"||!type ? "": `AND CAT = "${type}"` }  
            ${ riskLv=="All"||!riskLv ? "": `AND CVAR_LV = "${riskLv}"` }  
            ${!weather||weather=="All" ? "": `AND WTHR_ENG_NM = "${weather}"` }
            ${!loc || loc=="All" ? "" : `AND LOC="${loc}"` }
            ${!exchg || exchg=="All" ? "" : `AND HR_ITEM_NM="${exchg}"` }
            ${!sect || sect=="All" ? "" : `AND SECT="${sect}"` }
            ${!search ? "" :`AND MATCH(ITEM_CD_DL, ITEM_ENG_NM, ITEM_KR_NM) AGAINST('"${search}"' IN BOOLEAN MODE)`}
            ;`
        })
        const parsedRow=await JSON.parse(JSON.stringify(rowNum))
        const rowCount=parsedRow[0]['count(*)']

        const result=await executeQuery({

            query: `SELECT al.*,cc.*
            FROM RMS.ALL_ASSETS al 
            LEFT JOIN RMS.CHART_TMP cc 
            ON cc.ITEM_CD = al.ITEM_CD AND cc.CHART_TP=7 
            WHERE 1=1
            ${ type=="All"||!type ? "": `AND CAT = "${type}"` }  
            ${ riskLv=="All"||!riskLv ? "": `AND CVAR_LV = "${riskLv}"` }  
            ${!weather||weather=="All" ? "": `AND WTHR_ENG_NM = "${weather}"` }
            ${!loc || loc=="All" ? "" : `AND LOC="${loc}"` }
            ${!exchg || exchg=="All" ? "" : `AND HR_ITEM_NM="${exchg}"` }
            ${!sect || sect=="All" ? "" : `AND SECT="${sect}"` }
            ${!search ? "" : `AND MATCH(al.ITEM_CD_DL, al.ITEM_ENG_NM, al.ITEM_KR_NM) AGAINST('"${search}"' IN BOOLEAN MODE)`}
           
            ${priceOrder=="neutral" && lossOrder=="neutral" && priceChgOrder=="neutral" ? "ORDER BY CASE WHEN LOC = 'Korea (South)' OR CAT='Crypto' OR ITEM_ENG_NM IN ('Apple Inc','Netflix Inc','Meta Platforn Inc Class A','Nvdia Corp','Microsoft Corp','Amazon Com Inc','Alphabet Inc Class A','Tesla Inc','Taiwan Semiconductor Manufacturing') THEN 0 ELSE 1 END, TRADE_VALUE DESC" : ""}
            ${priceOrder=="neutral" ? "" :
            priceOrder=="priceAsc" ? "ORDER BY ADJ_CLOSE_USD ASC" : priceOrder=="priceDesc" ? "ORDER BY ADJ_CLOSE_USD DESC" 
            : ""}
            ${lossOrder=="neutral" ? "" :
            lossOrder=="lossAsc" ? "ORDER BY CVaRNTS ASC" : lossOrder=="lossDesc" ? "ORDER BY CVaRNTS DESC" 
            : ""}
            ${priceChgOrder=="neutral" ? "" :
            priceChgOrder=="priceChgAsc" ? "ORDER BY ADJ_CLOSE_CHG" : priceChgOrder=="priceChgDesc" ? "ORDER BY ADJ_CLOSE_CHG DESC" 
            : ""}

            LIMIT ${parsedLimit*(parsedPage-1)}, ${limit}
            ;`
        }) as AssetInfo[]

        res.status(200).json([{assets:[...result]},{rowCount:rowCount}])
    } catch(err){
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;