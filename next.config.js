/** @type {import('next').NextConfig} */
const {i18n}=require("./next-i18next.config")

// const headers = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization',
// };

const nextConfig = {
  i18n,
  reactStrictMode: true,
  
  images:{
    formats:['image/webp'],
    domains:["k.kakaocdn.net","ssl.pstatic.net","lh3.googleusercontent.com",'riskweather.s3.ap-northeast-2.amazonaws.com']
  },

}

module.exports = nextConfig
