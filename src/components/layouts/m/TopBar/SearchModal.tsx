import Image from "next/image";
import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Dispatch,
  KeyboardEventHandler,
} from "react";
import mobileSearch from "assets/icons/header/mobileSearch.svg";
import { COLORS } from "datas/main";
import { useRouter } from "next/router";
import useHandleImageError from "utils/useHandleImageError";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";
import { ResultItem } from "interfaces/layout";
import { useExploreState } from "contexts/ExploreStateContext";
import { State, Action } from "contexts/ExploreStateContext";
import blackArrow from "assets/icons/main/blueArrow.svg";
import axios from "axios";
import useSWR from "swr";

interface Props {
  setIsOpenSearchModal: Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal = ({ setIsOpenSearchModal }: Props) => {
  const {
    state,
    dispatch,
  }: { state: State; dispatch: React.Dispatch<Action> } = useExploreState();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const [search, setSearch] = useState("");

  const handleImageError = useHandleImageError();
  const handleWeatherImageError = useHandleWeatherImageError();
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
    } else {
      dispatch({ type: "RESET_VALUE" });
      dispatch({ type: "SET_SEARCH", payload: "" });

      router.push("/explore");
    }
  };

  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsOpenSearchModal(false);
    });
  }, [router.events]);

  const resultList = useMemo(() => {
    let tmpList = [...searchList];
    return tmpList;
  }, [searchList]);

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      searchAll();
    }
  };

  return (
    <main className="fixed top-16 left-0 w-full h-full bg-white z-20 py-6 px-5 overflow-auto pb-20">
      <section className="w-full h-10 mb-5 py-2.5 px-4 flex items-center border border-solid border-gray-200 rounded-20 hover:border-[#4B5563]">
        <Image src={mobileSearch} alt="search" className="mr-2 w-4 h-4" />
        <input
          placeholder={
            router.locale == "ko" ? "자산의 이름을 검색하세요" : "Search"
          }
          className="outline-none text-[#111111] text-sm w-full"
          value={search}
          onChange={onSearch}
          onKeyUp={handleKeyUp}
        />
      </section>

      <section>
        <article className="flex mb-5 justify-between items-center">
          <div className={"flex"}>
            <h6 className="text-[#0148FF] mr-1">
              {resultList && resultList?.length >= 20
                ? "20+"
                : resultList?.length}
            </h6>
            <h6 className="text-[#111111]">
              {router.locale == "ko" ? "결과" : "Result"}
            </h6>
          </div>
          <div onClick={searchAll} className={"flex items-center"}>
            <h6 className="text-[#0198FF] text-sm ">
              {router.locale == "ko" ? "전체검색" : "Search All"}
            </h6>
            <Image src={blackArrow} alt="" className="w-4 ml-2 -rotate-90" />
          </div>
        </article>
        <article>
          {resultList?.map(
            (
              {
                HR_ITEM_NM,
                ITEM_ENG_NM,
                ITEM_CD_DL,
                CVaR_LV,
                WTHR_ENG_NM,
                CVaR_LV_KR,
                ITEM_KR_NM,
              }: ResultItem,
              i: number
            ) => (
              <div
                className="border-b border-gray-100 flex items-center"
                key={i}
                onClick={() => {
                  router.push({ pathname: `/detail/${ITEM_CD_DL}` });
                }}
              >
                <div className="flex items-center py-3 flex-1">
                  <Image
                    loading="eager"
                    unoptimized
                    width={50}
                    height={50}
                    quality={100}
                    onError={(event) => handleImageError(event, HR_ITEM_NM)}
                    src={`/images/logos/${ITEM_CD_DL}.png` || ""}
                    alt=""
                    className="h-10 w-10 mr-3"
                  />{" "}
                  <div>
                    <h6 className="text-sm w-[150px] truncate">
                      {router.locale == "ko" ? ITEM_KR_NM : ITEM_ENG_NM}
                    </h6>
                    <p className="text-gray-500 text-xs">{ITEM_CD_DL}</p>
                  </div>
                </div>
                <div
                  className={`py-1 px-3 rounded-20 text-xs font-semibold ${COLORS[CVaR_LV]}`}
                >
                  {router.locale == "ko" ? CVaR_LV_KR : CVaR_LV}
                </div>
                <Image
                  onError={handleWeatherImageError}
                  loading="eager"
                  src={`/images/weather/${WTHR_ENG_NM}.svg`}
                  alt=""
                  width={25}
                  height={25}
                  className="ml-3"
                />
              </div>
            )
          )}
        </article>
      </section>
    </main>
  );
};

export default SearchModal;
