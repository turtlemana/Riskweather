import Image from "next/image";

import portfolio from "assets/images/learn/portfolio.svg";
import portfolio2 from "assets/images/learn/portfolio2.svg";
import port1 from "assets/images/learn/learnPort1.png";
import port2 from "assets/images/learn/learnPort2.png";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import portfolioKr from "assets/images/learn/portfolioKr.svg";
import portfolio2Kr from "assets/images/learn/portfolio2Kr.svg";

const Portfolio = () => {
  const { t } = useTranslation("learn");
  const router = useRouter();

  return (
    <section className="bg-white py-[100px] px-5">
      <h1 className="text-5xl text-[#001B7B] mb-[120px] mx-auto w-fit">
        {t("ptf1")}
      </h1>
      <article className="w-full min-w-[1024px] max-w-1320 mx-auto mb-[60px]">
        <h1 className="text-4xl text-[#111111] mb-10 mx-auto w-fit">
          {t("ptf2")}
        </h1>
        <div className="mx-auto text-center w-fit text-gray-600 text-lg mb-[100px]">
          <div className="mb-8">
            {t("ptf3")}
            <br /> {t("ptf4")}
            <br /> {t("ptf8")}
            <br /> {t("ptf9")}
            <h1 className="text-[#001B7B]">{t("ptf5")}</h1>
          </div>
        </div>
        <div className="flex text-right text-xl text-gray-400">
          <div>
            <Image
              src={router.locale === "ko" ? portfolioKr : portfolio}
              alt=""
              className="mb-10"
            />
            <p className="mr-3">{t("ptf6")}</p>
          </div>
          <div className="text-right">
            <Image
              src={router.locale === "ko" ? portfolio2Kr : portfolio2}
              alt=""
              className="mb-10"
            />
            <p className="mr-3">{t("ptf7")}</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Portfolio;
