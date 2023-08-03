import Image from "next/image";

import { COLORS } from "datas/main";
import useHandleImageError from "utils/useHandleImageError";
import MiniChart from "chart/MiniChart";
import { useRouter } from "next/router";

interface Props {
  name?: string;
  ticker?: string;
  riskLevel: string;
  koreanRiskLevel: string;
  maxLoss: number;
  EXP_CVaRNTS: number;
  price: number;
  currency?: string;
  priceChange?: string | number;
  chartData?: string | JSON;
  weather?: string;
  weatherExplain?: string;
  koreanWeatherExplain?: string;
  riskDescriptionKr?: string;
  riskDescriptionEn?: string;
  krName?: string;
  exchg: string;
}
const Items = ({
  exchg,
  EXP_CVaRNTS,
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
  chartData,
  weather,
  weatherExplain,
  koreanWeatherExplain,
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
      <td>{/* <h6 className="ml-8">{id + 1}</h6> */}</td>
      <td className="flex items-center py-3 ">
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
        <h6
          className="mr-3 text-sm w-[150px] truncate"
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
          className={`py-1 px-3 rounded-20 ${COLORS[riskLevel]} max-w-fit mx-auto flex items-center justify-center`}
        >
          <h6 className="text-xs">
            {router.locale == "ko" ? koreanRiskLevel : riskLevel}
          </h6>
        </div>
      </td>
      <td className="text-center text-[#DF1525] font-semibold">
        -{EXP_CVaRNTS.toFixed(2)}%
      </td>
      <td className="flex justify-center items-center">
        <MiniChart chartData={chartData} />
      </td>
      <td className="mr-8">
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
    </tr>
  );
};

export default Items;
