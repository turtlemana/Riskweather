import Link from "next/link";
import { useEffect, useState } from "react";

import { Card } from "types/main";
import WeatherCard from "components/organisms/m/WeatherCard";

const Carousel = ({ list }: { list: Card[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(
      () => setIndex(index + 1 >= list.length ? 0 : index + 1),
      5000
    );

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="flex items-center gap-5 justify-center w-full">
      <div className="overflow-hidden">
        <div
          className="flex mb-5 ease-in-out duration-500 gap-5"
          style={{
            transform: `translateX(calc(${index}*-100% - ${index}*20px))`,
          }}
        >
          {list.map((data) => (
            <Link
              href={`/detail/${data.id}`}
              key={data.id}
              className="min-w-full px-5"
            >
              <WeatherCard data={data} />
            </Link>
          ))}
        </div>
        <div className="flex gap-1.5 justify-center">
          {list.map(({ id }, i) => (
            <button
              onClick={() => setIndex(i)}
              className={`cursor-pointer ${
                index === i ? "bg-[#0198FF] " : "bg-gray-200 "
              }w-2 h-2 rounded-20`}
              key={id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;