import { useCallback, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import blackArrow from "assets/icons/main/blueArrow.svg";

import arrow from "assets/icons/main/whiteArrow.svg";
import world from "assets/icons/main/whiteWorld.svg";
import { MENUS } from "datas/main";
import CarouselsWithAd from "components/organisms/m/CarouselsWithAd";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";
import { Session } from "interfaces/login";
import { CarouselData } from "interfaces/organism";
import useWindowWidth from "utils/useWindowWidth";

interface Props {
  carouselData: CarouselData[];
  carouselType: string;
  setCarouselType: Dispatch<SetStateAction<string>>;
  carouselValid: boolean;
}
const Header = ({
  carouselData,
  carouselType,
  setCarouselType,
  carouselValid,
}: Props) => {
  const width = useWindowWidth();
  //@ts-ignore
  const { data: session, status }: { data: Session; status: string } =
    useSession();
  const router = useRouter();
  const { t } = useTranslation("index");
  const buttonHandler = useCallback(() => {
    if (!session && status != "authenticated") {
      localStorage.setItem("clickedPortfolio", "portfolio");
    }
    router.push(`/portfolio`);
  }, [session, status]);
  return (
    <main className="pt-8 w-full min-w-[360px]">
      <div className={"flex flex-col items-center "}>
        <h1 className="mb-7 text-center text-2xl">
          {t("mobileTitle1")}
          <br />
          {t("mobileTitle2")}
        </h1>
        <button
          onClick={buttonHandler}
          type="button"
          className="flex items-center mb-7 py-2.5 px-14 mr-2  text-md font-bold text-[#0198FF] focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
        >
          {t("headerButton")}
          <Image src={blackArrow} alt="" className="w-4 ml-2 -rotate-90" />
        </button>
      </div>

      <ul className="flex justify-center gap-2.5 mb-7 ">
        {MENUS.map(
          ({
            id,
            title,
            koreanTitle,
          }: {
            id: number;
            title: string;
            koreanTitle: string;
          }) => (
            <li
              key={id}
              className={`py-2 px-2.5 rounded-20 text-center cursor-pointer border h-9 flex items-center
            ${
              carouselType === title
                ? "bg-black text-white border-black"
                : "bg-white text-gray-400 border-gray-200"
            }`}
              onClick={() => setCarouselType(title)}
            >
              <h1 className="">
                {router.locale == "ko" ? koreanTitle : title}
              </h1>
            </li>
          )
        )}
      </ul>
      {/* <Carousel list={MENUS[index].list} /> */}

      {carouselData && !carouselValid ? (
        <div className={`${width >= 650 ? "px-5 " : "px-5"}  mx-auto`}>
          <CarouselsWithAd
            carouselData={carouselData}
            setCarouselType={setCarouselType}
            carouselType={carouselType}
          />
          {/* <Carousels carouselData={carouselData}/> */}
        </div>
      ) : (
        <div role="status" className={"flex py-20 justify-center items-center"}>
          <svg
            aria-hidden="true"
            className="w-12 h-12  text-gray-200 animate-spin dark:text-gray-600 fill-blue-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      <div className="flex justify-center mt-8">
        <Link href="/map" className="">
          <button className="bg-[#0198FF] rounded-[60px] p-[18px] flex items-center text-white h-[52px]">
            <Image src={world} alt="" />
            <h6 className="mt-1 ml-3 mr-10">{t("mobileMapButton")}</h6>
            <Image src={arrow} alt="" />
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Header;
