import Layout from "components/layouts/Layout";
import { ExploreStateProvider } from "contexts/ExploreStateContext";
import "styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import type { AppContext, AppProps } from "next/app";
import Image from "next/image";
import { SessionProvider } from "next-auth/react";
// import { useEffect } from 'react'
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import Script from "next/script";
// import * as gtag from 'lib/gtag';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import "react-tooltip/dist/react-tooltip.css";
import UAParser from "ua-parser-js";
import { Tooltip } from "react-tooltip";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url:string) => {
  //     gtag.pageview(url)
  //   }

  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   router.events.on('hashChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //     router.events.off('hashChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  return (
    <ExploreStateProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
        <ToastContainer />
        <Tooltip
          id="riskLevel"
          style={{ zIndex: 289, fontSize: "small", fontWeight: "bold" }}
        />
        <Tooltip
          id="riskIndexExplain"
          style={{
            zIndex: 289,
            fontSize: "small",
            fontWeight: "bold",
            backgroundColor: "transparent",
          }}
        >
          <Image
            src={
              router.locale == "ko"
                ? "/images/explain/RiskIndexExplain.svg"
                : "/images/explain/RiskIndexExplainEng.svg"
            }
            alt=""
            width={350}
            height={150}
          />
        </Tooltip>
        <Tooltip
          id="traitExplain"
          style={{
            zIndex: 289,
            fontSize: "small",
            fontWeight: "bold",
            backgroundColor: "transparent",
          }}
        >
          <Image
            src={
              router.locale == "ko"
                ? "/images/traits/explanationKr.svg"
                : "/images/traits/explanation.svg"
            }
            alt=""
            width={350}
            height={150}
          />
        </Tooltip>
        {/* <Tooltip id="traitExplainKr"  style={{zIndex:289, fontSize:"small" ,fontWeight:"bold",  backgroundColor:"transparent" }}>
      <Image src={'/images/traits/explanationKr.svg'} alt="" width={450} height={150}/>
      </Tooltip> */}
      </Layout>
    </ExploreStateProvider>
  );
}

const AppWithI18n = appWithTranslation(App);

const AppWithAuth = (props: AppProps) => (
  <>
    {/* <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.href,
              page_title:window.location.pathname
            }); 
          `,
        }}
      />

    <Script
      id="facebook-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '277401224692892'); 
          fbq('track', 'PageView');
        `,
      }}
    /> */}
    {/* Google Tag Manager */}
    <Script
      id="gtm-head"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NJ75NLQ');
        `,
      }}
    />
    <SessionProvider session={props.pageProps.session}>
      <AppWithI18n {...props} />
    </SessionProvider>
  </>
);

AppWithAuth.getInitialProps = async ({ ctx }: AppContext) => {
  const userAgent: string | undefined = ctx.req
    ? ctx.req.headers["user-agent"]
    : navigator.userAgent;

  const parser = new UAParser();
  let isMobile = false;

  if (userAgent) {
    const result = parser.setUA(userAgent).getResult();
    isMobile = result.device && result.device.type === "mobile";
  }
  // const result = parser.setUA(userAgent).getResult();
  // const isMobile = result.device && result.device.type === 'mobile';
  // const isMobi = userAgent?.indexOf("Mobi") !== -1;
  // const isMobi = Boolean(userAgent?.match(
  //   /Android|BlackBerry|iPhone|Galaxy|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  // ) );
  // const width = typeof window !== 'undefined' ? window.innerWidth : screen.width;
  // const isMobileWidth = width !== null && width < 1180;
  // const isMobile = isMobi ;

  return { pageProps: { isMobile } };
};

export default AppWithAuth;

export async function getStaticProps(
  ctx: GetStaticPropsContext,
  { locale }: GetStaticPropsContext
) {
  return {
    props: { ...(await serverSideTranslations(locale as string, ["common"])) },
  };
}
