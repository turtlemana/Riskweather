import Image from "next/image";
import useWindowWidth from "utils/useWindowWidth";
import { useRouter } from "next/router";


const AdCard = ({ rand }: { rand: number }) => {
    const router = useRouter();
    const handleClick = () => {
        // window.location.href = 'https://m-able.app/viuuuu ';
        window.open(rand<0.5 ? 'https://m-able.app/viuuuu' : "http://www.juroinstruments.com/about",'_blank')
      }
      const width=useWindowWidth();

//   const width = typeof window !== 'undefined' ? window.innerWidth : screen.width;

  return (
//     <div className={`p-5 rounded-20 ${width<768 ?  'min-w-[100%] ' : 'min-w-[49%] '}  border shadow-[0_0_12px_0_rgba(121,120,132,0.15)]`}>
// <section className="flex  justify-between items-start mb-2">
//     <article className="">
//       <h6 className={`text-sm font-bold `}>{"KB증권"}</h6>
//     </article>
//     <div className={`text-center`}>
//       <h6 className="text-sm text-[#9CA3AF] ">{'Sponsored'}</h6>
//     </div>
//   </section>
//       {/* <section className="relative h-20 w-full"> */}
//       <Image src="/images/ads/DirectIndexA.jpg"  quality={100} width={1080} height={1080} alt="이미지" className="object-fit  w-full h-full" />
//       {/* </section> */}
//     </div>

<main className={`pt-3 rounded-20 ${width<650 ?  'min-w-[100%] ' : 'min-w-[48.5%] '}  border shadow-[0_0_12px_0_rgba(121,120,132,0.15)]`} onClick={handleClick}>
<section className="flex px-6 justify-between items-start mb-2">
    <article className="">
      <h6 className={`text-md font-bold `}>{
              rand <0.5 ?
              router.locale ==="ko" ? "KB증권" : "KB Securities"
            : router.locale ==="ko" ? "유로인스트루먼츠" : "JURO Instruments"
      }</h6>
    </article>
    <div className={`text-center`}>
      <h6 className="text-md text-[#9CA3AF] ">{'Sponsored'}</h6>
    </div>
  </section>
  <div className={'h-[152px] rounded-20'}>
    
<Image loading="eager" src={rand <= 0.5 ? `/images/ads/DirectIndexMobile.jpg` : "/images/ads/UrosysMobile.jpg"}  quality={100} width={1080} height={250} alt="이미지" className="rounded-b-20 object-cover w-full h-full" />
</div>
{/* <section className="flex justify-between items-center mb-5">
<Image src="/images/ads/DirectIndexA.jpg"  quality={100} width={200} height={180} alt="Advertisement" className="object-fit w-full h-full" />

</section> */}
{/* <section className="text-center flex items-center justify-between bg-gray-100 rounded-20 pl-3 pr-4 py-0.5">

<Image src="/images/ads/DirectIndexA.jpg"  quality={100} width={200} height={180} alt="Advertisement" className="object-fit w-full h-full" />
</section> */}

</main>
  );
};

export default AdCard;