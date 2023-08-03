import { useState, Dispatch, SetStateAction } from "react";
import arrow from "assets/icons/main/arrow.svg";
import Image from "next/image";
import { TRENDING_MENUS } from "datas/main";
import Items from "components/templates/main/NowTrending/Items";
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
  const { t } = useTranslation("index");
  const router = useRouter();
  const { dispatch } = useExploreState();

  const udtDate = useUdtDate(nowTrendingData, nowTrendingValid);

  return (
    <main className="mb-7 px-5 min-w-[1024px]">
      <div className=" max-w-1320 w-full mx-auto bg-white rounded-20 overflow-hidden">
        <article className="flex justify-between p-8 mb-2">
          <h1 className="text-[28px] text-[#111111]">
            {t("nowTrendingTitle")}
          </h1>
          <div
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
            className={"flex items-center cursor-pointer"}
          >
            <button
              type="button"
              className="flex items-center py-3 px-4  justify-center  text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {t("toExplore")}
              <Image src={arrow} alt="" className="w-4 ml-2  " />
            </button>
          </div>
        </article>
        <article className="pl-8 mb-7 flex   justify-between">
          <div className={"flex gap-6"}>
            {TRENDING_MENUS.map(({ id, title, koreanTitle }) => (
              <h2
                key={id}
                className={`cursor-pointer ${
                  title === trendingType ? "text-black" : "text-gray-300"
                }`}
                onClick={() => {
                  setIndex(id);
                  setTrendingType(title);
                }}
              >
                {router.locale == "ko" ? koreanTitle : title}
              </h2>
            ))}
          </div>
          <p className="text-sm text-[#6B7280] mr-10">
            {" "}
            {nowTrendingData.length > 0 && !nowTrendingValid ? udtDate : ""}
          </p>
        </article>
        <table className="w-full">
          <colgroup>
            <col width="5%" />
            <col width="25%" />
            <col width="16%" />
            <col width="16%" />
            <col width="16%" />
            <col width="22%" />
          </colgroup>
          <thead className="border-gray-200 border-b-[1px]">
            <tr className="text-[14px] text-gray-600 h-11">
              <th></th>
              <th className="text-left">{t("tableName")}</th>
              <th>{t("tableRisk")}</th>
              <th>{t("tableLoss")}</th>
              <th>{t("tableChart")}</th>
              <th>{t("tableWeather")}</th>
            </tr>
          </thead>
          <tbody>
            {/* {TRENDING_LIST.map((data) => (
              <Item data={data} key={data.id} />
            ))} */}
            {nowTrendingData && !nowTrendingValid ? (
              nowTrendingData.map((asset: NowTrendingData, i: number) => (
                <Items
                  exchg={asset["HR_ITEM_NM"]}
                  krName={asset["ITEM_KR_NM"]}
                  name={asset["ITEM_ENG_NM"]}
                  ticker={asset["ITEM_CD_DL"]}
                  key={i}
                  riskLevel={asset["CVaR_LV"]}
                  koreanRiskLevel={asset["CVaR_LV_KR"]}
                  maxLoss={asset["CVaRNTS"]}
                  price={asset["ADJ_CLOSE"]}
                  currency={asset["CURR"]}
                  priceChange={""}
                  chartData={JSON.parse(asset["CHART"])}
                  weather={asset["WTHR_ENG_NM"]}
                  weatherExplain={asset["WTHR_ENG_DL"]}
                  koreanWeatherExplain={asset["WTHR_KR_DL"]}
                  riskDescriptionEn={asset["LV_DSCP_ENG"]}
                  riskDescriptionKr={asset["LV_DSCP_KR"]}
                  EXP_CVaRNTS={asset["EXP_CVaRNTS"]}
                />
              ))
            ) : (
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td role="status" className={"py-20 justify-center "}>
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
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default NowTrending;
