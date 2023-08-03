import Header from "components/templates/main/Header";
import NowTrending from "components/templates/main/NowTrending";
import WorldMap from "components/templates/main/WorldMap";
import RiskLevel from "components/templates/main/RiskLevel";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import { IndexData } from "interfaces/main";

interface Props {
  indexData: IndexData[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Main({ indexData }: Props) {
  const router = useRouter();

  const [carouselType, setCarouselType] = useState(
    router.locale == "ko" ? "Korean Stock" : "Crypto"
  );
  const [trendingType, setTrendingType] = useState(
    router.locale == "ko" ? "Korea (South)" : "Crypto"
  );
  const [riskLevelType, setRiskLevelType] = useState("Very high");
  const [mapSelect, setMapSelect] = useState("");

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
  const { data: locDt, isValidating: locValid } = useSWR(
    mapSelect ? `/api/mapResult?mapSelect=${mapSelect}` : null,
    fetcher
  );

  const carouselData = carouselDt ? [].concat(...carouselDt) : [];
  const nowTrendingData = nowTrendingDt ? [].concat(...nowTrendingDt) : [];
  const riskLevelData = riskLevelDt ? [].concat(...riskLevelDt) : [];
  const locData = locDt ? [].concat(...locDt) : [];

  return (
    <main className={"min-w-[1024px]"}>
      <Header
        carouselData={carouselData}
        carouselValid={carouselValid}
        carouselType={carouselType}
        setCarouselType={setCarouselType}
      />
      <WorldMap
        mapIndexData={indexData}
        locData={locData}
        locValid={locValid}
        mapSelect={mapSelect}
        setMapSelect={setMapSelect}
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
