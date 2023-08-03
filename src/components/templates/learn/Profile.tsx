import Image from "next/image";

import profile from "assets/images/learn/profile.svg";
import { useTranslation } from "next-i18next";
import profileKr from "assets/images/learn/profileKr.svg";
import { useRouter } from "next/router";

const Profile = () => {
  const { t } = useTranslation("learn");
  const router = useRouter();

  return (
    <section className="bg-white pt-[100px] pb-[200px] px-5">
      <h1 className="text-4xl text-[#111111] mb-10 mx-auto w-fit">
        {t("prof1")}
      </h1>
      <article className="w-full min-w-[1024px]  max-w-1320 mx-auto mb-[60px]">
        <div className="mx-auto text-center w-fit text-gray-600 text-lg mb-[100px]">
          <p className="mb-8">{t("prof2")}</p>
          <p>{t("prof3")}</p>
          <h1 className="text-[#001B7B]">{t("prof4")}</h1>
        </div>
        <Image
          src={router.locale === "ko" ? profileKr : profile}
          alt=""
          className="mx-auto"
        />
      </article>
    </section>
  );
};

export default Profile;
