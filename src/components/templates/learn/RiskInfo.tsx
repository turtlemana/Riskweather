import Image from "next/image";

import info2 from "assets/images/learn/info2.svg";
import info2Eng from "assets/images/learn/info2Eng.svg";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const RiskInfo = () => {
  const { t } = useTranslation("learn");
  const router = useRouter();

  return (
    <section className="bg-white py-[100px] px-5">
      <h1 className="text-4xl text-[#111111] mb-10 mx-auto w-fit">
        {t("riskInfo1")}
      </h1>
      <article className="w-full min-w-[1024px] max-w-1320 mx-auto mb-[60px]">
        <div className="mx-auto text-center w-fit text-gray-600 text-lg mb-[76px]">
          <div className="mb-8">
            <h1 className="text-[#001B7B]">{t("riskInfo2")}</h1>
            {t("riskInfo3")}
            <span className="text-[#DF1525] font-bold mx-1">
              {t("riskInfo4")}
            </span>
            {t("riskInfo5")}
          </div>
          <p>{t("riskInfo6")} </p>
          <h1 className="text-[#001B7B]">{t("riskInfo7")}</h1>
        </div>
        <Image
          src={router.locale === "ko" ? info2 : info2Eng}
          alt=""
          className="mx-auto"
        />
      </article>
    </section>
  );
};

export default RiskInfo;
