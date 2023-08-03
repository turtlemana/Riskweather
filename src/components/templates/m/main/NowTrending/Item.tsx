import Image from "next/image";

import { COLORS } from "datas/main";
import { IMAGES } from "datas/weather";
import { Card } from "types/main";

const Item = ({ data }: { data: Card }) => {
  const { id, image, name, subName, risk, maximumLoss, weatherIcon, weather } =
    data;

  return (
    <section key={id} className="flex px-5 mb-6">
      <h6 className="mr-3 mt-2.5">{id + 1}</h6>
      <article className="flex-1">
        <section className="flex items-start mb-3">
          <Image src={image || ""} alt="" className="h-10 mr-3" />
          <div className="flex-1">
            <h6 className="mr-3">{name}</h6>
            <p className="text-gray-500 text-xs">{subName}</p>
          </div>
          <div
            className={`py-1 px-3 rounded-20 ${COLORS[risk]} max-w-fit mx-auto`}
          >
            <h6 className="text-xs">{risk}</h6>
          </div>
        </section>
        <section className="bg-gray-100 rounded-20 py-2 px-3 mx-auto flex items-center h-8 text-medium text-xs ">
          <p className="text-gray-400 mr-1.5">Max loss</p>
          <p className="text-[#DF1525] flex-1">-{maximumLoss}%</p>
          <Image src={IMAGES[weatherIcon]} alt="" className="mr-1.5 h-6" />
          <p className="text-gray-600">{weather}</p>
        </section>
      </article>
    </section>
  );
};

export default Item;