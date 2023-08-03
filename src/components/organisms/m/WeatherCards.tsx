import Image from "next/image";

import { COLORS } from "datas/main";
import { useRouter } from "next/router";
import useHandleImageError from 'utils/useHandleImageError'
import useHandleWeatherImageError from 'utils/useHandleWeatherImageError'
import useWindowWidth from "utils/useWindowWidth";


interface Props {
    name?:string; 
    ticker?:string; 
    riskLevel:string;
    koreanRiskLevel?:string;
    maxLoss:number;
    EXP_CVaRNTS:number;
    price: number;
    currency?:string;
    priceChange?:string|number;
    weather?:string;
    weatherExplain?:string;
    krName?:string;
    koreanWeatherExplain?:string;
    exchg:string;
  }

const WeatherCards = ({EXP_CVaRNTS,exchg, name,ticker,krName, riskLevel,koreanRiskLevel,maxLoss,price,currency, priceChange,weather,weatherExplain, koreanWeatherExplain }: Props) => {
 
  const width = useWindowWidth();
  const handleImageError = useHandleImageError();
  const handleWeatherImageError = useHandleWeatherImageError();
  

  const router=useRouter();


  return (
    <main className={` rounded-20 ${width<650 ?  'min-w-[100%] p-5' : 'min-w-[48.3%] p-3'}  border shadow-[0_0_12px_0_rgba(121,120,132,0.15)] `} onClick={()=>{router.push({pathname:`/detail/${ticker}`})}}>
      <section className="flex gap-3 items-start mb-6">
      <Image loading="eager" unoptimized  width={50} height={50} quality={100} onError={(event)=>handleImageError(event,exchg)} src={`/images/logos/${ticker}.png` || ""} alt="" className="h-10 w-10 mr-3 "/>
        <article className="flex-1">
          <h6 className="mb-1 w-[120px] truncate">{router.locale=="ko" ? krName : name}</h6>
          <p className="text-xs text-gray-500">{ticker}</p>
        </article>
        <div className={`truncate py-1 px-3 rounded-20 text-center flex items-center justify-center ${COLORS[riskLevel]}`}>
          <h6 className={`${riskLevel=="Very high" ||(riskLevel=="Moderate" && router.locale=="en") ? "text-[10px]" : "text-xs"}   `}>{router.locale=="ko" ? koreanRiskLevel:riskLevel}</h6>
        </div>
      </section>
      <section className="flex justify-between items-center mb-5 text-center">
        <p className="text-xs text-gray-500">{router.locale=="ko" ? "최악의 경우" : "Worst case"}</p>
        <h6 className="text-[#DF1525]">-{EXP_CVaRNTS.toFixed(2)}%</h6>
      </section>
      <section className="text-center flex items-center justify-between bg-gray-100 rounded-20 pl-3 pr-4 py-0.5">
      <Image loading="eager" src={`/images/weather/${weather}.svg`} onError={handleWeatherImageError} alt="" width={0} height={0}  className="w-9 h-auto mb-1"  />
        <p className="text-xs font-medium text-gray-600">{router.locale=="ko" ? koreanWeatherExplain : weatherExplain}</p>
      </section>
    </main>
  );
};

export default WeatherCards;