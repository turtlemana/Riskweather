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
  const router = useRouter();
  const { t } = useTranslation("portfolio");
  const handleImageError = useHandleWeatherImageError();
  return (
    <main className="py-8 px-10 bg-white max-w-1320 min-w-[1024px] rounded-20 flex gap-[52px] mx-auto mb-10">
      <section className="flex gap-6 flex-1">
        <article className="relative w-[100px]">
          <Image
            onError={handleImageError}
            width={10}
            height={10}
            unoptimized
            src={
              userProfile?.profileImage
                ? userProfile?.profileImage
                : "/images/logos/errorLogo.png"
            }
            referrerPolicy="no-referrer"
            loading="eager"
            alt=""
            className="w-[100px] h-[100px]"
          />
          <Image
            src={pencil}
            alt=""
            className="absolute right-0 top-[70px] cursor-pointer"
            onClick={() => setIsOpenProfileModal(true)}
          />
        </article>
        <h6 className="text-[28px] text-[#111111] mt-4 w-[150px] truncate">
          {userProfile?.name}
        </h6>
      </section>
      <section className="max-w-[283px] w-full">
        <article className="flex items-center mb-2.5">
          <h5 className="text-[#111111] flex-1">{t("headerTolerance")}</h5>
          {/* <Image src={share} alt="" className="cursor-pointer" /> */}
        </article>
        <article className="flex gap-4 items-center border border-gray-200 rounded-20 py-2.5 px-3">
          <Image
            data-tooltip-id="traitExplain"
            width={50}
            height={50}
            src={
              userProfile?.interestedResult
                ? `/images/traits/${userProfile?.interestedResult}.svg`
                : "/images/logos/errorLogo.png"
            }
            alt=""
          />
          <div>
            <h5
              data-tooltip-id="traitExplain"
              className="text-[#0198FF] text-sm mb-1"
            >
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
            </h5>
            <Link href="/login/assets">
              <p className="font-medium underline text-xs text-gray-400">
                {t("headerRetest")}
              </p>
            </Link>
          </div>
        </article>
      </section>
      <section className="w-full max-w-[586px]">
        <h1 className="text-[#111111] mb-3">{t("headerInterested")}</h1>
        <article className="flex gap-2 flex-wrap max-h-[80px] overflow-auto slim-scroll">
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
                onClick={() => {
                  router.push({ pathname: `/detail/${ticker}` });
                }}
                key={i}
                className="cursor-pointer flex gap-1.5 items-center border border-gray-200 rounded-20 py-1.5 px-2 h-9"
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
                  className="h-6 w-6 "
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
