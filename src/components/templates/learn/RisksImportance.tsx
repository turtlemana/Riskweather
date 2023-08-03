import Image from "next/image";

import risk from "assets/images/learn/risk.svg";
import riskEng from "assets/images/learn/riskEng.svg";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const RisksImportance = () => {
  const { t } = useTranslation("learn");
  const router = useRouter();

  return (
    <section className=" bg-white py-[100px] px-5">
      <article className="w-full min-w-[1024px] max-w-1320 mx-auto flex items-center justify-between">
        <Image src={router.locale == "ko" ? risk : riskEng} alt="" />
        <div>
          <h6 className="text-4xl text-[#111111] mb-10">{t("riskImp1")}</h6>
          <div className="text-gray-600 text-lg max-w-[613px]">
            <p className="mb-8">
              {t("riskImp2")} <br />
              {t("riskImp3")}
            </p>
            <p className="mb-8">{t("riskImp4")}</p>
            <h1 className="text-[#001B7B]">{t("riskImp5")}</h1>
            <p>
              {t("riskImp6")}
              <br />
              {t("riskImp7")}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default RisksImportance;
