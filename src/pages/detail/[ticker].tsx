import { NextPage } from "next";
import WebComponent from "components/pages/w/Detail";
import MobileComponent from "components/pages/m/Detail";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import {
  DetailData,
  CorrData,
  DetailInfo,
  DetailChartInterface,
  Forcast,
} from "interfaces/detail";

interface Props {
  isMobile: boolean;
  detailData: DetailData;
  detailChart: DetailChartInterface[];
  detailInfo?: DetailInfo;
  detailForcast?: Forcast[];
  detailCorr: CorrData[];
  detailNegCorr: CorrData[];
}

const Detail: NextPage<Props> = ({
  isMobile,
  detailInfo,
  detailNegCorr,
  detailData,
  detailChart,
  detailForcast,
  detailCorr,
}) => {
  return isMobile ? (
    <MobileComponent
      detailInfo={detailInfo}
      detailData={detailData}
      detailChart={detailChart}
      detailForcast={detailForcast}
    />
  ) : (
    <WebComponent
      detailData={detailData}
      detailNegCorr={detailNegCorr}
      detailInfo={detailInfo}
      detailChart={detailChart}
      detailForcast={detailForcast}
      detailCorr={detailCorr}
    />
  );
};

export default Detail;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const locale = context.locale || context.defaultLocale;

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/detail/${context.query.ticker}`
  );
  const detailDat = await res.json();

  const res2 = await fetch(
    `${process.env.NEXTAUTH_URL}/api/detailChart?ticker=${context.query.ticker}`,
    { headers: { Accept: "application/json" } }
  );
  const detailCharts = await res2.json();

  const res3 = await fetch(
    `${process.env.NEXTAUTH_URL}/api/detailInfo?ticker=${context.query.ticker}`
  );
  const detailInf = await res3.json();

  const res4 = await fetch(
    `${process.env.NEXTAUTH_URL}/api/detailCorr?ticker=${context.query.ticker}`
  );
  const detailCorrs = await res4.json();

  const res5 = await fetch(
    `${process.env.NEXTAUTH_URL}/api/detailForcast?ticker=${context.query.ticker}`
  );
  const detailForcasts = await res5.json();

  const detailData = detailDat[0];
  const detailInfo = detailInf[0];
  const detailCorr = detailCorrs.filter(
    (corrData: CorrData) => corrData.NP === 1
  );
  const detailNegCorr = detailCorrs.filter(
    (corrData: CorrData) => corrData.NP === 0
  );
  const detailForcast = detailForcasts;
  const detailChart = JSON.parse(detailCharts[0].CHART);

  return {
    props: {
      detailData,
      detailChart,
      detailInfo,
      detailCorr,
      detailForcast,
      detailNegCorr,
      ...(await serverSideTranslations(locale as string, ["detail"])),
    },
  };
}
