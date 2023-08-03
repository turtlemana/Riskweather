import Header from "components/templates/m/learn/Hearder";
import WeatherCard from "components/templates/m/learn/WeatherCard";
import RisksImportance from "components/templates/m/learn/RisksImportance";
import Risk from "components/templates/m/learn/Risk";
import Model from "components/templates/m/learn/Model";
import Info from "components/templates/m/learn/Info";
import RiskInfo from "components/templates/m/learn/RiskInfo";
import Portfolio from "components/templates/m/learn/Portfolio";
import Profile from "components/templates/m/learn/Profile";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { HEADER } from "datas/learn";

const Learn = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  return (
    <main className={"min-w-[360px]"}>
      <Header />
      <div className="sticky top-16 flex p-5 bg-white gap-2.5 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] border-b overflow-scroll customScrollBar">
        {HEADER.map(({ id, title, koreanTitle, englishTitle }) => (
          <div
            key={id}
            className={`py-2 px-2.5 text-sm font-bold hover:bg-gray-100 hover:text-gray-500 border hover:border-gray-100 cursor-pointer rounded-20 h-9 min-w-fit
          ${
            id === index
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-400 border-gray-200"
          }`}
            onClick={() => setIndex(id)}
          >
            <Link href={`#${title}`}>
              {router.locale == "ko" ? koreanTitle : englishTitle}
            </Link>
          </div>
        ))}
      </div>
      <WeatherCard />
      <RisksImportance />
      <Risk />
      <Model />
      <Info />
      <RiskInfo />
      <Portfolio />
      <Profile />
    </main>
  );
};

export default Learn;
