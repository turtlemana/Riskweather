import Image from "next/image";
import { useState } from "react";
import { CarouselData } from "interfaces/main";
import left from "assets/icons/main/left.svg";
import right from "assets/icons/main/right.svg";
import WeatherCard2 from "components/templates/main/RiskLevel/WeatherCard2";

interface Props {
  carouselData: CarouselData[];
}

const Carousels = ({ carouselData }: Props) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex items-center justify-center max-w-1320  mx-auto ">
      <Image
        src={left}
        alt=""
        className={`w-10 cursor-pointer 
        ${index === 0 && "opacity-0"} `}
        onClick={() => index > 0 && setIndex((prev) => prev - 1)}
      />
      <div className="overflow-hidden h-full mb-2 ">
        <div
          className={`flex justify-start  ease-in-out duration-1000`}
          style={{ transform: `translateX(calc(${index}*-612px))` }}
        >
          {carouselData?.map((asset: CarouselData, i: number) => (
            <WeatherCard2
              EXP_CVaRNTS={asset["EXP_CVaRNTS"]}
              exchg={asset["HR_ITEM_NM"]}
              riskDescriptionEn={asset["LV_DSCP_ENG"]}
              riskDescriptionKr={asset["LV_DSCP_KR"]}
              name={asset["ITEM_ENG_NM"]}
              ticker={asset["ITEM_CD_DL"]}
              key={i}
              riskLevel={asset["CVaR_LV"]}
              koreanRiskLevel={asset["CVaR_LV_KR"]}
              maxLoss={asset["CVaRNTS"]}
              weather={asset["WTHR_ENG_NM"]}
              weatherExplain={asset["WTHR_ENG_DL"]}
              koreanWeatherExplain={asset["WTHR_KR_DL"]}
            />
          ))}
        </div>
      </div>
      <Image
        src={right}
        alt=""
        className={`w-10 cursor-pointer
        ${index * 4 > carouselData?.length && "opacity-0"} `}
        onClick={() =>
          index * 4 < carouselData?.length && setIndex((prev) => prev + 1)
        }
      />
    </div>
  );
};

export default Carousels;
