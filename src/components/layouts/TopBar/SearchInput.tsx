import {
  useMemo,
  useState,
  useCallback,
  useEffect,
  KeyboardEventHandler,
} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import Image from "next/image";
import mobileSearch from "assets/icons/header/mobileSearch.svg";
import { useExploreState } from "contexts/ExploreStateContext";
import blackArrow from "assets/icons/main/blueArrow.svg";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";
import useHandleImageError from "utils/useHandleImageError";
import { COLORS } from "datas/main";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const router = useRouter();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { dispatch } = useExploreState();

  const { data } = useSWR(
    search ? `/api/headerSearch?search=${search}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );
  const searchList = data ? [].concat(...data) : [];

  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (query.length > 20) {
      return;
    }
    setSearch(query);
  }, []);
  const searchAll = () => {
    if (search) {
      dispatch({ type: "RESET_VALUE" });
      dispatch({ type: "SET_SEARCH", payload: search as string });
      router.push("/explore");
      // window.location.href='/explore'
    } else {
      dispatch({ type: "RESET_VALUE" });
      dispatch({ type: "SET_SEARCH", payload: "" });

      router.push("/explore");
      // window.location.href='/explore'
    }
  };

  const resultList = useMemo(() => {
    let tmpList = [...searchList];
    return tmpList;
  }, [searchList]);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setSearch("");
    });
  }, [router.events]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchAll();
    }
  };
  const handleImageError = useHandleImageError();
  const handleWeatherImageError = useHandleWeatherImageError();
  return (
    <>
      <article className="relative w-406 py-2.5 px-4 flex items-center border border-solid border-gray-200 rounded-20 hover:border-[#4B5563] desktop:w-60  laptop:w-60 laptop:h-9">
        <Image src={mobileSearch} alt="search" className="mr-2 w-4 h-4" />
        <input
          placeholder={
            router.locale == "ko" ? "자산의 이름을 검색하세요" : "Search"
          }
          className="outline-none laptop:text-sm w-full"
          value={search}
          onChange={onSearch}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setSearchActive(true);
          }}
          onBlur={() => {
            setSearchActive(false);
          }}
        />
      </article>
      {resultList.length >= 1 && searchActive ? (
        <div className="absolute top-[58px]  w-[478px] max-h-[259px] bg-white z-20 py-[6px] px-5 overflow-auto customScrollBar rounded-20">
          {resultList?.map((asset, i) => (
            <article
              key={i}
              onMouseDown={() => {
                router.push({ pathname: `/detail/${asset["ITEM_CD_DL"]}` });
              }}
              className="flex items-center cursor-pointer"
            >
              <section className="flex items-center py-[10px] flex-1">
                <Image
                  loading="eager"
                  unoptimized
                  width={10}
                  height={10}
                  quality={100}
                  onError={(event) =>
                    handleImageError(event, asset["HR_ITEM_NM"])
                  }
                  src={`/images/logos/${asset["ITEM_CD_DL"]}.png` || ""}
                  alt=""
                  className="h-10 w-10 mr-3"
                />
                <div>
                  <h6
                    className={"text-sm"}
                    title={
                      router.locale == "ko"
                        ? asset["ITEM_KR_NM"]
                        : asset["ITEM_ENG_NM"]
                    }
                  >
                    {router.locale == "ko"
                      ? asset["ITEM_KR_NM"]
                      : asset["ITEM_ENG_NM"]}
                  </h6>
                  <p className="text-gray-500 text-xs">{asset["ITEM_CD_DL"]}</p>
                </div>
              </section>
              <section
                data-tooltip-id="riskLevel"
                data-tooltip-content={
                  router.locale == "ko"
                    ? asset["LV_DSCP_KR"]
                    : asset["LV_DSCP_ENG"]
                }
                className={`h-6 py-1 px-3 rounded-20 text-xs font-semibold ${
                  COLORS[asset["CVaR_LV"]]
                }`}
              >
                <p className={"mt-px"}>
                  {router.locale == "ko"
                    ? asset["CVaR_LV_KR"]
                    : asset["CVaR_LV"]}
                </p>
              </section>

              <Image
                onError={handleWeatherImageError}
                loading="eager"
                src={`/images/weather/${asset["WTHR_ENG_NM"]}.svg`}
                width={0}
                height={0}
                alt="weather"
                className="w-6 h-6 ml-4"
              />
            </article>
          ))}
          <div
            onMouseDown={searchAll}
            className={
              "font-bold py-1.5 cursor-pointer flex items-center justify-center"
            }
          >
            <h6 className="text-[#0198FF] text-md ">
              {router.locale == "ko" ? "전체검색" : "Search All"}
            </h6>
            <Image src={blackArrow} alt="" className="w-4 ml-2 -rotate-90" />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchInput;
