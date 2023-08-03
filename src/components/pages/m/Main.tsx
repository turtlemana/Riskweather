import Header from "components/templates/m/main/Header";
import NowTrending from "components/templates/m/main/NowTrending";
import RiskLevel from "components/templates/m/main/RiskLevel";
import RiskWeatherNews from "components/templates/m/main/RiskWeatherNews";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Main() {
  const router = useRouter();

  const [carouselType, setCarouselType] = useState(
    router.locale == "ko" ? "Korean Stock" : "Crypto"
  );
  const [trendingType, setTrendingType] = useState(
    router.locale == "ko" ? "Korea (South)" : "Crypto"
  );
  const [riskLevelType, setRiskLevelType] = useState("Very high");

  const { data: carouselDt, isValidating: carouselValid } = useSWR(
    `/api/carousel?type=${carouselType}`,
    fetcher
  );
  const { data: nowTrendingDt, isValidating: nowTrendingValid } = useSWR(
    `/api/nowTrending?type=${trendingType}`,
    fetcher
  );
  const { data: riskLevelDt, isValidating: riskLevelValid } = useSWR(
    `/api/riskLevel?level=${riskLevelType}`,
    fetcher
  );

  const carouselData = carouselDt ? [].concat(...carouselDt) : [];
  const nowTrendingData = nowTrendingDt ? [].concat(...nowTrendingDt) : [];
  const riskLevelData = riskLevelDt ? [].concat(...riskLevelDt) : [];

  return (
    <main className="min-w-[360px] bg-white">
      <Header
        carouselData={carouselData}
        carouselValid={carouselValid}
        carouselType={carouselType}
        setCarouselType={setCarouselType}
      />
      <NowTrending
        nowTrendingData={nowTrendingData}
        nowTrendingValid={nowTrendingValid}
        trendingType={trendingType}
        setTrendingType={setTrendingType}
      />
      <RiskLevel
        riskLevelData={riskLevelData}
        riskLevelValid={riskLevelValid}
        riskLevelType={riskLevelType}
        setRiskLevelType={setRiskLevelType}
      />
      {/* <RiskWeatherNews /> */}
    </main>
  );
}
