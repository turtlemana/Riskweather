// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {deleteValue} from "datas/redis";
import executeQuery from "datas/mysql";
import { NextApiRequest, NextApiResponse } from 'next';




export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    if(req.method!=="POST"){res.status(405).json({body:"Method not Allowed"}); return;}
    if(!req.body) return res.status(404).json({error:"Don't have login data"})


    const {session}:{session?:string}=req.query
    if (!session) {
     res.status(401).json({ message: "You must be logged in." });
     return;
   }


    await deleteValue("users",session)

    await executeQuery({query:`DELETE FROM RWC.RW_USER_INFO 
    WHERE EMAIL = '${session}'; `})

    res.status(200).json({ deleteSuccess: true })
  }
  