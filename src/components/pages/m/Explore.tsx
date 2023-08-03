import { KeyboardEventHandler, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { State, Action } from "contexts/ExploreStateContext";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import Select from "components/templates/m/explore/Top/Select";
import { useExploreState } from "contexts/ExploreStateContext";
import useHandleImageError from "utils/useHandleImageError";
import useUdtDate from "utils/useFormattedDate";

import {
  EXCHAGNES,
  LOCATIONS,
  RISKS,
  SECTROS,
  TYPES,
  WEATHERS,
  CURRENCIES,
} from "datas/explore";
import mobileSearch from "assets/icons/header/mobileSearch.svg";
import filter from "assets/icons/explore/m/filter.svg";
import close from "assets/icons/contact/close.svg";
import arrow from "assets/icons/explore/rightArrow.svg";
import { COLORS } from "datas/main";
import Pagination from "components/organisms/m/Pagination";
import MiniChart from "chart/MiniChart";
import { useTranslation } from "next-i18next";
import { AssetInfo } from "interfaces/explore";
import { stat } from "fs";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Explore = () => {
  const { t } = useTranslation("explore");
  const router = useRouter();
  const {
    state,
    dispatch,
  }: { state: State; dispatch: React.Dispatch<Action> } = useExploreState();
  const { data, isValidating } = useSWR(
    `/api/allassets?&page=${state.page}&limit=${state.limit}&type=${state.type}&riskLv=${state.riskLv}&loc=${state.loc}&exchg=${state.exchg}&sect=${state.sect}&weather=${state.weather}&search=${state.search}&priceOrder=${state.priceOrder}&lossOrder=${state.lossOrder}&priceChgOrder=${state.priceChgOrder}`,
    fetcher
  );
  const assetList = data ? [].concat(...data[0].assets) : [];
  const rowCount = data ? data[1].rowCount : 0;

  const [tmpState, setTmpState] = useState({
    tmpType: state.type,
    tmpRiskLv: state.riskLv,
    tmpWeather: state.weather,
    tmpLoc: state.loc,
    tmpSect: state.sect,
    tmpExchg: state.exchg,
    tmpCurrency: router.locale === "ko" ? "KRW" : "USD",
  });

  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    dispatch({
      type: "SET_CURRENCY",
      payload: router.locale === "ko" ? "KRW" : "USD",
    });
    setTmpState((prevState) => ({
      ...prevState,
      tmpCurrency: router.locale === "ko" ? "KRW" : "USD",
    }));

    // if (state.type === "Crypto") {
    //   setTmpState((prevState) => ({
    //     ...prevState,
    //     tmpType: state.type as string,
    //   }));
    // } else if (
    //   state.loc !== "All" &&
    //   LOCATIONS.some((location) => location.title === state.loc)
    // ) {
    //   setTmpState((prevState) => ({
    //     ...prevState,
    //     tmpLoc: state.loc as string,
    //   }));
    // } else if (
    //   state.riskLv !== "All" &&
    //   RISKS.some((risk) => risk.title === state.riskLv)
    // ) {
    //   setTmpState((prevState) => ({
    //     ...prevState,
    //     tmpRiskLv: state.riskLv as string,
    //   }));
    // }
  }, [router.locale]);

  const udtDate = useUdtDate(assetList, isValidating);

  useEffect(() => {
    setIsOpenDetail(-1);
  }, [
    state.type,
    state.riskLv,
    state.loc,
    state.sect,
    state.exchg,
    state.weather,
    state.search,
    state.priceOrder,
    state.lossOrder,
    state.priceChgOrder,
    state.page,
    state.limit,
  ]);

  useEffect(() => {
    if (isMounted) {
      dispatch({ type: "SET_PAGE", payload: 1 });
    } else {
      setIsMounted(true);
    }
  }, [
    state.type,
    state.riskLv,
    state.loc,
    state.sect,
    state.exchg,
    state.weather,
    state.search,
    state.priceOrder,
    state.lossOrder,
    state.priceChgOrder,
    state.limit,
  ]);

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      if (query.length > 20) {
        return;
      }
      dispatch({ type: "SET_SEARCH", payload: query });
    },
    [dispatch]
  );

  const handleChange =
    (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setTmpState((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };

  const weatherHandler = handleChange("tmpWeather");
  const locHandler = handleChange("tmpLoc");
  const exchgHandler = handleChange("tmpExchg");
  const sectHandler = handleChange("tmpSect");
  const currencyHandler = handleChange("tmpCurrency");

  const addFilterHandler = () => {
    dispatch({ type: "SET_WEATHER", payload: tmpState.tmpWeather });
    dispatch({ type: "SET_LOC", payload: tmpState.tmpLoc });
    dispatch({ type: "SET_EXCHG", payload: tmpState.tmpExchg });
    dispatch({ type: "SET_SECT", payload: tmpState.tmpSect });
    dispatch({ type: "SET_TYPE", payload: tmpState.tmpType });
    dispatch({ type: "SET_RISK_LV", payload: tmpState.tmpRiskLv });
    dispatch({ type: "SET_CURRENCY", payload: tmpState.tmpCurrency });
    dispatch({ type: "SET_PAGE", payload: 1 });
    dispatch({ type: "SET_LIMIT", payload: 20 });
    setIsFilterActive(false);
  };

  const resetHandler = () => {
    setTmpState({
      tmpType: "All",
      tmpRiskLv: "All",
      tmpWeather: "All",
      tmpLoc: "All",
      tmpSect: "All",
      tmpExchg: "All",
      tmpCurrency: router.locale === "ko" ? "KRW" : "USD",
    });
    dispatch({ type: "RESET_VALUE" });
  };

  const closeHandler = () => {
    setTmpState((prevState) => ({
      ...prevState,
      tmpExchg: state.exchg,
      tmpLoc: state.loc,
      tmpRiskLv: state.riskLv,
      tmpType: state.type,
      tmpSect: state.sect,
      tmpWeather: state.weather,
    }));
    setIsFilterActive(false);
  };

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      // Enter 터치 이벤트 감지
      event.preventDefault(); // 기본적인 터치 이벤트 동작 방지

      if (assetList.length >= 1) {
        const firstItem = assetList[0]; // 첫 번째 항목
        router.push({ pathname: `/detail/${firstItem["ITEM_CD_DL"]}` });
      }
    }
  };

  const handleImageError = useHandleImageError();

  return (
    <main className="px-5 py-6 bg-white min-w-[360px] ">
      <div className={"flex justify-between items-center"}>
        <h1 className="text-2xl text-[#111111] mb-5">{t("headerTitle")}</h1>
        <p className="mr-3 text-xs text-gray-400 mb-5 ">
          {assetList.length > 0 && !isValidating ? udtDate : ""}
        </p>
      </div>
      <main>
        <section className="flex gap-3 mb-4">
          <article className="w-[242px] h-10 p-3 flex items-center border border-gray-200 rounded-20 hover:border-[#4B5563]">
            <Image
              loading="eager"
              src={mobileSearch}
              alt="search"
              className="mr-2 w-4 h-4"
            />

            <input
              placeholder={`${t("searchName")}`}
              className="outline-none text-sm h-[18px] w-full"
              value={state.search}
              onChange={onSearch}
              onKeyUp={handleKeyUp}
            />
          </article>
          <button
            className="max-h-10 w- flex items-center py-2.5 px-5  rounded-20 border border-gray-200 hover:bg-gray-100"
            onClick={() => setIsFilterActive(true)}
          >
            <Image src={filter} alt="filter" className="mr-1" />
            <p className="mt-px text-gray-600 text-[10px] truncate w-[30px] ">
              {t("filterButton")}
            </p>
          </button>
        </section>
        {isFilterActive && (
          <div className="fixed z-30 bg-white w-full h-full top-16 left-0 overflow-auto customScrollBar pb-[140px]">
            <header className="px-5 py-[14px] border-b border-gray-100 relative">
              <h6 className="text-center mt-px ">{t("filterButton")}</h6>
              <Image
                src={close}
                alt="close"
                className="absolute right-[20px] top-[14px] cursor-pointer"
                onClick={closeHandler}
              />
            </header>
            <section className="py-7 pb-3">
              <article className="mb-7">
                <h6 className="px-5 text-sm text-[#111111] mb-3">
                  {t("typeTitle")}
                </h6>
                <ul className="px-5 flex gap-[10px]">
                  {TYPES.map(({ id, title, koreanTitle }) => (
                    <li
                      key={id}
                      className={`rounded-20 border px-3.5 py-1.5 text-center cursor-pointer max-h-[32px]  ${
                        tmpState.tmpType == title
                          ? "border-[#E6F5FF] bg-[#E6F5FF]"
                          : "border-gray-200"
                      }`}
                      onTouchStart={() => {
                        setTmpState((prevState) => ({
                          ...prevState,
                          tmpType: title,
                          tmpExchg: "All",
                          tmpLoc: "All",
                          tmpSect: "All",
                        }));
                      }}
                    >
                      <h6
                        className={`text-sm ${
                          tmpState.tmpType == title
                            ? "text-[#0198FF]"
                            : "text-gray-500"
                        }`}
                      >
                        {router.locale == "ko" ? koreanTitle : title}
                      </h6>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="mb-7 px-5">
                <h6 className="text-sm text-[#111111] mb-3">
                  {t("risklevelTitle")}
                </h6>
                <ul className="flex gap-[10px] flex-wrap">
                  {RISKS.map(({ id, title, koreanTitle }) => (
                    <li
                      key={id}
                      className={`rounded-20 border px-3.5 py-1.5 text-center cursor-pointer max-h-[32px] ${
                        tmpState.tmpRiskLv === title
                          ? "border-[#E6F5FF] bg-[#E6F5FF]"
                          : "border-gray-200"
                      }`}
                      onTouchStart={() => {
                        setTmpState((prevState) => ({
                          ...prevState,
                          tmpRiskLv: title,
                        }));
                      }}
                    >
                      <h6
                        className={`text-sm ${
                          tmpState.tmpRiskLv === title
                            ? "text-[#0198FF]"
                            : "text-gray-500"
                        }`}
                      >
                        {router.locale == "ko" ? koreanTitle : title}
                      </h6>
                    </li>
                  ))}
                </ul>
              </article>
              <Select
                defaultData={tmpState.tmpCurrency}
                data={CURRENCIES}
                title={"Currency"}
                koreanTitle={"통화"}
                selectHandler={currencyHandler}
              />

              <div className="my-7 h-[6px] bg-gray-50 w-full" />
              <Select
                defaultData={tmpState.tmpWeather}
                data={WEATHERS}
                title={"Weather"}
                koreanTitle={"날씨"}
                selectHandler={weatherHandler}
              />

              <Select
                tmpType={tmpState.tmpType}
                defaultData={tmpState.tmpLoc}
                data={LOCATIONS}
                title={"Location"}
                koreanTitle={"국가"}
                selectHandler={locHandler}
              />
              <Select
                tmpType={tmpState.tmpType}
                defaultData={tmpState.tmpExchg}
                data={EXCHAGNES}
                title={"Exchange"}
                koreanTitle={"거래소"}
                selectHandler={exchgHandler}
              />
              <Select
                tmpType={tmpState.tmpType}
                defaultData={tmpState.tmpSect}
                data={SECTROS}
                title={"Sector"}
                koreanTitle={"분야"}
                selectHandler={sectHandler}
              />
            </section>
            <section className="flex gap-3 px-5 mb-10">
              <button onClick={resetHandler}>
                <p className="text-white text-sm font-medium bg-gray-500 py-2.5 px-5 rounded-[60px] hover:bg-gray-600">
                  {t("allReset")}
                </p>
              </button>
              <button
                className="max-h-10 flex-1 py-2.5 px-5 bg-[#0198ff] rounded-[60px] hover:bg-[#0085E6]"
                onClick={addFilterHandler}
              >
                <h1 className="text-white text-sm">{t("addFilterButton")}</h1>
              </button>
            </section>
          </div>
        )}
      </main>

      {/* Table */}
      <main className="bg-white flex-col justify-center">
        <div className="flex-col items-center justify-center">
          {isValidating && !data ? (
            <div
              role="status"
              className={"flex py-20 justify-center items-center"}
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
          ) : (
            assetList.map((asset: AssetInfo, i: number) => (
              <section
                key={i}
                className={`border-gray-100 ${
                  isOpenDetail !== i && "border-b"
                }`}
              >
                <article
                  className="flex items-center py-4 cursor-pointer"
                  onClick={() => setIsOpenDetail(i === isOpenDetail ? -1 : i)}
                >
                  <Image
                    loading="eager"
                    unoptimized
                    width={50}
                    height={50}
                    quality={100}
                    onError={(event) =>
                      handleImageError(event, asset["HR_ITEM_NM"])
                    }
                    src={`/images/logos/${asset["ITEM_CD_DL"]}.png` || ""}
                    alt=""
                    className="h-10 w-10 mr-2"
                  />
                  <div className="flex-1">
                    <h6
                      className={"w-[150px] truncate"}
                      title={`${
                        router.locale == "ko"
                          ? asset["ITEM_KR_NM"]
                          : asset["ITEM_ENG_NM"]
                      }`}
                    >
                      {router.locale == "ko"
                        ? asset["ITEM_KR_NM"]
                        : asset["ITEM_ENG_NM"]}
                    </h6>
                    <p className="text-gray-500 text-xs">
                      {asset["ITEM_CD_DL"]}
                    </p>
                  </div>
                  <div
                    className={`py-1 px-3 rounded-20 ${
                      COLORS[asset["CVaR_LV"]]
                    } `}
                  >
                    <h6 className="text-xs">
                      {router.locale == "ko"
                        ? asset["CVaR_LV_KR"]
                        : asset["CVaR_LV"]}
                    </h6>
                  </div>
                  <Image
                    src={arrow}
                    alt=""
                    className={`ml-3 ${
                      isOpenDetail === i ? "rotate-[270deg] " : "rotate-90 "
                    }`}
                  />
                </article>
                {isOpenDetail === i && (
                  <article
                    className="bg-gray-50 p-4 rounded-[8px] text-sm font-medium"
                    onClick={() => {
                      router.push({
                        pathname: `/detail/${asset["ITEM_CD_DL"]}`,
                      });
                    }}
                  >
                    <div className="flex mb-3">
                      <p className="text-xs text-gray-400 flex-1">
                        {t("tableLoss")}
                      </p>
                      <p className="text-[#DF1525] font-semibold">
                        -{asset["EXP_CVaRNTS"].toFixed(2)}%
                      </p>
                    </div>
                    <div className="flex mb-3">
                      <p className="text-xs text-gray-400 flex-1">
                        {t("tablePrice")}
                      </p>
                      <p className="text-gray-700 font-semibold">
                        {asset["CAT"] == "Index"
                          ? ""
                          : state.currency === "KRW"
                          ? "￦"
                          : "$"}{" "}
                        {state.currency === "KRW"
                          ? asset["ADJ_CLOSE_KRW"].toLocaleString("en-us", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })
                          : asset["ADJ_CLOSE_USD"].toLocaleString("en-us", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                      </p>
                    </div>
                    <div className="flex mb-3">
                      <p className="text-xs text-gray-400 flex-1">
                        {t("tablePriceChange")}
                      </p>
                      <p
                        className={`font-semibold ${
                          asset["ADJ_CLOSE_CHG"] > 0
                            ? "text-[#3CB043]"
                            : "text-[#DF1525]"
                        }`}
                      >
                        {asset["ADJ_CLOSE_CHG"].toFixed(2)}%
                      </p>
                    </div>
                    <div className="flex mb-3 items-center">
                      <p className="text-xs text-gray-400 flex-1">
                        {t("tableRisk")}
                      </p>
                      <MiniChart chartData={JSON.parse(asset["CHART"])} />
                    </div>
                    <div className="flex items-center">
                      <p className="text-xs text-gray-400 flex-1">
                        {t("tableWeather")}
                      </p>
                      <Image
                        src={`/images/weather/${asset["WTHR_ENG_NM"]}.svg`}
                        width={0}
                        height={0}
                        alt=""
                        className="w-6 h-6"
                      />
                      <p className="text-xs text-gray-600 ml-2">
                        {router.locale == "ko"
                          ? asset["WTHR_KR_DL"]
                          : asset["WTHR_ENG_DL"]}
                      </p>
                    </div>
                  </article>
                )}
              </section>
            ))
          )}
        </div>
        <Pagination
          total={rowCount}
          page={state.page}
          setPage={(page) => dispatch({ type: "SET_PAGE", payload: page })}
          views={state.limit}
        />
      </main>
    </main>
  );
};

export default Explore;
