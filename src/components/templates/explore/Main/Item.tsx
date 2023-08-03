import Image from "next/image";

import { COLORS } from "datas/main";
import { IMAGES } from "datas/weather";
import { Card } from "types/main";
import arrow from "assets/icons/explore/rightArrow.svg";

interface Props {
  name?: string;
  ticker?: string;
  riskLevel?: string;
  maxLoss?: number | string;
  price?: string | number;
  priceChange?: string | number;
  chartData?: string | JSON;
  weather?: string;
}

const Item = ({ data }: { data: Card }) => {
  const {
    id,
    image,
    name,
    subName,
    risk,
    maximumLoss,
    chartImage,
    weatherIcon,
    weather,
    price,
    priceChange,
  } = data;

  return (
    <tr key={id} className="border-b border-gray-100 ">
      <td className="flex items-center py-3 pl-8">
        <Image src={image || ""} alt="" className="h-10 mr-3" />
        <h6 className="mr-3">{name}</h6>
        <p className="text-gray-500 text-xs">{subName}</p>
      </td>
      <td>
        <div
          className={`py-1 px-3 rounded-20 ${COLORS[risk]} max-w-fit mx-auto`}
        >
          <h6 className="text-xs">{risk}</h6>
        </div>
      </td>
      <td className="text-center text-[#DF1525]">-{maximumLoss}%</td>
      <td className="text-center">{price}</td>
      <td className="text-center text-[#DF1525]">{priceChange}</td>
      <td className="flex justify-center">
        <Image src={chartImage || ""} alt="" />
      </td>
      <td>
        <div className="rounded-20 bg-gray-100 py-[2px] pl-3 pr-4 max-w-[174px] mx-auto flex items-center justify-between ">
          <Image src={IMAGES[weatherIcon]} alt="" />
          <p className="text-xs text-gray-600 font-medium">{weather}</p>
        </div>
      </td>
      <td>
        <Image src={arrow} alt="" />
      </td>
    </tr>
  );
};

export default Item;
