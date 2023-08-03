import { MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { MENUS } from "datas/header";
import Modal from "components/layouts/TopBar/Modal";
import Head from "next/head";
import { useExploreState } from "contexts/ExploreStateContext";
import { SingleValue } from "react-select";
import { StylesConfig } from "react-select";
import dynamic from "next/dynamic";
import SessionComponent from "./SessionComponent";
import SearchInput from "components/layouts/TopBar/SearchInput";

interface IOptionType {
  value: string;
  label: string;
  img: string;
}

const TopBar = () => {
  const Select: any = dynamic(() => import("react-select"), { ssr: false });

  const { dispatch } = useExploreState();

  const router = useRouter();

  const languageOptions = [
    { value: "en", label: "English", img: "/images/flags/us.png" },
    { value: "ko", label: "한국어", img: "/images/flags/kr.png" },
  ];

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

  const handleLocaleChange = async (locale: string) => {
    localStorage.setItem("lang", locale);
    await router.push(router.pathname, router.asPath, { locale });
  };

  const handleMainPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `/${router.locale}`;
  };

  return (
    <header className="bg-white min-w-[1024px] h-16 ">
      <Head>
        <link rel="Icon" href="/images/favicon.png" type="image/x-icon" />

        <title>Riskweather</title>
        <meta
          property="og:image"
          content="https://riskweather.io/images/favicon.png"
        />
        <meta
          property="og:description"
          content={
            router.locale === "ko"
              ? "투자 리스크의 기준 - 리스크웨더"
              : "Invest with Confidence, We've Got the Risks Covered"
          }
        />
        <meta property="og:title" content="Riskweather" />
      </Head>
      <div className="max-w-1320 min-w-[1024px] h-full mx-auto flex items-center justify-between w-full desktop:max-w-5xl desktop:px-3 laptop:max-w-3xl laptop:px-3">
        <section className="flex items-center">
          <Link href="/" onClick={handleMainPage}>
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
            <SearchInput />
          </div>
        </section>

        <section className="flex items-center min-w-[573px]">
          <ul className=" text-sm flex gap-9 text-gray-400 font-bold mr-10 desktop:gap-3 desktop:mr-8 laptop:mr-10 laptop:gap-5 laptop:text-sm  2xl:text-[15px] ">
            {MENUS.map(({ id, title, path, koreanTitle }) => (
              <li key={id}>
                <Link
                  href={path}
                  className={`hover:text-blue-400 ${
                    path === router.asPath.split("?")[0] && "text-[#111111]"
                  }`}
                  onClick={() => {
                    title === "Explore"
                      ? dispatch({ type: "RESET_VALUE" })
                      : "";
                  }}
                >
                  {router.locale == "ko" ? koreanTitle : title}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className={
              "w-[125px] mr-8 flex xl:text-md text-gray-400 text-center font-semibold text-sm "
            }
          >
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
          <div>
            <Modal />
          </div>
          <SessionComponent />
        </section>
      </div>
    </header>
  );
};

export default TopBar;
