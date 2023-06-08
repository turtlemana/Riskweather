import Link from "next/link";

import { NEWS } from "datas/main";
import Item from "components/templates/m/detail/RiskWeatherNews/Item";

const RiskWeatherNews = () => {
  return (
    <main className="py-6 px-5 bg-white pb-[150px]">
      <h1 className="text-xl text-[#111111] mb-1">Risk Weather News</h1>
      {NEWS.slice(0, 3).map((data) => (
        <Link
          key={data.id}
          href="/news"
          className="flex border-b border-gray-200 py-5"
        >
          <Item data={data} />
        </Link>
      ))}
    </main>
  );
};

export default RiskWeatherNews;