import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import blackArrow from "assets/icons/main/arrow.svg";

import arrow from "assets/icons/main/blueArrow.svg";
import { TRENDING_MENUS } from "datas/main";
import Items from "components/templates/m/main/NowTrending/Items";
import { SlArrowRight } from "react-icons/sl";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useExploreState } from "contexts/ExploreStateContext";
import useUdtDate from "utils/useFormattedDate";
import { NowTrendingData } from "interfaces/main";

interface Props {
  nowTrendingData: NowTrendingData[];
  trendingType: string;
  setTrendingType: Dispatch<SetStateAction<string>>;
  nowTrendingValid: boolean;
}

const NowTrending = ({
  nowTrendingData,
  trendingType,
  setTrendingType,
  nowTrendingValid,
}: Props) => {
  const [index, setIndex] = useState(0);
  const [list, setList] = useState(1);
  const { t } = useTranslation("index");
  const router = useRouter();
  const { dispatch } = useExploreState();

  const array = nowTrendingData?.slice(0, list * 6);
  const isLast = list * 6 >= nowTrendingData?.length;

  const udtDate = useUdtDate(nowTrendingData, nowTrendingValid);

  return (
    <main className="mb-7 mt-[60px]">
      <div className="w-full mx-auto bg-white">
        <article className="flex justify-between mb-5 items-center px-5">
          <h1
            className="flex items-center justify-center text-2xl text-[#111111]"
            onClick={() => {
              dispatch({ type: "RESET_VALUE" });
              if (trendingType === "Crypto") {
                dispatch({ type: "SET_TYPE", payload: trendingType });
              } else {
                dispatch({ type: "SET_LOC", payload: trendingType });
              }
              router.push({
                pathname: `/${router.locale}/explore`,
                // query: { type: trendingType },
              });
            }}
          >
            {t("nowTrendingTitle")}
            <Image src={blackArrow} alt="" className="w-6  ml-2  " />
          </h1>

          <p className="text-xs text-[#6B7280]">
            {nowTrendingData && !nowTrendingValid ? udtDate : ""}
          </p>
        </article>
        <article className="pl-5 mb-5 flex gap-6 border-b border-gray-200">
          {TRENDING_MENUS.map(({ id, title, mobileEngTitle, koreanTitle }) => (
            <h2
              key={id}
              className={`cursor-pointer truncate ${
                title === trendingType
                  ? "text-[#111111] border-[#111111] border-b-[3px]"
                  : "text-gray-300"
              }`}
              onClick={() => {
                setIndex(id);
                setTrendingType(title);
                setList(1);
              }}
            >
              {router.locale == "ko" ? koreanTitle : mobileEngTitle}
            </h2>
          ))}
        </article>

        {nowTrendingData && !nowTrendingValid ? (
          array.map((asset: NowTrendingData, i: number) => (
            <Items
              EXP_CVaRNTS={asset["EXP_CVaRNTS"]}
              exchg={asset["HR_ITEM_NM"]}
              name={asset["ITEM_ENG_NM"]}
              krName={asset["ITEM_KR_NM"]}
              ticker={asset["ITEM_CD_DL"]}
              key={i}
              riskLevel={asset["CVaR_LV"]}
              koreanRiskLevel={asset["CVaR_LV_KR"]}
              koreanWeatherExplain={asset["WTHR_KR_DL"]}
              maxLoss={asset["CVaRNTS"]}
              price={asset["ADJ_CLOSE"]}
              currency={asset["CURR"]}
              priceChange={""}
              chartData={JSON.parse(asset["CHART"])}
              weather={asset["WTHR_ENG_NM"]}
              weatherExplain={asset["WTHR_ENG_DL"]}
              id={i}
            />
          ))
        ) : (
          <div
            role="status"
            className={"py-20 flex items-center justify-center "}
          >
            <svg
              aria-hidden="true"
              className="w-12 h-12  text-gray-200 animate-spin dark:text-gray-600 fill-blue-400"
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
        {!isLast ? (
          <div className="px-5">
            <button
              className="flex border border-[#0198FF] rounded-20 w-full h-10 justify-center items-center"
              onClick={() => setList((prev) => prev + 1)}
            >
              <p className="text-[#0198FF] text-sm font-medium">
                {t("nowTrendingButton1")}
              </p>
              <Image src={arrow} alt="" className="mb-1 ml-1" />
            </button>
          </div>
        ) : (
          <div className="px-5">
            <button
              className="flex border border-[#0198FF] rounded-20 w-full h-10  justify-center items-center"
              onClick={() => {
                dispatch({ type: "RESET_VALUE" });
                router.push({
                  pathname: `/${router.locale}/explore`,
                  query: { type: trendingType },
                });
              }}
            >
              <p className="text-[#0198FF] text-sm font-medium">
                {t("toExplore")}
              </p>
              <SlArrowRight
                className={" ml-1.5 text-[#0198FF] text-[10px] font-bold"}
              />
              {/* <Image src={arrow} alt="" className="mb-1 ml-1" /> */}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default NowTrending;
