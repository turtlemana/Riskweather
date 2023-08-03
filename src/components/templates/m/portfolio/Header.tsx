import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";

import useHandleWeatherImageError from "utils/useHandleWeatherImageError";
import pencil from "assets/icons/portfolio/pencil.svg";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { UserInfo } from "interfaces/portfolio";

interface Props {
  setIsOpenProfileModal: Dispatch<SetStateAction<boolean>>;
  userProfile: UserInfo;
}

const Header = ({ setIsOpenProfileModal, userProfile }: Props) => {
  const handleImageError = useHandleWeatherImageError();
  const router = useRouter();
  const { t } = useTranslation("portfolio");
  return (
    <main className="mx-auto mb-10 px-5 ">
      <section className="relative flex flex-col items-center pt-6 mb-7">
        <Image
          width={50}
          height={50}
          unoptimized
          onError={handleImageError}
          src={
            userProfile?.profileImage
              ? userProfile?.profileImage
              : "/images/logos/errorLogo.png"
          }
          referrerPolicy="no-referrer"
          loading="eager"
          alt=""
          className="w-[72px] h-[72px] mb-3"
        />{" "}
        <Image
          src={pencil}
          alt=""
          className="absolute right-0 top-6 cursor-pointer"
          onClick={() => setIsOpenProfileModal(true)}
        />
        <h6 className="text-xl text-[#111111]">{userProfile?.name}</h6>
      </section>

      <section className="mb-5">
        <article className="flex items-center mb-4">
          <div className="flex gap-1.5 flex-1">
            <h5 className="text-[#111111]">{t("headerTolerance")}</h5>
            {/* <Image src={arrow} alt="" className="cursor-pointer" /> */}
          </div>
          <Link href="/login/assets">
            <p className="font-medium underline text-xs text-gray-400">
              {t("headerRetest")}
            </p>
          </Link>
        </article>
        <article className="flex gap-3 items-center border border-gray-200 rounded-20 py-2 px-2.5">
          <Image
            data-tooltip-id="traitExplain"
            width={50}
            height={50}
            className={"w-[44px]"}
            src={
              userProfile?.interestedResult
                ? `/images/traits/${userProfile?.interestedResult}.svg`
                : "/images/logos/errorLogo.png"
            }
            alt=""
          />
          <h1 data-tooltip-id="traitExplain" className="text-[#0198FF] text-sm">
            {userProfile?.interestedResult
              ? router.locale == "ko"
                ? userProfile?.interestedResult == "Aggressive"
                  ? "공격적인"
                  : userProfile?.interestedResult == "Moderate"
                  ? "중립적인"
                  : userProfile?.interestedResult == "Moderately conservative"
                  ? "약간 보수적인"
                  : userProfile?.interestedResult == "Conservative"
                  ? "보수적인"
                  : "위험 성향을 측정하세요"
                : userProfile?.interestedResult
              : router.locale == "ko"
              ? "위험 성향을 측정하세요"
              : "Undefined Result"}
          </h1>
        </article>
      </section>

      <section className="">
        <h6 className="text-[#111111] mb-3">{t("headerInterested")}</h6>
        <article className="grid grid-flow-col grid-rows-2 auto-cols-max gap-2 overflow-auto customScrollBar">
          {userProfile?.interestedAssets?.map(
            (
              {
                name,
                ticker,
                krName,
              }: { name: string; ticker: string; krName: string },
              i: number
            ) => (
              <div
                key={i}
                onClick={() => {
                  router.push({ pathname: `/detail/${ticker}` });
                }}
                className="cursor-pointer flex gap-1.5 min-w-fit items-center border border-gray-200 rounded-20 py-1.5 px-2 h-9"
              >
                <Image
                  loading="eager"
                  unoptimized
                  width={50}
                  height={50}
                  quality={100}
                  onError={handleImageError}
                  src={`/images/logos/${ticker}.png` || ""}
                  alt=""
                  className="h-6 w-6  "
                />
                <p
                  className="text-[#111111] text-xs font-medium mt-px w-[80px] truncate"
                  title={
                    router.locale == "ko"
                      ? decodeURIComponent(krName)
                      : decodeURIComponent(name)
                  }
                >
                  {router.locale == "ko"
                    ? decodeURIComponent(krName)
                    : decodeURIComponent(name)}
                </p>
              </div>
            )
          )}
        </article>
      </section>
    </main>
  );
};

export default Header;
