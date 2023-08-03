import Graph from "components/templates/m/detail/Graph";
import Stock from "components/templates/m/detail/Stock";
import Top from "components/templates/m/detail/Top";
import Assets from "components/templates/m/detail/Assets";
import RiskWeatherNews from "components/templates/m/detail/RiskWeatherNews";
import useSWR from "swr";
import axios from "axios";
import {
  DetailData,
  DetailInfo,
  CorrData,
  DetailChartInterface,
  Forcast,
} from "interfaces/detail";

interface Props {
  detailData: DetailData;
  detailInfo?: DetailInfo;
  detailChart: DetailChartInterface[];
  detailForcast?: Forcast[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Detail = ({
  detailData,
  detailChart,
  detailInfo,
  detailForcast,
}: Props) => {
  const { data: corrData, isValidating: detailCorrValid } = useSWR(
    `/api/detailCorr?ticker=${detailData["ITEM_CD_DL"]}`,
    fetcher
  );
  const detailCorr = corrData
    ? [].concat(...corrData.filter((data: CorrData) => data.NP === 1))
    : [];
  const detailNegCorr = corrData
    ? [].concat(...corrData.filter((data: CorrData) => data.NP === 0))
    : [];

  return (
    <div className="bg-gray-50 min-w-[360px]">
      <Top
        EXP_VaRNTS={detailData["EXP_VaRNTS"]}
        EXP_VaRNTS_95={detailData["EXP_VaRNTS_95"]}
        EXP_CVaRNTS={detailData["EXP_CVaRNTS"]}
        EXP_CVaRNTS_95={detailData["EXP_CVaRNTS_95"]}
        exchg={detailData["HR_ITEM_NM"]}
        cat={detailData["CAT"]}
        krName={detailData["ITEM_KR_NM"]}
        forcast={detailForcast}
        name={detailData["ITEM_ENG_NM"]}
        priceChange={detailData["ADJ_CLOSE_CHG"]}
        usdPrice={detailData["ADJ_CLOSE_USD"]}
        varGauss={detailData["VaRGauss"]}
        tailRisk95={detailData["RW_IDX_95"]}
        varGauss95={detailData["VaRGauss_95"]}
        cVaRNTS95={detailData["CVaRNTS_95"]}
        tailRisk={detailData["RW_IDX"]}
        ticker={detailData["ITEM_CD_DL"]}
        riskLevel={detailData["CVaR_LV"]}
        koreanRiskLevel={detailData["CVaR_LV_KR"]}
        price={detailData["ADJ_CLOSE"]}
        maxLoss={detailData["CVaRNTS"]}
        currency={detailData["CURR"]}
        weather={detailData["WTHR_ENG_NM"]}
        weatherExplain={detailData["WTHR_ENG_DL"]}
        koreanWeatherExplain={detailData["WTHR_KR_DL"]}
        date={detailData["UDT_DT"]}
      />
      <Graph
        cat={detailData["CAT"]}
        detailChart={detailChart}
        curr={detailData["CURR"]}
      />
      <Stock
        exchg={detailData["HR_ITEM_NM"]}
        cat={detailData["CAT"]}
        detailInfo={detailInfo}
      />
      <Assets
        corrData={detailCorr}
        negCorrData={detailNegCorr}
        corrValid={detailCorrValid}
      />
      {/* <RiskWeatherNews /> */}
    </div>
  );
};
export default Detail;
