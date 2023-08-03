import { ChangeEventHandler, useState } from "react";
import { useRouter } from "next/router";

interface Props {
  defaultData: string | number;
  data:
    | { id: number; title: string; koreanTitle: string }[]
    | { id: number; title: number; koreanTitle: number }[];
  title: string;
  isLarge?: boolean;
  isMidium?: boolean;
  selectHandler?: ChangeEventHandler<HTMLSelectElement>;
  koreanTitle: string;
  tmpType?: string;
}

const Select = ({
  defaultData,
  data,
  title,
  isLarge,
  isMidium,
  koreanTitle,
  selectHandler,
  tmpType,
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  const router = useRouter();

  return (
    <article className="relative min-w-80  pl-5 rounded-20 mb-3">
      <label htmlFor={title} className="text-sm text-[#111111]   font-bold">
        {router.locale == "ko" ? koreanTitle : title}
      </label>
      <select
        id={title}
        value={defaultData}
        onTouchStart={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        disabled={
          title == "Location"
            ? tmpType == "Crypto"
              ? true
              : false
            : tmpType == "Crypto" || tmpType == "Index"
            ? true
            : false
        }
        onChange={selectHandler}
        className={`disabled:bg-gray-200 bg-white  cursor-pointer  border border-gray-300 text-gray-900 text-sm rounded-lg max-h-10 py-2.5 px-3.5 flex justify-between  ${
          isActive ? "border-[#0198FF]" : "border-gray-200 "
        } ${isLarge ? "w-[335px]" : "w-[233px]"}`}
      >
        {data.map(({ id, title, koreanTitle }) => (
          <option
            value={title}
            key={id}
            className={`flex gap-2 px-3 py-1.5 cursor-pointer  z-10 absolute h-[200px] overflow-auto customScrollBar top-15 left-5 bg-white  border-gray-200 border rounded-20 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] ${
              isLarge ? "w-[335px]" : "w-[233px]"
            }`}
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
