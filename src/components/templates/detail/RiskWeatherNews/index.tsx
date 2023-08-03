import Link from "next/link";
import Image from "next/image";

import { NEWS } from "datas/main";
import arrow from "assets/icons/main/arrow.svg";
import Item from "components/templates/detail/RiskWeatherNews/Item";

const RiskWeatherNews = () => {
  const array = NEWS.filter((data) => data.id < 3);

  return (
    <main className="mb-[120px]">
      <div className="p-8 max-w-1320 w-full mx-auto bg-white rounded-20 overflow-hidden">
        <Link href="/news" className="flex mb-10">
          <h1 className="text-[28px] text-[#111111] mr-2">Risk Weather News</h1>
          <Image src={arrow} alt="" />
        </Link>
        <section className="flex flex-col gap-7">
          {array.map((data) => (
            <div key={data.id}>
              <Item data={data} />
              {data.id !== 2 && <div className="h-px bg-gray-200 mt-7" />}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default RiskWeatherNews;
