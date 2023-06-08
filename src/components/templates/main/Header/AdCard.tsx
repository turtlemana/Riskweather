import Image from "next/image";

import { COLORS } from "datas/main";

import CardChart from 'chart/CardChart'
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import useHandleImageError from "utils/useHandleImageError";



const AdCard = () => {
    const router=useRouter();
    const {t}=useTranslation('index')
    const handleImageError = useHandleImageError();
    const handleClick = () => {
      // window.location.href = 'https://m-able.app/viuuuu ';
      window.open('https://m-able.app/viuuuu','_blank')
    }


  return (
<main onClick={handleClick} className="relative pt-3 justify-center items-center rounded-t-20 cursor-pointer bg-white min-w-[282px] h-[262px]">
  <section className="flex px-6 justify-between items-start mb-2">
    <article className="">
      <h6 className={`text-md font-bold `}>{"KB증권"}</h6>
    </article>
    <div className={`text-center`}>
      <h6 className="text-md text-[#9CA3AF] ">{'Sponsored'}</h6>
    </div>
  </section>

    
      <Image src="/images/ads/DirectIndexA.jpg"  quality={100} width={1080} height={1080} alt="이미지" className="object-fit  w-full h-full" />


</main>
    
  );
};

export default AdCard;
