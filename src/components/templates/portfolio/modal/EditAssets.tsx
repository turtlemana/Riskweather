import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

import close from "assets/icons/contact/close.svg";
import back from "assets/icons/portfolio/back.svg";
import checkbox from "assets/icons/portfolio/checkbox.svg";
import blueCheckbox from "assets/icons/portfolio/blueCheckbox.svg";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { UserInfo, SelectAsset, UserPortfolio } from "interfaces/portfolio";
import { Session } from "interfaces/login";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";
import useUdtDate from "utils/useFormattedDate";

interface Props {
  setIsOpenAddModal: Dispatch<SetStateAction<boolean>>;
  userProfile: UserInfo;
  isValidating: boolean;
  mutate: () => void;
  session: Session;
}

const EditAssets = ({
  session,
  setIsOpenAddModal,
  userProfile,
  isValidating,
  mutate,
}: Props) => {
  const router = useRouter();
  const { t } = useTranslation("portfolio");
  const [isLoading, setIsLoading] = useState(false);
  const currentDate = useUdtDate(new Date().toISOString(), false, true);

  const [selectIndex, setSelectIndex] = useState<SelectAsset[]>(
    userProfile?.portfolio ? [...userProfile?.portfolio] : []
  );
  const handleSelect = ({ name, ticker, quantity, krName }: SelectAsset) => {
    if (selectIndex.some((asset) => asset["ticker"] == ticker)) {
      const filtered = selectIndex.filter((asset) => asset.ticker !== ticker);
      return setSelectIndex(filtered);
    }
    if (selectIndex.length >= 10) {
      return;
    }
    return setSelectIndex([...selectIndex, { name, ticker, quantity, krName }]);
  };

  const handleClose = () => {
    setIsOpenAddModal(false);
    setSelectIndex(userProfile?.portfolio ? [...userProfile?.portfolio] : []);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
    ticker: string
  ) => {
    const value = Number(e.target.value);
    if (value < 0 || value > 100000) return;

    const newSelectIndex = selectIndex.map((item) => {
      if (item.ticker === ticker) {
        return { ...item, quantity: value };
      }
      return item;
    });

    setSelectIndex(newSelectIndex);
  };
  const submitHandler = async () => {
    if (selectIndex.some((asset) => asset["quantity"] <= 0)) {
      toast(
        router.locale == "ko"
          ? "최소 1개 이상의 자산이 포함돼야 합니다"
          : "your asset should be more than 0",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }
    let enteredInput = {};
    if (userProfile?.portfolio && userProfile?.portfolio.length > 10) {
      toast(
        router.locale == "ko"
          ? "10개 이상의 자산을 추가하실 수 없습니다"
          : "Your assets are limited to 10",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }
    setIsLoading(true);

    let tickers = "";
    let shares = "";

    for (let i = 0; i < selectIndex.length; i++) {
      tickers += encodeURIComponent(selectIndex[i].ticker);
      shares += encodeURIComponent(selectIndex[i].quantity);

      if (i !== selectIndex.length - 1) {
        tickers += "%2C";
        shares += "%2C";
      }
    }

    const fetchAddress = `https://riskweather.io/rapi/portfolio?ticker=${tickers}&shares=${shares}`;

    try {
      const response = await fetch(fetchAddress);
      const result = await response.json();
      setIsLoading(false);

      enteredInput = {
        portfolio: selectIndex,
        portfolioResult: result.result.portfolio_risk[0] * 100,
        portfolioLevel: result.result.portfolio_risk_ranked[0],
        portfolioTime: currentDate,
      };

      const data = await fetch(`/api/auth/user?session=${session.user.email}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ enteredInput }),
      }).then((res) => {
        if (res.ok) {
          setIsOpenAddModal(false);
          toast(
            router.locale == "ko"
              ? "수정사항이 성공적으로 반영됐습니다"
              : "Successfully Edited assets to your portfolio",
            { hideProgressBar: true, autoClose: 2000, type: "success" }
          );
          mutate();
        } else {
          toast(
            router.locale == "ko"
              ? "네트워크 에러가 발생했습니다"
              : "Fetch Error",
            { hideProgressBar: true, autoClose: 2000, type: "error" }
          );
        }
      });

      toast(
        router.locale == "ko"
          ? "리스크 계산이 완료됐습니다"
          : "Calculation completed!",
        {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        }
      );
    } catch (err) {
      setIsLoading(false);

      toast(
        router.locale == "ko" ? "네트워크 에러가 발생했습니다" : "Fetch Error",
        {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        }
      );
    }
  };

  const submitHandler2 = async () => {
    if (selectIndex.some((asset) => asset["quantity"] <= 0)) {
      toast(
        router.locale == "ko"
          ? "최소 1개 이상의 자산이 포함되어야 합니다"
          : "your asset should be more than 0",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }
    let enteredInput = {};

    if (userProfile?.portfolio && userProfile?.portfolio.length > 10) {
      toast(
        router.locale == "ko"
          ? "10개 초과의 자산을 추가하실 수 없습니다"
          : "Your assets are limited to 10",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
      return;
    }
    setIsLoading(true);

    enteredInput = {
      portfolio: selectIndex,
      portfolioResult: 0,
      portfolioLevel: "",
      portfolioTime: "",
    };

    const data = await fetch(
      `/api/auth/addUserInfo?session=${session.user.email}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ enteredInput }),
      }
    ).then((res) => {
      if (res.ok) {
        setIsLoading(false);
        setIsOpenAddModal(false);
        toast(
          router.locale == "ko"
            ? "수정사항이 성공적으로 반영됐습니다"
            : "Successfully Edited assets to your portfolio",
          { hideProgressBar: true, autoClose: 2000, type: "success" }
        );
        mutate();
      } else {
        setIsLoading(false);
        toast(
          router.locale == "ko"
            ? "네트워크 에러가 발생했습니다"
            : "Fetch Error",
          { hideProgressBar: true, autoClose: 2000, type: "error" }
        );
      }
    });
  };

  const handleImageError = useHandleWeatherImageError();

  return (
    <main className="z-20 flex justify-center items-center absolute text-center text-[#111111] bg-white p-8 rounded-20 top-1/2 left-1/2 translate-x-half translate-y-half border min-w-[450px] max-w-[565px] w-full">
      {isLoading ? (
        <div className={"flex flex-col items-center"}>
          <h1 className={"mb-10 font-semibold"}>{t("resultCalculating")}</h1>
          <svg
            aria-hidden="true"
            className="w-12 h-12 relative  text-gray-200 animate-spin dark:text-gray-600 fill-blue-400"
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
      ) : (
        <div>
          <header className="flex mb-8">
            <section className="flex-1 flex">
              <Image
                src={back}
                alt=""
                className="cursor-pointer mr-4"
                onClick={handleClose}
              />
              <button
                className="bg-gray-500 h-10 py-2.5 px-5 rounded-[60px] mr-2 text-white font-medium"
                onClick={handleClose}
              >
                {t("EditAssetsCancel")}
              </button>

              {selectIndex.length >= 2 ? (
                <button
                  className="bg-[#0198FF] h-10 py-2.5 px-5 rounded-[60px] text-white font-medium hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
                  onClick={submitHandler}
                >
                  <h1>{t("EditAssetsSave")}</h1>
                </button>
              ) : (
                <button
                  className="bg-[#0198FF] h-10 py-2.5 px-5 rounded-[60px] text-white font-medium hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
                  onClick={submitHandler2}
                >
                  <h1>{t("EditAssetsSave")}</h1>
                </button>
              )}
            </section>
            <Image
              src={close}
              alt=""
              className="cursor-pointer"
              onClick={handleClose}
            />
          </header>
          <section className="flex items-center border-gray-200 border-b py-3 ">
            {/* <Image src={checkbox} alt="" className="mr-5" /> */}
            <p className="text-sm text-gray-600 font-medium text-left w-[217px] mr-8">
              {t("EditAssetsName")}
            </p>
            <p className="text-sm text-gray-600 font-medium text-left w-[200px] mr-11">
              {t("EditAssetsQty")}
            </p>
          </section>
          <section className="overflow-auto h-[260px] customScrollBar">
            {userProfile?.portfolio
              ? userProfile?.portfolio.map(
                  (
                    { name, ticker, quantity, krName }: UserPortfolio,
                    i: number
                  ) => (
                    <article className="flex items-center py-3" key={i}>
                      {selectIndex.some(
                        (asset) => asset["ticker"] == ticker
                      ) ? (
                        <Image
                          src={blueCheckbox}
                          alt=""
                          className="mr-5 cursor-pointer"
                          onClick={() =>
                            handleSelect({
                              name: encodeURIComponent(name),
                              ticker: encodeURIComponent(ticker),
                              quantity: quantity,
                              krName: encodeURIComponent(krName),
                            })
                          }
                        />
                      ) : (
                        <Image
                          src={checkbox}
                          alt=""
                          className="mr-5 cursor-pointer"
                          onClick={() =>
                            handleSelect({
                              name: encodeURIComponent(name),
                              ticker: encodeURIComponent(ticker),
                              quantity: quantity,
                              krName: encodeURIComponent(krName),
                            })
                          }
                        />
                      )}
                      <div className="w-[217px] flex">
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
                          <h6
                            className="mb-1 w-[130px] truncate"
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
                      <input
                        className="border w-[200px] py-2.5 px-3 rounded-20 max-h-10 text-sm text-[#111111] focus:border-[#4B5563] outline-none"
                        placeholder={
                          router.locale === "ko" ? "수량" : "quantity"
                        }
                        type="number"
                        min="0"
                        disabled={
                          selectIndex.some((asset) => asset["ticker"] == ticker)
                            ? false
                            : true
                        }
                        value={
                          selectIndex.find((item) => item.ticker === ticker)
                            ?.quantity || ""
                        }
                        onChange={(e) => {
                          handleChange(e, name, ticker);
                        }}
                      />
                    </article>
                  )
                )
              : ""}
          </section>{" "}
        </div>
      )}
    </main>
  );
};

export default EditAssets;
