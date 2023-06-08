import { useState,useEffect,useMemo,KeyboardEventHandler,MouseEvent} from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import bell from 'assets/icons/header/bell.svg'
import { MENUS } from "datas/header";
import Modal from "components/layouts/TopBar/Modal";
import UserModal from "components/layouts/TopBar/UserModal";
import Contact from "components/templates/Contact";
import {signOut,useSession} from "next-auth/react"
import useModalClose from "utils/useModalClose";
import { COLORS } from "datas/main";
import mobileSearch from "assets/icons/header/mobileSearch.svg";
import Head from "next/head";
import { useExploreState } from "contexts/ExploreStateContext";
import useHandleImageError from 'utils/useHandleImageError'
import useHandleWeatherImageError from 'utils/useHandleWeatherImageError'
import { TopRiskItem,ResultItem } from "interfaces/layout";
import { Session } from "interfaces/login";
import {SingleValue} from "react-select";
import { StylesConfig } from "react-select";
import dynamic from 'next/dynamic';

// Type for the option values
interface IOptionType {
    value: string;
    label: string;
    img: string;
}


interface Props{
  search:string | undefined;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchList: ResultItem[];
  topRisk:TopRiskItem[];
}






const TopBar = ({search,onSearch,searchList,topRisk}:Props) => {
  const Select:any = dynamic(() => import('react-select'), { ssr: false });

  //@ts-ignore
  const { data: session }: { data: Session | null } = useSession();
  const [isRead,setIsRead]=useState(false)
  const {dispatch}=useExploreState();
  
  const router = useRouter();
  const [searchActive,setSearchActive]=useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUserOpenModal, setIsUserOpenModal] = useState(false);
  const [isOpenContactModal, setIsOpenContactModal] = useState(false);

  useEffect(()=>{  
    router.events.on('routeChangeStart', ()=>{setIsUserOpenModal(false)})
},[router.events])
  const resultList=useMemo(()=>{
    let tmpList=[...searchList]
    return tmpList
  },[searchList])

  const alertModalClick=()=>{
    setIsRead(true)
    setIsOpenModal((prev) => !prev)
    
  }

  const languageOptions = [
    { value: "en", label: "English", img: "/images/flags/us.png" },
    { value: "ko", label: "한국어", img: "/images/flags/kr.png" }
  ];
  
  // 커스텀 스타일 구성
  const customStyles: StylesConfig<IOptionType, false> = {
    option: (provided, state) => ({
        ...provided,
        display: "flex",
        alignItems: "center",
        padding: 10
    }),
    singleValue: (provided, state) => ({
        ...provided,
        display: "flex",
        alignItems: "center"
    }),
};

  const handleLocaleChange=async(locale:string)=>{
  await  router.push(router.pathname,router.asPath,{locale})
  }
  const alertRef=useModalClose(isOpenModal,setIsOpenModal)
  const modalRef=useModalClose(isUserOpenModal,setIsUserOpenModal)

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
  
      if (resultList.length >= 1 && searchActive) {
        const firstItem = resultList[0];
        //@ts-ignore
        router.push({ pathname: `/detail/${firstItem['ITEM_CD_DL']}` });
      }
    }
  };

  const handleMainPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = '/';

  };

  const handleImageError = useHandleImageError();
  const handleWeatherImageError = useHandleWeatherImageError();
  


  return (
    <header className="bg-white min-w-[1024px] h-16 ">
      <Head>
      <link rel="Icon" href="/images/favicon.png" type="image/x-icon" />

      <title>Riskweather</title>
      <meta property="og:image" content="https://riskweather.io/images/favicon.png" />
        <meta property="og:description" content={router.locale==="ko" ? "리스크 없는 투자는 없습니다. Riskweather와 함께 리스크에 대비하세요" : "Check out Risk, before Invest"} />
        <meta property="og:title" content="Riskweather" />
      </Head>
      <div className="max-w-1320 min-w-[1024px] h-full mx-auto flex items-center justify-between w-full desktop:max-w-5xl desktop:px-3 laptop:max-w-3xl laptop:px-3">

        <section className="flex items-center">
          <Link href="/"  onClick={handleMainPage}>
            <Image
            width={200}
            height={50}
            unoptimized
              src={`/images/icons/header/logo.png`}
              alt="logo"
              loading="eager"
              className="mr-10 cursor-pointer m-auto  h-auto desktop:w-44 desktop:mr-5 laptop:w-36 laptop:mr-5"
            />
  
          </Link>
          <div className="flex-row">
          <article className="relative w-406 py-2.5 px-4 flex items-center border border-solid border-gray-200 rounded-20 hover:border-[#4B5563] desktop:w-60  laptop:w-60 laptop:h-9">
          <Image src={mobileSearch} alt="search" className="mr-2 w-4 h-4" />

            <input
              placeholder={router.locale=="ko" ? "자산의 이름을 검색하세요" : "Search"}
              className="outline-none laptop:text-sm w-full"
              value={search}
              onChange={onSearch}
              onFocus={()=>{setSearchActive(true)}}
              onBlur={()=>{setSearchActive(false)}}
              onKeyDown={handleKeyDown}
            />

          </article>
          {resultList.length>=1 && searchActive ? 
          
      <div className="absolute top-[58px]  w-[478px] max-h-[259px] bg-white z-20 py-[6px] px-5 overflow-auto customScrollBar rounded-20" >
          {resultList?.map((asset:ResultItem,i:number)=>
          <article key={i} onMouseDown={()=>{router.push({pathname:`/detail/${asset['ITEM_CD_DL']}`})}}  className="flex items-center cursor-pointer" >
              <section className="flex items-center py-[10px] flex-1">
              <Image loading="eager" unoptimized  width={10} height={10} quality={100} onError={(event)=>handleImageError(event,asset['HR_ITEM_NM'])} src={`/images/logos/${asset['ITEM_CD_DL']}.png` || ""} alt="" className="h-10 w-10 mr-3"/>
            <div>
            <h6 className={'text-sm'} title={router.locale=="ko" ? asset['ITEM_KR_NM'] : asset['ITEM_ENG_NM']}>{router.locale=="ko" ? asset['ITEM_KR_NM'] :asset['ITEM_ENG_NM']}</h6>
            <p className="text-gray-500 text-xs">{asset['ITEM_CD_DL']}</p>
            </div>
            </section>
            <section data-tooltip-id="riskLevel" data-tooltip-content={router.locale=="ko" ? asset['LV_DSCP_KR'] : asset['LV_DSCP_ENG']}  className={`h-6 py-1 px-3 rounded-20 text-xs font-semibold ${COLORS[asset['CVaR_LV']]}`}>
            <p className={"mt-px"}>{router.locale =="ko" ? asset['CVaR_LV_KR'] : asset['CVaR_LV']}</p>
            </section>

            <Image onError={handleWeatherImageError} loading="eager" src={`/images/weather/${asset['WTHR_ENG_NM']}.svg`} width={0} height={0} alt="weather" className="w-6 h-6 ml-4"/>

          </article>)}
          </div> : ""}
          </div>

        </section>

        <section className="flex items-center">

          <ul className="text-sm flex gap-9 text-gray-400 font-bold mr-10 desktop:gap-3 desktop:mr-8 laptop:mr-10 laptop:gap-5 laptop:text-sm  2xl:text-[15px] ">
            {MENUS.map(({ id, title, path, koreanTitle}) => (
              <li key={id}>
                <Link
                  href={path}
                  className={`${path === router.asPath.split("?")[0] && "text-[#111111]"}`}
                  onClick={()=>{title==="Explore" ?  dispatch({ type: 'RESET_VALUE' }) : ""}}
                >
                  {router.locale=="ko" ? koreanTitle : title}
                </Link>
              </li>
            ))}
          </ul>
          <div className={'mr-8 flex xl:text-md text-gray-400 text-center font-semibold text-sm '}>
          {/* <select className={'items-center justify-center'}
        defaultValue={router.locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
      >
        <option className={'text-black'} value="en">
          <Image src={`/images/flags/us.png`} width={6} height={6} alt=""/>
          English
          </option>
        <option className={'text-black'}  value="ko">한국어</option>
      </select> */}
 <Select
 instanceId={"Molly"}
  styles={customStyles}
  options={languageOptions}
  defaultValue={languageOptions.find(opt => opt.value === router.locale)}
  onChange={(e: SingleValue<{ value: string; label: string; img: string }>) => {
    if (e) {
      handleLocaleChange(e.value);
    }
  }}
  formatOptionLabel={(option:any) => (
    <div className="flex items-center">
      <Image src={option.img} alt={option.label} width={16} height={16} />
      <span className="ml-2">{option.label}</span>
    </div>
  )}
/>
      </div>
      <div>
          <div className=" relative flex  text-center items-center justify-center">
          <Image
              src={bell}
              width={6}
              height={6}
              alt="bell"
              className="mr-7 w-6 h-6 cursor-pointer laptop:mr-3 "
              onClick={alertModalClick}
              ref={alertRef}
            />

              {!isRead &&
            <div  
            onClick={alertModalClick}

            className="text-xs  absolute top-2 w-5 h-5  cursor-pointer bg-red-500 text-white rounded-md "
>
              {topRisk.length}
            </div>}

            {isOpenModal && <Modal  topRisk={topRisk} onClose={() => setIsOpenModal(false)} />}
          </div>
          </div>
          {session ? (
            <div
            //@ts-ignore
            ref={modalRef}
              className="flex-row items-center"
              onClick={() => setIsUserOpenModal((prev) => !prev)}
            >
              <Image
                src={session?.user?.image}
                onError={handleWeatherImageError}
                
                width={50}
                height={50}
                referrerPolicy="no-referrer"
                loading="eager"
                alt="profile"
                className="mr-6 w-10 h-10 rounded-full cursor-pointer laptop:mr-3"
              />
              {isUserOpenModal && (
                <UserModal
                  onClose={() => setIsUserOpenModal((prev) => !prev)}
                  onLogout={() => signOut({callbackUrl:'/login'})}
                  onOpenContactModal={() => setIsOpenContactModal(true)}
                />
              )}
              {isOpenContactModal && (
                <Contact email={session?.user?.email} onClose={() => setIsOpenContactModal(false)} />
              )}
            </div>
          ) : (
            
            <button onClick={() => router.push({pathname:'/login'})} type="button" className="py-2 px-5   text-sm font-semibold text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{router.locale=="ko" ? "로그인" : "Sign In"}</button>

          )}
        </section>
      </div>
    
    </header>
  );
};

export default TopBar;
