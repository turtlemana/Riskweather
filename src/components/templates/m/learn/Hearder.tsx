import { useTranslation } from "next-i18next";

const Header = () => {
  const { t } = useTranslation("learn");

  return (
    <main className="pt-12 relative w-full bg-black/[.28] px-5 pb-6 text-white max-w-1320">
      <header className="z-[-1] absolute top-0 left-0 w-full h-full mx-auto bg-backgroundLearn bg-cover bg-no-repeat bg-center" />
      <h1 className="mb-8 text-2xl">{t("learnHeader")}</h1>
      <h6 className="mb-4">{t("learnWelcome")}</h6>
      <p className="text-[10.5px] font-medium" id="Weather Card">
        {t("learnHeaderContent1")}
        <br />
        {t("learnHeaderContent2")}
      </p>
      <br />
      <p className="text-[10px] font-medium" id="Weather Card">
        {t("learnHeaderWarning")}
      </p>
    </main>
  );
};

export default Header;
