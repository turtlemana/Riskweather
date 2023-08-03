import Image from "next/image";
import { useState } from "react";

import left from "assets/icons/detail/left.svg";
import right from "assets/icons/detail/right.svg";
import { TRENDING_LIST } from "datas/main";
import Indicator from "components/templates/detail/Assets/Indicator";
import CorrCard from "components/templates/detail/Assets/CorrCard";
import { useTranslation } from "next-i18next";
import { CorrData } from "interfaces/detail";
import useWindowWidth from "utils/useWindowWidth";

interface Props {
  corrData: CorrData[];
  negCorrData: CorrData[];
}

const Assets = ({ corrData, negCorrData }: Props) => {
  const [index, setIndex] = useState(1);
  const [negIndex, setNegIndex] = useState(1);
  const { t } = useTranslation("detail");

  const width = useWindowWidth();

  // const array = TRENDING_LIST.slice((index - 1) * 4, index * 4);

  const array =
    width > 1280
      ? corrData.slice((index - 1) * 4, index * 4)
      : corrData.slice((index - 1) * 3, index * 3);
  const negArray =
    width > 1280
      ? negCorrData.slice((negIndex - 1) * 4, negIndex * 4)
      : negCorrData.slice((negIndex - 1) * 3, negIndex * 3);
  const isFirst = index === 1;
  const isLast =
    width > 1280
      ? index * 4 >= TRENDING_LIST.length
      : index * 3 >= TRENDING_LIST.length;
  const isNegFirst = negIndex === 1;
  const isNegLast =
    width > 1280
      ? negIndex * 4 >= TRENDING_LIST.length
      : negIndex * 3 >= TRENDING_LIST.length;
  const handlePrev = () => !isFirst && setIndex(index - 1);
  const handleNext = () => !isLast && setIndex(index + 1);
  const handleNegPrev = () => !isNegFirst && setNegIndex(negIndex - 1);
  const handleNegNext = () => !isNegLast && setNegIndex(negIndex + 1);

  return (
    <main className="mb-7 ">
      <div
        className={
          "rounded-20 p-8 max-w-1320 min-w-[1024px] w-full mx-auto bg-white  overflow-auto"
        }
      >
        <header className="flex justify-between mb-10">
          <article>
            <h1 className="text-2xl text-[#111111] mb-3">{t("corrTitle")}</h1>
            <p className="text-sm text-gray-500">{t("corrExplain")}</p>
          </article>
          <article className="flex">
            <Image
              src={left}
              alt=""
              onClick={handlePrev}
              className={`${isFirst && "opacity-0"} 
              ${!isFirst && "cursor-pointer"}`}
            />
            <Image
              src={right}
              alt=""
              onClick={handleNext}
              className={`${isLast && "opacity-0"} ${
                !isLast && "cursor-pointer"
              }`}
            />
          </article>
        </header>
        <div className="flex">
          {array.map(
            (
              {
                HR_ITEM_NM,
                EXP_CVaRNTS,
                ITEM_KR_NM,
                LV_DSCP_ENG,
                LV_DSCP_KR,
                CVaRNTS,
                CVaR_LV,
                CVaR_LV_KR,
                ITEM_CD_DL,
                ITEM_ENG_NM,
                WTHR_ENG_DL,
                WTHR_ENG_NM,
                WTHR_KR_DL,
                WTHR_KR_NM,
              }: CorrData,
              i: number
            ) => (
              <CorrCard
                key={i}
                exchg={HR_ITEM_NM}
                EXP_CVaRNTS={EXP_CVaRNTS}
                krName={ITEM_KR_NM}
                riskDescriptionEn={LV_DSCP_ENG}
                riskDescriptionKr={LV_DSCP_KR}
                name={ITEM_ENG_NM}
                ticker={ITEM_CD_DL}
                riskLevel={CVaR_LV}
                koreanRiskLevel={CVaR_LV_KR}
                maxLoss={CVaRNTS}
                weather={WTHR_ENG_NM}
                weatherExplain={WTHR_ENG_DL}
                koreanWeatherExplain={WTHR_KR_DL}
              />
            )
          )}
        </div>
        <Indicator
          total={TRENDING_LIST.length}
          page={index}
          setPage={setIndex}
          width={width}
        />
      </div>
      <hr className="h-px my-3  border-0 dark:bg-gray-700" />

      {/* Negative Correlated Assets */}
      <div className="rounded-20 p-8 max-w-1320 min-w-[1024px] w-full mx-auto bg-white  overflow-auto">
        <header className="flex justify-between mb-10">
          <article>
            <h1 className="text-2xl text-[#111111] mb-3">
              {t("negCorrTitle")}
            </h1>
            <p className="text-sm text-gray-500">{t("negCorrExplain")}</p>
          </article>
          <article className="flex">
            <Image
              src={left}
              alt=""
              onClick={handleNegPrev}
              className={`${isNegFirst && "opacity-0"} 
              ${!isNegFirst && "cursor-pointer"}`}
            />
            <Image
              src={right}
              alt=""
              onClick={handleNegNext}
              className={`${isNegLast && "opacity-0"} ${
                !isNegLast && "cursor-pointer"
              }`}
            />
          </article>
        </header>
        <div className="flex">
          {negArray.map(
            (
              {
                HR_ITEM_NM,
                EXP_CVaRNTS,
                ITEM_KR_NM,
                LV_DSCP_ENG,
                LV_DSCP_KR,
                CVaRNTS,
                CVaR_LV,
                CVaR_LV_KR,
                ITEM_CD_DL,
                ITEM_ENG_NM,
                WTHR_ENG_DL,
                WTHR_ENG_NM,
                WTHR_KR_DL,
              }: CorrData,
              i: number
            ) => (
              <CorrCard
                key={i}
                EXP_CVaRNTS={EXP_CVaRNTS}
                exchg={HR_ITEM_NM}
                krName={ITEM_KR_NM}
                riskDescriptionEn={LV_DSCP_ENG}
                riskDescriptionKr={LV_DSCP_KR}
                name={ITEM_ENG_NM}
                ticker={ITEM_CD_DL}
                riskLevel={CVaR_LV}
                koreanRiskLevel={CVaR_LV_KR}
                maxLoss={CVaRNTS}
                weather={WTHR_ENG_NM}
                weatherExplain={WTHR_ENG_DL}
                koreanWeatherExplain={WTHR_KR_DL}
              />
            )
          )}
        </div>
        <Indicator
          total={TRENDING_LIST.length}
          page={negIndex}
          setPage={setNegIndex}
          width={width}
        />
      </div>
    </main>
  );
};

export default Assets;
