import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko-KR">
      <Head>
        <link rel="alternate" hrefLang="ko-KR" href="https://riskweather.io/" />
        <link
          rel="alternate"
          hrefLang="en-US"
          href="https://riskweather.io/en"
        />
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NJ75NLQ"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
              `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
