import Image from "next/image";

import card from "assets/images/learn/card.svg";
import cardEng from "assets/images/learn/cardEng.svg";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const WeatherCard = () => {
  const { t } = useTranslation("learn");
  const router = useRouter();

  return (
    <section className="bg-white py-[100px] px-5">
      <div className="max-w-1320 min-w-[1024px] mx-auto">
        <h6 className="text-4xl text-[#111111] mb-[72px]">
          {t("weatherCard")}
        </h6>
        <Image
          src={router.locale == "ko" ? card : cardEng}
          alt=""
          className="mx-auto"
        />
      </div>
    </section>
  );
};

export default WeatherCard;
