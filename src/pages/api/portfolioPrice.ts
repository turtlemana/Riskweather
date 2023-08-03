import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next'
import { PortfolioData } from "interfaces/portfolio";
import { PortfolioPrice } from "interfaces/portfolio";

const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    const {portfolio}:{portfolio?:string}=req.query
    if(!portfolio) {
        res.status(400).json({ message: "No portfolio provided." });
        return;
    }
    const portfolioList=await JSON.parse(portfolio)
    const portfolioTicker=portfolioList.map((asset:PortfolioData)=>asset.ticker)

  
    try{
        
        const result:PortfolioPrice[]=await executeQuery({

            query: `SELECT UDT_DT, ITEM_CD_DL, LOC, ITEM_ENG_NM,ADJ_CLOSE,ADJ_CLOSE_USD,ADJ_CLOSE_KRW
            FROM RMS.ALL_ASSETS
            WHERE 1=1 AND ITEM_CD_DL in ('${portfolioTicker[0]}','${portfolioTicker[1]}','${portfolioTicker[2]}','${portfolioTicker[3]}','${portfolioTicker[4]}','${portfolioTicker[5]}','${portfolioTicker[6]}','${portfolioTicker[7]}','${portfolioTicker[8]}','${portfolioTicker[9]}')
            LIMIT  10
            ;`
        })

        res.status(200).json([...result])
    } catch(err){
        console.log(err)
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;