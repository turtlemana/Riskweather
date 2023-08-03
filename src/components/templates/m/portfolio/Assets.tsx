import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

import plus from "assets/icons/portfolio/plus.svg";
import pen from "assets/icons/portfolio/pen.svg";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useUdtDate from "utils/useFormattedDate";
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
  const [page, setPage] = useState(1);
  const isLast = page * 5 >= ptfData?.length;
  const array = ptfData?.slice(0, page * 5);
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
    <main className="pt-7 pb-2">
      <section className="flex items-center bg-white px-8 mb-3">
        <h1 className="text-xl flex-1">{t("assetTitle")}</h1>
        <div
          className="flex items-center py-2 px-3 border rounded-[40px] h-8 cursor-pointer border-gray-200 text-gray-400 gap-2 mr-3"
          onClick={handleOpen}
        >
          <h1 className="mt-1 text-sm">{t("assetAdd")}</h1>
          <Image src={plus} alt="" />
        </div>
        <Image
          src={pen}
          alt=""
          className="cursor-pointer w-6"
          onClick={handleEditOpen}
        />
      </section>

      <section className="bg-white px-5 ">
        {userProfile?.portfolio && userProfile?.portfolio.length > 0 ? (
          <div>
            {ptfData?.map(
              (
                {
                  name,
                  ticker,
                  quantity,
                  price,
                  krPrice,
                  krName,
                }: PortfolioData,
                i: number
              ) => (
                <div key={i}>
                  <article
                    className=" flex justify-between items-center py-4 cursor-pointer"
                    onClick={() =>
                      router.push({ pathname: `/detail/${ticker}` })
                    }
                  >
                    <div className="flex items-center">
                      <Image
                        loading="eager"
                        unoptimized
                        width={10}
                        height={10}
                        quality={100}
                        onError={handleImageError}
                        src={`/images/logos/${ticker}.png` || ""}
                        alt=""
                        className="h-10 w-10 mr-3 "
                      />{" "}
                      <div>
                        <h6 className={"w-[150px] truncate"}>
                          {router.locale == "ko"
                            ? decodeURIComponent(krName)
                            : decodeURIComponent(name)}
                        </h6>
                        <p className="text-gray-500 text-xs">
                          {decodeURIComponent(ticker)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-[#111111] text-xs font-medium">
                      <h6 className="text-sm mb-1">
                        {" "}
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
                      </h6>
                      <p className="text-gray-700">
                        {quantity.toLocaleString()}
                      </p>
                    </div>
                  </article>
                  {array.length - 1 !== i && (
                    <div className="h-px bg-gray-100 w-full" />
                  )}
                </div>
              )
            )}
            {/* {userProfile?.portfolio.length>5 && !isLast ? (
              <div
                className="h-10 rounded-20 border border-[#0198ff] py-2 flex justify-center text-[#0198ff] text-sm font-medium cursor-pointer mt-5"
                onClick={() => setPage((prev) => prev + 1)}
              >
                {t('tableMore')}
                <Image src={arrow} alt="" className="ml-1 mb-1 w-4" />
              </div>
            ): <div
            className="h-10 rounded-20 border border-[#0198ff] py-2 flex justify-center text-[#0198ff] text-sm font-medium cursor-pointer mt-5"
            onClick={() => setPage(1)}
          >
            {t('tableFold')}
            <SlArrowUp className={'mb-1 ml-1.5 text-[#0198FF] text-[10px] font-bold'}/>
          </div>} */}
          </div>
        ) : (
          <div className={"flex justify-center flex-row"}>
            <div className={"py-[224px] text-center"}>
              <p className="  font-semibold text-sm text-[#111111]">
                {t("noAssets")}
              </p>
              <p className="pb-[30px]  font-semibold text-sm text-[#111111]">
                {t("noAssets2")}
              </p>

              <button
                onClick={handleOpen}
                type="button"
                className="w-[150px] h-[50px]   text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-xl shadow-sm text-md px-5 py-2.5 text-center mr-2 mb-2"
              >
                {t("assetAdd")}
              </button>
            </div>
          </div>
        )}
        <p className={"text-end text-gray-400 text-sm mt-5"}>
          {" "}
          {ptfData.length > 0 && !isValidating ? udtDate : ""}
        </p>
      </section>
    </main>
  );
};

export default Assets;
