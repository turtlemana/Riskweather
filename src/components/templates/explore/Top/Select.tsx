import { useState, ChangeEventHandler } from "react";

import { useRouter } from "next/router";

interface Props {
  defaultData: string | number;

  data:
    | { id: number; title: string; koreanTitle: string }[]
    | { id: number; title: number; koreanTitle: number }[];

  title: string;
  isLarge?: boolean;
  isMidium?: boolean;
  selectHandler: ChangeEventHandler<HTMLSelectElement>;
  koreanTitle: string;
  type?: string;
}

const Select = ({
  defaultData,
  data,
  title,
  isLarge,
  isMidium,
  koreanTitle,
  selectHandler,
  type,
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  const router = useRouter();

  return (
    <article className=" flex gap-4 items-center relative justify-between min-w-80">
      <label
        htmlFor={title}
        className="lg:text-sm text-xs font-bold text-[#111111]"
      >
        {router.locale == "ko" ? koreanTitle : title}
      </label>
      <select
        id={title}
        value={defaultData}
        onClick={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onChange={selectHandler}
        disabled={
          title == "Location"
            ? type == "Crypto"
              ? true
              : false
            : type == "Crypto" || type == "Index"
            ? true
            : false
        }
        className={`disabled:bg-gray-200  cursor-pointer text-xs border rounded-20 max-h-10 py-2.5 px-3.5 flex justify-between hover:border-[#0198FF] ${
          isActive ? "border-[#0198FF] " : "border-gray-200 "
        } ${
          isLarge
            ? "w-[371px]"
            : isMidium
            ? "w-[271px]"
            : "w-[180px] lg:w-[253px]"
        }`}
      >
        {data.map(({ id, title, koreanTitle }) => (
          <option
            value={title}
            key={id}
            className={`flex gap-2 text-sm px-3 py-1.5 cursor-pointer hover:bg-[#F3F4F6]`}
          >
            {router.locale == "ko"
              ? koreanTitle
              : title == "Partly_cloudy"
              ? "Partly Cloudy"
              : title == "Mostly_cloudy"
              ? "Mostly Cloudy"
              : title}
          </option>
        ))}
      </select>
    </article>
  );
};

export default Select;
