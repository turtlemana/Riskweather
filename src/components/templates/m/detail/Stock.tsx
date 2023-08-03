import { INFO_DATA } from "datas/detail";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { SlArrowUp } from "react-icons/sl";
import arrow from "assets/icons/main/blueArrow.svg";
import { useTranslation } from "next-i18next";
import { DetailInfo, InfoData, RenderInfoData } from "interfaces/detail";

interface Props {
  cat: string;
  detailInfo?: DetailInfo;
  exchg?: string;
}

const Stock = ({ exchg, cat, detailInfo }: Props) => {
  const [list, setList] = useState(1);
  const { t } = useTranslation("detail");

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
  const array: RenderInfoData[] =
    cat == "Crypto" || cat == "Index"
      ? renderData
      : renderData?.slice(0, (list * renderData.length) / 2);
  const isLast = (list * renderData.length) / 2 >= renderData?.length;
  return (
    <main className="pt-7 bg-white my-1.5 pb-5">
      {renderData?.every(
        (info) =>
          info.value == null || info.value == undefined || info.value === "NA"
      ) ? (
        ""
      ) : (
        <div>
          <div className={"flex justify-between items-center"}>
            <h1 className="ml-5 text-lg text-[#111111] mb-5">
              {router.locale == "ko" ? "종목 정보" : "Information"}
            </h1>
            <p className="mr-5 text-xs text-[#111111] mb-5 font-light">
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
          <ul>
            {array?.map(({ id, title, koreanTitle, value }: RenderInfoData) =>
              !value || value === "NA" ? (
                ""
              ) : title == "Website" || title == "White Paper" ? (
                <li
                  key={id}
                  className={`flex gap-5 py-3 text-sm border-b border-gray-100 `}
                >
                  <p className="flex-1 pl-5 text-gray-400">
                    {router.locale == "ko" ? koreanTitle : title}
                  </p>
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      cat == "Crypto" ? "pr-5 truncate" : "pr-5 truncate"
                    }  flex-1  font-medium underline text-blue-400 `}
                  >
                    {value}
                  </a>
                </li>
              ) : (
                <li
                  key={id}
                  className={`flex gap-5 py-3 text-sm border-b border-gray-100`}
                >
                  <p className="flex-1 pl-5 text-gray-400">
                    {router.locale == "ko" ? koreanTitle : title}
                  </p>
                  <p
                    className={`text-[#111111] flex-1 font-medium pr-5 truncate`}
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
          {cat == "Crypto" || cat == "Index" ? (
            ""
          ) : !isLast ? (
            <div className="px-5">
              <button
                className="flex border border-[#0198FF] rounded-20 w-full h-10 justify-center items-center"
                onClick={() => setList((prev) => prev + 1)}
              >
                <p className="text-[#0198FF] text-sm font-medium">
                  {t("more")}
                </p>
                <Image src={arrow} alt="" className="mb-1 ml-1" />
              </button>
            </div>
          ) : (
            <div className="px-5">
              <button
                className="flex border border-[#0198FF] rounded-20 w-full h-10 justify-center items-center"
                onClick={() => setList(1)}
              >
                <p className="text-[#0198FF] text-sm font-medium">
                  {t("fold")}
                </p>
                <SlArrowUp
                  className={"mb-1 ml-1.5 text-[#0198FF] text-[10px] font-bold"}
                />
                {/* <Image src={arrow} alt="" className="mb-1 ml-1" /> */}
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Stock;
