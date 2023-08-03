import { useState } from "react";
import Image from "next/image";

import { EXPLORES } from "datas/explore";
import icon from "assets/icons/explore/icon.svg";
import Item from "components/templates/explore/Main/Item";
import Pagination from "components/organisms/Pagination";

const Main = ({ views }: { views: number }) => {
  const [page, setPage] = useState(1);
  const array = EXPLORES?.slice((page - 1) * views, page * views);

  return (
    <main className="mb-7">
      <div className="max-w-1320 w-full mx-auto bg-white rounded-20 overflow-hidden">
        <table className="w-full">
          <colgroup>
            <col width="25%" />
            <col width="9%" />
            <col width="12%" />
            <col width="13%" />
            <col width="11%" />
            <col width="11%" />
            <col width="15%" />
            <col width="4%" />
          </colgroup>
          <thead className="border-gray-200 border-b-[1px]">
            <tr className="text-[14px] text-gray-600 h-11">
              <th className="text-left pl-8">Name</th>
              <th>Risk</th>
              <th>
                <div className="flex justify-center">
                  <p>Maximum loss</p>
                  <Image src={icon} alt="" className="ml-1.5" />
                </div>
              </th>
              <th>
                <div className="flex justify-center">
                  Price
                  <Image src={icon} alt="" className="ml-1.5" />
                </div>
              </th>
              <th>
                <div className="flex justify-center">
                  Price change
                  <Image src={icon} alt="" className="ml-1.5" />
                </div>
              </th>
              <th>Risk chart</th>
              <th>Weather</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {array.map((data, i) => (
              <Item data={data} key={i} />
            ))}
          </tbody>
        </table>
        <Pagination
          total={EXPLORES.length}
          page={page}
          setPage={setPage}
          views={views}
        />
      </div>
    </main>
  );
};

export default Main;
