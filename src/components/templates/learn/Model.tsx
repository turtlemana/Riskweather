import Image from "next/image";

import graph2 from "assets/images/learn/graph2.svg";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Model = () => {
  const router = useRouter();
  const { t } = useTranslation("learn");

  return (
    <section className="bg-white py-[100px] px-5">
      <article className="w-full min-w-[1024px]  max-w-1320 mx-auto flex items-center justify-between">
        <Image src={graph2} alt="" className="" />
        <div>
          <h6 className="text-4xl text-[#111111] mb-10">{t("model1")}</h6>
          <div className="text-gray-600 text-lg">
            <p className="mb-8 max-w-[528px]">
              {t("model2")}
              <br />
              {t("model3")}
              <br />
              {t("model4")}
              <br />
              {t("model5")}
            </p>
            <div className="flex">
              <p>
                <span className="text-[#001B7B] font-bold mr-1">
                  {t("model6")}
                  <br />
                  {t("model7")}
                  {router.locale == "ko" ? "" : <br />}
                </span>
                {t("model8")} {router.locale == "ko" ? "" : t("model9")}
                <br />
                {router.locale == "ko" ? t("model9") : ""}
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Model;
