import Image from "next/image";

import { COLORS } from "datas/main";
import useHandleImageError from "utils/useHandleImageError";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface Props {
    name?:string; 
    ticker?:string; 
    riskLevel:string;
    koreanRiskLevel?:string;
    EXP_CVaRNTS:number;
    maxLoss:number;
    price: number;
    currency?:string;
    priceChange?:string|number;
    chartData?: string | JSON;  
    weather?:string;
    weatherExplain?:string;
    koreanWeatherExplain?:string;
    id:number;
    krName?:string;
    exchg:string;
  }

const Items = ({EXP_CVaRNTS,exchg, name,krName,ticker,riskLevel, koreanRiskLevel, koreanWeatherExplain, maxLoss,price,currency, priceChange,chartData,weather,weatherExplain,id }: Props) => {
  const {t}=useTranslation('index')

    const router=useRouter();

    const handleImageError = useHandleImageError()

  return (
    <section  className="flex px-5 mb-6" onClick={()=>{router.push({pathname:`/detail/${ticker}`})}}>
      <h6 className="mr-3 mt-2.5">{id + 1}</h6>
      <article className="flex-1">
        <section className="flex items-start mb-3">
        <Image loading="eager" unoptimized  width={50} height={50} quality={100} onError={(event)=>handleImageError(event,exchg)} src={`/images/logos/${ticker}.png` || ""} alt="" className="h-10 w-10 mr-3 "/>           <div className="flex-1">
            <h6 className="mr-3 w-[150px] truncate">{router.locale=="ko" ? krName : name}</h6>
            <p className="text-gray-500 text-xs">{ticker}</p>
          </div>
          <div
            className={`py-1 px-3 rounded-20 ${COLORS[riskLevel]} max-w-fit mx-auto`}
          >
            <h6 className="text-xs">{router.locale=="ko" ? koreanRiskLevel : riskLevel}</h6>
          </div>
        </section>
        <section className="bg-gray-100 rounded-20 py-2 px-3 mx-auto flex items-center h-8 text-medium text-xs ">
          <p className="text-gray-400 mr-1.5">{t('tableLoss')}</p>
          <p className="text-[#DF1525] flex-1 font-semibold text-[13px]">-{EXP_CVaRNTS.toFixed(2)}%</p>
          <Image width={0} height={0} sizes="100vw" className="w-[30px] h-[30px]" src={`/images/weather/${weather}.svg`} alt="" />
          <p className="text-gray-600 ml-1">{router.locale=="ko" ? koreanWeatherExplain : weatherExplain}</p>
        </section>
      </article>
    </section>
  );
};

export default Items;