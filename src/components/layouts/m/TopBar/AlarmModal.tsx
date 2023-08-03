import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import close from "assets/icons/header/close.svg";
import { useRouter } from "next/router";
import Link from "next/link";
import useHandleImageError from "utils/useHandleImageError";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";
import { TopRiskItem } from "interfaces/layout";
import Pagination from "components/organisms/m/Pagination";
import axios from "axios";
import useSWR from "swr";
import bell from "assets/icons/header/bell.svg";
import { Session } from "interfaces/login";
import { useSession } from "next-auth/react";
interface Props {
  onClose: () => void;
  isOpenAlarmModal: boolean;
  alertModalClick: () => void;
  isRead: boolean;
}

const AlarmModal = ({
  isOpenAlarmModal,
  alertModalClick,
  isRead,
  onClose,
}: Props) => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  //@ts-ignore
  const { data: session }: { data: Session | null } = useSession();

  const handleImageError = useHandleImageError();
  const handleWeatherImageError = useHandleWeatherImageError();

  const [alarmPage, setAlarmPage] = useState(1);
  const [alarmLimit, setAlarmLimit] = useState(10);
  const router = useRouter();
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
  useEffect(() => {
    setAlarmPage(1);
  }, []);
  return (
    <div>
      <div className={"relative text-center "}>
        <Image
          src={bell}
          alt=""
          className="w-6 h-6 cursor-pointer "
          onClick={alertModalClick}
        />
        {!isRead && (
          <div
            onClick={alertModalClick}
            className="flex items-center justify-center ml-3 absolute top-2 w-[22px] h-[20px] text-[10px] cursor-pointer bg-red-500 text-white rounded-md "
          >
            {"504"}
          </div>
        )}
      </div>
      {isOpenAlarmModal && (
        <main className="z-30 absolute bg-white left-0 top-0 w-full h-screen overflow-scroll">
          <div className={"flex flex-col bg-[#FAE8E8]"}>
            <section className="flex justify-start px-5 relative text-[#FF4D00] ">
              <h6 className="my-3.5 ">
                {router.locale == "ko" ? "리스크 특보" : "Special Risk Report "}
              </h6>
              <Image
                src={close}
                alt=""
                className="absolute w-6 cursor-pointer right-5 top-3"
                onClick={onClose}
              />
            </section>
            <div className={"text-sm text-black text-start px-4 mb-4 "}>
              {router.locale == "ko"
                ? "Risk Weather Index(RWI)가 상승한 이후 자산의 변동성이 커지는 경향이 있으니 투자에 유의하시기 바랍니다."
                : "After the Risk Weather Index (RWI) rises, the asset's volatility tends to be rise in a long-term period. So please be cautious when investing in these assets."}
            </div>
          </div>
          <div className={"w-full pb-5"}>
            <ul className=" overflow-auto customScrollBar pt-2 ">
              {topRisk.length === 0 && !topRiskValid ? (
                <li className="py-4 border-y border-gray-200 text-center flex justify-center">
                  {router.locale == "ko"
                    ? "리스크 특보가 없습니다"
                    : "No Special Report"}
                </li>
              ) : topRiskValid ? (
                <div className={"flex justify-center items-center"}>
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
                  ): JSX.Element => (
                    <li key={i} className={` `}>
                      <Link
                        href={`/detail/${ITEM_CD_DL}`}
                        onClick={onClose}
                        className={
                          "py-3 border-b border-gray-200 flex justify-between px-5"
                        }
                      >
                        <section className={"flex items-center  "}>
                          <div className={"flex items-center flex-1"}>
                            <Image
                              loading="eager"
                              unoptimized
                              width={7}
                              height={7}
                              quality={100}
                              onError={(event) =>
                                handleImageError(event, HR_ITEM_NM)
                              }
                              src={`/images/logos/${ITEM_CD_DL}.png` || ""}
                              alt=""
                              className="h-7 w-7 mr-3"
                            />
                            <div className={"flex flex-col"}>
                              <h6
                                className={"text-sm w-[110px] truncate"}
                                title={
                                  router.locale == "ko"
                                    ? ITEM_KR_NM
                                    : ITEM_ENG_NM
                                }
                              >
                                {router.locale == "ko"
                                  ? ITEM_KR_NM
                                  : ITEM_ENG_NM}
                              </h6>
                              <p className="text-gray-500 text-[10px]">
                                {ITEM_CD_DL}
                              </p>
                            </div>
                          </div>
                        </section>

                        <section className="text-center flex items-center justify-between bg-gray-100 rounded-20 pl-3 pr-4 w-1/2 ">
                          <Image
                            onError={handleWeatherImageError}
                            src={`/images/weather/${WTHR_ENG_NM}.svg`}
                            alt=""
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-9 h-auto"
                          />
                          <p className="text-xs font-medium truncate">
                            {router.locale == "ko" ? WTHR_KR_DL : WTHR_ENG_DL}
                          </p>
                        </section>
                        {/* <td className="pl-10 text-sm text-red-500">{RW_IDX.toLocaleString('en-us',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>  */}
                      </Link>
                    </li>
                  )
                )
              )}
            </ul>
            <div className={""}>
              <Pagination
                total={topRiskRow}
                page={alarmPage}
                setPage={setAlarmPage}
                views={alarmLimit}
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default AlarmModal;
