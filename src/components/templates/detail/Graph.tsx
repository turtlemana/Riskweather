import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { MENU_LIST } from "datas/detail";
import download from "assets/icons/detail/download.svg";
import DetailChart from "chart/DetailChart";
import { CSVLink } from "react-csv";
import { useTranslation } from "next-i18next";
import { DetailChartInterface } from "interfaces/detail";

interface Props {
  detailChart: Object[];
  curr: string;
  cat?: string;
}

const Graph = ({ detailChart, curr, cat }: Props) => {
  const router = useRouter();
  const { t } = useTranslation("detail");
  const [chartSelect, setChartSelect] = useState("RW Index");
  const [isClient, setIsClient] = useState(false);

  const [select, setSelect] = useState(0);
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
          "리스크(CVaR)": data.cvar,
          "리스크(RW Index)": data.rwi,
          "리스크(EW Index)": data.ewi,
          가격: data.price,
        };
      });
    } else {
      completeData = orderedData.map((data: DetailChartInterface) => {
        return {
          Date: data.date,
          "Risk(CVaR)": data.cvar,
          "Risk(RW Index)": data.rwi,
          "Risk(EW Index)": data.ewi,
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

  const [selected, setSelected] = useState("All");
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
    <main className="max-w-1320 min-w-[1024px] mx-auto p-8 rounded-20 bg-white my-7">
      <section className="flex mb-5 relative">
        <ul className="flex gap-1.5 flex-1">
          {MENU_LIST.map(({ id, title, koreanTitle }) => (
            <li
              key={id}
              className={`py-1 items-center rounded-20 border min-w-[45px] text-center cursor-pointer hover:bg-[#F3F4F6] ${
                selected === title && "border-[#E6F5FF] bg-[#E6F5FF]"
              }`}
              onClick={() => clickHandler({ title })}
            >
              <h6
                className={`items-center text-center text-xs h-3  ${
                  selected === title ? "text-[#0198FF]" : "text-gray-400"
                }`}
              >
                {router.locale == "ko" ? koreanTitle : title}
              </h6>
            </li>
          ))}
          <li className="flex items-center gap-2 ml-[18px]">
            <div className="w-3 h-[1.5px] bg-[#FF4D00] mb-1" />
            <p className="text-xs">{t("chartRisk")}</p>
          </li>
          <li className="flex items-center gap-2 ml-[18px]">
            <div className="w-3 h-[1.5px] bg-[#FFD400] mb-1" />
            <p className="text-xs">{t("chartEwi")}</p>
          </li>
          <li className="flex items-center gap-2 ml-2">
            <div className="w-3 h-[1.5px] bg-[#34BB7A] mb-1" />
            <p className="text-xs">{t("chartPrice")}</p>
          </li>
        </ul>

        <article
          className="relative flex gap-4 bg-gray-100 rounded-[14px] px-2 py-1.5 w-[128px] h-7 justify-between items-center cursor-pointer mr-5"
          onClick={chartSelectHandler}
        >
          <span
            className="bg-white w-[60px] absolute  h-6 rounded-20 ease-in-out duration-500 left-[2px]"
            style={{ transform: `translateX(calc(${select}*64px))` }}
          />
          <h6 className="h-3 text-[10px] w-[48px] text-center z-10">
            RW Index
          </h6>
          <h6 className="h-3 text-[11px] w-[48px] text-center z-10">CVaR</h6>
        </article>
        {isClient && (
          <CSVLink data={chartData} filename={`${router.query.ticker}.csv`}>
            <div className="flex gap-[5px] px-2.5 py-1.5 border border-solid border-[#0198ff] rounded-20 bg-blue-rgba hover:bg-[#CCEAFF]">
              <p className="text-[#0198FF] mb-1 text-xs h-3">
                {t("chartDownload")}
              </p>
              <Image src={download} alt="" />
            </div>
          </CSVLink>
        )}
        {/* {isActiveDownloadModal && (
          <article className="z-30 absolute max-w-[332px] p-6 bg-white shadow-[0_0_12px_0_rgba(121,120,132,0.15)] top-8 right-0 rounded-20 border border-gray-100">
            <section className="mb-7">
              <p className="text-gray-400 font-medium">Date</p>
              <input type="date" />
            </section>
            <section className="mb-7 w-[284px]">
              <p className="text-gray-400 font-medium">Data</p>
              <div className="flex mt-3 gap-4">
                {DOWNLOAD["data"].map(({ id, title }) => (
                  <div
                    className="flex items-center mb-3 gap-2 cursor-pointer"
                    key={id}
                    onClick={() => setDataCheck(id)}
                  >
                    {dataCheck === id ? (
                      <Image src={blueCheck} alt="" className="" />
                    ) : (
                      <Image src={check} alt="" className="" />
                    )}
                    <p className="flex-1 mt-1 text-sm">{title}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="mb-9 w-[284px] ">
              <p className="text-gray-400 font-medium">Confidence level</p>
              <div className="flex mt-3 justify-between">
                {DOWNLOAD["level"].map(({ id, title }) => (
                  <div
                    className="flex items-center mb-3 gap-2 cursor-pointer"
                    key={id}
                    onClick={() => setLevelCheck(id)}
                  >
                    {levelCheck === id ? (
                      <Image src={blueCheck} alt="" className="" />
                    ) : (
                      <Image src={check} alt="" className="" />
                    )}
                    <p className="flex-1 mt-1 text-sm">{title}</p>
                  </div>
                ))}
              </div>
            </section>
            <button className="bg-[#0198FF] text-white w-full py-3 rounded-[60px] hover:bg-[#0085E6] disabled:bg-[#D1D5DB]">
              <CSVLink data={chartData} filename={`${router.query.ticker}.csv`}>
              Download
              </CSVLink>
            </button>
          </article>
        )} */}
      </section>
      <ul className="flex gap-3  mb-[42px]  px-1 justify-start text-center items-center ">
        <li className="flex items-center  ">
          <p className="text-sm font-bold">
            {t("chartHighestPrice")}
            {": "}
            <span className={"font-medium"}>
              {highestPrice?.price.toLocaleString("en-us", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}{" "}
              {cat == "Index" ? "" : curr}
            </span>
          </p>
        </li>
        <div className="w-px h-4 bg-gray-300 mb-1 mx-1" />
        <li className="flex items-center gap-2 ml-2">
          <p className="text-sm font-bold">
            {t("chartLowestPrice")}
            {": "}
            <span className={"font-medium"}>
              {lowestPrice?.price.toLocaleString("en-us", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}{" "}
              {cat == "Index" ? "" : curr}
            </span>
          </p>
        </li>
      </ul>
      <section className="w-full h-[260px] ">
        <DetailChart chartSelect={chartSelect} chartData={chartSlice} />
      </section>
      {/* <section className="flex w-full justify-end gap-1">
        <Image src={plus} alt="" />
        <Image src={minus} alt="" />
      </section> */}
    </main>
  );
};

export default Graph;
