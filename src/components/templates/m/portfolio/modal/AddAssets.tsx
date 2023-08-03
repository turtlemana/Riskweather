import { Dispatch, SetStateAction, useState, useEffect } from "react";
import Image from "next/image";

import close from "assets/icons/contact/close.svg";
import checkbox from "assets/icons/portfolio/checkbox.svg";
import blueCheckbox from "assets/icons/portfolio/blueCheckbox.svg";
import searchIcon from "assets/icons/header/mobileSearch.svg";
import arrow from "assets/icons/explore/rightArrow.svg";
import { COLORS } from "datas/main";
import back from "assets/icons/portfolio/back.svg";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Pagination from "components/organisms/m/Pagination";
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
  rowCount: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  session: Session;
  currencySelect?: number;
}

const AddAssets = ({
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
  rowCount,
  page,
  setPage,
  limit,
  setLimit,
}: Props) => {
  const [selectIndex, setSelectIndex] = useState<SelectAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [addAsset, setAddAsset] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("portfolio");
  const [isOpenDetail, setIsOpenDetail] = useState(-1);

  const udtDate = useUdtDate(searchList, isValidating);
  const currentDate = useUdtDate(new Date().toISOString(), false, true);

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

  const sessionUpdate = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
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

  useEffect(() => {
    setPage(1);
  }, [search]);

  const submitHandler = async () => {
    if (selectIndex.some((asset) => asset["quantity"] <= 0)) {
      toast(
        router.locale == "ko"
          ? "최소 1개 이상의 자산을 추가해야 합니다"
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
        router.locale == "ko" ? "네트워크 에러가 발생했습니다" : "Fetch Error",
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
    <main className="z-30 fixed text-center bg-white border w-full h-full top-0 overflow-auto customScrollBar">
      <header className="relative flex justify-center py-[14px] border-b border-gray-100">
        <h6>{t("assetAdd")}</h6>
        <Image
          src={close}
          alt=""
          className="cursor-pointer absolute right-5"
          onClick={handleClose}
        />
      </header>
      <p className="text-sm text-[#6B7280] text-end mr-5 mt-2">
        {" "}
        {searchList.length > 0 && !isValidating ? udtDate : ""}
      </p>

      <section className="mx-5 mt-5 mb-6 h-10 py-2.5 px-4 flex items-center border border-solid border-gray-200 rounded-20 hover:border-[#4B5563]">
        {/* <Image src={search} alt="search" className="mr-2 w-4" /> */}
        <Image
          loading="eager"
          src={searchIcon}
          alt="search"
          className="mr-2 w-4 h-4"
        />

        <input
          placeholder={
            router.locale == "ko" ? "자산의 이름을 검색하세요" : "Search"
          }
          className="outline-none text-sm"
          value={search}
          onChange={onSearch}
        />
      </section>
      {!searchValid ? (
        <section className="px-5 mb-5">
          {searchList.map(
            (
              {
                ADJ_CLOSE_KRW,
                HR_ITEM_NM,
                EXP_CVaRNTS,
                LOC,
                ITEM_KR_NM,
                ITEM_ENG_NM,
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
              <div key={i}>
                <article className="border-b border-gray-100 flex py-3 items-center justify-between">
                  {selectIndex.some(
                    (asset) => asset["ticker"] == ITEM_CD_DL
                  ) ? (
                    <Image
                      src={blueCheckbox}
                      alt=""
                      className="mr-3 cursor-pointer"
                      onTouchStart={() =>
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
                      className="mr-3 cursor-pointer"
                      onTouchStart={() =>
                        handleSelect({
                          name: encodeURIComponent(ITEM_ENG_NM),
                          ticker: encodeURIComponent(ITEM_CD_DL),
                          quantity: 0,
                          krName: encodeURIComponent(ITEM_KR_NM),
                        })
                      }
                    />
                  )}
                  <div className="flex items-center flex-1">
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
                    />
                    <div>
                      <h6 className={"truncate w-[130px]"}>
                        {router.locale == "ko" ? ITEM_KR_NM : ITEM_ENG_NM}
                      </h6>
                      <p className="text-gray-500 text-xs">{ITEM_CD_DL}</p>
                    </div>
                  </div>
                  <div
                    className={`py-1 px-3 rounded-20 ${COLORS[CVaR_LV]} mr-3`}
                  >
                    <h6 className="text-xs">
                      {router.locale == "ko" ? CVaR_LV_KR : CVaR_LV}
                    </h6>
                  </div>
                  <Image
                    src={arrow}
                    alt=""
                    className={`cursor-pointer ${
                      isOpenDetail === i ? "rotate-[270deg] " : "rotate-90 "
                    }`}
                    onClick={() => setIsOpenDetail(i === isOpenDetail ? -1 : i)}
                  />
                </article>
                {isOpenDetail === i && (
                  <article className="bg-gray-50 p-4 rounded-[8px] text-sm font-medium text-gray-700 text-left">
                    <div className="flex mb-3">
                      <p className="text-xs text-gray-400  flex-1">
                        {t("tableLoss")}
                      </p>
                      <p className={"font-semibold text-[#DF1525]"}>
                        -{EXP_CVaRNTS.toFixed(2)}%
                      </p>
                    </div>
                    <div className="flex mb-3">
                      <p className="text-xs text-gray-400 flex-1">
                        {t("tablePrice")}
                      </p>
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
                    </div>
                    <div className="flex items-center">
                      <p className="text-xs text-gray-400 flex-1">
                        {t("tableWeather")}
                      </p>
                      <Image
                        src={`/images/weather/${WTHR_ENG_NM}.svg`}
                        className={"h-6 w-auto"}
                        width={0}
                        height={0}
                        alt=""
                      />

                      <p className="text-xs text-gray-600 mt-1">
                        {router.locale == "ko" ? WTHR_KR_DL : WTHR_ENG_DL}
                      </p>
                    </div>
                  </article>
                )}
              </div>
            )
          )}
          <Pagination
            total={rowCount}
            page={page}
            setPage={setPage}
            views={limit}
          />
        </section>
      ) : (
        <div className={"z-30 flex flex-col items-center"}>
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
      {userProfile?.portfolio ? (
        userProfile?.portfolio.length > 0 ? (
          selectIndex.length > 0 &&
          userProfile?.portfolio.length + selectIndex.length >= 1 ? (
            <button
              className="sticky  h-fit bottom-[10px] bg-[#0198ff] text-white py-3 px-10 rounded-[60px] text-[16px] font-bold w-[236px] disabled:bg-gray-400"
              onClick={() => {
                setAddAsset(true);
              }}
            >
              {t("assetFinish")} (
              {userProfile?.portfolio?.length + selectIndex.length})
            </button>
          ) : (
            <div></div>
          )
        ) : //   <button
        //   disabled={true}
        //   className="sticky  h-fit  bottom-[0px] bg-[#0198ff] text-white py-3 px-10 rounded-[60px] text-[16px] font-bold w-[236px] disabled:bg-[#D1D5DB]"
        //   onClick={()=>{setAddAsset(true)}}
        // >
        //   {t('assetFinish')} ({selectIndex.length})
        // </button>
        userProfile?.portfolio.length == 0 && selectIndex.length >= 2 ? (
          <button
            className="sticky  h-fit bottom-[10px] bg-[#0198ff] text-white py-3 px-10 rounded-[60px] text-[16px] font-bold w-[236px] disabled:bg-gray-400"
            onClick={() => {
              setAddAsset(true);
            }}
          >
            {t("assetFinish")} ({selectIndex.length})
          </button>
        ) : userProfile?.portfolio.length == 0 && selectIndex.length == 1 ? (
          <button
            disabled={true}
            className=" sticky  h-fit bottom-[10px] bg-[#0198ff] text-white py-3 px-10 rounded-[60px] text-[16px] font-bold w-[236px] disabled:bg-gray-400"
            onClick={() => {
              toast(
                router.locale == "ko"
                  ? "2개 이상의 자산을 고르세요"
                  : "You should select at least 2 assets",
                { hideProgressBar: true, autoClose: 2000, type: "error" }
              );
            }}
          >
            {t("assetFinish")} ({selectIndex.length})
          </button>
        ) : selectIndex.length >= 2 ? (
          <button
            className="sticky  h-fit bottom-[10px] bg-[#0198ff] text-white py-3 px-10 rounded-[60px] text-[16px] font-bold w-[236px] disabled:bg-gray-400"
            onClick={() => {
              setAddAsset(true);
            }}
          >
            {t("assetFinish")} ({selectIndex.length})
          </button>
        ) : selectIndex.length == 1 ? (
          <button
            disabled={true}
            className=" sticky  h-fit bottom-[10px] bg-[#0198ff] text-white py-3 px-10 rounded-[60px] text-[16px] font-bold w-[236px] disabled:bg-gray-400"
            onClick={() => {
              toast(
                router.locale == "ko"
                  ? "2개 이상의 자산을 고르세요"
                  : "You should select at least 2 assets",
                { hideProgressBar: true, autoClose: 2000, type: "error" }
              );
            }}
          >
            {t("assetFinish")} ({selectIndex.length})
          </button>
        ) : (
          <div></div>
        )
      ) : // <button
      //     disabled={true}
      //     className="sticky  left-1/2 translate-x-half h-fit bottom-[10px] bg-[#0198ff] text-white py-3 px-10 rounded-[60px] text-[16px] font-bold w-[236px] disabled:bg-[#D1D5DB]"
      //     onClick={()=>{setAddAsset(true)}}
      //
      //     {t('assetFinish')} ({selectIndex.length})
      //   </button>
      !userProfile?.portfolio && selectIndex.length >= 2 ? (
        <button
          className="sticky  h-fit bottom-[10px] bg-[#0198ff] text-white py-3 px-10 rounded-[60px] text-[16px] font-bold w-[236px] disabled:bg-gray-400"
          onClick={() => {
            setAddAsset(true);
          }}
        >
          {t("assetFinish")} ({selectIndex.length})
        </button>
      ) : !userProfile?.portfolio && selectIndex.length == 1 ? (
        <button
          disabled={true}
          className=" sticky  h-fit bottom-[10px] bg-[#0198ff] text-white py-3 px-10 rounded-[60px] text-[16px] font-bold w-[236px] disabled:bg-gray-400"
          onClick={() => {
            toast(
              router.locale == "ko"
                ? "2개 이상의 자산을 고르세요"
                : "You should select at least 2 assets",
              { hideProgressBar: true, autoClose: 2000, type: "error" }
            );
          }}
        >
          {t("assetFinish")} ({selectIndex.length})
        </button>
      ) : (
        ""
      )}
      {/* 
      {userProfile?.portfolio ? (userProfile?.portfolio.length + selectIndex.length)>=2 ?
          <button onClick={()=>{setAddAsset(true)}} className="px-[100px] bg-[#0198FF] h-10 py-2.5 rounded-[60px] text-white text-sm hover:bg-[#0085E6] disabled:bg-[#D1D5DB]">
            <h1>{t('assetAdd')}</h1>
          </button>: 
          <button disabled onClick={()=>{setAddAsset(true)}} className="px-[100px] bg-[#0198FF] h-10 py-2.5 rounded-[60px] text-white text-sm hover:bg-[#0085E6] disabled:bg-[#D1D5DB]">
          <h1>{t('assetAdd')}</h1>
        </button> :
         selectIndex.length>=2 ?
        <button onClick={()=>{setAddAsset(true)}} className="px-[100px] bg-[#0198FF] h-10 py-2.5 rounded-[60px] text-white text-sm hover:bg-[#0085E6] disabled:bg-[#D1D5DB]">
        <h1>{t('assetAdd')}</h1>
      </button>: 
      <button disabled onClick={()=>{setAddAsset(true)}} className="px-[100px] bg-[#0198FF] h-10 py-2.5 rounded-[60px] text-white text-sm hover:bg-[#0085E6] disabled:bg-[#D1D5DB]">
      <h1>{t('assetAdd')}</h1>
    </button>
        } */}
    </main>
  ) : (
    <main className="z-30 flex justify-center fixed bg-white p-6 rounded-20 border max-w-[332px] w-full top-1/2 left-1/2 translate-x-half translate-y-half shadow-[0_0_12px_0_rgba(121,120,132,0.15)]">
      {isLoading ? (
        <div className={"z-30 flex flex-col items-center"}>
          <h1 className={"mb-10 font-semibold"}>{t("resultCalculating")}</h1>
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
      ) : (
        <div>
          <header className="flex mb-4 ">
            <section className="flex items-center">
              <Image
                src={back}
                alt=""
                className="cursor-pointer mr-3"
                onClick={() => setAddAsset(false)}
              />
              <button
                className="bg-gray-500 h-10 py-2.5 px-5 rounded-[60px] mr-2 text-white font-medium"
                onClick={() => setIsOpenAddModal(false)}
              >
                <h1 className={"text"}>{t("MobileEditAssetsCancel")}</h1>
              </button>
              <button
                className="bg-[#0198FF] h-10 py-2.5 px-5 rounded-[60px] text-white font-medium hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
                onClick={submitHandler}
              >
                <h1 className={""}>{t("MobileEditAssetsSave")}</h1>
              </button>
              <Image
                src={close}
                alt=""
                className="cursor-pointer ml-10"
                onClick={() => setIsOpenAddModal(false)}
              />
            </section>
          </header>
          {/* <section className="flex items-center border-gray-200 border-b py-3">
  <p className="text-sm text-gray-600 font-medium text-left w-[217px]">
    Name
  </p>
  <p className="text-sm text-gray-600 font-medium text-left w-[200px] mr-11">
    Quantity
  </p>
</section> */}

          <section className="z-30  overflow-auto max-h-[400px] customScrollBar divide-y">
            <div className={"flex mb-2"}>
              <p className="text-gray-500 font-medium text-sm mr-[26px]">
                {router.locale == "ko" ? "이름" : "Name"}
              </p>
              <p className=" text-gray-500 font-medium text-sm ml-[70px]">
                {router.locale == "ko" ? "수량" : "Quantity"}
              </p>
            </div>
            {selectIndex.map(({ name, ticker, quantity, krName }, i) => (
              <article key={i}>
                <div className="flex items-center py-3" key={i}>
                  <div className="flex flex-row">
                    <Image
                      loading="eager"
                      unoptimized
                      width={50}
                      height={50}
                      quality={100}
                      onError={handleWeatherImageError}
                      src={`/images/logos/${ticker}.png` || ""}
                      alt=""
                      className="mr-3 h-6 w-6  "
                    />
                    <div>
                      <h6 className={"text-sm truncate w-[80px]"}>
                        {router.locale == "ko"
                          ? decodeURIComponent(krName)
                          : decodeURIComponent(name)}
                      </h6>
                      <p className="text-gray-500 text-xs">
                        {decodeURIComponent(ticker)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center ml-8">
                    <input
                      className="border w-[150px] py-2.5 px-3 rounded-20 h-10 text-sm focus:border-[#4B5563] outline-none"
                      placeholder={router.locale === "ko" ? "수량" : "quantity"}
                      value={quantity.toString()}
                      type="number"
                      min="0"
                      onChange={(e) => {
                        handleChange(e, name, ticker);
                      }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      )}
    </main>
  );
};

export default AddAssets;
