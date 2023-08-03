import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";

import { MENU_LIST } from "datas/detail";
import download from "assets/icons/detail/download.svg";
import MobileDetailChart from "chart/MobileDetailChart";
import { CSVLink } from "react-csv";
import { useTranslation } from "next-i18next";
import { DetailChartInterface } from "interfaces/detail";

interface Props {
  detailChart: DetailChartInterface[];
  curr?: string;
  cat?: string;
}

const Graph = ({ detailChart, curr, cat }: Props) => {
  const router = useRouter();
  const { t } = useTranslation("detail");
  const [chartSelect, setChartSelect] = useState("RW Index");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const chartData = useMemo(() => {
    const orderedData = (detailChart as DetailChartInterface[]).sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);

      return dateA.getTime() - dateB.getTime();
    });
    let completeData: Array<Record<string, string | number>> = [];

    if (router.locale == "ko") {
      completeData = orderedData.map((data: DetailChartInterface) => {
        return {
          날짜: data.date,
          CVaR: data.cvar,
          "RW Index": data.rwi,
          "EW Index": data.ewi,
          가격: data.price,
        };
      });
    } else {
      completeData = orderedData.map((data: DetailChartInterface) => {
        return {
          Date: data.date,
          CVaR: data.cvar,
          "RW Index": data.rwi,
          "EW Index": data.ewi,
          Price: data.price,
        };
      });
    }

    return completeData;
  }, [detailChart, router.locale]);

  const detailChartData = useMemo(() => {
    const orderedData = (detailChart as DetailChartInterface[]).sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);

      return dateA.getTime() - dateB.getTime();
    });

    return orderedData;
  }, [detailChart]);

  const [select, setSelect] = useState(0);

  const [chartSlice, setChartSlice] = useState(chartData);
  let tmpOriginData = JSON.parse(JSON.stringify(detailChartData));

  let tmpData = JSON.parse(JSON.stringify(chartData));
  const [highestPrice, setHighestPrice] = useState(
    tmpOriginData.reduce(
      (prev: DetailChartInterface, current: DetailChartInterface) => {
        return prev.price > current.price ? prev : current;
      }
    )
  );
  const [lowestPrice, setLowestPrice] = useState(
    tmpOriginData.reduce(
      (prev: DetailChartInterface, current: DetailChartInterface) => {
        return prev.price > current.price ? current : prev;
      }
    )
  );

  const [selected, setSelected] = useState("3M");

  const chartSelectHandler = () => {
    setSelect(select === 0 ? 1 : 0);
    setChartSelect(chartSelect === "RW Index" ? "CVaR" : "RW Index");
  };

  const clickHandler = ({ title }: { title: string }) => {
    setSelected(title);
  };
  useEffect(() => {
    if (selected == "All") {
      setChartSlice(chartData);
      setHighestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? prev : current;
          }
        )
      );
      setLowestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? current : prev;
          }
        )
      );
    } else if (selected == "1W") {
      tmpData = chartData.slice(-5);
      tmpOriginData = detailChartData.slice(-5);

      setChartSlice(tmpData);
      setHighestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? prev : current;
          }
        )
      );
      setLowestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? current : prev;
          }
        )
      );
    } else if (selected == "2W") {
      tmpData = chartData.slice(-11);
      tmpOriginData = detailChartData.slice(-11);

      setChartSlice(tmpData);

      setHighestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? prev : current;
          }
        )
      );
      setLowestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? current : prev;
          }
        )
      );
    } else if (selected == "1M") {
      tmpData = chartData.slice(-21);
      tmpOriginData = detailChartData.slice(-21);

      setChartSlice(tmpData);
      setHighestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? prev : current;
          }
        )
      );
      setLowestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? current : prev;
          }
        )
      );
    } else if (selected == "3M") {
      tmpData = chartData.slice(-63);
      tmpOriginData = detailChartData.slice(-63);

      setChartSlice(tmpData);

      setHighestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? prev : current;
          }
        )
      );
      setLowestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? current : prev;
          }
        )
      );
    } else if (selected == "6M") {
      tmpData = chartData.slice(-126);
      tmpOriginData = detailChartData.slice(-126);

      setChartSlice(tmpData);

      setHighestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? prev : current;
          }
        )
      );
      setLowestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? current : prev;
          }
        )
      );
    } else if (selected == "1Y") {
      tmpData = chartData.slice(-252);
      tmpOriginData = detailChartData.slice(-252);

      setChartSlice(tmpData);
      setHighestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? prev : current;
          }
        )
      );
      setLowestPrice(
        tmpOriginData.reduce(
          (prev: DetailChartInterface, current: DetailChartInterface) => {
            return prev.price > current.price ? current : prev;
          }
        )
      );
    }
  }, [selected, chartData, detailChart]);

  return (
    <main className="bg-white pb-7">
      <section className="w-full mb-3">
        <ul className="flex gap-2 bg-gray-50 px-5 py-3 overflow-scroll customScrollBar items-center justify-center">
          {MENU_LIST.map(({ id, title, koreanTitle }) => (
            <li
              key={id}
              className={`py-1 px-[6px] rounded-20 border min-w-[45px] h-6 text-center cursor-pointer hover:bg-[#F3F4F6] ${
                selected === title
                  ? "border-[#E6F5FF] bg-[#E6F5FF]"
                  : "border-gray-200"
              }`}
              onClick={() => clickHandler({ title })}
            >
              <h6
                className={`${
                  router.locale == "ko" ? "text-[10px] " : "text-xs "
                } pt-px ${
                  selected === title ? "text-[#0198FF]" : "text-gray-400"
                }`}
              >
                {router.locale == "ko" ? koreanTitle : title}
              </h6>
            </li>
          ))}
        </ul>
      </section>
      <section className="px-5 flex justify-between mb-6 relative">
        <article
          className="relative flex gap-4 bg-gray-100 rounded-[14px] px-2 py-1.5 w-[128px] h-7 justify-between items-center cursor-pointer"
          onClick={chartSelectHandler}
        >
          <span
            className="bg-white w-[62px] absolute z-10 h-6 rounded-20 ease-in-out duration-500 left-[2px]"
            style={{ transform: `translateX(calc(${select}*64px))` }}
          />
          <h6 className="h-3 text-[10px] w-[58px] text-center z-20">
            RW Index
          </h6>
          <h6 className="h-3 text-[11px] w-[58px] text-center z-20">CVaR</h6>
        </article>

        {isClient && (
          <CSVLink data={chartData} filename={`${router.query.ticker}.csv`}>
            <button className="flex gap-1 px-2.5 py-1.5 border border-solid border-[#0198ff] rounded-20 bg-blue-rgba hover:bg-[#CCEAFF]">
              <p className="text-[#0198FF] text-xs h-3 mb-1">
                {t("chartDownload")}
              </p>
              <Image src={download} alt="" />
            </button>
          </CSVLink>
        )}
        {/* {isActiveDownloadModal && (
          <article className="z-30 absolute w-full max-w-[332px] p-6 bg-white shadow-[0_0_12px_0_rgba(121,120,132,0.15)] top-8 right-5 rounded-20 border border-gray-100 text-sm">
            <section className="mb-7">
              <p className="text-gray-400 font-medium mb-3">Date</p>
              <input type="date" />
            </section>
            <section className="mb-7">
              <p className="text-gray-400 font-medium mb-3">Data</p>
              <div className="flex gap-4">
                {DOWNLOAD["data"].map(({ id, title }) => (
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    key={id}
                    onClick={() => setDataCheck(id)}
                  >
                    {dataCheck === id ? (
                      <Image src={blueCheck} alt="" className="" />
                    ) : (
                      <Image src={check} alt="" className="" />
                    )}
                    <p className="flex-1 mt-1">{title}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="mb-10">
              <p className="text-gray-400 font-medium mb-3">Confidence level</p>
              <div className="flex gap-4">
                {DOWNLOAD["level"].map(({ id, title }) => (
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    key={id}
                    onClick={() => setLevelCheck(id)}
                  >
                    {levelCheck === id ? (
                      <Image src={blueCheck} alt="" className="" />
                    ) : (
                      <Image src={check} alt="" className="" />
                    )}
                    <p className="flex-1 mt-1">{title}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="flex gap-12 h-10">
              <button
                onClick={() => setIsActiveDownloadModal(false)}
                className="bg-gray-500 text-white w-full py-3 rounded-[60px] hover:bg-gray-600 disabled:bg-gray-300 max-w-[96px]"
              >
                <p className="font-medium">Cancel</p>
              </button>
              <button
                onClick={() => setIsActiveDownloadModal(false)}
                className="bg-[#0198FF] text-white w-full py-3 rounded-[60px] hover:bg-[#0085E6] disabled:bg-[#D1D5DB] max-w-[184px]"
              >
                <h1>Download</h1>
              </button>
            </section>
          </article>
        )} */}
      </section>
      <section className="w-full h-[260px]">
        <MobileDetailChart chartSelect={chartSelect} chartData={chartSlice} />
        <ul className={"flex items-center justify-start mt-3 ml-5 gap-2"}>
          <li className="flex items-center">
            <div className="w-3 h-[1.5px] bg-[#FF4D00] mb-1 mr-1" />
            <p className="text-xs mb-1">{t("chartRisk")}</p>
          </li>
          <li className="flex items-center">
            <div className="w-3 h-[1.5px] bg-[#FFD400] mb-1 mr-1" />
            <p className="text-xs mb-1">{t("chartEwi")}</p>
          </li>
          <li className="flex items-center gap-2 ml-2">
            <div className="w-3 h-[1.5px] bg-[#34BB7A] mb-1 mr-1" />
            <p className="text-xs mb-1">{t("chartPrice")}</p>
          </li>
        </ul>
      </section>
      <section className="mt-7 flex justify-start ml-5 text-xs text-gray-800">
        <div className="flex  mt-10 justify-center text-center items-center">
          <li className="flex items-center flex-row  ">
            <p className="text-xs font-bold">{t("chartHighestPrice")} : </p>
            <p className="text-xs ">
              {highestPrice?.price.toLocaleString("en-us", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}{" "}
              {cat == "Index" ? "" : curr}
            </p>
          </li>
          <div className="ml-3 mr-3 w-px h-[14px] bg-gray-300" />

          <li className="flex items-center flex-row">
            <p className="text-xs font-bold">{t("chartLowestPrice")} : </p>
            <p className="text-xs ">
              {lowestPrice?.price.toLocaleString("en-us", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}{" "}
              {cat == "Index" ? "" : curr}
            </p>
          </li>
        </div>
      </section>
    </main>
  );
};

export default Graph;
