import Image from "next/image";

import card from "assets/images/learn/card2.svg";
import info from "assets/images/learn/info.svg";
import infoEng from "assets/images/learn/infoEng.svg";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Info = () => {
  const { t } = useTranslation("learn");
  const router = useRouter();

  return (
    <section className="bg-white py-[100px] px-5">
      <h1 className="text-5xl text-[#001B7B] mb-[120px] mx-auto w-fit">
        {t("info1")}
      </h1>
      <article className="w-full min-w-[1024px] max-w-1320 mx-auto flex items-center justify-between mb-[60px]">
        <div>
          <h6 className="text-4xl text-[#111111] mb-10">{t("info2")} </h6>
          <div className="mb-8 text-gray-600 text-lg max-w-[504px]">
            {t("info3")}
            {t("info4")} <br />
            {t("info5")}
            <h1 className="text-[#001B7B] mb-8">{t("info6")}</h1>
            {t("info7")}
            <span className="text-[#001B7B] font-bold mx-1">{t("info8")}</span>
            {t("info9")}
          </div>
        </div>
        <Image src={card} alt="" />
      </article>
      <Image
        src={router.locale === "ko" ? info : infoEng}
        alt=""
        className="mx-auto"
      />
    </section>
  );
};

export default Info;
