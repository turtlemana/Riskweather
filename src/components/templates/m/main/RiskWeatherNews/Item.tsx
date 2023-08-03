import Image from "next/image";

import { News } from "types/main";

const Item = ({ data }: { data: News }) => {
  const { image, title, subTitle, date } = data;

  return (
    <div className="flex gap-7 items-center">
      <Image src={image} alt="" className="w-[104px] h-[64px]" />
      <div>
        <p className="text-gray-800 text-sm mb-2">{title}</p>
        <div className="flex gap-5 items-center">
          <h2 className="text-[#0198ff] font-medium text-xs">{subTitle}</h2>
          <div className="w-px h-3 bg-gray-300" />
          <p className="text-gray-400 text-xs">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;