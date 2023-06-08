import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko-KR">
      <Head>
      <link rel="alternate" hrefLang="ko-KR" href="https://riskweather.io/" />
          <link rel="alternate" hrefLang="en-US" href="https://riskweather.io/en" />
          </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
