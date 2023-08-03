import { useState } from "react";
import Image from "next/image";

import { NEWS } from "datas/main";
import Pagination from "components/organisms/Pagination";

export default function News() {
  const [page, setPage] = useState(1);
  const NEWS_LIST = NEWS?.slice((page - 1) * 10, page * 10);

  return (
    <main className="mt-5 mb-[120px] px-5">
      <div className="p-8 max-w-1320 w-full mx-auto bg-white rounded-20 overflow-hidden">
        <h1 className="text-[28px] text-[#111111] mr-2 mb-10">
          Risk Weather News
        </h1>
        <section className="flex flex-col gap-7 min-h-[728px]">
          {NEWS_LIST.map(({ image, title, subTitle, date, id }, i) => (
            <main key={id}>
              <section className="flex gap-7 items-center mb-7">
                <Image src={image} alt="" className="w-[180px] h-[100px]" />
                <article>
                  <h1 className="text-gray-800 text-lg font-normal mb-4">
                    {id}
                    {title}
                  </h1>
                  <div className="flex gap-5 items-center">
                    <h2 className="text-[#0198ff] font-medium text-sm">
                      {subTitle}
                    </h2>
                    <div className="w-px h-3 bg-gray-300" />
                    <p className="text-gray-400 text-sm font-medium">{date}</p>
                  </div>
                </article>
              </section>
              {i < NEWS_LIST.length - 1 && <div className="h-px bg-gray-200" />}
            </main>
          ))}
        </section>
        <Pagination
          total={NEWS.length}
          page={page}
          setPage={setPage}
          views={10}
        />
      </div>
    </main>
  );
}
