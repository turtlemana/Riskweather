import { useTranslation } from "next-i18next";

const Header = () => {
  const { t } = useTranslation("learn");

  return (
    <main className="pt-[90px] relative h-[406px] w-full bg-black/[.28] px-5">
      <header className="z-[-1] absolute top-0 left-0 w-full h-full mx-auto bg-backgroundLearn bg-cover bg-no-repeat bg-center" />
      <section className="min-w-[1024px] max-w-1320 mx-auto">
        <h1 className="mb-[72px] text-[40px] text-white">{t("learnHeader")}</h1>
        <h6 className="text-xl mb-7 text-white">{t("learnWelcome")}</h6>
        <p className="text-lg font-medium text-white">
          {t("learnHeaderContent1")}
          <br />
          {t("learnHeaderContent2")}
        </p>
        <br />
        <p className="text-sm font-medium text-white" id="Weather Card">
          {t("learnHeaderWarning")}
        </p>
      </section>
    </main>
  );
};

export default Header;
