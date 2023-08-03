import Image from "next/image";

import { COLORS } from "datas/main";
import { IMAGES } from "datas/weather";
import { Card } from "types/main";
import graph from "assets/icons/main/graph.svg";
import bitcoin from "assets/icons/main/bitcoin.png";

const WeatherCard = ({ data }: { data: Card }) => {
  const { name, subName, maximumLoss, weather, price, risk, weatherIcon } =
    data;

  return (
    <main className="relative p-5 rounded-20 cursor-pointer bg-white min-w-[282px] h-[262px]">
      <section className="flex gap-3 items-start mb-3">
        <Image src={bitcoin} alt="" />
        <article className="flex-1">
          <h6 className="mb-1">{name}</h6>
          <p className="text-[12px] text-gray-500">{subName}</p>
        </article>
        <div
          data-tooltip-id="riskExplain"
          data-tooltip-content="HI!"
          className={`py-1 px-3 rounded-20 text-center ${COLORS[risk]}`}
        >
          <h6 className="h-5">{risk}</h6>
        </div>
      </section>
      <section className="flex gap-3 items-start mb-6">
        <article className="flex-1 pt-3">
          <h6 className="mb-1">
            ${price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h6>
          <p className="text-[12px] text-gray-500 mb-1">Maximum loss</p>
          <h6 className="text-[#DF1525]">-{maximumLoss}%</h6>
        </article>
        <article className="text-center flex flex-col items-center">
          <Image src={IMAGES[weatherIcon]} alt="" className="w-16 mb-1" />
          <h6 className="text-xs">{weather}</h6>
        </article>
      </section>
      <Image src={graph} alt="" className="absolute left-0 bottom-0" />
    </main>
  );
};

export default WeatherCard;
