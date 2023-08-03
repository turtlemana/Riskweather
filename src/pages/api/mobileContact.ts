import executeQuery from "datas/mysql";
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from "interfaces/login";



const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    
if(req.method!=="POST"){res.status(405).json({body:"Method not Allowed"}); return;}
if(!req.body) return res.status(404).json({error:"There is no content"})
const session:Session | null = await getServerSession(req, res, authOptions)

const {contact}=req.body

if(contact.detail.length<1) return res.status(404).json({error:"There is no content"})
if(contact.detail.length>500) return res.status(404).json({error:"Too much words"})


    try{

        await executeQuery({

            query: `INSERT INTO RWC.RW_CONTACT (EMAIL, CONTENTS, CREATE_AT, RE_YN)
            VALUES ('${session?.user?.email ? session?.user?.email : contact?.email}', '${contact.detail}',NOW(), 0)
            ;`
        })

        res.status(200).json({message:"Successfully Sent"})
    } catch(err){
        console.log(err)
        res.status(401).json({ message: "Fetch Error" });
    }
}

export default handler;