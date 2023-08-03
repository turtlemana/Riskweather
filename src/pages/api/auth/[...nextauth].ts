import NextAuth, { User, Account } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google"
import KakaoProvider from 'next-auth/providers/kakao'
import FacebookProvider from 'next-auth/providers/facebook'
import NaverProvider from 'next-auth/providers/naver'
import { v4 as uuid } from 'uuid'
import type { NextAuthOptions } from "next-auth"
import executeQuery from "datas/mysql";
import { UserInfo } from "interfaces/portfolio"
import { Session } from "interfaces/login"
import { getValue, existValue } from 'datas/redis'

interface QueryResponse {
  EMAIL: string;
}

const reconstructSession = async (user: any) => {
  let parsedInfo: UserInfo | null = await getValue("users", user.email);
  if (!parsedInfo) {
    parsedInfo = await getValue("users", user.email);
  }

  if (!parsedInfo) return user;

  user.name = parsedInfo['name'] || null;
  user.accessLevel = parsedInfo["accessLevel"] || null;
  user.membership = parsedInfo["membership"] || null;
  user.image = parsedInfo["profileImage"] || null;
  user.interestedAssets = parsedInfo["interestedAssets"]?.map(asset => asset.ticker) || [];
  user.portfolio = parsedInfo["portfolio"]?.map(asset => asset.ticker) || [];

  return user;
};


export const authOptions: NextAuthOptions = {
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

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: `/login`,
    error: `/ko/login`
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60
  },



  callbacks: {
    //@ts-ignore
    async session({ session }: Session) {
      if (!session?.user?.email) return session;

      let parsedInfo: UserInfo | null = await getValue("users", session.user.email);
      if (!parsedInfo) {
        parsedInfo = await getValue("users", session.user.email);
      }

      if (!parsedInfo) return session;

      session.user.name = parsedInfo['name'] || null;
      session.user.accessLevel = parsedInfo["accessLevel"] || null;
      session.user.membership = parsedInfo["membership"] || null;
      session.user.image = parsedInfo["profileImage"] || null;
      session.user.interestedAssets = parsedInfo["interestedAssets"]?.map(asset => asset.ticker) || [];
      session.user.portfolio = parsedInfo["portfolio"]?.map(asset => asset.ticker) || [];

      return session;
    },

    //@ts-ignore
    async signIn({ user, account }: { user: User; account: Account }) {
      if (!user.email) {
        throw new Error('User email is undefined or null');
      }

      const query = `SELECT EMAIL FROM RWC.RW_USER_INFO WHERE EMAIL = ?;`;
      const userExistSql: unknown[] = await executeQuery({
        query: query,
        values: [user.email]
      });

      const isUserExist = await existValue("users", user.email);
      const id = uuid();
      if (!isUserExist) {
        const newUser = {
          id,
          email: user.email,
          platform_type: account?.provider,
          name: user.name ? user.name : id.toString(),
          profileImage: '/images/users/default4.svg',
          created_at: Date.now(),
          accessLevel: 1,
          membership: 0
        };

        const data = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/user`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ newUser })
        }).then(res => res.json());

        return [data.newUser];
      } else if (isUserExist && userExistSql.length > 0) {
        const parsedInfo: UserInfo = await getValue("users", user.email);
        const userPlatform = parsedInfo.platform_type;

        if (userPlatform !== account?.provider) {
          throw new Error(`An account with this email already exists on ${userPlatform} platform.`);
        } else {
          return true
        }
      }
    }
  }



}

export default NextAuth(authOptions)

