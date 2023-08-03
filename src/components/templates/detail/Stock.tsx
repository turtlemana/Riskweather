import { INFO_DATA } from "datas/detail";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { DetailInfo, InfoData, RenderInfoData } from "interfaces/detail";

interface Props {
  cat: string;
  detailInfo?: DetailInfo;
  exchg?: string;
}

const Stock = ({ exchg, cat, detailInfo }: Props) => {
  const router = useRouter();

  const infoData: InfoData[] = useMemo(() => {
    if (detailInfo) {
      const { ITEM_CD, ITEM_CD_DL, ITEM_ENG_NM, ...infData }: DetailInfo =
        detailInfo;
      const entries = Object.entries(infData);

      const arr = entries.map(
        ([key, value]: [string, string | number | null]) => ({ key, value })
      );
      return arr;
    }
    return [];
  }, [detailInfo]);

  const renderData: RenderInfoData[] = useMemo(() => {
    for (let i = 0; i < INFO_DATA.length; i++) {
      for (let j = 0; j < infoData.length; j++) {
        if (INFO_DATA[i].originalData == infoData[j].key) {
          //@ts-ignore
          INFO_DATA[i].value = infoData[j].value;
          break;
        }
      }
    }
    return INFO_DATA;
  }, [infoData]);

  return (
    <main className="max-w-1320 min-w-[1024px] mx-auto pt-8 rounded-20 bg-white my-7 pb-[18px]">
      {renderData?.every(
        (info) =>
          info.value == null || info.value == undefined || info.value === "NA"
      ) ? (
        ""
      ) : (
        <div className={"flex justify-between"}>
          <h1 className="ml-8 text-2xl text-[#111111] mb-7">
            {router.locale == "ko" ? "종목 정보" : "Information"}
          </h1>
          <p className="mr-8 text-sm text-[#111111] mb-7">
            {cat == "Stock"
              ? exchg === "KOSPI" || exchg === "KOSDAQ"
                ? router.locale == "ko"
                  ? "단위 (억 원)"
                  : "Unit (Billion KRW)"
                : router.locale === "ko"
                ? "단위 (USD)"
                : "Unit (USD)"
              : ""}
          </p>
        </div>
      )}
      <ul className="max-h-[640px] overflow-auto ">
        {renderData?.map(
          ({ title, koreanTitle, value }: RenderInfoData, i: number) =>
            !value || value === "NA" ? (
              ""
            ) : title == "Website" || title == "White Paper" ? (
              <li key={i} className={`flex gap-5 py-[14px] border-b `}>
                <p className="w-[260px] pl-8 text-gray-400">
                  {router.locale == "ko" ? koreanTitle : title}
                </p>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={` flex-1 max-w-full  font-medium pr-8 underline text-blue-400 `}
                >
                  {value}
                </a>
              </li>
            ) : (
              <li key={i} className={`flex gap-5 py-[14px] border-b `}>
                <p className="w-[260px] pl-8 text-gray-400">
                  {router.locale == "ko" ? koreanTitle : title}
                </p>
                <p
                  className={`text-[#111111] flex-1 max-w-full  font-medium pr-8 ${
                    title == "Tags" ? " " : ""
                  }`}
                >
                  {title === "Category"
                    ? value[0].toUpperCase() + value.slice(1)
                    : isNaN(parseFloat(value))
                    ? value
                    : parseFloat(value).toLocaleString()}
                </p>
              </li>
            )
        )}
      </ul>
    </main>
  );
};

export default Stock;
