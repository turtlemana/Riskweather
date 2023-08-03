import { useState, useMemo } from "react";
import Image from "next/image";

import { COLORS } from "datas/main";
import { RISK_INDEX } from "datas/detail";
import arrow from "assets/icons/detail/arrow.svg";
import close from "assets/icons/contact/close.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import useHandleImageError from "utils/useHandleImageError";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";
import useModalClose from "utils/useModalClose";
import useUdtDate from "utils/useFormattedDate";
import { Forcast } from "interfaces/detail";
import { BsQuestionCircle } from "react-icons/bs";

interface Props {
  name?: string;
  ticker?: string;
  koreanRiskLevel?: string;
  riskLevel: string;
  maxLoss: number;
  price: number;
  currency?: string;
  priceChange: number;
  date: string;
  weather?: string;
  weatherExplain?: string;
  koreanWeatherExplain?: string;
  varGauss?: number;
  tailRisk: number;
  EXP_CVaRNTS: number;
  EXP_CVaRNTS_95: number;
  EXP_VaRNTS: number;
  EXP_VaRNTS_95: number;
  usdPrice?: number;
  forcast?: Forcast[];
  varGauss95?: number;
  tailRisk95: number;
  cVaRNTS95?: number;
  cat?: string;
  krName?: string;
  exchg: string;
}

const Top = ({
  EXP_CVaRNTS,
  EXP_CVaRNTS_95,
  EXP_VaRNTS,
  EXP_VaRNTS_95,
  exchg,
  krName,
  cat,
  forcast,
  name,
  ticker,
  varGauss,
  varGauss95,
  tailRisk95,
  cVaRNTS95,
  koreanRiskLevel,
  koreanWeatherExplain,
  tailRisk,
  usdPrice,
  riskLevel,
  maxLoss,
  price,
  currency,
  priceChange,
  date,
  weather,
  weatherExplain,
}: Props) => {
  const router = useRouter();
  const { t } = useTranslation("detail");
  const [isActiveWeeklyModal, setIsActiveWeeklyModal] = useState(false);
  const [index, setIndex] = useState(0);

  const modalRef = useModalClose(isActiveWeeklyModal, setIsActiveWeeklyModal);

  const udtDate = useUdtDate(date, false, true);

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
    <main className="py-4 bg-white pb-[44px]">
      <section className="px-5 flex items-center pb-4 border-b border-gray-100 mb-4">
        <Image
          onError={(event) => handleImageError(event, exchg)}
          unoptimized
          src={`/images/logos/${ticker}.png` || ""}
          alt=""
          quality={100}
          width={50}
          height={50}
          className="w-10 h-10 "
        />
        <div className="flex-1 ml-3">
          <h6 className="">{router.locale == "ko" ? krName : name}</h6>
          <p className="text-[#616161] text-xs">{ticker}</p>
        </div>
        <div
          className={`py-1 h-6 px-4 rounded-20 text-center flex items-center justify-center ${COLORS[riskLevel]}`}
        >
          <h6 className="text-xs ">
            {router.locale == "ko" ? koreanRiskLevel : riskLevel}
          </h6>
        </div>
      </section>
      <section className="flex pr-5">
        <article className="px-5 flex-1">
          <h6 className="text-gray-400 text-sm mb-1">{t("headerPrice")}</h6>
          <h6 className="text-xl text-[#111111] mb-1">
            {price?.toLocaleString("en-us", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}{" "}
            {cat == "Index" ? "" : currency}
          </h6>
          <h6
            className={` mb-5  ${
              priceChange > 0 ? "text-[#3CB043]" : "text-[#DF1525]"
            } `}
          >
            {priceChange.toFixed(2)}%
          </h6>
          <h6 className="text-gray-400 text-sm mb-1.5">{t("headerLoss")}</h6>
          <h6 className="text-xl text-[#DF1525]">-{EXP_CVaRNTS.toFixed(2)}%</h6>
        </article>
        <article>
          <p className="text-xs mb-3 text-gray-500 text-right">{udtDate}</p>
          <div className="text-center flex flex-col items-center w-[135px] h-[96px] bg-gray-50 rounded-[8px] mb-3">
            <Image
              onError={handleWeatherImageError}
              src={`/images/weather/${weather}.svg`}
              width={0}
              height={0}
              alt=""
              className="w-[64px] h-auto mb-1"
            />
            <h6 className="text-xs text-gray-700">
              {router.locale == "ko" ? koreanWeatherExplain : weatherExplain}
            </h6>
          </div>
          <div
            className={
              "relative flex items-center py-1.5 px-2.5 rounded-20 bg-[#E6F5FF] cursor-pointer hover:bg-[#CCEAFF] min-w-[135px]"
            }
            onClick={() => setIsActiveWeeklyModal((prev) => !prev)}
          >
            <p className="font-medium text-center text-xs text-[#0198FF] h-3.5 mr-1 w-[99px] mb-1">
              {t("headerForecast")}
            </p>
            <Image src={arrow} alt="" />
            {isActiveWeeklyModal && (
              <div
                //@ts-ignore
                ref={modalRef}
                className="max-w-[269px] z-30 absolute p-6 bg-white shadow-[0_0_12px_0_rgba(121,120,132,0.15)] top-8 right-0 rounded-20 border border-gray-100"
              >
                <div className="flex items-center mb-7 w-[221px]">
                  <h6 className="flex-1">{t("headerForecast")}</h6>
                  <Image src={close} alt="" className="w-6" />
                </div>
                {forcastData?.map(
                  (
                    {
                      DATE_PlUS,
                      WTHR_ENG_NM,
                      WTHR_ENG_DL,
                      WTHR_KR_DL,
                    }: Forcast,
                    i: number
                  ) => (
                    <div className="flex items-center mb-3" key={i}>
                      <p className="flex-1 mt-1 text-sm font-bold">
                        {DATE_PlUS}
                      </p>
                      <section className="text-center flex items-center justify-between bg-gray-100 rounded-20 pl-3 pr-4 py-0.5">
                        <Image
                          onError={handleWeatherImageError}
                          src={`/images/weather/${WTHR_ENG_NM}.svg`}
                          width={50}
                          height={50}
                          alt=""
                          quality={100}
                          className="w-8 h-8"
                        />
                        <p className="text-xs font-medium text-gray-600">
                          {router.locale == "ko" ? WTHR_KR_DL : WTHR_ENG_DL}
                        </p>
                      </section>
                    </div>
                  )
                )}
                <div className="mt-6 text-gray-500 bg-gray-50 rounded-20 p-3 text-sm">
                  {t("headerMessage")}
                </div>
              </div>
            )}
          </div>
        </article>
      </section>
      <section className="mx-5 mt-5 bg-gray-50 p-4 rounded-[8px]">
        <article className="flex mb-[18px]">
          <h6 className="text-gray-400 text-sm flex-1">{t("headerIndex")}</h6>
          <div className="flex gap-2">
            {RISK_INDEX.map(({ id, title }) => (
              <div
                key={id}
                className={`py-1 px-[9px] rounded-20 cursor-pointer hover:bg-[#F3F4F6] ${
                  index === id
                    ? "border border-[#E6F5FF] bg-[#E6F5FF] text-[#0198FF]"
                    : "bg-whtie border text-gray-400 "
                }`}
                onClick={() => setIndex(id)}
              >
                <h6 className="text-xs h-3 mb-1">{title}</h6>
              </div>
            ))}
          </div>
        </article>
        {index == 0 ? (
          <article className="flex items-center gap-4">
            <div className="flex font-medium justify-between w-full items-center">
              <div className="">
                <p className="text-gray-400 text-xs mb-1">RW INDEX</p>
                <h6 className="text-gray-700 text-sm">
                  {(tailRisk / 100).toFixed(2)}
                </h6>
              </div>

              <div className="w-px h-[28px] bg-gray-300" />
            </div>
            <div className="flex font-medium justify-between w-full items-center">
              <div className="">
                <p className="text-gray-400 text-xs mb-1">CVAR</p>
                <h6 className="text-gray-700 text-sm">
                  {EXP_CVaRNTS.toFixed(2) + "%"}
                </h6>
              </div>

              <div className="w-px h-[28px] bg-gray-300" />
            </div>
            <div className="flex font-medium justify-between w-full items-center">
              <div className="">
                <p className="text-gray-400 text-xs mb-1">VAR</p>
                <h6 className="text-gray-700 text-sm">
                  {EXP_VaRNTS.toFixed(2) + "%"}
                </h6>
              </div>
            </div>
            <div
              data-tooltip-id="riskIndexExplain"
              className={"items-center mr-4"}
            >
              <BsQuestionCircle />
            </div>
          </article>
        ) : (
          <article className="flex items-center gap-4">
            <div className="flex font-medium justify-between w-full items-center">
              <div className="">
                <p className="text-gray-400 text-xs mb-1">RW INDEX</p>
                <h6 className="text-gray-700 text-sm">
                  {(tailRisk95 / 100).toFixed(2)}
                </h6>
              </div>

              <div className="w-px h-[28px] bg-gray-300" />
            </div>
            <div className="flex font-medium justify-between w-full items-center">
              <div className="">
                <p className="text-gray-400 text-xs mb-1">CVAR</p>
                <h6 className="text-gray-700 text-sm">
                  {EXP_CVaRNTS_95.toFixed(2) + "%"}
                </h6>
              </div>

              <div className="w-px h-[28px] bg-gray-300" />
            </div>
            <div className="flex font-medium justify-between w-full items-center">
              <div className="">
                <p className="text-gray-400 text-xs mb-1">VAR</p>
                <h6 className="text-gray-700 text-sm">
                  {EXP_VaRNTS_95.toFixed(2) + "%"}
                </h6>
              </div>
            </div>
            <div
              data-tooltip-id="riskIndexExplain"
              className={"items-center mr-4"}
            >
              <BsQuestionCircle />
            </div>
          </article>
        )}
      </section>
    </main>
  );
};

export default Top;
