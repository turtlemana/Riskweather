import Graph from "components/templates/detail/Graph";
import Stock from "components/templates/detail/Stock";
import Top from "components/templates/detail/Top";
import Assets from "components/templates/detail/Assets";
import RiskWeatherNews from "components/templates/detail/RiskWeatherNews";
import {
  DetailData,
  DetailInfo,
  CorrData,
  DetailChartInterface,
  Forcast,
} from "interfaces/detail";

interface Props {
  detailData: DetailData;
  detailChart: DetailChartInterface[];
  detailInfo?: DetailInfo;
  detailForcast?: Forcast[];
  detailCorr: CorrData[];
  detailNegCorr: CorrData[];
}

const Detail = ({
  detailData,
  detailChart,
  detailInfo,
  detailForcast,
  detailCorr,
  detailNegCorr,
}: Props) => {
  return (
    <div className="pt-5  min-w-[1024px]">
      <Top
        EXP_VaRNTS={detailData["EXP_VaRNTS"]}
        EXP_VaRNTS_95={detailData["EXP_VaRNTS_95"]}
        EXP_CVaRNTS={detailData["EXP_CVaRNTS"]}
        EXP_CVaRNTS_95={detailData["EXP_CVaRNTS_95"]}
        exchg={detailData["HR_ITEM_NM"]}
        cat={detailData["CAT"]}
        forcast={detailForcast}
        krName={detailData["ITEM_KR_NM"]}
        riskDescriptionKr={detailData["LV_DSCP_KR"]}
        riskDescriptionEn={detailData["LV_DSCP_ENG"]}
        name={detailData["ITEM_ENG_NM"]}
        priceChange={detailData["ADJ_CLOSE_CHG"]}
        usdPrice={detailData["ADJ_CLOSE_USD"]}
        varGauss={detailData["VaRGauss"]}
        tailRisk95={detailData["RW_IDX_95"]}
        varGauss95={detailData["VaRGauss_95"]}
        cVaRNTS95={detailData["CVaRNTS_95"]}
        tailRisk={detailData["RW_IDX"]}
        ticker={detailData["ITEM_CD_DL"]}
        koreanRiskLevel={detailData["CVaR_LV_KR"]}
        riskLevel={detailData["CVaR_LV"]}
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
      <Assets corrData={detailCorr} negCorrData={detailNegCorr} />
      {/* <RiskWeatherNews /> */}
    </div>
  );
};
export default Detail;
