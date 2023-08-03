import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";
import { State, Action } from "contexts/ExploreStateContext";
import {
  KeyboardEventHandler,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";
import { useExploreState } from "contexts/ExploreStateContext";
import useUdtDate from "utils/useFormattedDate";

import {
  EXCHAGNES,
  LOCATIONS,
  RISKS,
  SECTROS,
  TYPES,
  VIEWS,
  WEATHERS,
  CURRENCIES,
  EXPLORES,
} from "datas/explore";
import searchIcon from "assets/icons/header/mobileSearch.svg";
import Select from "components/templates/explore/Top/Select";
import { useTranslation } from "next-i18next";
import icon from "assets/icons/explore/icon.svg";
import Items from "components/templates/explore/Main/Items";
import Pagination from "components/organisms/Pagination";

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
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );
  const assetList = data ? [].concat(...data[0].assets) : [];
  const rowCount = data ? data[1].rowCount : 0;

  useEffect(() => {
    dispatch({
      type: "SET_CURRENCY",
      payload: router.locale === "ko" ? "KRW" : "USD",
    });
    // if (router?.query?.type && router?.query?.type === "Crypto") {
    //   dispatch({ type: "SET_TYPE", payload: router.query.type });
    // } else if (
    //   router?.query?.type &&
    //   LOCATIONS.some((location) => location.title === router.query.type)
    // ) {
    //   //@ts-ignore
    //   dispatch({ type: "SET_LOC", payload: router.query.type });
    // } else if (
    //   router?.query?.type &&
    //   RISKS.some((risk) => risk.title === router.query.type)
    // ) {
    //   //@ts-ignore
    //   dispatch({ type: "SET_RISK_LV", payload: router.query.type });
    // }
  }, [router.locale]);

  const udtDate = useUdtDate(assetList, isValidating);

  const [isMounted, setIsMounted] = useState(false);

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

  const handleChange = useCallback(
    (type: Action["type"]) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let value: string | number = e.target.value;
        if (type === "SET_LIMIT") {
          value = parseInt(value);
        } else if (type === "SET_SEARCH" && value.length > 20) {
          return;
        }

        if (type !== "RESET_VALUE") {
          //@ts-ignore
          dispatch({ type, payload: value });
        }
      },
    [dispatch]
  );

  const onSearch = handleChange("SET_SEARCH");
  const rowHandler = handleChange("SET_LIMIT");
  const weatherHandler = handleChange("SET_WEATHER");
  const locHandler = handleChange("SET_LOC");
  const exchgHandler = handleChange("SET_EXCHG");
  const sectHandler = handleChange("SET_SECT");
  const currencyHandler = handleChange("SET_CURRENCY");
  const resetHandler = () => {
    dispatch({ type: "RESET_VALUE" });
    router.push("/explore");
  };

  const priceOrderHandler = () => {
    if (state.priceOrder === "priceDesc") {
      dispatch({ type: "SET_PRICE_ORDER", payload: "priceAsc" });
      dispatch({ type: "SET_LOSS_ORDER", payload: "neutral" });
      dispatch({ type: "SET_PRICE_CHG_ORDER", payload: "neutral" });
    } else {
      dispatch({ type: "SET_PRICE_ORDER", payload: "priceDesc" });
      dispatch({ type: "SET_LOSS_ORDER", payload: "neutral" });
      dispatch({ type: "SET_PRICE_CHG_ORDER", payload: "neutral" });
    }
  };

  const lossOrderHandler = () => {
    if (state.lossOrder === "lossDesc") {
      dispatch({ type: "SET_LOSS_ORDER", payload: "lossAsc" });
      dispatch({ type: "SET_PRICE_ORDER", payload: "neutral" });
      dispatch({ type: "SET_PRICE_CHG_ORDER", payload: "neutral" });
    } else {
      dispatch({ type: "SET_LOSS_ORDER", payload: "lossDesc" });
      dispatch({ type: "SET_PRICE_ORDER", payload: "neutral" });
      dispatch({ type: "SET_PRICE_CHG_ORDER", payload: "neutral" });
    }
  };

  const priceChgOrderHandler = () => {
    if (state.priceChgOrder === "priceChgDesc") {
      dispatch({ type: "SET_PRICE_CHG_ORDER", payload: "priceChgAsc" });
      dispatch({ type: "SET_PRICE_ORDER", payload: "neutral" });
      dispatch({ type: "SET_LOSS_ORDER", payload: "neutral" });
    } else {
      dispatch({ type: "SET_PRICE_CHG_ORDER", payload: "priceChgDesc" });
      dispatch({ type: "SET_PRICE_ORDER", payload: "neutral" });
      dispatch({ type: "SET_LOSS_ORDER", payload: "neutral" });
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (assetList.length >= 1) {
        const firstItem = assetList[0];
        router.push({ pathname: `/detail/${firstItem["ITEM_CD_DL"]}` });
      }
    }
  };

  return (
    <main className="px-5 my-5 min-w-[1024px] overflow-auto">
      <div className="max-w-1320  mx-auto rounded-20 py-8 bg-white">
        <div className="flex justify-between">
          <h1 className="ml-8 text-[28px] text-[#111111] mb-10">
            {t("headerTitle")}
          </h1>
          <p className="mr-8 text-sm text-gray-400 mb-10">
            {assetList.length > 0 && !isValidating ? udtDate : ""}
          </p>
        </div>
        {/* Top */}
        <main className="max-w-1320 min-w-[1024px] overflow-auto">
          <section className="ml-8 border-b border-gray-100 pb-6 flex justify-between mr-12 lg:mr-8 ">
            <article className="flex gap-4 items-center">
              <h6 className="text-xs lg:text-sm text-[#111111] truncate">
                {t("typeTitle")}
              </h6>
              <ul className="flex gap-[10px]">
                {TYPES.map(({ id, title, koreanTitle }) => (
                  <li
                    key={id}
                    className={`truncate rounded-20 border px-3.5 py-1.5 text-center cursor-pointer max-h-[32px] hover:text-[#6B7280] hover:bg-[#F3F4F6] ${
                      state.type == title
                        ? "border-[#E6F5FF] bg-[#E6F5FF]"
                        : "border-gray-200"
                    }`}
                    onClick={() => {
                      dispatch({ type: "SET_TYPE", payload: title });
                      dispatch({ type: "SET_LOC", payload: "All" });
                      dispatch({ type: "SET_EXCHG", payload: "All" });
                      dispatch({ type: "SET_SECT", payload: "All" });
                    }}
                  >
                    <h6
                      className={`lg:text-sm text-[10px]   ${
                        state.type == title ? "text-[#0198FF]" : "text-gray-500"
                      }`}
                    >
                      {router.locale === "ko" ? koreanTitle : title}
                    </h6>
                  </li>
                ))}
              </ul>
            </article>
            <article className="flex gap-4 items-center">
              <h6 className="text-xs lg:text-sm text-[#111111] truncate">
                {t("risklevelTitle")}
              </h6>
              <ul className="flex gap-[10px]">
                {RISKS.map(({ id, title, koreanTitle }) => (
                  <li
                    key={id}
                    className={`text-sm truncate rounded-20 border px-3.5 py-1.5 text-center cursor-pointer max-h-[32px] hover:bg-[#F3F4F6] ${
                      state.riskLv === title
                        ? "border-[#E6F5FF] bg-[#E6F5FF]"
                        : "border-gray-200"
                    }`}
                    onClick={() => {
                      dispatch({ type: "SET_RISK_LV", payload: title });
                    }}
                  >
                    <h6
                      className={`lg:text-sm text-[10px]  ${
                        state.riskLv === title
                          ? "text-[#0198FF]"
                          : "text-gray-500"
                      }`}
                    >
                      {router.locale === "ko" ? koreanTitle : title}
                    </h6>
                  </li>
                ))}
              </ul>
            </article>

            <Select
              defaultData={state.weather}
              data={WEATHERS}
              title={"Weather"}
              koreanTitle={"날씨"}
              selectHandler={weatherHandler}
            />
          </section>
          <section className=" ml-8 border-b border-gray-100 py-6 flex justify-between mr-12 ">
            <Select
              type={state.type}
              defaultData={state.loc}
              data={LOCATIONS}
              title={"Location"}
              koreanTitle={"국가"}
              selectHandler={locHandler}
            />
            <Select
              type={state.type}
              defaultData={state.exchg}
              data={EXCHAGNES}
              title={"Exchange"}
              koreanTitle={"거래소"}
              selectHandler={exchgHandler}
            />
            <Select
              type={state.type}
              defaultData={state.sect}
              data={SECTROS}
              title={"Sector"}
              koreanTitle={"분야"}
              selectHandler={sectHandler}
            />
          </section>
          <section className="ml-8 py-6 flex gap-10 ">
            <article className="w-80 py-2.5 px-4 flex relative items-center border border-solid border-gray-200 rounded-20 hover:border-[#4B5563]">
              <Image src={searchIcon} alt="search" className="mr-2 w-4 h-4" />
              <input
                placeholder={`${t("searchName")}`}
                className="outline-none text-sm h-[18px] w-full"
                value={state.search}
                onChange={onSearch}
                onKeyDown={handleKeyDown}
              />
            </article>
            <Select
              defaultData={state.limit}
              data={VIEWS}
              title={"Views"}
              koreanTitle={"표시"}
              selectHandler={rowHandler}
            />
            <Select
              defaultData={state.currency}
              data={CURRENCIES}
              title={"Currency"}
              koreanTitle={"통화"}
              selectHandler={currencyHandler}
            />

            <button onClick={resetHandler}>
              <p className="text-[#0198ff] underline text-sm hover:bg-[#0085E6] disabled:bg-[#D1D5DB]">
                {t("allReset")}
              </p>
            </button>
          </section>
        </main>

        {/* Main Table */}
        <div className="border-t-[5px] border-gray-100" />
        <main className="mb-7">
          <div className="max-w-1320 w-full mx-auto bg-white rounded-20 overflow-hidden">
            <table className="w-full">
              <colgroup>
                <col width="25%" />
                <col width="9%" />
                <col width="12%" />
                <col width="13%" />
                <col width="11%" />
                <col width="11%" />
                <col width="15%" />
                <col width="4%" />
              </colgroup>
              <thead className="border-gray-200 border-b-[1px]">
                <tr className="text-[14px] text-gray-600 h-11">
                  <th className="text-left pl-8">{t("tableName")}</th>
                  <th>{t("tableRisk")}</th>
                  <th>
                    <div className="flex justify-center">
                      <p>{t("tableLoss")}</p>
                      <Image
                        src={icon}
                        onClick={lossOrderHandler}
                        alt=""
                        className="ml-1.5 cursor-pointer"
                      />
                    </div>
                  </th>
                  <th>
                    <div className="flex justify-center">
                      {t("tablePrice")}
                      <Image
                        src={icon}
                        onClick={priceOrderHandler}
                        alt=""
                        className="ml-1.5 cursor-pointer"
                      />
                    </div>
                  </th>
                  <th>
                    <div className="flex justify-center">
                      {t("tablePriceChange")}
                      <Image
                        src={icon}
                        alt=""
                        onClick={priceChgOrderHandler}
                        className="ml-1.5 cursor-pointer"
                      />
                    </div>
                  </th>
                  <th>{t("tableChart")}</th>
                  <th>{t("tableWeather")}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {/* Loading spinner */}
                {isValidating && !data && (
                  <tr className={" "}>
                    <td></td>
                    <td></td>
                    <td></td>

                    <td role="status" className={"py-20 justify-center "}>
                      <svg
                        aria-hidden="true"
                        className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-400"
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
                {assetList.map((asset, i) => (
                  <Items
                    exchg={asset["HR_ITEM_NM"]}
                    krName={asset["ITEM_KR_NM"]}
                    riskDescriptionKr={asset["LV_DSCP_KR"]}
                    riskDescriptionEn={asset["LV_DSCP_ENG"]}
                    curr={state.currency}
                    cat={asset["CAT"]}
                    koreanRiskLevel={asset["CVaR_LV_KR"]}
                    koreanWeatherExplain={asset["WTHR_KR_DL"]}
                    name={asset["ITEM_ENG_NM"]}
                    priceChg={asset["ADJ_CLOSE_CHG"]}
                    ticker={asset["ITEM_CD_DL"]}
                    key={i}
                    riskLevel={asset["CVaR_LV"]}
                    maxLoss={asset["CVaRNTS"]}
                    EXP_CVaRNTS={asset["EXP_CVaRNTS"]}
                    price={
                      state.currency === "KRW"
                        ? asset["ADJ_CLOSE_KRW"]
                        : asset["ADJ_CLOSE_USD"]
                    }
                    usdPrice={asset["ADJ_CLOSE_USD"]}
                    currency={asset["CURR"]}
                    priceChange={""}
                    chartData={JSON.parse(asset["CHART"])}
                    weather={asset["WTHR_ENG_NM"]}
                    weatherExplain={asset["WTHR_ENG_DL"]}
                    loc={asset["LOC"]}
                  />
                ))}
              </tbody>
            </table>
            <Pagination
              total={rowCount}
              page={state.page}
              setPage={(page) => dispatch({ type: "SET_PAGE", payload: page })}
              views={state.limit}
            />
          </div>
        </main>
      </div>
    </main>
  );
};

export default Explore;
