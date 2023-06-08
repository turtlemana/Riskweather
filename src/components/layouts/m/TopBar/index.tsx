import { useState,MouseEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import my from "assets/icons/header/my.svg";
import option from "assets/icons/header/option.svg";
import close from "assets/icons/header/mobileClose.svg";
import mobileSearch from "assets/icons/header/mobileSearch.svg";
import {useSession} from "next-auth/react"
import useHandleWeatherImageError from 'utils/useHandleWeatherImageError'
import bell from "assets/icons/header/bell.svg";

import Modal from "components/layouts/m/TopBar/Modal";
import AlarmModal from "components/layouts/m/TopBar/AlarmModal";
import SearchModal from "components/layouts/m/TopBar/SearchModal";
import Contact from "components/templates/m/Contact";
import { TopRiskItem,ResultItem } from "interfaces/layout";
import { Session } from "interfaces/login";

interface Props {
  search:string | undefined;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchList: ResultItem[];
  topRisk:TopRiskItem[];
}

const TopBar = ({search,onSearch,searchList,topRisk}:Props) => {
  const [isRead,setIsRead]=useState(false)

  //@ts-ignore
  const {data:session}: { data: Session | null }=useSession();

  const router=useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAlarmModal, setIsOpenAlarmModal] = useState(false);
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
  const [isOpenContactModal, setIsOpenContactModal] = useState(false);

  const handleWeatherImageError = useHandleWeatherImageError();
  const alertModalClick=()=>{
    setIsRead(true)
    setIsOpenAlarmModal((prev) => !prev)
    
  }


  const closeModal=()=>{
    setIsOpenModal(false)
    setIsOpenSearchModal(false)
  }

  const alarmRouteClose=()=>{
    setIsOpenAlarmModal(false)
    setIsOpenModal(false)
  }

  const handleMainPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = '/';

  };

  return (
    <header className="fixed top-0 w-full z-30 bg-white h-16 border-b border-gray-100 py-[14px] px-5 ">
      
      <Head>
      <link rel="Icon" href="/images/favicon.png" type="image/x-icon" />
      <title>Riskweather</title>
      <meta property="og:image" content="https://riskweather.io/images/favicon.png" />
        <meta property="og:description" content={router.locale==="ko" ? "리스크 없는 투자는 없습니다. Riskweather와 함께 리스크에 대비하세요" : "Check out Risk, before Invest"} />
        <meta property="og:title" content="Riskweather" />
      </Head>
      <div className="h-full mx-auto flex items-center justify-between w-full">
        <Link href="/" onClick={handleMainPage}>

          <Image
           width={148}
           height={50}
           unoptimized
            src={`/images/icons/header/logo.png`}
            alt="logo"
            className="cursor-pointer max-w-[148px]"
          />
        </Link>
        {isOpenModal || isOpenSearchModal ? (
          <Image
            src={close}
            alt=""
            className="w-6 h-6 cursor-pointer"
            onClick={closeModal}
          />
        ) : (
          <section className="flex justify-center items-center gap-4">
            <Image
              src={mobileSearch}
              alt=""
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsOpenSearchModal((prev) => !prev)}
            />
          <div className={'relative text-center '}>
          <Image
            src={bell}
            alt=""
            className="w-6 h-6 cursor-pointer "
            onClick={alertModalClick}
          />
               {!isRead &&
            <div onClick={alertModalClick}  className="flex items-center justify-center ml-3 absolute top-2 w-5 h-5 text-[10px] cursor-pointer bg-red-500 text-white rounded-md "
>
              {topRisk.length}
            </div>}
            </div>
  
            {session? <Link href={`/${router.locale}/portfolio`}>
                <Image
                onError={handleWeatherImageError}
                unoptimized
                width={10}
                height={10}
              src={session?.user?.image}
              referrerPolicy="no-referrer"
              loading="eager"
              alt="profile"
              className="mr-6 w-8 h-8 rounded-full cursor-pointer laptop:mr-3"
            />
            </Link> :
            <Link href={`/${router.locale}/login`}>
            <Image src={my} alt="" className="w-6 h-6" />
 
          </Link>}
          <Image
              src={option}
              alt=""
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsOpenModal((prev) => !prev)}
            />
          </section>
        )}
      </div>
      {isOpenModal && (
        <Modal
        topRisk={topRisk}
          onClose={() => setIsOpenModal(false)}
          setIsOpenContactModal={setIsOpenContactModal}
          setIsOpenAlarmModal={setIsOpenAlarmModal}
        />
      )}
      {isOpenContactModal && (
        <Contact onClose={() => setIsOpenContactModal(false)} />
      )}
      {isOpenAlarmModal && (
        <AlarmModal topRisk={topRisk} onClose={alarmRouteClose} />
      )}
      {isOpenSearchModal && <SearchModal search={search} onSearch={onSearch} searchList={searchList} setIsOpenSearchModal={setIsOpenSearchModal}/>}
    </header>
  );
};

export default TopBar;
