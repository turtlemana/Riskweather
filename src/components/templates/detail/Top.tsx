import { useState, useMemo } from "react";
import Image from "next/image";
import useHandleImageError from "utils/useHandleImageError";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";
import useModalClose from "utils/useModalClose";
import useUdtDate from "utils/useFormattedDate";
import { COLORS } from "datas/main";
import arrow from "assets/icons/detail/arrow.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { BsQuestionCircle } from "react-icons/bs";
import { Forcast } from "interfaces/detail";

interface Props {
  name?: string;
  ticker?: string;
  riskLevel: string;
  koreanRiskLevel: string;
  maxLoss: number;
  price: number;
  currency?: string;
  priceChange: number;
  date: string;
  weather?: string;
  weatherExplain?: string;
  koreanWeatherExplain?: string;
  varGauss: number;
  tailRisk: number;
  usdPrice: number;
  forcast?: Forcast[];
  varGauss95?: number;
  tailRisk95: number;
  cVaRNTS95?: number;
  riskDescriptionKr?: string;
  riskDescriptionEn?: string;
  krName?: string;
  cat?: string;
  exchg: string;
  EXP_VaRNTS: number;
  EXP_CVaRNTS: number;
  EXP_VaRNTS_95: number;
  EXP_CVaRNTS_95: number;
}

const Top = ({
  EXP_VaRNTS,
  EXP_CVaRNTS,
  EXP_VaRNTS_95,
  EXP_CVaRNTS_95,
  exchg,
  cat,
  forcast,
  krName,
  riskDescriptionEn,
  riskDescriptionKr,
  name,
  ticker,
  varGauss,
  tailRisk,
  usdPrice,
  riskLevel,
  koreanRiskLevel,
  maxLoss,
  price,
  currency,
  priceChange,
  date,
  weather,
  weatherExplain,
  koreanWeatherExplain,
  tailRisk95,
  varGauss95,
  cVaRNTS95,
}: Props) => {
  const router = useRouter();
  const { t } = useTranslation("detail");

  const [isActiveWeeklyModal, setIsActiveWeeklyModal] = useState(false);
  const [index, setIndex] = useState(0);
  const udtDate = useUdtDate(date, false, true);

  const modalRef = useModalClose(isActiveWeeklyModal, setIsActiveWeeklyModal);

  const forcastData = useMemo(() => {
    let tmpForcast = JSON.parse(JSON.stringify(forcast)).slice(0, 4);
    if (
      !tmpForcast ||
      tmpForcast.length === 0 ||
      tmpForcast.message === "Can't find data"
    )
      return;
    if (router.locale === "ko") {
      tmpForcast[0].DATE_PlUS = "오늘";
    } else {
      tmpForcast[0].DATE_PlUS = "Today";
    }
    tmpForcast[1].DATE_PlUS = "D+1";
    tmpForcast[2].DATE_PlUS = "D+2";
    tmpForcast[3].DATE_PlUS = "D+3";

    return tmpForcast;
  }, [forcast]);

  const handleImageError = useHandleImageError();
  const handleWeatherImageError = useHandleWeatherImageError();

  return (
    <main className="max-w-1320 min-w-[1024px] mx-auto p-8 rounded-20 bg-white">
      <header className="flex">
        <section className="flex-1">
          <article className="flex gap-3 items-center mb-9">
            <Image
              loading="lazy"
              unoptimized
              width={50}
              height={50}
              quality={100}
              onError={(event) => handleImageError(event, exchg)}
              src={`/images/logos/${ticker}.png`}
              alt=""
              className="h-[60px] w-[60px] mr-3 "
            />
            <div className="mr-7">
              <h5 className="font-bold text-[28px] h-[32px] mb-1">
                {router.locale == "ko" ? krName : name}
              </h5>
              <p className="text-gray-500">{ticker}</p>
            </div>
            <div
              data-tooltip-id="riskLevel"
              data-tooltip-content={
                router.locale == "ko" ? riskDescriptionKr : riskDescriptionEn
              }
              className={`py-[6px] px-4 rounded-20 text-center flex items-center justify-center ${COLORS[riskLevel]}`}
            >
              <h6 className="">
                {router.locale == "ko" ? koreanRiskLevel : riskLevel}
              </h6>
            </div>
          </article>
          <article className="flex items-center gap-6">
            <p className=" text-gray-500">{t("headerPrice")}</p>
            <h6 className="text-4xl">
              {price?.toLocaleString("en-us", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 4,
              })}{" "}
              {cat == "Index" ? "" : currency}
            </h6>
            <p
              className={`${
                priceChange > 0 ? "text-[#3CB043]" : "text-[#DF1525]"
              }`}
            >
              {priceChange?.toFixed(2)}%
            </p>
            <div className="w-px h-[20px] bg-gray-300 mx-1 mb-1" />
            <p className="text-gray-500">{t("headerLoss")}</p>
            <h6 className="text-4xl text-[#DF1525]">
              -{EXP_CVaRNTS?.toFixed(2)}%
            </h6>
          </article>
        </section>
        <section>
          <article className="flex items-center gap-5 mb-4 relative">
            <p className="text-[14px] text-gray-500 h-4">{udtDate}</p>
            <div
              className={
                "flex py-2 px-2.5 rounded-20 bg-[#E6F5FF] cursor-pointer hover:bg-[#CCEAFF] min-w-[120px]"
              }
              onClick={() => setIsActiveWeeklyModal((prev) => !prev)}
            >
              <h6 className="text-xs text-center text-[#0198FF] h-3 mr-1 min-w-[85px] mb-1">
                {t("headerForecast")}
              </h6>
              <Image src={arrow} alt="" />
            </div>
            {isActiveWeeklyModal && (
              <div
                //@ts-ignore
                ref={modalRef}
                className="z-30  absolute p-6 bg-white shadow-[0_0_12px_0_rgba(121,120,132,0.15)] top-8 right-0 rounded-20 border border-gray-100"
              >
                <h6 className="mb-7">{t("headerForecast")}</h6>
                {forcastData?.map(
                  (
                    {
                      DATE_PlUS,
                      WTHR_ENG_NM,
                      WTHR_KR_DL,
                      WTHR_ENG_DL,
                    }: Forcast,
                    i: number
                  ) => (
                    <div className="flex items-center w-[221px] mb-3" key={i}>
                      <p className="flex-1 mt-1 text-sm font-bold">
                        {DATE_PlUS}
                      </p>
                      <section className="text-center flex items-center justify-between bg-gray-100 rounded-20 pl-3 pr-4">
                        <Image
                          src={`/images/weather/${WTHR_ENG_NM}.svg`}
                          onError={handleWeatherImageError}
                          width={50}
                          height={50}
                          alt=""
                          quality={100}
                          className="w-8 h-8"
                        />
                        <h6 className="text-xs">
                          {router.locale == "ko" ? WTHR_KR_DL : WTHR_ENG_DL}
                        </h6>
                      </section>
                    </div>
                  )
                )}
                <div className="mt-7 text-gray-500 bg-gray-50 rounded-20 py-3 px-4 text-sm">
                  {t("headerMessage")}
                </div>
              </div>
            )}
          </article>
          <article className="text-center flex flex-col items-center">
            <Image
              src={`/images/weather/${weather}.svg`}
              onError={handleWeatherImageError}
              width={0}
              height={0}
              alt=""
              className="w-20 mb-1"
            />
            <h6 className="text-sm text-gray-700">
              {router.locale == "ko" ? koreanWeatherExplain : weatherExplain}
            </h6>
          </article>
        </section>
      </header>
      <section className="mt-[19px] bg-gray-50 px-6 py-5">
        <article className="flex items-center gap-4">
          <h6 className="text-gray-400 mr-2">{t("headerIndex")}</h6>
          <div className="flex gap-1.5 mr-2">
            <div
              className={`py-2 px-2.5 rounded-20 cursor-pointer hover:bg-[#F3F4F6] ${
                index === 0
                  ? "bg-[#E6F5FF] border text-[#0198FF]"
                  : "bg-whtie border text-gray-400 "
              }`}
              onClick={() => setIndex(0)}
            >
              <h6 className="text-xs h-3 mb-1">0.99</h6>
            </div>
            <div
              className={`py-2 px-2.5 rounded-20 cursor-pointer hover:bg-[#F3F4F6] ${
                index === 1
                  ? "bg-[#E6F5FF] border text-[#0198FF]"
                  : "bg-whtie border text-gray-400 "
              }`}
              onClick={() => setIndex(1)}
            >
              <h6 className="text-xs h-3 mb-1">0.95</h6>
            </div>
          </div>
          {index == 0 ? (
            <div className={"flex  items-center text-center justify-between"}>
              <div className={"flex  items-center text-center"}>
                <p className="text-gray-400 w-[300px] ">RW INDEX</p>
                <h6 className="text-[#111111] text-xl w-full max-w-[100px]">
                  {(tailRisk / 100).toFixed(2)}
                </h6>
                <div className="w-px h-4 bg-gray-300 mb-1 mx-1" />
                <p className="text-gray-400  ml-5">CVAR</p>
                <h6 className="text-[#111111] text-xl w-full max-w-[100px]">
                  {EXP_CVaRNTS.toFixed(2) + "%"}
                </h6>
                <div className="w-px h-4 bg-gray-300 mb-1 mx-1" />
                <p className="text-gray-400  ml-5">VAR</p>
                <h6 className="text-[#111111] text-xl w-full max-w-[100px]">
                  {EXP_VaRNTS.toFixed(2) + "%"}
                </h6>
              </div>
              <div data-tooltip-id="riskIndexExplain">
                <BsQuestionCircle />
              </div>
            </div>
          ) : (
            <div className={"flex  items-center text-center justify-between"}>
              <div className={"flex  items-center text-center"}>
                <p className="text-gray-400 w-[300px] ">RW INDEX</p>
                <h6 className="text-[#111111] text-xl w-full max-w-[100px]">
                  {(tailRisk95 / 100).toFixed(2)}
                </h6>
                <div className="w-px h-4 bg-gray-300 mb-1 mx-1" />
                <p className="text-gray-400  ml-5">CVAR</p>
                <h6 className="text-[#111111] text-xl w-full max-w-[100px]">
                  {EXP_CVaRNTS_95.toFixed(2) + "%"}
                </h6>
                <div className="w-px h-4 bg-gray-300 mb-1 mx-1" />
                <p className="text-gray-400  ml-5">VAR</p>
                <h6 className="text-[#111111] text-xl w-full max-w-[100px]">
                  {EXP_VaRNTS_95.toFixed(2) + "%"}
                </h6>
              </div>
              <div data-tooltip-id="riskIndexExplain">
                <BsQuestionCircle />
              </div>
            </div>
          )}
        </article>
      </section>
    </main>
  );
};

export default Top;
