import Image from "next/image";

import { COLORS } from "datas/main";
import { IMAGES } from "datas/weather";
import { Card } from "types/main";

const Card = ({ data }: { data: Card }) => {
  const { image, name, subName, risk, maximumLoss, weatherIcon, weather } =
    data;

  return (
    <main className="mr-6 p-5 rounded-20 min-w-[296px] shadow-[0_0_12px_0_rgba(121,120,132,0.15)] overflow-auto">
      <section className="flex gap-3 items-start mb-3">
        <Image src={image || ""} alt="" />
        <article className="flex-1">
          <h6 className="mb-1">{name}</h6>
          <p className="text-[12px] text-gray-500">{subName}</p>
        </article>
        <div className={`py-1 px-3 rounded-20 text-center ${COLORS[risk]}`}>
          <h6 className="text-xs h-3.5">{risk}</h6>
        </div>
      </section>
      <section className="flex pt-3 justify-between mb-4">
        <p className="text-[12px] text-gray-500">Maximum loss</p>
        <h6 className="text-[#DF1525]">-{maximumLoss}%</h6>
      </section>
      <section className="text-center flex items-center justify-between bg-gray-100 rounded-20 pl-3 pr-4">
        <Image src={IMAGES[weatherIcon]} alt="" className="w-9" />
        <p className="text-xs font-medium">{weather}</p>
      </section>
    </main>
  );
};

export default Card;
