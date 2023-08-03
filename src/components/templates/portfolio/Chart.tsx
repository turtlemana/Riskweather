import { Dispatch, SetStateAction, useState, useMemo } from "react";
import Image from "next/image";
import AssetChart from "chart/AssetChart";
import emptyChart from "assets/icons/portfolio/emptyChart.svg";
import { PORTCOLORS } from "datas/main";

import arrow from "assets/icons/portfolio/arrow.svg";
import refresh from "assets/icons/portfolio/refresh.svg";
import trash from "assets/icons/portfolio/trash.svg";
import { MENUS } from "datas/portfolio";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { PortfolioData, UserInfo } from "interfaces/portfolio";
import { Session } from "interfaces/login";
import useUdtDate from "utils/useFormattedDate";

interface Props {
  setIsOpenAddModal: Dispatch<SetStateAction<boolean>>;
  ptfData: PortfolioData[];
  userProfile?: UserInfo;
  mutate: () => void;
  session: Session;
  currencySelect: number;
  setCurrencySelect: Dispatch<SetStateAction<number>>;
}

const Chart = ({
  currencySelect,
  setCurrencySelect,
  session,
  setIsOpenAddModal,
  mutate,
  ptfData,
  userProfile,
}: Props) => {
  // const COLORS = ["bg-[#89aaff]", "bg-[#6691ff]", "bg-[#4277ff]", "bg-[#1e5dff]","bg-[#0046f9]","bg-[#003cd6]","bg-[#0032b2]","bg-[#00288e]","bg-[#001e6b]","bg-[#001447]"];
  const COLORS = [
    "bg-chart1",
    "bg-chart2",
    "bg-chart3",
    "bg-chart4",
    "bg-chart5",
    "bg-chart6",
    "bg-chart7",
    "bg-chart8",
    "bg-chart9",
    "bg-chart10",
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshModalOpen, setIsRefreshModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { t } = useTranslation("portfolio");
  const [menuIndex, setMenuIndex] = useState(0);
  const currentDate = useUdtDate(new Date().toISOString(), false, true);

  const firstIndex = menuIndex === 0;
  const lastIndex = (menuIndex + 1) * 4 >= MENUS.length;
  const handlePrev = () => menuIndex > 0 && setMenuIndex((prev) => prev - 1);
  const handleNext = () => {
    menuIndex * 4 < MENUS.length && setMenuIndex((prev) => prev + 1);
  };
  const { title, total, loss, coin } = MENUS[index];

  const chartData = useMemo(() => {
    let sortedData: PortfolioData[] = ptfData.sort(
      (a: PortfolioData, b: PortfolioData) => b.total - a.total
    );
    if (router.locale == "ko") {
      sortedData = sortedData.map((asset) => {
        return {
          ...asset,
          name: decodeURIComponent(asset.krName),
          enName: decodeURIComponent(asset.name),
        };
      });
    } else {
      sortedData = sortedData.map((asset) => {
        return {
          ...asset,
          name: decodeURIComponent(asset.name),
          enName: decodeURIComponent(asset.name),
        };
      });
    }
    return sortedData;
  }, [ptfData, router.locale]);

  const currencySelectHandler = () => {
    setCurrencySelect(currencySelect === 0 ? 1 : 0);
  };

  const totalAmount = useMemo(() => {
    const filteredTotal = ptfData.map((asset: PortfolioData) => asset.total);
    const total = filteredTotal.reduce((a, b) => a + b, 0);
    return total;
  }, [ptfData]);

  const krTotalAmount = useMemo(() => {
    const filteredTotal = ptfData.map((asset: PortfolioData) => asset.krTotal);
    const krTotal = filteredTotal.reduce((a, b) => a + b, 0);
    return krTotal;
  }, [ptfData]);

  const refreshHandler = async () => {
    if (ptfData.length == 0) {
      toast(
        router.locale == "ko"
          ? "자산을 먼저 추가해주세요"
          : "Please add your assets",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }
    if (ptfData.length == 1) {
      toast(
        router.locale == "ko"
          ? "최소 2개 이상의 자산이 필요합니다"
          : "Please add at least 2 assets to calculate your risk",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }
    setIsLoading(true);
    setIsRefreshModalOpen(false);

    let tickers = "";
    let shares = "";
    let enteredInput = {};

    for (let i = 0; i < ptfData.length; i++) {
      tickers += encodeURIComponent(ptfData[i].ticker);
      shares += encodeURIComponent(ptfData[i].quantity);

      if (i !== ptfData.length - 1) {
        tickers += "%2C";
        shares += "%2C";
      }
    }

    const fetchAddress = `https://riskweather.io/rapi/portfolio?ticker=${tickers}&shares=${shares}`;

    try {
      const response = await fetch(fetchAddress);
      const result = await response.json();
      setIsLoading(false);

      enteredInput = {
        portfolio: ptfData,
        portfolioResult: result.result.portfolio_risk[0] * 100,
        portfolioLevel: result.result.portfolio_risk_ranked[0],
        portfolioTime: currentDate,
      };

      const data = await fetch(`/api/auth/user?session=${session.user.email}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ enteredInput }),
      }).then((res) => {
        if (res.ok) {
          setIsOpenAddModal(false);
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

  const deleteHandler = async () => {
    if (ptfData.length == 0) {
      toast(
        router.locale == "ko"
          ? "자산을 먼저 추가해주세요"
          : "Please add your assets",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }
    setIsLoading(true);
    setIsDeleteModalOpen(false);

    let enteredInput = {};
    enteredInput = {
      portfolio: [],
      portfolioResult: 0,
      portfolioLevel: "",
      portfolioTime: "",
    };

    const data = await fetch(`/api/auth/user?session=${session.user.email}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ enteredInput }),
    }).then((res) => {
      if (res.ok) {
        setIsLoading(false);
        setIsOpenAddModal(false);
        mutate();
        toast(
          router.locale == "ko"
            ? "포트폴리오를 삭제했습니다"
            : "Successfully deleted your portfolio",
          { hideProgressBar: true, autoClose: 2000, type: "success" }
        );
      } else {
        setIsLoading(false);
        toast(
          router.locale == "ko"
            ? "네트워크 에러가 발생했습니다"
            : "Fetch Error",
          { hideProgressBar: true, autoClose: 2000, type: "error" }
        );
      }
    });
  };

  return (
    <main className="bg-white px-6 py-4 rounded-20 max-w-[650px] flex-1 max-h-[822px]">
      <section className="relative flex  items-center mb-8">
        {/* <div className={'flex justify-center'}>
      <div
          className="relative  flex gap-4 bg-gray-100 rounded-[14px] px-2 py-1.5 w-[128px] h-7 justify-between items-center cursor-pointer "
          onClick={()=>{}}
        >
          <span
            className="bg-white w-[60px] absolute  h-6 rounded-20 ease-in-out duration-500 left-[2px]"
            style={{ transform: `translateX(calc(${currencySelect}*64px))` }}
          />
          <h6 className="h-3 text-[10px] w-[48px] text-center z-10">{'USD'}</h6>
          <h6 className="h-3 text-[11px] w-[48px] text-center z-10">{'KRW'}</h6>
        </div>
        </div> */}
        {/* <div
          className="flex min-w-[82px] items-center py-2 px-3 border rounded-[36px] h-10 cursor-pointer border-gray-200 bg-white text-gray-400 gap-2"
          onClick={() => setIsOpenAddModal(true)}
        >
          <h5 className="mt-1">Add</h5>
          <Image src={plus} alt="" />
        </div> */}
        {/* <div className="overflow-hidden max-w-[430px]">
          <article
            className="flex gap-2.5 py-4 mx-2 ease-in-out duration-1000"
            style={{ transform: `translateX(calc(${menuIndex}*-427px))` }}
          >
            {MENUS.map(({ id, title }) => (
              <div
                key={id}
                className={`py-2 px-3 border rounded-[36px] h-10 cursor-pointer hover:bg-[#F3F4F6] hover:text-gray-400 hover:border-gray-200 ${
                  index === id
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-400"
                }`}
                onClick={() => setIndex(id)}
              >
                <h5>{title}</h5>
              </div>
            ))}
          </article>
        </div> */}
        {!firstIndex && (
          <Image
            src={arrow}
            alt=""
            className="absolute right-10 top-0 mt-[2px] cursor-pointer rotate-180"
            onClick={handlePrev}
          />
        )}
        {!lastIndex && (
          <Image
            src={arrow}
            alt=""
            className="absolute right-0 top-0 mt-2.5 cursor-pointer"
            onClick={handleNext}
          />
        )}
      </section>
      <section className={""}>
        <article className="flex gap-6 mb-7 items-center">
          <h1 className="text-3xl mt-1 flex-1 text-[#111111]">
            {t("portfolioTitle")}
          </h1>
          <div
            className="relative flex gap-4 bg-gray-100 rounded-[14px] px-2 py-1.5 w-[128px] h-7 justify-between items-center cursor-pointer "
            onClick={currencySelectHandler}
          >
            <span
              className="bg-white w-[60px] absolute  h-6 rounded-20 ease-in-out duration-500 left-[2px]"
              style={{ transform: `translateX(calc(${currencySelect}*64px))` }}
            />
            <h6 className=" text-[11px] w-[48px] text-center z-10">{"USD"}</h6>
            <h6 className=" text-[11px] w-[48px] text-center z-10">{"KRW"}</h6>
          </div>
          <Image
            src={refresh}
            onClick={() => {
              setIsRefreshModalOpen(true);
            }}
            alt=""
            className="cursor-pointer"
          />
          {/* <Image src={pen} alt="" className="cursor-pointer" /> */}
          <Image
            src={trash}
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
            alt=""
            className="cursor-pointer"
          />
        </article>
        <article className="flex gap-6 mb-5 items-center text-gray-500 text-4xl">
          <p className="text-xl font-medium flex-1">{t("portfolioAmount")}</p>
          <h1 className="text-[#111111]">
            {currencySelect === 1
              ? "￦" +
                " " +
                krTotalAmount?.toLocaleString("en-us", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              : "$" +
                " " +
                totalAmount?.toLocaleString("en-us", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </h1>
        </article>
        <article className="flex gap-6 mb-5 items-center text-gray-500">
          <p className="text-xl font-medium flex-1">{t("portfolioLoss")}</p>
          <h1
            className={`text-3xl ${
              userProfile?.portfolioResult ? "text-[#DF1525]" : "text-black"
            }`}
          >
            {userProfile?.portfolioResult
              ? "- " + userProfile.portfolioResult.toFixed(2) + "%"
              : "X"}
          </h1>
        </article>
        <article className="flex gap-6 mb-5 items-center text-gray-500">
          <p className="text-xl font-medium flex-1">{t("portfolioLevel")}</p>
          {userProfile?.portfolioLevel ? (
            <div
              className={`py-1 px-3 rounded-20 ${
                PORTCOLORS[userProfile?.portfolioLevel]
              } max-w-fit mx-auto`}
            >
              <h6 className="text-xl">
                {router.locale === "ko"
                  ? userProfile?.portfolioLevel === "Low volatility"
                    ? "변동성 낮음"
                    : userProfile?.portfolioLevel === "Moderate volatility"
                    ? "변동성 적정"
                    : userProfile?.portfolioLevel === "High volatility"
                    ? "변동성 높음"
                    : userProfile?.portfolioLevel === "Very High volatility"
                    ? "변동성 매우 높음"
                    : "X"
                  : userProfile?.portfolioLevel}
              </h6>
            </div>
          ) : (
            <h1 className={"text-3xl text-black"}>{"X"}</h1>
          )}
        </article>
      </section>
      <section className="mt-10  w-[390px] h-[290px] flex justify-center items-center mx-auto my-10">
        {!isLoading ? (
          ptfData?.length > 0 ? (
            <AssetChart data={chartData} />
          ) : (
            <Image src={emptyChart} alt="Empty Chart" />
          )
        ) : (
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
        )}
      </section>
      <div className={"flex justify-between items-end"}>
        <section className="mt-5 border  border-gray-200 pt-4 pb-2 px-5 w-[234px] rounded-20 mb-4 ml-2 h-[136px] overflow-y-scroll customScrollBar">
          {chartData.length !== 0 ? (
            ptfData.map(
              (
                { name, ticker, quantity, total, krName }: PortfolioData,
                i: number
              ) => (
                <div
                  key={i}
                  className={`flex text-[#111111] text-sm mb-2 items-center `}
                >
                  <div
                    className={`${
                      COLORS[i % COLORS.length]
                    } w-3 h-3   rounded-[50%] mb-[2px] mr-2 `}
                  />
                  <h6
                    className="flex-1 w-[100px] truncate mr-2"
                    title={
                      router.locale == "ko"
                        ? decodeURIComponent(krName)
                        : decodeURIComponent(name)
                    }
                  >
                    {router.locale == "ko"
                      ? decodeURIComponent(krName)
                      : decodeURIComponent(name)}{" "}
                  </h6>
                  <h6 className="font-medium">
                    {((total / totalAmount) * 100).toLocaleString("en-us", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    {"%"}
                  </h6>
                </div>
              )
            )
          ) : (
            <>
              <div className="flex text-[#111111] text-sm mb-2 items-center">
                <div className="w-3 h-3 bg-[#5550FF] rounded-[50%] mb-[2px] mr-2" />
                <h6 className="flex-1">-</h6>
                <h6>0%</h6>
              </div>
              <div className="flex text-[#111111] text-sm mb-2 items-center">
                <div className="w-3 h-3 bg-[#5550FF] rounded-[50%] mb-[2px] mr-2" />
                <h6 className="flex-1">-</h6>
                <h6>0%</h6>
              </div>
              <div className="flex text-[#111111] text-sm mb-2 items-center">
                <div className="w-3 h-3 bg-[#5550FF] rounded-[50%] mb-[2px] mr-2" />
                <h6 className="flex-1">-</h6>
                <h6>0%</h6>
              </div>
              <div className="flex text-[#111111] text-sm mb-2 items-center">
                <div className="w-3 h-3 bg-[#5550FF] rounded-[50%] mb-[2px] mr-2" />
                <h6 className="flex-1">etc</h6>
                <h6>0%</h6>
              </div>
            </>
          )}
        </section>
        {/* {router.locale==="ko" ? "리스크 측정 시간  : " : "Risk Calculated : "} */}
        <p className={"mb-5 text-end  text-gray-400  text-sm"}>
          {userProfile?.portfolioTime
            ? router.locale === "ko"
              ? "리스크 측정 시간 : " + userProfile?.portfolioTime
              : "Risk Calculated : " + userProfile?.portfolioTime
            : ""}{" "}
        </p>
      </div>
      {isRefreshModalOpen && (
        <div
          className={
            "absolute text-center text-[#111111] bg-white rounded-20 top-1/2 left-1/2 translate-x-half translate-y-half z-20"
          }
        >
          <article className="h-fit border w-[415px] mx-auto bg-white  py-12 rounded-20  top-1/2 left-1/2   z-50 ">
            {/* <h1 className="text-2xl text-[#111111] mb-4">
        { t('refreshModalTitle')}
        </h1> */}
            <div className={"flex justify-center items-center"}>
              <p className="text-[#111111] mb-9 text-start font-medium text-lg">
                {t("refreshModalExplain1")}
                <br />
                {t("refreshModalExplain2")}
              </p>
            </div>
            <div className={"flex items-center text-center justify-center"}>
              <button
                onClick={refreshHandler}
                className="mr-5 bg-[#0198FF]  text-white font-bold py-3 px-5 rounded-[60px] w-[120px] "
              >
                {t("refreshModalSave")}
              </button>
              <button
                onClick={() => {
                  setIsRefreshModalOpen(false);
                }}
                className="bg-[#D1D5DB]  text-white font-bold py-3 px-5 rounded-[60px] w-[120px]"
              >
                {t("refreshModalCancel")}
              </button>
            </div>
          </article>
        </div>
      )}
      {isDeleteModalOpen && (
        <div
          className={
            "absolute text-center text-[#111111] bg-white rounded-20 top-1/2 left-1/2 translate-x-half translate-y-half z-20"
          }
        >
          <article className="h-fit  border w-[415px] mx-auto bg-white  py-12 rounded-20  top-1/2 left-1/2 z-20">
            {/* <h1 className="text-2xl text-[#111111] mb-4">
        { t('deleteModalTitle')}
        </h1> */}
            <div className={"flex justify-center items-center "}>
              <p className="text-[#111111] mb-9 text-start font-medium text-xl">
                {t("deleteModalExplain1")}
                <br />
                {t("deleteModalExplain2")}
              </p>
            </div>
            <div className={"flex items-center text-center justify-center"}>
              <button
                onClick={deleteHandler}
                className="mr-5 bg-[#0198FF]  text-white font-bold py-3 px-5 rounded-[60px] w-[120px] "
              >
                {t("deleteModalSave")}
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                }}
                className="bg-[#D1D5DB]  text-white font-bold py-3 px-5 rounded-[60px] w-[120px]"
              >
                {t("deleteModalCancel")}
              </button>
            </div>
          </article>
        </div>
      )}
    </main>
  );
};

export default Chart;
