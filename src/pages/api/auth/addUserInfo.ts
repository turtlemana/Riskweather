import {getValue,setValue} from "datas/redis";
import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';
import { UserInfo } from "interfaces/portfolio";


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const {session}:{session?:string}=req.query

    if(req.method!=="POST"){res.status(405).json({body:"Method not Allowed"}); return;}
    if(!req.body) return res.status(404).json({error:"Don't have login data"})
    // const session:any = await getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }
    const {enteredInput}=req.body;

    const userInfo:UserInfo=await getValue("users",session) 

    if (!userInfo) {
      res.status(401).json({ message: "User not found." });
      return;
    }

    const userName=enteredInput?.name ? enteredInput?.name : "";
    const interestedAssets=enteredInput?.interestedAssets ? enteredInput?.interestedAssets : ""
    const portfolio=enteredInput?.portfolio ? enteredInput?.portfolio : ""
    if(interestedAssets){

      for(let i=0; i<interestedAssets.length; i++){
      await executeQuery({
        query:`INSERT INTO RWC.RW_USER_INTER
        VALUES('${userInfo.email}',NOW(),'${interestedAssets[i].ticker}','${interestedAssets[i].name}')
        `
    })
    }}else if(portfolio){

      for(let i=0; i<portfolio.length; i++){
        await executeQuery({
          query:`INSERT INTO RWC.RW_USER_PORT
          VALUES('${userInfo.email}',NOW(),'${portfolio[i].ticker}','${portfolio[i].name}','${portfolio[i].quantity}')
          `
      })
      }
    } else if (userName){
      await executeQuery({
        query:`
        UPDATE RWC.RW_USER_INFO
        SET USER_NM = '${userName}'
        WHERE EMAIL = '${userInfo.email}'
        `
    })
    }
    if (userInfo?.email){
    await setValue("users",userInfo.email,{...userInfo, accessLevel:2,...enteredInput})
  }

    res.status(200).json({ enteredInput:enteredInput  })

}

