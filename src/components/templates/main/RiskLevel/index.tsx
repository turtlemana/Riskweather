import { useState, Dispatch, SetStateAction } from "react";
import arrow from "assets/icons/main/arrow.svg";
import { COLORS } from "datas/main";

import { RISK_LEVELS } from "datas/main";
import WeatherCard2 from "./WeatherCard2";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import Indicator from "components/templates/detail/Assets/Indicator";
import left from "assets/icons/detail/left.svg";
import right from "assets/icons/detail/right.svg";
import { useExploreState } from "contexts/ExploreStateContext";
import { RiskLevelData } from "interfaces/main";
import useWindowWidth from "utils/useWindowWidth";

interface Props {
  riskLevelData: RiskLevelData[];
  riskLevelType: string;
  setRiskLevelType: Dispatch<SetStateAction<string>>;
  riskLevelValid: boolean;
}

const RiskLevel = ({
  riskLevelData,
  riskLevelType,
  setRiskLevelType,
  riskLevelValid,
}: Props) => {
  const width = useWindowWidth();
  const { t } = useTranslation("index");
  const [index, setIndex] = useState(1);
  const array =
    width > 1280
      ? riskLevelData.slice((index - 1) * 4, index * 4)
      : riskLevelData.slice((index - 1) * 3, index * 3);
  const isFirst = index === 1;
  const isLast =
    width > 1280
      ? index * 4 >= riskLevelData.length
      : index * 3 >= riskLevelData.length;
  const handlePrev = () => !isFirst && setIndex(index - 1);
  const handleNext = () => !isLast && setIndex(index + 1);
  const { dispatch } = useExploreState();

  const router = useRouter();
  return (
    <main className="mb-7 px-5 min-w-[1024px] ">
      <div className="p-8  max-w-1320 w-full mx-auto bg-white rounded-20 overflow-auto ">
        <article className="flex justify-between mb-10 ">
          <h1 className="text-[28px] text-[#111111]">{t("riskLevelTitle")}</h1>
          <div
            onClick={() => {
              dispatch({ type: "RESET_VALUE" });
              dispatch({ type: "SET_RISK_LV", payload: riskLevelType });
              router.push({
                pathname: `/${router.locale}/explore`,
                // query: { type: riskLevelType },
              });
            }}
            className={"flex items-center cursor-pointer"}
          >
            <button
              type="button"
              className="flex items-center py-3 px-4 mr-2  text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {t("toExplore")}
              <Image src={arrow} alt="" className="w-4 ml-2  " />
            </button>
          </div>
        </article>
        <div className={"flex justify-between"}>
          <ul className="mb-7 flex gap-2.5 ">
            {RISK_LEVELS.map(({ id, title, koreanTitle }) => (
              <li
                key={id}
                className={`py-2 px-3 rounded-[36px] text-center cursor-pointer ${
                  riskLevelType === title
                    ? "bg-black text-white"
                    : `border border-gray-200 ${COLORS[title]} text-gray-400`
                }`}
                onClick={() => {
                  setRiskLevelType(title);
                  setIndex(1);
                }}
              >
                <h5
                  className={`h-5 ${
                    riskLevelType != title ? COLORS[title] : ""
                  } `}
                >
                  {router.locale == "ko" ? koreanTitle : title}
                </h5>
              </li>
            ))}
          </ul>
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
        </div>
        {riskLevelData && !riskLevelValid ? (
          <div>
            <div className="flex">
              {array.map(
                (
                  {
                    HR_ITEM_NM,
                    EXP_CVaRNTS,
                    ITEM_KR_NM,
                    CVaRNTS,
                    CVaR_LV,
                    CVaR_LV_KR,
                    ITEM_CD_DL,
                    ITEM_ENG_NM,
                    WTHR_ENG_DL,
                    WTHR_ENG_NM,
                    WTHR_KR_DL,
                    WTHR_KR_NM,
                    LV_DSCP_KR,
                    LV_DSCP_ENG,
                  }: RiskLevelData,
                  i: number
                ) => (
                  <WeatherCard2
                    key={i}
                    EXP_CVaRNTS={EXP_CVaRNTS}
                    exchg={HR_ITEM_NM}
                    krName={ITEM_KR_NM}
                    name={ITEM_ENG_NM}
                    ticker={ITEM_CD_DL}
                    riskLevel={CVaR_LV}
                    koreanRiskLevel={CVaR_LV_KR}
                    maxLoss={CVaRNTS}
                    riskDescriptionKr={LV_DSCP_KR}
                    riskDescriptionEn={LV_DSCP_ENG}
                    weather={WTHR_ENG_NM}
                    weatherExplain={WTHR_ENG_DL}
                    koreanWeatherExplain={WTHR_KR_DL}
                  />
                )
              )}
            </div>
            <Indicator
              total={riskLevelData.length}
              page={index}
              setPage={setIndex}
              width={width}
            />
          </div>
        ) : (
          <div className={"flex justify-center items-center h-[220px]"}>
            <svg
              aria-hidden="true"
              className="w-12 h-12 relative  text-gray-200 animate-spin dark:text-gray-600 fill-blue-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
      </div>
    </main>
  );
};

export default RiskLevel;
