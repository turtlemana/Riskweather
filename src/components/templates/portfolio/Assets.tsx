import { Dispatch, SetStateAction, useMemo } from "react";
import Image from "next/image";

import plus from "assets/icons/portfolio/plus.svg";
import pen from "assets/icons/portfolio/pen.svg";
import useUdtDate from "utils/useFormattedDate";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";
import { UserInfo, PortfolioData } from "interfaces/portfolio";

interface Props {
  setIsOpenAddModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenEditAssetsModal: Dispatch<SetStateAction<boolean>>;
  userProfile: UserInfo;
  ptfData: PortfolioData[];
  isValidating: boolean;
  mutate: () => void;
  currencySelect: number;
}

const Assets = ({
  currencySelect,
  setIsOpenAddModal,
  setIsOpenEditAssetsModal,
  userProfile,
  ptfData,
  isValidating,
  mutate,
}: Props) => {
  const router = useRouter();
  const { t } = useTranslation("portfolio");

  const udtDate = useUdtDate(ptfData, isValidating, false, "date");

  const handleOpen = () => {
    if (userProfile?.portfolio && userProfile?.portfolio.length >= 10) {
      toast(
        router.locale == "ko"
          ? "자산이 10개를 초과할 수 없습니다. 자산 개수를 수정해주시길 바랍니다."
          : "You can't add more than 10 assets, please edit your assets first",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }
    setIsOpenAddModal(true);
  };

  const handleEditOpen = () => {
    if (!userProfile?.portfolio) {
      toast(
        router.locale == "ko"
          ? "자산을 먼저 추가해주세요"
          : "Please add your assets",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }
    if (userProfile?.portfolio && userProfile?.portfolio.length < 1) {
      toast(
        router.locale == "ko"
          ? "자산을 먼저 추가해주세요"
          : "Please add your assets",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }

    setIsOpenEditAssetsModal(true);
  };

  const handleImageError = useHandleWeatherImageError();

  return (
    <main className="rounded-20 max-w-[650px] max-h-[822px] flex-1 overflow-hidden">
      <section className="flex items-center bg-white py-8 px-8">
        <h1 className="text-2xl flex-1">{t("assetTitle")}</h1>
        <div
          className="flex items-center py-2 px-3 border rounded-[36px] h-10 cursor-pointer border-gray-200 text-gray-400 gap-2 mr-4"
          onClick={handleOpen}
        >
          <h1 className="mt-1">{t("assetAdd")}</h1>
          <Image src={plus} alt="" />
        </div>
        <Image
          src={pen}
          alt=""
          className="cursor-pointer"
          onClick={handleEditOpen}
        />
      </section>
      <section className="flex py-3 px-8 text-gray-600 justify-between w-full text-sm font-medium">
        <p className="w-[191px]">{t("tableName")}</p>
        <p className="w-[120px] text-center">{t("tableQuantity")}</p>
        <p className="w-[195px] text-center">{t("tablePrice")}</p>
      </section>
      <section className="bg-white pt-3 px-8  h-[680px] overflow-auto slim-scroll">
        {userProfile?.portfolio && userProfile?.portfolio.length > 0 ? (
          ptfData?.map(
            (
              { name, ticker, quantity, price, krPrice, krName }: PortfolioData,
              i: number
            ) => (
              <div key={i} className={""}>
                <article
                  className=" flex justify-between items-center cursor-pointer"
                  onClick={() => router.push({ pathname: `/detail/${ticker}` })}
                >
                  <div className="w-[191px] flex">
                    <Image
                      loading="eager"
                      unoptimized
                      width={50}
                      height={50}
                      quality={100}
                      onError={handleImageError}
                      src={`/images/logos/${ticker}.png` || ""}
                      alt=""
                      className="h-10 w-10 mr-3 "
                    />
                    <div>
                      <h6
                        className="mb-1 w-[150px] truncate"
                        title={
                          router.locale == "ko"
                            ? decodeURIComponent(krName)
                            : decodeURIComponent(name)
                        }
                      >
                        {router.locale == "ko"
                          ? decodeURIComponent(krName)
                          : decodeURIComponent(name)}
                      </h6>
                      <p className="text-gray-500 text-xs">
                        {decodeURIComponent(ticker)}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#111111] w-[120px] text-center">
                    {quantity?.toLocaleString()}
                  </p>
                  <p className="text-[#111111] w-[191px] text-center">
                    {currencySelect === 1
                      ? "￦" +
                        " " +
                        krPrice?.toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                      : "$" +
                        " " +
                        price?.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </p>
                </article>
                <div className="h-px bg-gray-100 my-3 w-full" />
              </div>
            )
          )
        ) : (
          <div className={"flex justify-center flex-row"}>
            <div className={"py-[224px] text-center"}>
              <p className="  font-semibold text-md text-[#111111]">
                {t("noAssets")}
              </p>
              <p className="pb-[30px]  font-semibold text-md text-[#111111]">
                {t("noAssets2")}
              </p>

              <button
                onClick={handleOpen}
                type="button"
                className="w-[200px] h-[50px]   text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-xl shadow-sm text-md px-5 py-2.5 text-center mr-2 mb-2"
              >
                {t("assetAdd")}
              </button>
            </div>
          </div>
        )}
        <div className={"flex justify-end items-center"}>
          <p className="pb-5 text-sm text-[#6B7280] text-end font-light">
            {" "}
            {ptfData.length > 0 && !isValidating ? udtDate : ""}
          </p>
        </div>
      </section>
    </main>
  );
};

export default Assets;
