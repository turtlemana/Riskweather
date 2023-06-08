import Image from "next/image";

import { News } from "types/main";

const Item = ({ data }: { data: News }) => {
  const { image, title, subTitle, date } = data;

  return (
    <div className="flex gap-7 items-center">
      <Image src={image} alt="" className="w-[180px] h-[100px]" />
      <div>
        <h1 className="text-gray-800 text-lg font-normal mb-4">{title}</h1>
        <div className="flex gap-5 items-center">
          <h2 className="text-[#0198ff] font-medium text-sm">{subTitle}</h2>
          <div className="w-px h-3 bg-gray-300" />
          <p className="text-gray-400 text-sm font-medium">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
