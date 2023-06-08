// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {getValue} from "datas/redis";
import { NextApiRequest, NextApiResponse } from 'next';





export default async function handler(req:NextApiRequest, res:NextApiResponse) {


    if(req.method!=="GET"){res.status(405).json({body:"Method not Allowed"}); return;}
    
    const {session}:{session?:string}=req.query
    console.log(session)
    // const session:any = await getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }

    const user=await getValue("users",session)

    res.status(200).json({user})
  }
  