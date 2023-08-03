import { useCallback, Dispatch, SetStateAction } from "react";

import { MENUS } from "datas/main";
import Carousels from "./Carousels";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import arrow from "assets/icons/main/blueArrow.svg";
import { CarouselData } from "interfaces/main";
import { Session } from "interfaces/login";
import { useSession } from "next-auth/react";
import AdCard from "./AdCard";

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
  //@ts-ignore
  const { data: session, status }: { data: Session; status: string } =
    useSession();

  const router = useRouter();
  const buttonHandler = useCallback(() => {
    if (!session && status != "authenticated") {
      localStorage.setItem("clickedPortfolio", "portfolio");
    }
    router.push(`/portfolio`);
  }, [session, status]);
  const { t } = useTranslation("index");
  return (
    <main className="pt-[90px]  relative h-[415px] min-w-[1024px]  w-full  bg-backgroundColor bg-cover bg-no-repeat bg-center">
      <div className="z-[-1] absolute top-0 left-0 w-full h-full mx-auto bg-background bg-cover bg-no-repeat bg-center" />
      <div
        className={
          "max-w-1320 w-full mx-auto flex flex-col justify-center items-cener  "
        }
      >
        <div
          className={
            "mb-10 flex gap-20 justify-between items-center ml-[60px] mr-[60px]"
          }
        >
          <h1 className=" text-center  text-[27px] xl:text-[40px] text-white">
            {t("headerTitle")}
          </h1>
          <button
            onClick={buttonHandler}
            className={
              " flex justify-center items-center  w-[350px] ml-10  py-5 px-10 mr-2  text-xl font-extrabold text-[#0198FF] shadow-md focus:outline-none bg-white rounded-full border-2  border-gray-300  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            }
          >
            {t("headerButton")}
            <Image
              src={arrow}
              alt=""
              className=" w-5 cursor-pointer ml-3 -rotate-90"
            />
          </button>
        </div>

        <ul className="flex  gap-2.5 mb-10 justify-start  ml-[60px]">
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
                className={`flex items-center py-2 px-3 rounded-[36px] min-w-[46px] text-center cursor-pointer hover:bg-[#F3F4F6] hover:text-gray-400
            ${
              carouselType === title
                ? "bg-black text-white"
                : "bg-white text-gray-400"
            }`}
                onClick={() => setCarouselType(title)}
              >
                <h5 className="h-5">
                  {router.locale == "ko" ? koreanTitle : title}
                </h5>
              </li>
            )
          )}
        </ul>
        {/* <Carousel list={MENUS[index].list}/> */}
        <div className={"flex justify-center items-center"}>
          {/* <AdCard/> */}
          {carouselData && !carouselValid ? (
            <Carousels
              carouselType={carouselType}
              setCarouselType={setCarouselType}
              carouselData={carouselData}
            />
          ) : (
            <div role="status" className={"py-20 justify-center items-center"}>
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
        </div>
      </div>
    </main>
  );
};

export default Header;
