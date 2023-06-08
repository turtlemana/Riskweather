// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {setValue,existValue} from "datas/redis";
import executeQuery from "datas/mysql";
import {v4 as uuid} from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next';




export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    if(req.method!=="POST"){res.status(405).json({body:"Method not Allowed"}); return;}
    if(!req.body) return res.status(404).json({error:"Don't have login data"})
    const {newUser}=req.body; 
    const newUserObj={
        ...newUser,
        created_at:Date.now()
    }
    //@ts-ignore
    const userExistSql:unknown[]=await executeQuery({query:`SELECT EMAIL
    FROM RWC.RW_USER_INFO
    WHERE EMAIL = '${newUser.email}';`})
    
   const checkExisting=await existValue("users",newUser.email)
   if(checkExisting==true || userExistSql.length>0) return res.status(422).json({message:"User already exists"})
    
   const id=uuid();



        await executeQuery({query:`INSERT INTO RWC.RW_USER_INFO (EMAIL, USER_NM,  MEMBERSHIP, PLATFORM, IMG, CREATE_AT, UPDATE_DT)
        VALUES ('${newUser.email}','${newUser.name ? newUser.name : id?.toString()}',${newUser.membership},'${newUser.platform_type}','${newUser.profileImage}',NOW(),NOW()) `})

        await setValue("users",newUser.email,newUserObj)


    




    res.status(200).json({ newUser: newUserObj })
  }
  