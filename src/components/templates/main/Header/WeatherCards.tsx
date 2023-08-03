import Image from "next/image";

import { COLORS } from "datas/main";

import CardChart from "chart/CardChart";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import useHandleImageError from "utils/useHandleImageError";

interface Props {
  name?: string;
  ticker?: string;
  riskLevel: string;
  koreanRiskLevel?: string;
  cat?: string;
  maxLoss: number;
  price: number;
  currency?: string;
  priceChange?: string | number;
  chartData?: string | JSON;
  weather?: string;
  weatherExplain?: string;
  koreanWeatherExplain?: string;
  riskDescriptionKr?: string;
  riskDescriptionEn?: string;
  usdPrice: number;
  krName?: string;
  loc?: string;
  exchg: string;
  Exp_CVaR: number;
}
const WeatherCards = ({
  exchg,
  Exp_CVaR,
  loc,
  krName,
  name,
  ticker,
  riskLevel,
  usdPrice,
  riskDescriptionEn,
  riskDescriptionKr,
  cat,
  koreanRiskLevel,
  maxLoss,
  price,
  currency,
  priceChange,
  chartData,
  weather,
  weatherExplain,
  koreanWeatherExplain,
}: Props) => {
  const router = useRouter();
  const { t } = useTranslation("index");
  const handleImageError = useHandleImageError();

  return (
    <main
      className="relative p-5 justify-center items-center  rounded-t-20 cursor-pointer bg-white min-w-[282px] h-[262px]"
      onClick={() => {
        router.push({ pathname: `/detail/${ticker}` });
      }}
    >
      <section className="flex gap-3 items-start mb-3">
        <Image
          loading="eager"
          unoptimized
          width={10}
          height={10}
          quality={100}
          onError={(event) => handleImageError(event, exchg)}
          src={`/images/logos/${ticker}.png` || ""}
          alt=""
          className="h-10 w-10 mr-3 "
        />
        <article className="flex-1">
          <h6
            className={`mb-1 text-sm truncate ${
              riskLevel == "Very high" ? "w-[80px] " : "w-[100px] "
            }`}
            title={router.locale == "ko" ? krName : name}
          >
            {router.locale == "ko" ? krName : name}
          </h6>
          <p className="text-[5px] text-gray-500">{ticker}</p>
        </article>
        <div
          data-tooltip-id="riskLevel"
          data-tooltip-content={
            router.locale == "ko" ? riskDescriptionKr : riskDescriptionEn
          }
          className={`flex items-center justify-center py-1 px-3 rounded-20 text-center ${COLORS[riskLevel]}`}
        >
          <h6 className=" text-xs">
            {router.locale == "ko" ? koreanRiskLevel : riskLevel}
          </h6>
        </div>
      </section>
      <section className="flex gap-3 items-start mb-6">
        <article className="flex-1 pt-3">
          <h6 className="mb-1">
            {cat == "Index"
              ? ""
              : (loc === "Korea (South)" || cat === "Crypto") &&
                router.locale == "ko"
              ? "￦"
              : "$"}{" "}
            {(loc === "Korea (South)" || cat === "Crypto") &&
            router.locale == "ko"
              ? price.toLocaleString("en-us", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              : usdPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </h6>
          <p className="text-[12px] text-gray-500 mb-1">{t("tableLoss")}</p>
          <h6 className="text-[#DF1525] font-semibold">
            -{Exp_CVaR.toFixed(2)}%
          </h6>
        </article>
        <article className="text-center flex flex-col items-center">
          <Image
            src={`/images/weather/${weather}.svg`}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="w-16 mb-1"
          />
          <h6 className="text-xs">
            {router.locale == "ko" ? koreanWeatherExplain : weatherExplain}
          </h6>
        </article>
      </section>
      <section className="absolute left-0 bottom-0">
        <CardChart chartData={chartData} />
      </section>
    </main>
  );
};

export default WeatherCards;
