import { useState, MouseEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import option from "assets/icons/header/option.svg";
import close from "assets/icons/header/mobileClose.svg";
import mobileSearch from "assets/icons/header/mobileSearch.svg";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";

import Modal from "components/layouts/m/TopBar/Modal";
import AlarmModal from "components/layouts/m/TopBar/AlarmModal";
import SearchModal from "components/layouts/m/TopBar/SearchModal";
import Contact from "components/templates/m/Contact";

import SessionComponent from "./SessionComponent";

const TopBar = () => {
  const [isRead, setIsRead] = useState(false);

  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAlarmModal, setIsOpenAlarmModal] = useState(false);
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
  const [isOpenContactModal, setIsOpenContactModal] = useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
    setIsOpenSearchModal(false);
  };

  const alarmRouteClose = () => {
    setIsOpenAlarmModal(false);
    setIsOpenModal(false);
  };

  const handleMainPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `/${router.locale}`;
  };

  const alertModalClick = () => {
    setIsRead(true);
    setIsOpenAlarmModal((prev) => !prev);
  };

  return (
    <header className="fixed top-0 w-full z-30 bg-white h-16 border-b border-gray-100 py-[14px] px-5 ">
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
            <AlarmModal
              isOpenAlarmModal={isOpenAlarmModal}
              alertModalClick={alertModalClick}
              isRead={isRead}
              onClose={alarmRouteClose}
            />

            <SessionComponent />
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
          topRiskRow={504}
          onClose={() => setIsOpenModal(false)}
          setIsOpenContactModal={setIsOpenContactModal}
          setIsOpenAlarmModal={setIsOpenAlarmModal}
        />
      )}
      {isOpenContactModal && (
        <Contact onClose={() => setIsOpenContactModal(false)} />
      )}

      {isOpenSearchModal && (
        <SearchModal setIsOpenSearchModal={setIsOpenSearchModal} />
      )}
    </header>
  );
};

export default TopBar;
