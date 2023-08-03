import Image from "next/image";

import { COLORS } from "datas/main";

import { useRouter } from "next/router";
import useHandleImageError from "utils/useHandleImageError";


interface Props {
    name?:string; 
    ticker?:string; 
    riskLevel:string;
    koreanRiskLevel?:string;
  EXP_CVaRNTS:number;
    maxLoss:number;
    price?: number;
    currency?:string;
    priceChange?:string|number;
    weather?:string;
    weatherExplain?:string;
    koreanWeatherExplain?:string;
    krName?:string;
    exchg:string;

  }


const WeatherCard2 = ({exchg,EXP_CVaRNTS, name,ticker,krName, riskLevel,koreanRiskLevel, maxLoss,price,currency, priceChange,weather,weatherExplain, koreanWeatherExplain }: Props) => {
  const width = typeof window !== 'undefined' ? window.innerWidth : screen.width;

  const router = useRouter();

  const handleImageError = useHandleImageError()
  return (
    <main className={`p-5 rounded-20 ${width<650 ?  'min-w-[100%] ' : 'min-w-[48.25%]'}  border shadow-[0_0_12px_0_rgba(121,120,132,0.15)]`} onClick={()=>{router.push({pathname:`/detail/${ticker}`})}}>
      <section className="flex gap-3 items-start mb-6">
      <Image loading="eager" unoptimized  width={50} height={50} quality={100} onError={(event)=>handleImageError(event,exchg)} src={`/images/logos/${ticker}.png` || ""} alt="" className="h-10 w-10 mr-3 "/>         <article className="flex-1">
          <h6 className="mb-1 w-[100px] text-sm truncate">{router.locale=="ko" ? krName : name}</h6>
          <p className="text-xs text-gray-500">{ticker}</p>
        </article>
        <div className={`py-1 px-3 rounded-20 text-center ${COLORS[riskLevel]} flex justify-center items-center`}>
          <h6 className={`${riskLevel=="Very high" || riskLevel=="Moderate" ? "text-[10px]" : "text-xs"}   `}>{router.locale=="ko" ? koreanRiskLevel : riskLevel}</h6>
        </div>
      </section>
      <section className="flex justify-between mb-5">
        <p className="text-xs text-gray-500">{router.locale=="ko" ? "최악의 경우" : "Worst case"}</p>
        <h6 className="text-[#DF1525]">-{EXP_CVaRNTS.toFixed(2)}%</h6>
      </section>
      <section className="text-center flex items-center justify-between bg-gray-100 rounded-20 pl-3 pr-4 py-0.5">
      <Image loading="eager" src={`/images/weather/${weather}.svg`} alt="" width={0} height={0} sizes="100vw" className="w-9 h-auto"  />
        <p className="text-xs font-medium text-gray-600">{router.locale=="ko" ? koreanWeatherExplain : weatherExplain}</p>
      </section>
    </main>
  );
};

export default WeatherCard2;