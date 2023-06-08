import Image from "next/image";

import close from "assets/icons/header/close.svg";
import { useRouter } from "next/router";
import useHandleImageError from 'utils/useHandleImageError'
import useHandleWeatherImageError from 'utils/useHandleWeatherImageError'
import { TopRiskItem } from "interfaces/layout";


interface Props{
  onClose:()=>void;
  topRisk:TopRiskItem[];
}

const Modal = ({ onClose,topRisk }: Props) => {
  const router=useRouter();
  const handleImageError = useHandleImageError();
  const handleWeatherImageError = useHandleWeatherImageError();
  
  return (
    <main  className=" border border-[#FAE8E8] text-start z-20 absolute top-10 right-0 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] bg-white min-w-[460px] rounded-20 overflow-hidden">
    <div className={'flex flex-col bg-[#FAE8E8]'}>
      <section className="flex items-center px-5 pb-5 pt-6 text-[#FF4D00]">
        <h2 className="text-2xl h-7 flex-1">{router.locale=="ko" ? "리스크 특보" : "Special Risk Report "}</h2>
        <Image
          src={close}
          alt=""
          className="w-6 cursor-pointer"
          onClick={onClose}
        />
      </section>

      <div className={'text-sm text-black text-start px-4 mb-4 '}>{router.locale=="ko" ? "Risk Weather Index(RWI)가 상승한 이후 자산의 변동성이 커지는 경향이 있으니 투자에 유의하시기 바랍니다."
    : "After the Risk Weather Index (RWI) rises, the asset's volatility tends to be rise in a long-term period. So please be cautious when investing in these assets."  
    }</div>
      </div>  
      <ul className="overflow-auto slim-scroll h-[384px] ">
        {topRisk.length === 0 ? (
          <li className=" px-6 py-6  border-gray-200 text-center">
            {router.locale=="ko" ? "위험 특보가 없습니다" : "No Special Report"}
          </li>
        ) : (
          topRisk.map(({HR_ITEM_NM, ITEM_CD_DL, ITEM_ENG_NM, ITEM_KR_NM, WTHR_KR_DL,WTHR_ENG_DL,WTHR_ENG_NM }:TopRiskItem,i:number) => (
            <li
            onMouseDown={()=>{router.push({pathname:`/detail/${ITEM_CD_DL}`})}}
              key={i}
              className={`cursor-pointer px-6 py-4  border-gray-200`}
            >
                            <div className="flex items-center py-[2px] flex-1">
              <Image loading="eager" unoptimized  width={10} height={10} quality={100} onError={(event)=>handleImageError(event,HR_ITEM_NM)} src={`/images/logos/${ITEM_CD_DL}.png` || ""} alt="" className="h-10 w-10 mr-3"/>
            <div>
            <h6 className={'text-sm w-[130px] truncate mr-12'} title={router.locale=="ko" ? ITEM_KR_NM : ITEM_ENG_NM}>{router.locale=="ko" ? ITEM_KR_NM :ITEM_ENG_NM}</h6>
            <p className="text-gray-500 text-xs">{ITEM_CD_DL}</p>
            </div>
          {/* <p className="text-red-500">{RW_IDX.toLocaleString('en-us',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>  */}
          <section className="text-center flex items-center justify-between bg-gray-100 rounded-20 pl-3 pr-4 w-full">
        <Image onError={handleWeatherImageError} src={`/images/weather/${WTHR_ENG_NM}.svg`} alt="" width={0} height={0} sizes="100vw" className="w-9 h-auto"  />
        <p className="text-xs font-medium">{router.locale=="ko" ? WTHR_KR_DL : WTHR_ENG_DL}</p>
      </section>
            </div>

            </li>
          ))
        )}
      </ul>
    </main>
  );
};

export default Modal;
