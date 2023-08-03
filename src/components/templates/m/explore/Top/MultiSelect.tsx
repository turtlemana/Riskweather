import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

import arrow from "assets/icons/explore/arrow.svg";
import blueArrow from "assets/icons/explore/blueArrow.svg";
import check from "assets/icons/explore/check.svg";
import blueCheck from "assets/icons/explore/blueCheck.svg";

interface Props {
  array: number[];
  setArray: Dispatch<SetStateAction<number[]>>;
  data: { id: number; title: string }[];
  title: string;
  isLarge?: boolean;
  isMidium?: boolean;
}

const MultiSelect = ({
  array,
  setArray,
  data,
  title,
  isLarge,
  isMidium,
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  const handleSelect = (id: number) => {
    if (array.includes(id)) {
      if (array.length === 1) return setArray([0]);
      return setArray(array.filter((data: number) => data !== id));
    }
    if (id === 0) return setArray([0]);
    if (id !== 0) {
      if (array.length === data.length - 2) return setArray([0]);
      setArray([...array.filter((data: number) => data !== 0), id]);
    }
  };

  return (
    <article className="relative min-w-80 mb-7 pl-5">
      <h6 className="text-sm text-[#111111] mb-3">{title}</h6>
      <div
        onClick={() => setIsActive(!isActive)}
        className={`cursor-pointer border rounded-20 max-h-10 py-2.5 px-3.5 flex justify-between hover:border-[#0198FF] ${
          isActive
            ? "border-[#0198FF]"
            : array.length >= 1 && !array.includes(0)
            ? "border-[#0198FF]"
            : "border-gray-200 "
        } ${isLarge ? "w-[335px]" : "w-[233px]"}`}
      >
        <p
          className={`${
            isActive
              ? "text-[#0198FF]"
              : array.length >= 1 && !array.includes(0)
              ? "text-[#0198FF]"
              : "text-gray-600"
          }`}
        >
          {array.includes(0) || array.length === 0
            ? "All"
            : `${array.length} Selected`}
        </p>
        {isActive ? (
          <Image src={blueArrow} alt="" />
        ) : (
          <Image src={arrow} alt="" />
        )}
      </div>
      {isActive && (
        <div
          className={`z-10 absolute h-[200px] overflow-auto customScrollBar top-15 left-5 bg-white py-3 px-2 border-gray-200 border rounded-20 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] ${
            isLarge ? "w-[335px]" : "w-[233px]"
          }`}
        >
          {data.map(({ id, title }) => (
            <div
              key={id}
              className={`flex gap-2 px-3 py-1.5 cursor-pointer hover:bg-[#F3F4F6]`}
              onClick={() => handleSelect(id)}
            >
              <Image src={array.includes(id) ? blueCheck : check} alt="" />
              <h6
                className={`text-sm mt-px ${
                  array.includes(id) ? "text-[#0198FF]" : "text-gray-500"
                }`}
              >
                {title}
              </h6>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default MultiSelect;
