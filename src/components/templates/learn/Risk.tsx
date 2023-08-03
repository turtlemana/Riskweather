import Image from "next/image";

import graph from "assets/images/learn/graph.svg";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Risk = () => {
  const { t } = useTranslation("learn");
  const router = useRouter();

  return (
    <section className="bg-white py-[100px] px-5">
      <article className="w-full min-w-[1024px]  max-w-1320 mx-auto flex items-center justify-between">
        <div>
          <h6 className="text-4xl text-[#111111] mb-10">{t("risk1")}</h6>
          <div className="text-gray-600 text-lg max-w-[700px]">
            <p className="mb-8">
              {t("risk2")}
              <br />
              {t("risk3")}
            </p>
            <p>{t("risk4")}</p>
            <h1 className="text-[#001B7B]">{t("risk5")}</h1>
          </div>
        </div>
        <Image src={graph} alt="" className="" />
      </article>
    </section>
  );
};

export default Risk;
