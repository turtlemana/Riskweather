import {
  useEffect,
  useState,
  useRef,
  TouchEvent,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import WeatherCards from "components/organisms/m/WeatherCards";
import AdCard from "components/templates/m/main/Header/AdCard";
import { CarouselData } from "interfaces/organism";
import useWindowWidth from "utils/useWindowWidth";

interface Props {
  carouselData: CarouselData[];
  setCarouselType: Dispatch<SetStateAction<string>>;
  carouselType: string;
}

const Carousels = ({ carouselData, setCarouselType, carouselType }: Props) => {
  const [index, setIndex] = useState(0);
  const width = useWindowWidth();
  const intializeIndex = () => {
    setIndex(0);
    if (carouselType === "Korean Stock") {
      setCarouselType("Stock");
    } else if (carouselType === "Stock") {
      setCarouselType("Index");
    } else if (carouselType === "Index") {
      setCarouselType("Crypto");
    } else {
      setCarouselType("Korean Stock");
    }
  };
  const intializeLeftIndex = () => {
    setIndex(0);
    if (carouselType === "Korean Stock") {
      setCarouselType("Crypto");
    } else if (carouselType === "Stock") {
      setCarouselType("Korean Stock");
    } else if (carouselType === "Index") {
      setCarouselType("Stock");
    } else {
      setCarouselType("Index");
    }
  };
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (width < 650) {
      timeout = setTimeout(
        () =>
          index + 1 >= carouselData?.length
            ? intializeIndex()
            : setIndex((prevIndex) => prevIndex + 1),
        3000
      );
    } else {
      timeout = setTimeout(
        () =>
          index + 1 >= carouselData?.slice(0, carouselData.length / 2).length
            ? intializeIndex()
            : setIndex((prevIndex) => prevIndex + 1),
        3000
      );
    }

    return () => clearTimeout(timeout);
  }, [index, carouselData.length]);

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
        setIndex((prevIndex) => prevIndex + 1);
      } else if (!toRight && index > 0) {
        setIndex((prevIndex) => prevIndex - 1);
      }
    } else {
      if (toRight && index < carouselData.length / 2 - 1) {
        setIndex((prevIndex) => prevIndex + 1);
      } else if (!toRight && index > 0) {
        setIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  const fixedNumbers = useMemo(() => {
    const fixedIndices = [];
    const fixedNumberMap = new Map();

    for (let i = 0; i < carouselData.length; i++) {
      if ((i + 1) % 3 === 0) {
        fixedIndices.push(i);
      }
    }

    fixedIndices.forEach((index) => {
      const randomNumber = Math.random();
      fixedNumberMap.set(index, randomNumber);
    });

    return fixedNumberMap;
  }, [carouselData, width]);

  return (
    <div className="flex items-center gap-5 justify-center w-full ">
      <div className="overflow-hidden">
        <div
          className="flex  mb-5 ease-in-out duration-500 gap-5"
          style={{
            transform: `translateX(calc(${index}*-100% - ${index} * ${
              width > 650 ? "18px" : "20px"
            }))`,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {carouselData?.map((asset: CarouselData, i: number) => {
            if ((i + 1) % 3 === 0) {
              return <AdCard key={i} rand={fixedNumbers.get(i)} />;
            } else {
              return (
                <WeatherCards
                  EXP_CVaRNTS={asset["EXP_CVaRNTS"]}
                  exchg={asset["HR_ITEM_NM"]}
                  name={asset["ITEM_ENG_NM"]}
                  krName={asset["ITEM_KR_NM"]}
                  ticker={asset["ITEM_CD_DL"]}
                  key={i}
                  koreanRiskLevel={asset["CVaR_LV_KR"]}
                  riskLevel={asset["CVaR_LV"]}
                  maxLoss={asset["CVaRNTS"]}
                  price={asset["ADJ_CLOSE"]}
                  currency={asset["CURR"]}
                  priceChange={""}
                  weather={asset["WTHR_ENG_NM"]}
                  koreanWeatherExplain={asset["WTHR_KR_DL"]}
                  weatherExplain={asset["WTHR_ENG_DL"]}
                />
              );
            }
          })}
        </div>
        <div className="flex gap-1.5 justify-center">
          {width > 650
            ? carouselData
                .slice(0, carouselData?.length / 2)
                .map(({ ITEM_CD_DL }: { ITEM_CD_DL: string }, i: number) => (
                  <button
                    onClick={() => setIndex(i)}
                    className={`cursor-pointer ${
                      index === i ? "bg-[#0198FF] " : "bg-gray-200 "
                    }w-2 h-2 rounded-20`}
                    key={i}
                  />
                ))
            : carouselData?.map(
                ({ ITEM_CD_DL }: { ITEM_CD_DL: string }, i: number) => (
                  <button
                    onClick={() => setIndex(i)}
                    className={`cursor-pointer ${
                      index === i ? "bg-[#0198FF] " : "bg-gray-200 "
                    }w-2 h-2 rounded-20`}
                    key={i}
                  />
                )
              )}
        </div>
      </div>
    </div>
  );
};

export default Carousels;
