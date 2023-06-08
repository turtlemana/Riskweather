import { useEffect, useState,useRef,TouchEvent } from "react";

import WeatherCards from "components/organisms/m/WeatherCards"
import { CarouselData } from "interfaces/organism";
import useWindowWidth from "utils/useWindowWidth";

interface Props {
    carouselData:CarouselData[];
}


const Carousels = ({ carouselData }: Props) => {

  const [index, setIndex] = useState(0);
  const width = useWindowWidth();

  useEffect(() => {
    let timeout : NodeJS.Timeout;

    if (width < 650) {
    timeout = setTimeout(
      () => setIndex(index + 1 >= carouselData?.length ? 0 : index + 1),
      3000
    ) } 
    else {
    timeout = setTimeout(
        () => setIndex(index + 1 >= carouselData?.slice(0,carouselData.length/2).length ? 0 : index + 1),
        3000
      ) } 

    

    return () => clearTimeout(timeout);
  }, [index,carouselData.length]);

  const touchStartPoint = useRef(0);
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const { screenX } = e.changedTouches[0];
    touchStartPoint.current = screenX;
  };
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const { screenX } = e.changedTouches[0];
    // 감도 설정
    if (Math.abs(touchStartPoint.current - screenX) < 50) return;
    const toRight = touchStartPoint.current > screenX;
    if (width < 768) {
      if (toRight && index < carouselData.length - 1) {
        setIndex((prev) => prev + 1);
      } else if (!toRight && index > 0) {
        setIndex((prev) => prev - 1);
      }
    }
    else {
      if (toRight && index < (carouselData.length)/2 - 1) {
        setIndex((prev) => prev + 1);
      } else if (!toRight && index > 0) {
        setIndex((prev) => prev - 1);
      }
    }
  };



  return (
    <div className="flex items-center gap-5 justify-center w-full">
      <div className="overflow-hidden">
        <div
          className="flex mb-5 ease-in-out duration-500 gap-5"
          style={{
            transform: `translateX(calc(${index}*-100% - ${index} * ${width > 650 ? "15px" : "20px"}))`,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {carouselData?.map((asset:CarouselData, i:number) => (

              <WeatherCards EXP_CVaRNTS={asset['EXP_CVaRNTS']} exchg={asset['HR_ITEM_NM']} name={asset['ITEM_ENG_NM']} krName={asset['ITEM_KR_NM']} ticker={asset['ITEM_CD_DL']} key={i} koreanRiskLevel={asset["CVaR_LV_KR"]} riskLevel={asset['CVaR_LV']} maxLoss={asset['CVaRNTS']} price={asset['ADJ_CLOSE']} currency={asset['CURR']} priceChange={""}  weather={asset['WTHR_ENG_NM']} koreanWeatherExplain={asset['WTHR_KR_DL']} weatherExplain={asset['WTHR_ENG_DL']} />
          
          ))}
        </div>
        <div className="flex gap-1.5 justify-center">
          {width >=650 ? 
             carouselData.slice(0,(carouselData?.length)/2).map(({ ITEM_CD_DL }:{ITEM_CD_DL:string}, i:number) => (
              <button
                onClick={() => setIndex(i)}
                className={`cursor-pointer ${
                  index === i ? "bg-[#0198FF] " : "bg-gray-200 "
                }w-2 h-2 rounded-20`}
                key={i}
              />
            ))
          
          : 
          
          carouselData?.map(({ ITEM_CD_DL }:{ITEM_CD_DL:string}, i:number) => (
            <button
              onClick={() => setIndex(i)}
              className={`cursor-pointer ${
                index === i ? "bg-[#0198FF] " : "bg-gray-200 "
              }w-2 h-2 rounded-20`}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousels;