import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { MOBILE_MENUS } from "datas/header";
import { useSession, signOut } from "next-auth/react";
import { useExploreState } from "contexts/ExploreStateContext";
import { Session } from "interfaces/login";
import { SingleValue } from "react-select";
import { StylesConfig } from "react-select";
import dynamic from "next/dynamic";

interface IOptionType {
  value: string;
  label: string;
  img: string;
}

interface Props {
  onClose: () => void;
  setIsOpenAlarmModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenContactModal: Dispatch<SetStateAction<boolean>>;
  topRiskRow: number;
}

const Modal = ({
  onClose,
  setIsOpenContactModal,
  setIsOpenAlarmModal,
  topRiskRow,
}: Props) => {
  const { dispatch } = useExploreState();

  const [isRead, setIsRead] = useState(false);
  const Select: any = dynamic(() => import("react-select"), { ssr: false });

  //@ts-ignore
  const { data: session }: { data: Session } = useSession();
  const router = useRouter();

  const handleLocaleChange = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  const alertModalClick = () => {
    setIsRead(true);
    setIsOpenAlarmModal((prev) => !prev);
  };

  const languageOptions = [
    { value: "en", label: "English", img: "/images/flags/us.png" },
    { value: "ko", label: "한국어", img: "/images/flags/kr.png" },
  ];

  // 커스텀 스타일 구성
  const customStyles: StylesConfig<IOptionType, false> = {
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      padding: 10,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  return (
    <main className="fixed top-16 left-0 w-full h-full bg-white z-20 ">
      <div className="h-[85%] flex flex-col">
        <div
          className={
            "mr-5 mt-5 justify-between flex text-md text-gray-400 text-center font-semibold"
          }
        >
          <div></div>
          {/* <select className={'items-center justify-center'}
        defaultValue={router.locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
      >
        <option className={'text-black'} value="en">English</option>
        <option className={'text-black'}  value="ko">한국어</option>
      </select> */}
          <Select
            instanceId="mollys"
            styles={customStyles}
            options={languageOptions}
            defaultValue={languageOptions.find(
              (opt) => opt.value === router.locale
            )}
            onChange={(
              e: SingleValue<{ value: string; label: string; img: string }>
            ) => {
              if (e) {
                handleLocaleChange(e.value);
              }
            }}
            formatOptionLabel={(option: any) => (
              <div className="flex items-center">
                <Image
                  src={option.img}
                  alt={option.label}
                  width={16}
                  height={16}
                />
                <span className="ml-2">{option.label}</span>
              </div>
            )}
          />
        </div>
        <ul className="flex flex-col gap-10 text-[18px] h-full items-center justify-center flex-1">
          {MOBILE_MENUS.map(({ id, title, path, koreanTitle }) => (
            <li key={id}>
              <Link
                href={path}
                className={`${
                  path === router.asPath && "text-[#0148FF]"
                } text-[#111111]`}
                onClick={() => {
                  onClose();
                  title === "Explore" ? dispatch({ type: "RESET_VALUE" }) : "";
                }}
              >
                <h6>{router.locale == "ko" ? koreanTitle : title}</h6>
              </Link>
            </li>
          ))}
        </ul>
        <section className="flex px-5">
          <article className="flex-1 flex items-center">
            <p
              className="text-[#111111] cursor-pointer"
              onClick={() => setIsOpenContactModal(true)}
            >
              {router.locale == "ko" ? "문의하기" : "Contact"}
            </p>
            <div className="bg-gray-300 w-px mx-3 h-[14px] mb-1" />
            {session ? (
              <p
                className="text-gray-400 cursor-pointer"
                onClick={() => {
                  signOut({ callbackUrl: `/${router.locale}/login` });
                }}
              >
                {router.locale == "ko" ? "로그아웃" : "Logout"}
              </p>
            ) : (
              <Link href={`/${router.locale}/login`} onClick={onClose}>
                <p className="text-gray-400 cursor-pointer">
                  {router.locale == "ko" ? "로그인" : "Sign In"}
                </p>
              </Link>
            )}
          </article>
          {/* <div className={'relative text-center'}>
          <Image
            src={bell}
            alt=""
            className="cursor-pointer "
            onClick={alertModalClick}
          />
               {!isRead &&
            <div onClick={alertModalClick}  className="flex items-center  justify-center ml-3 absolute top-2 w-5 h-5 text-[10px] cursor-pointer bg-red-500 text-white rounded-md "
>
            <p className={'mb-0.5'}>  {topRiskRow}</p>
            </div>}
            </div> */}
        </section>
      </div>
    </main>
  );
};

export default Modal;
