import Image from "next/image";
import Link from "next/link";

import { NEWS } from "datas/main";
import arrow from "assets/icons/main/arrow.svg";
import Item from "components/templates/m/main/RiskWeatherNews/Item";

const RiskWeatherNews = () => {
  const array = NEWS.filter((data) => data.id < 3);

  return (
    <main className="pt-7 pb-[101px] px-5">
      <div>
        <Link href="/news" className="flex mb-7">
          <h1 className="text-[24px] text-[#111111] mr-2">Risk Weather News</h1>
          <Image src={arrow} alt="" className="w-6 mb-1" />
        </Link>
        <section className="flex flex-col gap-7">
          {array.map((data) => (
            <div key={data.id}>
              <Item data={data} />
              <div className="h-px bg-gray-100 mt-5" />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default RiskWeatherNews;
