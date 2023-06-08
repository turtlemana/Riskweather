import NextAuth,{User,Account} from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google"
import KakaoProvider from 'next-auth/providers/kakao'
import FacebookProvider from 'next-auth/providers/facebook'
import NaverProvider from 'next-auth/providers/naver'
import {v4 as uuid} from 'uuid'
import type { NextAuthOptions } from "next-auth"
import executeQuery from "datas/mysql";
import { UserInfo } from "interfaces/portfolio"
import { Session } from "interfaces/login"



import {getValue,existValue,getSessionValue} from 'datas/redis'
import Query from "mysql2/typings/mysql/lib/protocol/sequences/Query"

interface QueryResponse {
  EMAIL: string;
}
export const authOptions:NextAuthOptions = {
    // Configure one or more authentication providers
  
    providers: [
      // CredentialsProvider({
      //   name:"Credentials",
      //   credentials:{
      //     name:{label: "name", type: "text", placeholder: "jsmith" },
      //     email:{label: "email", type: "email", placeholder: "example@riskweather.org" },
      //     password:{ label: "password", type: "password"},
      //   },
      //   async authorize(credentials,req){
      //     return credentials
      //   }
      // }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        /*@ts-ignore */

      }),
      KakaoProvider({
        clientId: process.env.KAKAO_CLIENT_ID as string,
        clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
      }),
      // FacebookProvider({
      //   clientId: process.env.FACEBOOK_CLIENT_ID as string,
      //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      // }),
      // NaverProvider({
      //   clientId: process.env.NAVER_CLIENT_ID as string,
      //   clientSecret: process.env.NAVER_CLIENT_SECRET as string,
      // }),
    ],
    
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
      signIn:  `/login`,
      error:`/ko/login`
    },
    session:{
      strategy:'jwt',
      maxAge:60*60
    },

    jwt:{
      secret: process.env.NEXTAUTH_SECRET,
      maxAge: 60 * 60
    },


  
    callbacks:{ 
      
   //@ts-ignore
    async session({ session }:Session) {
      console.log(session)
        //@ts-ignore
      if(session){
      if(!session?.user?.name){
        const id=uuid()
        session.user.name=id.toString()
      }

      const parsedInfo:UserInfo=await getValue("users",session.user?.email)

      if(!parsedInfo){ return session}
        else{
        //@ts-ignore

        const userName=await parsedInfo['name']
        const accessLevel=await parsedInfo["accessLevel"]
        const membership=await parsedInfo["membership"]
        const profileImage=await parsedInfo["profileImage"]
          // Send properties to the client, like an access_token from a provider.
          session.user.name=userName;
          session.user.accessLevel=accessLevel; 
          session.user.membership=membership; 
          session.user.image=profileImage; 
          
          return session}
       
        }
        },
        // async redirect({ url, baseUrl, req }:any) {
        //   const userAgent = req.headers["user-agent"];
        //   const isMobile = /Mobile/.test(userAgent);
        //   const redirectBaseUrl = isMobile ? "http://YOUR_IP_ADDRESS_HERE:3000" : baseUrl;
    
        //   if (url.startsWith("/")) {
        //     return `${redirectBaseUrl}${url}`;
        //   } else if (new URL(url).origin === baseUrl) {
        //     return url;
        //   }
    
        //   return redirectBaseUrl;
        // },
  //@ts-ignore
      async signIn({user,account}:{user:User; account:Account}){
        //@ts-ignore
        const userExistSql:unknown[]=await executeQuery({query:`SELECT EMAIL
        FROM RWC.RW_USER_INFO
        WHERE EMAIL = '${user?.email}';`})

        if (!user.email) {
          throw new Error('User email is undefined or null');
        }

        const isUserExist=await existValue("users", user?.email)
          const id=uuid();
   
  
          if(!isUserExist){
            
            const newUser={id,email:user?.email, platform_type:account?.provider, name:user?.name ? user?.name : id.toString(), profileImage:'/images/users/default4.svg',created_at:Date.now(),accessLevel:1,membership:0}
            
        
            const data = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/addUser`,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({newUser})
            }).then(res=>res.json())
    
  
    
            return [data.newUser] 
  
          }  else if (isUserExist && userExistSql.length>0){

            const parsedInfo:UserInfo=await getValue("users",user?.email)

            const userPlatform=parsedInfo.platform_type
       
            if(userPlatform !== account?.provider){
              throw new Error(`An account with this email already exists on ${userPlatform} platform.`);  // 에러 메시지를 던집니다

          
            } else {
              return true
            }
  

       
        }
  
      },

      
  

    }
  
  
  
  }
  
  export default NextAuth(authOptions)

