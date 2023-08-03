import { useState } from "react";
import Image from "next/image";

import {
  EXCHAGNES,
  LOCATIONS,
  RISKS,
  SECTROS,
  TYPES,
  WEATHERS,
} from "datas/explore";
import search from "assets/icons/header/search.png";
import filter from "assets/icons/explore/m/filter.svg";
import close from "assets/icons/contact/close.svg";
import MultiSelect from "components/templates/m/explore/Top/MultiSelect";

const DEFAULT_STATE = { type: 0, risk: 0, viewItems: 0 };

const Top = () => {
  const [state, setState] = useState(DEFAULT_STATE);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [weather, setWeather] = useState([0]);
  const [location, setLocation] = useState([0]);
  const [exchange, setExchange] = useState([0]);
  const [sector, setSector] = useState([0]);
  const handleReset = () => {
    setState(DEFAULT_STATE);
    setWeather([0]);
    setLocation([0]);
    setExchange([0]);
    setSector([0]);
  };

  return (
    <main>
      <section className="flex gap-3 mb-4">
        <article className="w-[242px] h-10 p-3 flex items-center border border-gray-200 rounded-20 hover:border-[#4B5563]">
          <Image src={search} alt="search" className="mr-2 w-4 h-4 " />
          <input placeholder="Search Name" className="outline-none text-sm" />
        </article>
        <button
          className="max-h-10 flex items-center py-2.5 px-5 rounded-20 border border-gray-200 hover:bg-gray-100"
          onClick={() => setIsFilterActive(true)}
        >
          <Image src={filter} alt="filter" className="mr-2" />
          <p className="mt-px text-gray-600 text-sm">Filter</p>
        </button>
      </section>
      {isFilterActive && (
        <div className="fixed z-30 bg-white w-full h-full top-16 left-0 overflow-auto customScrollBar pb-[140px]">
          <header className="px-5 py-[14px] border-b border-gray-100 relative">
            <h6 className="text-center mt-px">Filter</h6>
            <Image
              src={close}
              alt="close"
              className="absolute right-[20px] top-[14px] cursor-pointer"
              onClick={() => setIsFilterActive(false)}
            />
          </header>
          <section className="py-7 pb-3">
            <article className="mb-7">
              <h6 className="px-5 text-sm text-[#111111] mb-3">Type</h6>
              <ul className="px-5 flex gap-[10px]">
                {TYPES.map(({ id, title }) => (
                  <li
                    key={id}
                    className={`rounded-20 border px-3.5 py-1.5 text-center cursor-pointer max-h-[32px] hover:text-[#6B7280] hover:bg-[#F3F4F6] ${
                      state.type === id
                        ? "border-[#E6F5FF] bg-[#E6F5FF]"
                        : "border-gray-200"
                    }`}
                    onClick={() => setState({ ...state, type: id })}
                  >
                    <h6
                      className={`text-sm ${
                        id === state.type ? "text-[#0198FF]" : "text-gray-500"
                      }`}
                    >
                      {title}
                    </h6>
                  </li>
                ))}
              </ul>
            </article>
            <article className="mb-7 px-5">
              <h6 className="text-sm text-[#111111] mb-3">Risk level</h6>
              <ul className="flex gap-[10px] flex-wrap">
                {RISKS.map(({ id, title }) => (
                  <li
                    key={id}
                    className={`rounded-20 border px-3.5 py-1.5 text-center cursor-pointer max-h-[32px] hover:bg-[#F3F4F6] ${
                      state.risk === id
                        ? "border-[#E6F5FF] bg-[#E6F5FF]"
                        : "border-gray-200"
                    }`}
                    onClick={() => setState({ ...state, risk: id })}
                  >
                    <h6
                      className={`text-sm ${
                        id === state.risk ? "text-[#0198FF]" : "text-gray-500"
                      }`}
                    >
                      {title}
                    </h6>
                  </li>
                ))}
              </ul>
            </article>
            <MultiSelect
              array={weather}
              setArray={setWeather}
              data={WEATHERS}
              title={"Weather"}
            />
            <div className="my-7 h-[6px] bg-gray-50 w-full" />
            <MultiSelect
              array={location}
              setArray={setLocation}
              data={LOCATIONS}
              title={"Location"}
            />
            <MultiSelect
              array={exchange}
              setArray={setExchange}
              data={EXCHAGNES}
              title={"Exchange"}
              isLarge={true}
            />
            <MultiSelect
              array={sector}
              setArray={setSector}
              data={SECTROS}
              title={"Sector"}
              isMidium={true}
            />
          </section>
          <section className="flex gap-3 px-5 mb-10">
            <button onClick={handleReset}>
              <p className="text-white text-sm font-medium bg-gray-500 py-2.5 px-5 rounded-[60px] hover:bg-gray-600">
                All reset
              </p>
            </button>
            <button
              className="max-h-10 flex-1 py-2.5 px-5 bg-[#0198ff] rounded-[60px] hover:bg-[#0085E6]"
              onClick={() => setIsFilterActive(false)}
            >
              <h1 className="text-white text-sm">Add Filter</h1>
            </button>
          </section>
        </div>
      )}
    </main>
  );
};

export default Top;
