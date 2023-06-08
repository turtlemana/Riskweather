import { useState } from "react";
import Image from "next/image";

import { NEWS } from "datas/main";
import Pagination from "components/organisms/m/Pagination";

export default function News() {
  const [page, setPage] = useState(1);
  const NEWS_LIST = NEWS?.slice((page - 1) * 5, page * 5);

  return (
    <main className="pt-6 px-5 bg-white">
      <h1 className="text-2xl text-[#111111] mb-9">Risk Weather News</h1>
      <section className="flex flex-col gap-5 min-h-[504px]">
        {NEWS_LIST.map(({ image, title, subTitle, date, id }, i) => (
          <main key={id}>
            <section className="flex gap-4 items-center mb-5">
              <Image src={image} alt="" className="w-[104px] h-[64px]" />
              <article>
                <p className="text-gray-800 text-sm mb-2">
                  {id}
                  {title}
                </p>
                <div className="flex gap-3 items-center text-xs">
                  <h2 className="text-[#0198ff] font-medium">{subTitle}</h2>
                  <div className="w-px h-3 bg-gray-300" />
                  <p className="text-gray-400">{date}</p>
                </div>
              </article>
            </section>
            {i < NEWS_LIST.length - 1 && <div className="h-px bg-gray-200" />}
          </main>
        ))}
      </section>
      <Pagination total={NEWS.length} page={page} setPage={setPage} views={5} />
    </main>
  );
}
