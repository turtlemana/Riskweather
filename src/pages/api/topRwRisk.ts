import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';
import { AssetInfo } from "interfaces/explore";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = parseInt(req.query.page as string || '1', 10);
  const limit = parseInt(req.query.limit as string || '10', 10);

  const interest = req.query.interest as string;
  const portfolio = req.query.portfolio as string;

  let userInterest: string[] | undefined;
  let userPortfolio: string[] | undefined;

  if (interest) {
    userInterest = interest.split(",");
  }

  if (portfolio) {
    userPortfolio = portfolio.split(",");
  }

  let userAssets: string[] = [];

  if (userInterest || userPortfolio) {
    userAssets = [...new Set([...(userPortfolio || []), ...(userInterest || [])])];
  }

  let orderBy = "ORDER BY TRADE_VALUE DESC";

  if (userAssets.length > 0) {
    const userAssetsString = userAssets.map(asset => `'${asset}'`).join(",");
    orderBy = `ORDER BY FIELD(ITEM_CD_DL, ${userAssetsString}) DESC, TRADE_VALUE DESC`;
  }

  try {
    const rowNum = await executeQuery({ query: `SELECT count(*) FROM RMS.ALL_ASSETS WHERE EW_SGN = 1;` });
    const rowCount = rowNum[0]['count(*)'];
    const result: AssetInfo[] = await executeQuery({
      query: `SELECT HR_ITEM_NM, ITEM_CD_DL, ITEM_ENG_NM, ITEM_KR_NM, WTHR_KR_DL, WTHR_ENG_DL, WTHR_ENG_NM
              FROM RMS.ALL_ASSETS 
              WHERE EW_SGN = 1
              ${orderBy}
              LIMIT ${(page - 1) * limit}, ${limit}
              ;`
    });

    res.status(200).json([{ assets: result }, { rowCount: rowCount }]);
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Can't find data" });
  }
}

export default handler;
