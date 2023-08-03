import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';
import { CarouselData } from "interfaces/main";

const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    const {type}=req.query
    
    try{

        const result:CarouselData[]=await executeQuery({

            query: `SELECT al.*,cc.*
            FROM RMS.ALL_ASSETS al 
            LEFT JOIN RMS.CHART_TMP cc 
            ON cc.ITEM_CD = al.ITEM_CD AND cc.CHART_TP=30 

            WHERE (al.ITEM_ENG_NM IN 
            ('Bitcoin','Ethereum','Polygon','XRP','Tether','Cardano','Dogecoin','BNB','Binance USD','Litecoin','USD Coin','MSCI','Nasdaq','EURO STOXX 50','KOSPI','Nikkei 225','Shenzhen Index','Hangseng','Euronext N.V.','NIFTY 50','DAX','Apple Inc','Microsoft Corp','Amazon Com Inc','Alphabet Inc Class A','Tesla Inc','Taiwan Semiconductor Manufacturing','Toyota Motor Corp','Tencent Holdings Ltd','Nvidia Corp','Meta Platforms Inc Class A','Exxon Mobil Corp','Netflix Inc')
            OR al.ITEM_KR_NM IN ('삼성전자','셀트리온', '포스코퓨처엠','에코프로', 'SK하이닉스','LG화학','NAVER','현대차','카카오','KB금융','엔씨소프트','LG이노텍','삼성SDI','KT&G','넥슨게임즈'))
            ${type=="All"||!type ? `AND al.ITEM_CD_DL IN ('BTC-USD','ETH-USD','AAPL','TSLA','MSFT','2330.TW','005930','XRP-USD','ACWI','^IXIC','NVDA')`:type==="Korean Stock" ? `AND al.loc="Korea (South)" `: type==="Stock" ? `AND al.CAT="Stock" AND al.loc not in ("Korea (South)")`: `AND al.CAT = "${type}"` }  
       
           ORDER BY TRADE_VALUE DESC
            LIMIT 10
            ;`
        })

        res.status(200).json([...result])
    } catch(err){
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;