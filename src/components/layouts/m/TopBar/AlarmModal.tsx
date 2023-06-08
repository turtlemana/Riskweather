import Image from "next/image";

import close from "assets/icons/header/close.svg";
import { useRouter } from "next/router";
import Link from "next/link";
import useHandleImageError from 'utils/useHandleImageError'
import useHandleWeatherImageError from 'utils/useHandleWeatherImageError'
import { TopRiskItem } from "interfaces/layout";


interface Props{
  onClose:()=>void; 
  topRisk:TopRiskItem[];
}

const AlarmModal = ({ onClose,topRisk }: Props) => {
  const handleImageError = useHandleImageError();
  const handleWeatherImageError = useHandleWeatherImageError();
  

  const router=useRouter();
  return (
    <main className="z-30 absolute bg-white left-0 top-0 w-full h-screen overflow-scroll">
      <div className={'flex flex-col bg-[#FAE8E8]'}>
      <section className="flex justify-start px-5 relative text-[#FF4D00] ">
        <h6 className="my-3.5 ">{router.locale=="ko" ? "리스크 특보" : "Special Risk Report "}</h6>
        <Image
          src={close}
          alt=""
          className="absolute w-6 cursor-pointer right-5 top-3"
          onClick={onClose}
        />
      </section>
      <div className={'text-sm text-black text-start px-4 mb-4 '}>{router.locale=="ko" ? "Risk Weather Index(RWI)가 상승한 이후 자산의 변동성이 커지는 경향이 있으니 투자에 유의하시기 바랍니다."
    : "After the Risk Weather Index (RWI) rises, the asset's volatility tends to be rise in a long-term period. So please be cautious when investing in these assets."  
    }</div>
    </div>
      <div className={'w-full'}>

      <ul className=" overflow-auto customScrollBar pt-5">
        
        {topRisk.length === 0 ? (
          
          <li className="py-4 border-y border-gray-200 text-center flex justify-center">
            {router.locale=="ko" ? "리스크 특보가 없습니다" : "No Special Report"}
          </li>
  
        ) : (
          topRisk.map(({ HR_ITEM_NM, ITEM_CD_DL, ITEM_ENG_NM, ITEM_KR_NM, WTHR_KR_DL, WTHR_ENG_DL, WTHR_ENG_NM }: TopRiskItem, i: number): JSX.Element => (
            <li
               key={i}
              className={` `}
            >
              <Link href={`/detail/${ITEM_CD_DL}`}
              onClick={onClose}
              className={'py-3 border-b border-gray-200 flex justify-between px-5'}>
              <section className={'flex items-center  '}>
                <div className={'flex items-center flex-1'}>
              <Image loading="eager" unoptimized  width={7} height={7} quality={100} onError={(event)=>handleImageError(event,HR_ITEM_NM)} src={`/images/logos/${ITEM_CD_DL}.png` || ""} alt="" className="h-7 w-7 mr-3"/>
            <div className={'flex flex-col'}>
            <h6 className={'text-sm w-[110px] truncate'} title={router.locale=="ko" ? ITEM_KR_NM : ITEM_ENG_NM}>{router.locale=="ko" ? ITEM_KR_NM :ITEM_ENG_NM}</h6>
            <p className="text-gray-500 text-[10px]">{ITEM_CD_DL}</p>
            </div>
            </div>
            </section>
          
            <section className="text-center flex items-center justify-between bg-gray-100 rounded-20 pl-3 pr-4 w-1/2 ">
        <Image onError={handleWeatherImageError} src={`/images/weather/${WTHR_ENG_NM}.svg`} alt="" width={0} height={0} sizes="100vw" className="w-9 h-auto"  />
        <p className="text-xs font-medium">{router.locale=="ko" ? WTHR_KR_DL : WTHR_ENG_DL}</p>
      </section>
          {/* <td className="pl-10 text-sm text-red-500">{RW_IDX.toLocaleString('en-us',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>  */}

          </Link>
            </li>
          ))
        )}
      
      </ul>
      </div>
    </main>
  );
};

export default AlarmModal;
