import Image from "next/image";
import { useState } from "react";

import { RISKS, RISK_MENUS } from "datas/main";
import world from "assets/icons/main/world.svg";

const WorldRiskList = () => {
  const [index, setIndex] = useState(0);

  return (
    <main className="flex pt-[190px] mb-7 px-5">
      <div className="max-w-1320 w-full mx-auto bg-white flex rounded-20 overflow-hidden">
        <section className="w-[352px] max-h-[780px] flex flex-col">
          <article className="flex items-center p-8">
            <Image src={world} alt="" />
            <h5 className="h-5 ml-3">World Risk Weather List</h5>
          </article>
          <article className="pl-8 pr-7 mt-1 flex-1 overflow-auto customScrollBar">
            {RISKS.map(({ id, country, coin }) => (
              <div
                key={id}
                className="flex justify-between px-[14px] py-4 mt-1"
              >
                <h5>{country}</h5>
                <p>{coin.toLocaleString()} coins</p>
              </div>
            ))}
          </article>
        </section>
        <div className="flex-1 bg-[#0148ff] bg-opacity-[0.05]">
          <ul className="flex gap-2.5 p-8">
            {RISK_MENUS.map(({ id, title }) => (
              <li
                key={id}
                className={`py-2 px-3 rounded-[36px] text-center cursor-pointer hover:bg-[#F3F4F6] hover:text-gray-400 
                ${
                  index === id
                    ? "bg-black text-white"
                    : "bg-white text-gray-400"
                }`}
                onClick={() => setIndex(id)}
              >
                <h5 className="h-5">{title}</h5>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default WorldRiskList;
