import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import close from "assets/icons/header/close.svg";
import { useRouter } from "next/router";
import useHandleImageError from "utils/useHandleImageError";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";
import useModalClose from "utils/useModalClose";
import { TopRiskItem } from "interfaces/layout";
import Pagination from "components/organisms/m/Pagination";
import axios from "axios";
import useSWR from "swr";
import bell from "assets/icons/header/bell.svg";
import { Session } from "interfaces/login";
import { useSession } from "next-auth/react";

const Modal = () => {
  //@ts-ignore
  const { data: session }: { data: Session | null } = useSession();
  const [alarmPage, setAlarmPage] = useState(1);
  const [alarmLimit, setAlarmLimit] = useState(10);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isRead, setIsRead] = useState(false);

  const alertModalClick = () => {
    setIsRead(true);
    setIsOpenModal((prev) => !prev);
  };
  const onClose = () => {
    setIsOpenModal(false);
  };
  const router = useRouter();
  const handleImageError = useHandleImageError();
  const handleWeatherImageError = useHandleWeatherImageError();
  useEffect(() => {
    setAlarmPage(1);
  }, []);
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  //@ts-ignore
  const {
    data: topRiskData,
    isValidating: topRiskValid,
    mutate: topRiskMutate,
  } = useSWR(
    `/api/topRwRisk?&page=${alarmPage}&limit=${alarmLimit}&interest=${session?.user.interestedAssets}&portfolio=${session?.user.portfolio}`,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  const topRisk = topRiskData ? [].concat(...topRiskData[0].assets) : [];
  const topRiskRow = topRiskData ? topRiskData[1].rowCount : 0;
  const alertRef = useModalClose(isOpenModal, setIsOpenModal);

  return (
    <div className=" relative flex  text-center items-center justify-center">
      <Image
        src={bell}
        width={6}
        height={6}
        alt="bell"
        className="mr-7 w-6 h-6 cursor-pointer laptop:mr-3 "
        onClick={alertModalClick}
        //@ts-ignore
        ref={alertRef}
      />

      {!isRead && (
        <div
          onClick={alertModalClick}
          className="flex items-center justify-center text-xs  absolute top-2 w-[22px] h-[22px]  cursor-pointer bg-red-500 text-white rounded-md "
        >
          {topRiskRow}
        </div>
      )}
      {isOpenModal && (
        <main className=" border border-[#FAE8E8] text-start z-20 absolute top-10 right-0 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] bg-white min-w-[460px] rounded-20 overflow-hidden">
          <div className={"flex flex-col bg-[#FAE8E8]"}>
            <section className="flex items-center px-5 pb-5 pt-6 text-[#FF4D00]">
              <h2 className="text-2xl h-7 flex-1">
                {router.locale == "ko" ? "리스크 특보" : "Special Risk Report "}
              </h2>
              <Image
                src={close}
                alt=""
                className="w-6 cursor-pointer"
                onClick={onClose}
              />
            </section>

            <div className={"text-sm text-black text-start px-4 mb-4 "}>
              {router.locale == "ko"
                ? "Risk Weather Index(RWI)가 상승한 이후 자산의 변동성이 커지는 경향이 있으니 투자에 유의하시기 바랍니다."
                : "After the Risk Weather Index (RWI) rises, the asset's volatility tends to be rise in a long-term period. So please be cautious when investing in these assets."}
            </div>
          </div>
          <ul
            className="overflow-auto slim-scroll h-[384px]"
            onMouseDown={(e: MouseEvent<HTMLUListElement>) =>
              e.stopPropagation()
            }
          >
            {topRisk.length === 0 && !topRiskValid ? (
              <li className=" px-6 py-6  border-gray-200 text-center">
                {router.locale == "ko"
                  ? "위험 특보가 없습니다"
                  : "No Special Report"}
              </li>
            ) : topRiskValid ? (
              <div className={"flex justify-center items-center h-[100%]"}>
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
              topRisk.map(
                (
                  {
                    HR_ITEM_NM,
                    ITEM_CD_DL,
                    ITEM_ENG_NM,
                    ITEM_KR_NM,
                    WTHR_KR_DL,
                    WTHR_ENG_DL,
                    WTHR_ENG_NM,
                  }: TopRiskItem,
                  i: number
                ) => (
                  <li
                    onMouseDown={() => {
                      router.push({ pathname: `/detail/${ITEM_CD_DL}` });
                    }}
                    key={i}
                    className={`cursor-pointer px-6 py-4  border-gray-200`}
                  >
                    <div className="flex items-center py-[2px] flex-1">
                      <Image
                        loading="eager"
                        unoptimized
                        width={10}
                        height={10}
                        quality={100}
                        onError={(event) => handleImageError(event, HR_ITEM_NM)}
                        src={`/images/logos/${ITEM_CD_DL}.png` || ""}
                        alt=""
                        className="h-10 w-10 mr-3"
                      />
                      <div>
                        <h6
                          className={"text-sm w-[130px] truncate mr-12"}
                          title={
                            router.locale == "ko" ? ITEM_KR_NM : ITEM_ENG_NM
                          }
                        >
                          {router.locale == "ko" ? ITEM_KR_NM : ITEM_ENG_NM}
                        </h6>
                        <p className="text-gray-500 text-xs">{ITEM_CD_DL}</p>
                      </div>
                      {/* <p className="text-red-500">{RW_IDX.toLocaleString('en-us',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>  */}
                      <section className="text-center flex items-center justify-between bg-gray-100 rounded-20 pl-3 pr-4 w-full">
                        <Image
                          onError={handleWeatherImageError}
                          src={`/images/weather/${WTHR_ENG_NM}.svg`}
                          alt=""
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-9 h-auto"
                        />
                        <p className="text-xs font-medium">
                          {router.locale == "ko" ? WTHR_KR_DL : WTHR_ENG_DL}
                        </p>
                      </section>
                    </div>
                  </li>
                )
              )
            )}
          </ul>
          <div
            className={" mb-6"}
            onMouseDown={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <Pagination
              total={topRiskRow}
              page={alarmPage}
              setPage={setAlarmPage}
              views={alarmLimit}
            />
          </div>
        </main>
      )}
    </div>
  );
};

export default Modal;
