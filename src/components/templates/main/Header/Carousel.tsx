import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Card } from "types/main";
import left from "assets/icons/main/left.svg";
import right from "assets/icons/main/right.svg";
import WeatherCard from "components/templates/main/Header/WeatherCard";

const Carousel = ({ list }: { list: Card[] }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex items-center gap-5 justify-center max-w-1320 mx-auto">
      <Image
        src={left}
        alt=""
        className={`w-10 cursor-pointer 
        ${index === 0 && "opacity-0"} `}
        onClick={() => index > 0 && setIndex((prev) => prev - 1)}
      />
      <div className="overflow-hidden">
        <div
          className={`flex gap-6 ease-in-out duration-1000`}
          style={{ transform: `translateX(calc(${index}*-612px))` }}
        >
          {list.map((data: Card) => (
            <Link href={`/detail/${data.id}`} key={data.id}>
              <WeatherCard data={data} />
            </Link>
          ))}
        </div>
      </div>
      <Image
        src={right}
        alt=""
        className={`w-10 cursor-pointer
        ${index * 4 > list.length && "opacity-0"} `}
        onClick={() => index * 4 < list.length && setIndex((prev) => prev + 1)}
      />
    </div>
  );
};

export default Carousel;
