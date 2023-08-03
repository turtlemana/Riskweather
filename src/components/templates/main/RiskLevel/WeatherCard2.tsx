import Image from "next/image";

import { COLORS } from "datas/main";

import { useRouter } from "next/router";
import useHandleImageError from "utils/useHandleImageError";

interface Props {
  name?: string;
  ticker?: string;
  riskLevel: string;
  koreanRiskLevel?: string;
  EXP_CVaRNTS: number;
  maxLoss: number;
  price?: number;
  currency?: string;
  priceChange?: string | number;
  weather?: string;
  weatherExplain?: string;
  koreanWeatherExplain?: string;
  riskDescriptionEn?: string;
  riskDescriptionKr?: string;
  krName?: string;
  exchg: string;
}

const WeatherCard2 = ({
  EXP_CVaRNTS,
  exchg,
  krName,
  name,
  ticker,
  riskDescriptionEn,
  riskDescriptionKr,
  riskLevel,
  koreanRiskLevel,
  maxLoss,
  price,
  currency,
  priceChange,
  weather,
  weatherExplain,
  koreanWeatherExplain,
}: Props) => {
  const handleImageError = useHandleImageError();
  const router = useRouter();
  return (
    <main
      className="mr-4 border border-gray-100 p-5 cursor-pointer rounded-20 min-w-[296px] max-h-[210px] shadow-md overflow-auto"
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
            className="mb-1 text-sm w-[100px] truncate"
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
          className={`flex justify-center items-center truncate py-1 px-3 rounded-20 text-center ${COLORS[riskLevel]}`}
        >
          <h6 className="text-xs ">
            {router.locale == "ko" ? koreanRiskLevel : riskLevel}
          </h6>
        </div>
      </section>
      <section className="flex pt-3 justify-between mb-4">
        <p className="text-[12px] text-gray-500">
          {router.locale == "ko" ? "최악의 경우" : "Worst case"}
        </p>
        <h6 className="text-[#DF1525]">-{EXP_CVaRNTS.toFixed(2)}%</h6>
      </section>
      <section className="text-center flex items-center justify-between bg-gray-100 rounded-20 pl-3 pr-4">
        <Image
          src={`/images/weather/${weather}.svg`}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-9 h-auto"
        />
        <p className="text-xs font-medium">
          {router.locale == "ko" ? koreanWeatherExplain : weatherExplain}
        </p>
      </section>
    </main>
  );
};

export default WeatherCard2;
