import Link from "next/link";
import Image from "next/image";
import { useState,useEffect } from "react";

import left from "assets/icons/main/left.svg";
import right from "assets/icons/main/right.svg";
import WeatherCards from "./WeatherCards";
import { CarouselData } from "interfaces/main";
import AdCard from "./AdCard";
import useWindowWidth from "utils/useWindowWidth";

interface Props {
    carouselData:CarouselData[];
}

const Carousels = ({ carouselData }: Props) => {
  const width=useWindowWidth();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout : NodeJS.Timeout;


    timeout = setTimeout(
      () => index * 4 > carouselData?.length ? setIndex(0) : setIndex((prev) => prev + 1),
      3000
    ) 

    

    return () => clearTimeout(timeout);
  }, [index,carouselData.length]);
  return (
    <div className="flex items-center  gap-5 justify-center min-w-[1024px] max-w-1320 mx-auto">
      <Image
        src={left}
        alt=""
        className={`w-10 cursor-pointer 
        ${index === 0 && "opacity-0"} `}
        onClick={() => index > 0 && setIndex((prev) => prev - 1)}
      />
      <div className="overflow-hidden">
        <div
          className={`flex gap-6 ease-in-out duration-1000 `}
          style={{ transform: `translateX(calc(${index}*-612px))` }}
        >
          {carouselData?.map((asset: CarouselData,i:number) => (
            <div key={i}>
                          {(width>1024 ? (i + 1) % 4 === 0 :(i + 1) % 3 === 0)   ? <AdCard/> :

            <Link href={`/detail/${asset['ITEM_CD_DL']}`}>
              <WeatherCards Exp_CVaR={asset['EXP_CVaRNTS']} exchg={asset['HR_ITEM_NM']} loc={asset['LOC']} krName={asset['ITEM_KR_NM']}  riskDescriptionEn={asset['LV_DSCP_ENG']}  riskDescriptionKr={asset['LV_DSCP_KR']} name={asset['ITEM_ENG_NM']} cat={asset['CAT']} ticker={asset['ITEM_CD_DL']} key={i} riskLevel={asset['CVaR_LV']} koreanRiskLevel={asset['CVaR_LV_KR']} maxLoss={asset['CVaRNTS']} price={asset['ADJ_CLOSE']} usdPrice={asset['ADJ_CLOSE_USD']} currency={asset['CURR']} priceChange={""} chartData={JSON.parse(asset['CHART'])} weather={asset['WTHR_ENG_NM']} weatherExplain={asset['WTHR_ENG_DL']} koreanWeatherExplain={asset['WTHR_KR_DL']} />
              {/* <AdCard/> */}
             </Link>}
            </div>
          //   <Link key={i} href={`/detail/${asset['ITEM_CD_DL']}`}>
          //   <WeatherCards Exp_CVaR={asset['EXP_CVaRNTS']} exchg={asset['HR_ITEM_NM']} loc={asset['LOC']} krName={asset['ITEM_KR_NM']}  riskDescriptionEn={asset['LV_DSCP_ENG']}  riskDescriptionKr={asset['LV_DSCP_KR']} name={asset['ITEM_ENG_NM']} cat={asset['CAT']} ticker={asset['ITEM_CD_DL']} key={i} riskLevel={asset['CVaR_LV']} koreanRiskLevel={asset['CVaR_LV_KR']} maxLoss={asset['CVaRNTS']} price={asset['ADJ_CLOSE']} usdPrice={asset['ADJ_CLOSE_USD']} currency={asset['CURR']} priceChange={""} chartData={JSON.parse(asset['CHART'])} weather={asset['WTHR_ENG_NM']} weatherExplain={asset['WTHR_ENG_DL']} koreanWeatherExplain={asset['WTHR_KR_DL']} />
          //   {/* <AdCard/> */}
          //  </Link>
            ))}
         
        </div>
      </div>
      <Image
        src={right}
        alt=""
        className={`w-10 cursor-pointer
        ${index * 4 > carouselData?.length && "opacity-0"} `}
        onClick={() => index * 4 < carouselData?.length && setIndex((prev) => prev + 1)}
      />
    </div>
  );
};

export default Carousels;
