import { useState } from "react";
import Image from "next/image";

import chart from "assets/images/explore/m/chart.svg";
import arrow from "assets/icons/explore/rightArrow.svg";
import { EXPLORES } from "datas/explore";
import { COLORS } from "datas/main";
import { IMAGES } from "datas/weather";
import Pagination from "components/organisms/m/Pagination";

const Main = ({ views }: { views: number }) => {
  const [page, setPage] = useState(1);
  const [isOpenDetail, setIsOpenDetail] = useState(-1);
  const array = EXPLORES?.slice((page - 1) * views, page * views);

  return (
    <main className="bg-white ">
      {array.map((data, i) => (
        <section
          key={i}
          className={`border-gray-100 ${isOpenDetail !== i && "border-b"}`}
        >
          <article
            className="flex items-center py-4 cursor-pointer"
            onClick={() => setIsOpenDetail(i === isOpenDetail ? -1 : i)}
          >
            <Image src={data.image || ""} alt="" className="h-10 mr-3" />
            <div className="flex-1">
              <h6>{data.name}</h6>
              <p className="text-gray-500 text-xs">{data.subName}</p>
            </div>
            <div className={`py-1 px-3 rounded-20 ${COLORS[data.risk]} `}>
              <h6 className="text-xs">{data.risk}</h6>
            </div>
            <Image
              src={arrow}
              alt=""
              className={`ml-3 ${
                isOpenDetail === i ? "rotate-[270deg] " : "rotate-90 "
              }`}
            />
          </article>
          {isOpenDetail === i && (
            <article className="bg-gray-50 p-4 rounded-[8px] text-sm font-medium">
              <div className="flex mb-3">
                <p className="text-xs text-gray-400 flex-1">Maximum loss</p>
                <p className="text-[#DF1525]">-{data.maximumLoss}%</p>
              </div>
              <div className="flex mb-3">
                <p className="text-xs text-gray-400 flex-1">Price</p>
                <p className="text-gray-700">{data.price}</p>
              </div>
              <div className="flex mb-3">
                <p className="text-xs text-gray-400 flex-1">Price change</p>
                <p className="text-[#DF1525]">{data.priceChange}</p>
              </div>
              <div className="flex mb-3 items-center">
                <p className="text-xs text-gray-400 flex-1">Risk chart</p>
                <Image src={chart} alt="" />
              </div>
              <div className="flex items-center">
                <p className="text-xs text-gray-400 flex-1">Weather</p>
                <Image src={IMAGES[data.weatherIcon]} alt="" className="h-6" />
                <p className="text-xs text-gray-600 ml-2">{data.weather}</p>
              </div>
            </article>
          )}
        </section>
      ))}
      <Pagination
        total={EXPLORES.length}
        page={page}
        setPage={setPage}
        views={views}
      />
    </main>
  );
};

export default Main;
