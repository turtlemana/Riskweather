import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import arrow from "assets/icons/login/arrow.svg";
import check from "assets/icons/login/check.svg";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import useHandleImageError from "utils/useHandleImageError";
import { Asset, CoinSelect, Session } from "interfaces/login";
import Link from "next/link";

interface Props {
  interestedList: Asset[];
  session: Session;
}

const Assets = ({ session, interestedList }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectBank, setSelectBank] = useState("");
  const [isBankModalOpen, setIsBankModalOpen] = useState("");
  const router = useRouter();
  const { t } = useTranslation("login");

  const [selectCoin, setSelectCoin] = useState<CoinSelect[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const bankHandler = (bank: string) => {
    setIsBankModalOpen(bank);
  };

  const handleSelect = ({ name, ticker, krName }: CoinSelect) => {
    if (selectCoin.some((asset) => asset["ticker"] == ticker)) {
      const filtered = selectCoin.filter(
        (asset: CoinSelect) => asset.ticker !== ticker
      );
      return setSelectCoin(filtered);
    }
    if (selectCoin.length >= 10) {
      return;
    }
    return setSelectCoin([...selectCoin, { name, ticker, krName }]);
  };

  const sessionUpdate = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const submitHandler = async () => {
    setIsBankModalOpen("");

    setIsLoading(true);
    try {
      let fetchAddress = `https://riskweather.io/rapi/interest?ticker=`;
      for (let i = 0; i < selectCoin.length; i++) {
        fetchAddress += encodeURIComponent(selectCoin[i].ticker);
        if (i != selectCoin.length - 1) {
          fetchAddress += "%2C";
        }
      }

      const response = await fetch(fetchAddress);
      const result = await response.json();
      setIsLoading(false);
      const enteredInput = {
        accessLevel: 2,
        interestedAssets: selectCoin,
        interestedResult: result.result.portfolio_risk_ranked[0],
        ...(selectBank && { prefferedBank: selectBank }),
      };
      toast(
        router.locale == "ko"
          ? "위험 성향 측정이 완료됐습니다"
          : "Calculation completed!",
        { hideProgressBar: true, autoClose: 2000, type: "success" }
      );
      const data = await fetch(`/api/auth/user?session=${session.user.email}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ enteredInput }),
      }).then((res) => {
        if (res.ok) {
          sessionUpdate();
          setIsModalOpen(true);
        } else {
          toast(
            router.locale == "ko"
              ? "네트워크 에러가 발생했습니다"
              : "Fetch Error",
            { hideProgressBar: true, autoClose: 2000, type: "error" }
          );
        }
      });
    } catch (err) {
      setIsLoading(false);
      toast(
        router.locale == "ko" ? "네트워크 에러가 발생했습니다" : "Fetch Error",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
    }
  };

  const skipHandler = async () => {
    setIsBankModalOpen("");

    const enteredInput = {
      accessLevel: 2,
      ...(selectBank && { prefferedBank: selectBank }),
    };

    const data = await fetch(`/api/auth/user?session=${session.user.email}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ enteredInput }),
    }).then((res) => {
      if (res.ok) {
        sessionUpdate();
        setIsSkipModalOpen(true);
      } else {
        toast(
          router.locale == "ko"
            ? "네트워크 에러가 발생했습니다"
            : "Fetch Error",
          { hideProgressBar: true, autoClose: 2000, type: "error" }
        );
      }
    });
  };

  const handleImageError = useHandleImageError();

  return (
    <main className="min-w-[360px] relative py-5 bg-white text-center">
      <div
        className="flex cursor-pointer mb-3 justify-end text-xs items-center"
        onClick={() =>
          session?.user?.accessLevel == 1 ? bankHandler("skip") : skipHandler()
        }
      >
        <p>{t("assetSkip")}</p>
        <Image src={arrow} alt="" className=" w-3 mr-1" />
      </div>

      <div
        className={
          "text-start  rounded-md border p-1.5 mb-8 bg-backgroundLearn w-full h-[150px] z-10 text-white bg-cover bg-no-repeat bg-center"
        }
      >
        <div className={`ml-2  ${router.locale == "ko" ? "mt-3" : ""}`}>
          <p className="text-2xl  font-medium mb-4">
            {t("assetSelectTitle1")}
            {router.locale == "ko" ? " " : <br />}
            {t("assetSelectTitle2")}
          </p>
          <p className="mb-2 text-xs">
            {t("assetSelectExplain1")} <br />
            {t("assetSelectExplain2")} <br />
            {t("assetSelectExplain3")}
          </p>
        </div>
      </div>

      <section className="grid grid-cols-3 gap-x-3 gap-y-6 w-full">
        {interestedList.map(
          (
            { HR_ITEM_NM, ITEM_ENG_NM, ITEM_CD_DL, ITEM_KR_NM }: Asset,
            i: number
          ) => (
            <article
              className="cursor-pointer max-w-[104px] mx-auto"
              key={i}
              onClick={() => {
                if (
                  isSkipModalOpen ||
                  isModalOpen ||
                  isBankModalOpen ||
                  isLoading
                ) {
                  return;
                }
                handleSelect({
                  name: encodeURIComponent(ITEM_ENG_NM),
                  ticker: encodeURIComponent(ITEM_CD_DL),
                  krName: encodeURIComponent(ITEM_KR_NM),
                });
              }}
            >
              <div className="relative mb-3 w-[60px] h-[60px] mx-auto">
                <Image
                  loading="eager"
                  unoptimized
                  width={0}
                  height={0}
                  quality={100}
                  onError={(event) => handleImageError(event, HR_ITEM_NM)}
                  src={`/images/logos/${ITEM_CD_DL}.png` || ""}
                  alt=""
                  className={`${
                    selectCoin.some((asset) => asset["ticker"] == ITEM_CD_DL) &&
                    "bg-light-gray-rgba z-10 bg-cover"
                  } 
       w-full h-full `}
                />

                {/* <img
                src={`/images/logos/${ITEM_CD_DL}.png`}
                alt="logo"
                loading="eager"
                className={`${selectCoin.some(asset=>asset['ticker']==ITEM_CD_DL) && "bg-light-gray-rgba"} 
                rounded-[60px] w-10 h-10`}
              /> */}
                {selectCoin.some((asset) => asset["ticker"] == ITEM_CD_DL) && (
                  <Image
                    src={check}
                    alt=""
                    className="absolute top-1/2 left-1/2 translate-x-half translate-y-half w-6 bg-transparent "
                  />
                )}
              </div>
              <h1 className="text-[#111111] w-[100px] truncate">
                {router.locale == "ko" ? ITEM_KR_NM : ITEM_ENG_NM}
              </h1>
            </article>
          )
        )}
      </section>
      {selectCoin.length >= 2 && !isModalOpen && !isSkipModalOpen ? (
        <button
          className="sticky   h-fit bottom-[40px] bg-[#0198ff] text-white py-3 px-10 rounded-[60px] text-[16px] font-bold w-[236px] "
          onClick={() =>
            session?.user?.accessLevel == 1
              ? bankHandler("submit")
              : submitHandler()
          }
        >
          {t("assetFinish")} ({selectCoin.length})
        </button>
      ) : (
        ""
      )}
      {selectCoin.length == 1 && !isModalOpen && !isSkipModalOpen ? (
        <button
          className="disabled:bg-gray-400  sticky   h-fit bottom-[40px] bg-[#0198ff] text-white py-3 px-10 rounded-[60px] text-[16px] font-bold w-[236px] "
          onClick={() => {
            toast(
              router.locale == "ko"
                ? "2개 이상의 자산을 고르세요"
                : "You should select at least 2 assets",
              { hideProgressBar: true, autoClose: 2000, type: "error" }
            );
          }}
          disabled={true}
        >
          {t("assetFinish")} ({selectCoin.length})
        </button>
      ) : (
        ""
      )}

      {isLoading && (
        <div className=" sticky bottom-[100px] flex flex-col items-center  justify-center   ">
          <article
            className={
              "items-center w-[332px] mx-auto h-fit left-1/2 py-12   top-[220px]   text-[#111111] text-sm border bg-white   rounded-20  z-20 shadow-[0_0_12px_0_rgba(121,120,132,0.15)]"
            }
          >
            <h1 className={"mb-5 font-semibold"}>{t("resultCalculating")}</h1>
            <div className={"flex items-center justify-center"}>
              <svg
                aria-hidden="true"
                className="w-12 h-12  relative  text-gray-200 animate-spin dark:text-gray-600 fill-blue-400"
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
          </article>
        </div>
      )}
      {isModalOpen && (
        <div className={"sticky bottom-[100px] "}>
          <article className="h-fit border w-[332px] mx-auto bg-white  py-12 rounded-20  top-[220px] left-1/2   z-20 text-sm  shadow-[0_0_12px_0_rgba(121,120,132,0.15)]">
            <h1 className="text-lg mb-4">{t("modalWelcome2")}</h1>
            <p className="mb-6 text-start ml-[50px]">
              {t("modalExplain1")} <br />
              {t("modalExplain2")}
            </p>
            <button
              onClick={() =>
                router.replace({ pathname: `/${router.locale}/portfolio` })
              }
              className="bg-[#0198FF] text-xs text-white font-bold py-2.5 w-full rounded-[60px] max-w-[284px]  hover:bg-[#0085E6]"
            >
              {t("modalStart")}
            </button>
          </article>
        </div>
      )}

      {isBankModalOpen && (
        <div className={"sticky bottom-[100px]"}>
          <article className="h-fit border w-[332px] mx-auto bg-white  py-12 rounded-20  top-[220px] left-1/2   z-20 text-sm  shadow-[0_0_12px_0_rgba(121,120,132,0.15)]">
            <h1 className="text-md text-[#111111] mb-4">
              {t("modalSecTitle")}
            </h1>
            <p className="text-xs text-[#111111] mb-6 text-start ml-[50px] font-extralight">
              {t("modalSecExplain1")}
              <br />
              {t("modalSecExplain2")}
            </p>
            <select
              defaultValue=""
              required={true}
              onChange={(e) => {
                setSelectBank(e.target.value);
                // Do something with the selected brokerage
              }}
              className="bg-white border border-gray-300 rounded-[4px] px-4 py-2 mb-6"
            >
              <option disabled value="">
                {router.locale == "ko"
                  ? "증권사 선택"
                  : "Select securities company"}
              </option>
              <option value="KB증권">
                {router.locale == "ko" ? "KB증권" : "KB Securities"}
              </option>
              <option value="NH투자증권">
                {router.locale == "ko"
                  ? "NH투자증권"
                  : "NH Investment & Securities"}
              </option>
              <option value="삼성증권">
                {router.locale == "ko" ? "삼성증권" : "Samsung Securities"}
              </option>
              <option value="미래에셋증권">
                {router.locale == "ko"
                  ? "미래에셋증권"
                  : "Mirae Asset Securities"}
              </option>
              <option value="키움증권">
                {router.locale == "ko" ? "키움증권" : "Kiwoom Securities"}
              </option>
              <option value="토스증권">
                {router.locale == "ko" ? "토스증권" : "Toss Securities"}
              </option>
              <option value="카카오페이증권">
                {router.locale == "ko"
                  ? "카카오페이증권"
                  : "Kakaopay securities"}
              </option>
              <option value="한국투자증권">
                {router.locale == "ko" ? "한국투자증권" : "Korea Securities"}
              </option>
              <option value="하나증권">
                {router.locale == "ko" ? "하나증권" : "Hana Securities"}
              </option>
              <option value="기타">
                {router.locale == "ko" ? "기타" : "Others"}
              </option>
              {/* Add more options as needed */}
            </select>
            <div
              className={`flex items-center justify-center mb-5 ${
                router.locale === "ko" ? "" : "px-5"
              }`}
            >
              <input
                onChange={() => setIsApproved((prev) => !prev)}
                checked={isApproved ? true : false}
                id="link-checkbox"
                type="checkbox"
                value=""
                className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="link-checkbox"
                className="mr-3 text-[10px] text-light text-gray-400 font-medium  dark:text-gray-300"
              >
                {t("agreements")}{" "}
                <Link
                  target="_blank"
                  href="/policy"
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {t("agreements2")}
                </Link>
              </label>
            </div>
            <button
              disabled={!selectBank || !isApproved ? true : false}
              onClick={isBankModalOpen == "skip" ? skipHandler : submitHandler}
              className="disabled:bg-gray-400 bg-[#0198FF] text-xs  text-white font-bold py-2.5 w-full rounded-[60px] max-w-[284px]  hover:bg-[#0085E6]"
            >
              {t("modalNext")}
            </button>
          </article>
        </div>
      )}

      {isSkipModalOpen && (
        <div className={"sticky bottom-[100px]"}>
          <article className="h-fit border w-[332px] mx-auto bg-white  py-12 rounded-20  top-[220px] left-1/2   z-20 text-sm  shadow-[0_0_12px_0_rgba(121,120,132,0.15)]">
            <h1 className="text-lg text-[#111111] mb-4">
              {t("modalSkipTitle")}
            </h1>
            <p className="text-[#111111] mb-6 text-start ml-[50px]">
              {t("modalExplain1")}
              <br />
              {t("modalExplain2")}
            </p>
            <button
              onClick={() => {
                router.replace({ pathname: `/portfolio` });
              }}
              className="bg-[#0198FF] text-xs  text-white font-bold py-2.5 w-full rounded-[60px] max-w-[284px]  hover:bg-[#0085E6]"
            >
              {t("modalStart")}
            </button>
          </article>
        </div>
      )}
    </main>
  );
};

export default Assets;
