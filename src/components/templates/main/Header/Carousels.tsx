import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react";

import left from "assets/icons/main/left.svg";
import right from "assets/icons/main/right.svg";
import WeatherCards from "./WeatherCards";
import { CarouselData } from "interfaces/main";
import AdCard from "./AdCard";
import useWindowWidth from "utils/useWindowWidth";

interface Props {
  carouselData: CarouselData[];
  setCarouselType: Dispatch<SetStateAction<string>>;
  carouselType: string;
}

const Carousels = ({ carouselData, setCarouselType, carouselType }: Props) => {
  const width = useWindowWidth();
  const [index, setIndex] = useState(0);

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

    timeout = setTimeout(
      () =>
        index * 4 > carouselData?.length
          ? intializeIndex()
          : setIndex((prev) => prev + 1),
      3000
    );

    return () => clearTimeout(timeout);
  }, [index]);

  const fixedNumbers = useMemo(() => {
    const fixedIndices = [];
    const fixedNumberMap = new Map();

    for (let i = 0; i < carouselData.length; i++) {
      if (
        (width > 1024 && (i + 1) % 4 === 0) ||
        (width <= 1024 && (i + 1) % 3 === 0)
      ) {
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
    <div className="flex items-center  gap-5 justify-center min-w-[1024px] max-w-1320 mx-auto">
      <Image
        src={left}
        alt=""
        className={`w-10 cursor-pointer 
        `}
        onClick={() =>
          index > 0 ? setIndex((prev) => prev - 1) : intializeLeftIndex()
        }
      />
      <div className="overflow-hidden">
        <div
          className={`flex gap-6 ease-in-out duration-1000 `}
          style={{ transform: `translateX(calc(${index}*-612px))` }}
        >
          {carouselData?.map((asset: CarouselData, i: number) => (
            <div key={i}>
              {(width > 1024 ? (i + 1) % 4 === 0 : (i + 1) % 3 === 0) ? (
                <AdCard rand={fixedNumbers.get(i)} />
              ) : (
                <Link href={`/detail/${asset["ITEM_CD_DL"]}`}>
                  <WeatherCards
                    Exp_CVaR={asset["EXP_CVaRNTS"]}
                    exchg={asset["HR_ITEM_NM"]}
                    loc={asset["LOC"]}
                    krName={asset["ITEM_KR_NM"]}
                    riskDescriptionEn={asset["LV_DSCP_ENG"]}
                    riskDescriptionKr={asset["LV_DSCP_KR"]}
                    name={asset["ITEM_ENG_NM"]}
                    cat={asset["CAT"]}
                    ticker={asset["ITEM_CD_DL"]}
                    key={i}
                    riskLevel={asset["CVaR_LV"]}
                    koreanRiskLevel={asset["CVaR_LV_KR"]}
                    maxLoss={asset["CVaRNTS"]}
                    price={asset["ADJ_CLOSE_KRW"]}
                    usdPrice={asset["ADJ_CLOSE_USD"]}
                    currency={asset["CURR"]}
                    priceChange={""}
                    chartData={JSON.parse(asset["CHART"])}
                    weather={asset["WTHR_ENG_NM"]}
                    weatherExplain={asset["WTHR_ENG_DL"]}
                    koreanWeatherExplain={asset["WTHR_KR_DL"]}
                  />
                  {/* <AdCard/> */}
                </Link>
              )}
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
        className={`w-10 cursor-pointer `}
        onClick={() =>
          index * 4 < carouselData?.length
            ? setIndex((prev) => prev + 1)
            : intializeIndex()
        }
      />
    </div>
  );
};

export default Carousels;
