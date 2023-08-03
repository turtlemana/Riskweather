import Image from "next/image";

import { COLORS } from "datas/main";

import arrow from "assets/icons/explore/rightArrow.svg";
import { useRouter } from "next/router";
import MiniChart from "chart/MiniChart";
import useHandleImageError from "utils/useHandleImageError";

interface Props {
  name?: string;
  ticker?: string;
  riskLevel: string;
  EXP_CVaRNTS: number;
  maxLoss?: number;
  price: number;
  currency?: string;
  priceChange?: string | number;
  chartData?: string | JSON;
  weather?: string;
  weatherExplain?: string;
  priceChg: number;
  cat: string;
  usdPrice: number;
  koreanRiskLevel: string;
  koreanWeatherExplain: string;
  riskDescriptionKr: string;
  riskDescriptionEn: string;
  krName?: string;
  curr?: string;
  loc?: string;
  exchg: string;
}

const Items = ({
  EXP_CVaRNTS,
  curr,
  exchg,
  loc,
  krName,
  name,
  ticker,
  riskLevel,
  riskDescriptionEn,
  riskDescriptionKr,
  koreanRiskLevel,
  koreanWeatherExplain,
  usdPrice,
  cat,
  priceChg,
  maxLoss,
  price,
  currency,
  priceChange,
  chartData,
  weather,
  weatherExplain,
}: Props) => {
  const router = useRouter();

  const handleImageError = useHandleImageError();

  return (
    <tr
      className="border-b border-gray-100 cursor-pointer"
      onClick={() => {
        router.push({ pathname: `/detail/${ticker}` });
      }}
    >
      <td className="flex items-center py-3 pl-8">
        <Image
          loading="eager"
          unoptimized
          width={50}
          height={50}
          quality={100}
          onError={(event) => handleImageError(event, exchg)}
          src={`/images/logos/${ticker}.png`}
          alt=""
          className="h-10 w-10 mr-3"
        />
        <h6
          className="mr-3 text-md w-[150px] truncate"
          title={router.locale == "ko" ? krName : name}
        >
          {router.locale == "ko" ? krName : name}
        </h6>
        <p className="text-gray-500 text-xs">{ticker}</p>
      </td>
      <td>
        <div
          data-tooltip-id="riskLevel"
          data-tooltip-content={
            router.locale == "ko" ? riskDescriptionKr : riskDescriptionEn
          }
          className={`py-1 px-3 rounded-20 ${COLORS[riskLevel]} max-w-fit mx-auto`}
        >
          <h6 className="text-xs">
            {router.locale == "ko" ? koreanRiskLevel : riskLevel}
          </h6>
        </div>
      </td>
      <td className="text-center text-[#DF1525] font-semibold">
        -{EXP_CVaRNTS?.toFixed(2)}%
      </td>
      <td className="text-center font-medium">
        {cat == "Index" ? "" : curr === "KRW" ? "￦" : "$"}{" "}
        {curr === "KRW"
          ? price.toLocaleString("en-us", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          : price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
      </td>
      {/* <td className="text-center font-medium">{cat=="Index" ? "" : loc=="Korea (South)" &&router.locale=="ko" ? "￦" : "$"}{" "}{loc=="Korea (South)"&&router.locale=="ko" ? price.toLocaleString('en-us') :  usdPrice.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td> */}
      <td
        className={`font-semibold text-center ${
          priceChg > 0 ? "text-[#3CB043]" : "text-[#DF1525]"
        }`}
      >
        {priceChg.toFixed(2)}%
      </td>
      <td className="flex justify-center">
        <MiniChart chartData={chartData} />
        {/* <Image width={0} height={0} sizes="100vw" className="w-auto h-auto" src={'/images/icons/main/chart.svg' || ""} alt="" /> */}
      </td>
      <td>
        <div className="rounded-20 bg-gray-100 py-[2px] pl-3 pr-4 max-w-[174px] mx-auto flex items-center justify-between ">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-auto"
            src={`/images/weather/${weather}.svg`}
            alt=""
          />
          <p className="text-xs text-gray-600 font-medium">
            {router.locale == "ko" ? koreanWeatherExplain : weatherExplain}
          </p>
        </div>
      </td>
      <td>
        <Image src={arrow} alt="" />
      </td>
    </tr>
  );
};

export default Items;
