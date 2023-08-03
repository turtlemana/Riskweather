import { Dispatch, SetStateAction, useState, useEffect } from "react";
import Image from "next/image";
import back from "assets/icons/portfolio/back.svg";

import close from "assets/icons/contact/close.svg";
import checkbox from "assets/icons/portfolio/checkbox.svg";
import blueCheckbox from "assets/icons/portfolio/blueCheckbox.svg";
import searchIcon from "assets/icons/header/mobileSearch.svg";
import { COLORS } from "datas/main";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useUdtDate from "utils/useFormattedDate";
import useHandleImageError from "utils/useHandleImageError";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";
import {
  UserInfo,
  SearchList,
  SelectAsset,
  UserPortfolio,
} from "interfaces/portfolio";
import { Session } from "interfaces/login";
import Pagination from "components/organisms/Pagination";

interface Props {
  setIsOpenAddModal: Dispatch<SetStateAction<boolean>>;
  userProfile: UserInfo;
  isValidating: boolean;
  mutate: () => void;
  search: string | undefined;
  setSearch: Dispatch<SetStateAction<string>>;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchList: SearchList[];
  searchValid: boolean;
  session: Session;
  currencySelect?: number;
  rowCount: number;
  page: number;
  limit: number;
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
}

const AddAssets = ({
  page,
  limit,
  setPage,
  setLimit,
  rowCount,
  currencySelect,
  session,
  setIsOpenAddModal,
  userProfile,
  isValidating,
  mutate,
  search,
  setSearch,
  onSearch,
  searchList,
  searchValid,
}: Props) => {
  const [selectIndex, setSelectIndex] = useState<SelectAsset[]>([]);
  const [addAsset, setAddAsset] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("portfolio");
  const currentDate = useUdtDate(new Date().toISOString(), false, true);

  const [isLoading, setIsLoading] = useState(false);

  const udtDate = useUdtDate(searchList, isValidating);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleSelect = ({ name, ticker, quantity, krName }: SelectAsset) => {
    if (selectIndex.some((asset) => asset["ticker"] == ticker)) {
      const filtered = selectIndex.filter((asset) => asset.ticker !== ticker);
      return setSelectIndex(filtered);
    }

    if (
      userProfile?.portfolio &&
      userProfile?.portfolio.some(
        (asset: UserPortfolio) => asset["ticker"] == ticker
      )
    ) {
      toast(
        router.locale == "ko"
          ? "포트폴리오에 이미 포함된 자산입니다"
          : "You already have the asset on your portfolio",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }

    if (
      userProfile?.portfolio &&
      userProfile?.portfolio.length + selectIndex.length >= 10
    ) {
      toast(
        router.locale == "ko"
          ? "10개 초과의 자산을 추가하실 수 없습니다"
          : "You can't add more than 10 assets",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }

    if (selectIndex.length >= 10) {
      toast(
        router.locale == "ko"
          ? "10개 초과의 자산을 추가하실 수 없습니다"
          : "You can't add more than 10 assets",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }
    return setSelectIndex([...selectIndex, { name, ticker, quantity, krName }]);
  };

  const handleClose = () => {
    setIsOpenAddModal(false);
    setSearch("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
    ticker: string
  ) => {
    const value = Number(e.target.value);
    if (value < 0 || value > 100000) return;

    const newSelectIndex = selectIndex.map((item) => {
      if (item.ticker === ticker) {
        return { ...item, quantity: value };
      }
      return item;
    });

    setSelectIndex(newSelectIndex);
  };

  const submitHandler = async () => {
    if (selectIndex.some((asset) => asset["quantity"] <= 0)) {
      toast(
        router.locale == "ko"
          ? "최소 1개 이상의 자산을 추가하여야 합니다"
          : "your asset should be more than 0",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }
    let enteredInput = {};
    if (userProfile?.portfolio && userProfile?.portfolio.length > 9) {
      toast(
        router.locale == "ko"
          ? "10개 초과의 자산을 추가하실 수 없습니다"
          : "Your assets are limited to 10",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }
    if (
      userProfile?.portfolio &&
      userProfile?.portfolio.length + selectIndex.length > 10
    ) {
      toast(
        router.locale == "ko"
          ? "10개 초과의 자산을 추가하실 수 없습니다"
          : "You can't add more than 10 assets",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }

    setIsLoading(true);

    let tickers = "";
    let shares = "";
    if (userProfile?.portfolio) {
      for (let i = 0; i < userProfile?.portfolio.length; i++) {
        tickers += encodeURIComponent(userProfile?.portfolio[i].ticker);
        shares += encodeURIComponent(userProfile?.portfolio[i].quantity);

        if (i !== userProfile?.portfolio.length - 1) {
          tickers += "%2C";
          shares += "%2C";
        }
      }
    }

    for (let i = 0; i < selectIndex.length; i++) {
      if (i == 0 && tickers.length > 0 && shares.length > 0) {
        tickers += "%2C";
        shares += "%2C";
      }
      tickers += encodeURIComponent(selectIndex[i].ticker);
      shares += encodeURIComponent(selectIndex[i].quantity);

      if (i !== selectIndex.length - 1) {
        tickers += "%2C";
        shares += "%2C";
      }
    }

    const fetchAddress = `https://riskweather.io/rapi/portfolio?ticker=${tickers}&shares=${shares}`;

    try {
      const response = await fetch(fetchAddress);
      const result = await response.json();
      setIsLoading(false);

      if (userProfile?.portfolio) {
        enteredInput = {
          portfolio: [...userProfile?.portfolio, ...selectIndex],
          portfolioResult: result.result.portfolio_risk[0] * 100,
          portfolioLevel: result.result.portfolio_risk_ranked[0],
          portfolioTime: currentDate,
        };
      } else {
        enteredInput = {
          portfolio: selectIndex,
          portfolioResult: result.result.portfolio_risk[0] * 100,
          portfolioLevel: result.result.portfolio_risk_ranked[0],
          portfolioTime: currentDate,
        };
      }

      const data = await fetch(`/api/auth/user?session=${session.user.email}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ enteredInput }),
      }).then((res) => {
        if (res.ok) {
          setSearch("");
          setIsOpenAddModal(false);
          toast(
            router.locale == "ko"
              ? "포트폴리오에 성공적으로 자산이 추가됐습니다"
              : "Successfully added assets to your portfolio",
            { hideProgressBar: true, autoClose: 2000, type: "success" }
          );
          mutate();
        } else {
          toast(
            router.locale == "ko"
              ? "네트워크 에러가 발생했습니다"
              : "Fetch Error",
            { hideProgressBar: true, autoClose: 2000, type: "error" }
          );
        }
      });

      toast(
        router.locale == "ko"
          ? "리스크 계산이 완료됐습니다"
          : "Calculation completed!",
        {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        }
      );
    } catch (err) {
      setIsLoading(false);

      toast(
        router.locale == "ko" ? "리스크 계산에 실패했습니다" : "Fetch Error",
        {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        }
      );
    }
  };

  const handleImageError = useHandleImageError();

  const handleWeatherImageError = useHandleWeatherImageError();

  return !addAsset ? (
    <main className="z-20 shadow-lg absolute text-center text-[#111111] bg-white px-8 pt-8 pb-3 rounded-20 top-1/2 left-1/2 translate-x-half translate-y-half border min-w-[820px]  max-w-[1018px] w-full">
      <header className="flex mb-5 ">
        <section className="flex-1 flex items-center">
          <article className="w-[272px] relative mr-4 h-10 py-2.5 px-4 flex items-center border border-solid border-gray-200 rounded-20 hover:border-[#4B5563]">
            <Image src={searchIcon} alt="search" className="mr-2 w-4 h-4" />

            <input
              placeholder={
                router.locale == "ko" ? "자산의 이름을 검색하세요" : "Search"
              }
              className="outline-none laptop:text-sm w-full"
              value={search}
              onChange={onSearch}
            />
          </article>
          {userProfile?.portfolio ? (
            userProfile?.portfolio.length + selectIndex.length >= 2 &&
            selectIndex.length > 0 ? (
              <button
                onClick={() => {
                  setAddAsset(true);
                }}
                className="bg-[#0198FF] h-10 py-2.5 px-5 rounded-[60px] text-white text-sm hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
              >
                <h1 className={"lg:text-sm text-xs"}>{t("assetAdd")}</h1>
              </button>
            ) : (
              <button
                disabled
                onClick={() => {
                  setAddAsset(true);
                }}
                className="bg-[#0198FF] h-10 py-2.5 px-5 rounded-[60px] text-white text-sm hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
              >
                <h1 className={"lg:text-sm text-xs"}>{t("assetAdd")}</h1>
              </button>
            )
          ) : selectIndex.length >= 2 ? (
            <button
              onClick={() => {
                setAddAsset(true);
              }}
              className="bg-[#0198FF] h-10 py-2.5 px-5 rounded-[60px] text-white text-sm hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
            >
              <h1 className={"lg:text-sm text-xs"}>{t("assetAdd")}</h1>
            </button>
          ) : (
            <button
              disabled
              onClick={() => {
                setAddAsset(true);
              }}
              className="bg-[#0198FF] h-10 py-2.5 px-5 rounded-[60px] text-white text-sm hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
            >
              <h1 className={"lg:text-sm text-xs"}>{t("assetAdd")}</h1>
            </button>
          )}
          {userProfile?.portfolio ? (
            <p className={"font-medium text-gray-400 ml-10"}>
              {userProfile?.portfolio?.length + selectIndex.length}/10
            </p>
          ) : (
            <p className={"font-medium text-gray-400 ml-5"}>
              {selectIndex.length}/10
            </p>
          )}
          {!userProfile?.portfolio && selectIndex.length < 2 ? (
            <p className={" text-red-500 ml-5 lg:ml-10 lg:text-sm text-xs"}>
              {router.locale == "ko"
                ? "자산을 2개 이상 선택해주시길 바랍니다"
                : "Select at least 2 assets to build your portfolio"}
            </p>
          ) : (
            <p className={"font-medium text-gray-400 ml-5"}></p>
          )}
          {userProfile?.portfolio &&
          userProfile?.portfolio?.length + selectIndex?.length < 2 ? (
            <p className={"text-red-500 ml-5 lg:ml-10 lg:text-sm text-xs"}>
              {router.locale == "ko"
                ? "자산을 2개 이상 선택해주시길 바랍니다"
                : "Select at least 2 assets to build your portfolio"}
            </p>
          ) : (
            <p className={"font-medium text-gray-400 ml-5"}></p>
          )}
        </section>

        <Image
          src={close}
          alt=""
          className="cursor-pointer"
          onClick={handleClose}
        />
      </header>
      <section className="flex items-center border-gray-200 border-b py-2 text-sm text-gray-600 font-medium gap-3 ">
        {/* <Image src={checkbox} alt="" className="mr-5" /> */}
        <p className="text-left w-[217px] mr-11">{t("tableName")}</p>
        <p className="w-[83px] ml-8 mr-11">{t("tableRisk")}</p>
        <p className="w-[124px] mr-11">{t("tableLoss")}</p>
        <p className="w-[140px] mr-11">{t("tablePrice")}</p>
        <p className="w-[174px]">{t("tableWeather")}</p>
      </section>
      {!searchValid ? (
        <section className="overflow-auto h-full customScrollBar ">
          {searchList.map(
            (
              {
                EXP_CVaRNTS,
                ADJ_CLOSE_KRW,
                HR_ITEM_NM,
                LOC,
                LV_DSCP_KR,
                LV_DSCP_ENG,
                ITEM_ENG_NM,
                ITEM_KR_NM,
                ITEM_CD_DL,
                CVaR_LV,
                CVaRNTS,
                ADJ_CLOSE,
                WTHR_ENG_NM,
                WTHR_ENG_DL,
                ADJ_CLOSE_USD,
                WTHR_KR_DL,
                CVaR_LV_KR,
              }: SearchList,
              i: number
            ) => (
              <article
                key={i}
                className="border-b border-gray-100 flex py-3 items-center "
              >
                {selectIndex.some((asset) => asset["ticker"] == ITEM_CD_DL) ? (
                  <Image
                    src={blueCheckbox}
                    alt=""
                    className="mr-5 cursor-pointer"
                    onClick={() =>
                      handleSelect({
                        name: encodeURIComponent(ITEM_ENG_NM),
                        ticker: encodeURIComponent(ITEM_CD_DL),
                        quantity: 0,
                        krName: encodeURIComponent(ITEM_KR_NM),
                      })
                    }
                  />
                ) : (
                  <Image
                    src={checkbox}
                    alt=""
                    className="mr-5 cursor-pointer"
                    onClick={() =>
                      handleSelect({
                        name: encodeURIComponent(ITEM_ENG_NM),
                        ticker: encodeURIComponent(ITEM_CD_DL),
                        quantity: 0,
                        krName: encodeURIComponent(ITEM_KR_NM),
                      })
                    }
                  />
                )}
                <div className="flex items-center w-[217px] mr-11">
                  <Image
                    loading="eager"
                    unoptimized
                    width={10}
                    height={10}
                    quality={100}
                    onError={(event) => handleImageError(event, HR_ITEM_NM)}
                    src={`/images/logos/${ITEM_CD_DL}.png` || ""}
                    alt=""
                    className="h-10 w-10 mr-3 "
                  />{" "}
                  <div>
                    <h6
                      className="text-md w-[150px] truncate"
                      title={router.locale == "ko" ? ITEM_KR_NM : ITEM_ENG_NM}
                    >
                      {router.locale == "ko" ? ITEM_KR_NM : ITEM_ENG_NM}
                    </h6>
                    <p className="text-gray-500 text-xs">{ITEM_CD_DL}</p>
                  </div>
                </div>
                <div
                  data-tooltip-id="riskLevel"
                  data-tooltip-content={
                    router.locale == "ko" ? LV_DSCP_KR : LV_DSCP_ENG
                  }
                  className={`py-1 px-3 rounded-20 ${COLORS[CVaR_LV]} w-[83px] mr-11`}
                >
                  <h6 className="text-xs">
                    {router.locale == "ko" ? CVaR_LV_KR : CVaR_LV}
                  </h6>
                </div>
                <div className="text-center text-[#DF1525] w-[124px] mr-11 font-bold">
                  -
                  {EXP_CVaRNTS.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  %
                </div>
                <div className="text-center w-[140px] mr-11 text-[#111111] font-medium lg:text-md text-sm">
                  <p>
                    {currencySelect === 1 ? "￦" : "$"}{" "}
                    {currencySelect === 1
                      ? ADJ_CLOSE_KRW.toLocaleString("en-us", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                      : ADJ_CLOSE_USD?.toLocaleString("en-us", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </p>

                  {/* {LOC=="Korea (South)"&&router.locale=="ko" ? "￦" : "$"}{" "}{LOC=="Korea (South)"&&router.locale=="ko" ? ADJ_CLOSE.toLocaleString('en-us') :ADJ_CLOSE_USD?.toLocaleString('en-us',{minimumFractionDigits: 2, maximumFractionDigits: 2})} */}
                </div>
                <div className="rounded-20 bg-gray-100 py-[2px] pl-3 pr-6 w-[174px] mx-auto flex items-center justify-between ">
                  <Image
                    src={`/images/weather/${WTHR_ENG_NM}.svg`}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <p className="text-xs text-gray-600 font-medium">
                    {router.locale == "ko" ? WTHR_KR_DL : WTHR_ENG_DL}
                  </p>
                </div>
              </article>
            )
          )}

          <Pagination
            total={rowCount}
            page={page}
            setPage={setPage}
            views={limit}
          />
          <p className="text-xs text-[#6B7280] text-end ">
            {" "}
            {searchList.length > 0 && !isValidating ? udtDate : ""}
          </p>
        </section>
      ) : (
        <div className={"flex flex-col items-center"}>
          <svg
            aria-hidden="true"
            className="my-20 w-12 h-12  relative  text-gray-200 animate-spin dark:text-gray-600 fill-blue-400"
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
    </main>
  ) : (
    <main className="z-20 shadow-lg flex justify-center absolute text-center text-[#111111] bg-white p-6 w-full   rounded-20 top-1/2 left-1/2 translate-x-half translate-y-half border max-w-[565px] ">
      {isLoading ? (
        <div className={"flex flex-col items-center"}>
          <h1 className={"mb-10 font-semibold"}>{t("resultCalculating")}</h1>
          <svg
            aria-hidden="true"
            className="w-12 h-12  relative  text-gray-200 animate-spin dark:text-gray-600 fill-blue-400"
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
        <div>
          <header className="flex mb-8">
            <section className="flex-1 flex">
              <Image
                src={back}
                alt=""
                className="cursor-pointer mr-4"
                onClick={() => setAddAsset(false)}
              />
              <button
                className="flex items-center bg-gray-500 h-10 py-2.5 px-5 rounded-[60px] mr-2 text-white font-medium"
                onClick={() => setIsOpenAddModal(false)}
              >
                {t("EditAssetsCancel")}
              </button>
              <button
                className="flex items-center bg-[#0198FF] h-10 py-2.5 px-5 rounded-[60px] text-white font-medium hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
                onClick={submitHandler}
              >
                <h1>{t("EditAssetsSave")}</h1>
              </button>
            </section>
            <Image
              src={close}
              alt=""
              className="cursor-pointer"
              onClick={() => setIsOpenAddModal(false)}
            />
          </header>
          <section className="flex items-center border-gray-200 border-b">
            <p className="text-sm text-gray-600 font-medium text-left w-[217px]">
              {t("EditAssetsName")}
            </p>
            <p className="text-sm text-gray-600 font-medium text-left w-[200px] mr-11">
              {t("EditAssetsQty")}
            </p>
          </section>
          <section className="overflow-auto h-[260px] customScrollBar">
            {selectIndex.map(({ name, ticker, quantity, krName }, i) => (
              <article className="flex items-center py-3" key={i}>
                <div className="w-[217px] flex">
                  <Image
                    loading="eager"
                    unoptimized
                    width={50}
                    height={50}
                    quality={100}
                    onError={handleWeatherImageError}
                    src={`/images/logos/${ticker}.png` || ""}
                    alt=""
                    className="h-10 w-10 mr-3 "
                  />{" "}
                  <div>
                    <h6
                      className="mb-1 w-[130px] truncate"
                      title={
                        router.locale == "ko"
                          ? decodeURIComponent(krName)
                          : decodeURIComponent(name)
                      }
                    >
                      {router.locale == "ko"
                        ? decodeURIComponent(krName)
                        : decodeURIComponent(name)}
                    </h6>
                    <p className="text-gray-500 text-xs">
                      {decodeURIComponent(ticker)}
                    </p>
                  </div>
                </div>
                <input
                  className="border w-[200px] py-2.5 px-3 rounded-20 max-h-10 text-sm text-[#111111] focus:border-[#4B5563] outline-none"
                  placeholder={router.locale === "ko" ? "수량" : "quantity"}
                  value={quantity.toString()}
                  type="number"
                  min="0"
                  onChange={(e) => {
                    handleChange(e, name, ticker);
                  }}
                />
              </article>
            ))}
          </section>
        </div>
      )}
    </main>
  );
};

export default AddAssets;
