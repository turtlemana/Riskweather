import { useState,Dispatch,SetStateAction } from "react";
import arrow from "assets/icons/main/arrow.svg";
import { COLORS } from "datas/main";

import { RISK_LEVELS} from "datas/main";
import WeatherCard2 from "./WeatherCard2";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import Indicator from "components/templates/detail/Assets/Indicator";
import left from "assets/icons/detail/left.svg";
import right from "assets/icons/detail/right.svg";
import { useExploreState } from "contexts/ExploreStateContext";
import { RiskLevelData } from "interfaces/main";
import useWindowWidth from "utils/useWindowWidth";

interface Props{
  riskLevelData:RiskLevelData[]; 
  riskLevelType:string;
  setRiskLevelType:Dispatch<SetStateAction<string>>;
  riskLevelValid:boolean;
}

const RiskLevel = ({riskLevelData,riskLevelType,setRiskLevelType}:Props) => {
  const width=useWindowWidth();
  const {t}=useTranslation('index')
  const [index, setIndex] = useState(1);
  const array=width > 1280 ? riskLevelData.slice((index-1) * 4, index*4) : riskLevelData.slice((index-1) * 3, index*3)
  const isFirst = index === 1;
  const isLast = width > 1280 ? index * 4 >= riskLevelData.length : index * 3 >= riskLevelData.length;
  const handlePrev = () => !isFirst && setIndex(index - 1);
  const handleNext = () => !isLast && setIndex(index + 1);
  const {dispatch}=useExploreState();


  const router=useRouter();
  return (
    <main className="mb-7 px-5 min-w-[1024px] ">
      <div className="p-8  max-w-1320 w-full mx-auto bg-white rounded-20 overflow-auto ">
        <article className="flex justify-between mb-10 ">
          <h1 className="text-[28px] text-[#111111]">{t('riskLevelTitle')}</h1>
          <div onClick={()=>{ dispatch({ type: 'RESET_VALUE' }); router.push({pathname:`/${router.locale}/explore`, query:{type:riskLevelType}})}} className={'flex items-center cursor-pointer'}>

          <button type="button" className="flex items-center py-3 px-4 mr-2  text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{t('toExplore')}
            <Image
                src={arrow}
                alt=""
                className="w-4 ml-2  "
              />
          </button>

              </div>
        </article>
       <div className={'flex justify-between'}>
        <ul className="mb-7 flex gap-2.5 ">
          {RISK_LEVELS.map(({ id, title,koreanTitle }) => (
            <li
              key={id}
              className={`py-2 px-3 rounded-[36px] text-center cursor-pointer ${
                riskLevelType === title
                  ? "bg-black text-white"
                  : `border border-gray-200 ${COLORS[title]} text-gray-400`
              }`}
              onClick={() => {setRiskLevelType(title);setIndex(1)}}
            >
              <h5 className={`h-5 ${riskLevelType != title ? COLORS[title]:""} `}>{router.locale=="ko" ? koreanTitle : title}</h5>
            </li>
          ))}
      
        </ul>
        <article className="flex">
            <Image
              src={left}
              alt=""
              onClick={handlePrev}
              className={`${isFirst && "opacity-0"} 
              ${!isFirst && "cursor-pointer"}`}
            />
            <Image
              src={right}
              alt=""
              onClick={handleNext}
              className={`${isLast && "opacity-0"} ${
                !isLast && "cursor-pointer"
              }`}
            />
          </article>
        </div>
        <div className="flex">
          {array.map(({HR_ITEM_NM,EXP_CVaRNTS, ITEM_KR_NM,CVaRNTS, CVaR_LV, CVaR_LV_KR,ITEM_CD_DL, ITEM_ENG_NM, WTHR_ENG_DL, WTHR_ENG_NM, WTHR_KR_DL, WTHR_KR_NM, LV_DSCP_KR, LV_DSCP_ENG}:RiskLevelData, i:number) => (
            <WeatherCard2 key={i} EXP_CVaRNTS={EXP_CVaRNTS} exchg={HR_ITEM_NM} krName={ITEM_KR_NM} name={ITEM_ENG_NM} ticker={ITEM_CD_DL} riskLevel={CVaR_LV} koreanRiskLevel={CVaR_LV_KR} maxLoss={CVaRNTS} riskDescriptionKr={LV_DSCP_KR} riskDescriptionEn={LV_DSCP_ENG} weather={WTHR_ENG_NM} weatherExplain={WTHR_ENG_DL} koreanWeatherExplain={WTHR_KR_DL} />
          ))}
        </div>
        <Indicator
          total={riskLevelData.length}
          page={index}
          setPage={setIndex}
          width={width}
        />
      </div>
    </main>
  );
};

export default RiskLevel;
