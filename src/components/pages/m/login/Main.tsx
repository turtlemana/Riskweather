import Image from "next/image";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

interface Provider {
  id: string;
  name: string;
}

interface Props {
  providers: Record<string, Provider>;
}

const Login = ({ providers }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.error?.includes("exists")) {
      toast(
        router.locale == "ko"
          ? `이미 ${
              (router.query.error as string)?.split(" ")[8]
            }로 가입된 계정입니다`
          : `Account has already signed up by ${
              (router.query.error as string)?.split(" ")[8]
            }`,
        {
          hideProgressBar: true,
          autoClose: 10000,
          type: "error",
          position: "top-center",
        }
      );
    }
  }, [router]);

  const { t } = useTranslation("login");
  const callbackHandler = (provider: Provider) => {
    if (localStorage.getItem("clickedPortfolio") == "portfolio") {
      localStorage.removeItem("clickedPortfolio");
      signIn(provider.id, { callbackUrl: `/${router.locale}/portfolio` });
    } else {
      signIn(provider.id, { callbackUrl: `/${router.locale}` });
    }
  };
  return (
    <main className="min-w-[360px] pt-[78px] pb-[196px] bg-white text-center text-sm">
      <p className="text-[28px] text-[#111111] font-medium mb-5">
        {t("loginWelcome")}
      </p>
      <p className="text-gray-400 mb-[60px]">{t("loginExplain")}</p>
      <div className={"flex justify-center items-center"}>
        <Image
          src={"/images/character/CoinCharacter2.png"}
          alt=""
          width={150}
          height={100}
          quality={100}
          className={""}
        />
      </div>
      <section className=" max-w-[279px] mx-auto">
        {Object?.values(providers).map((provider: Provider, i) => (
          <div
            key={i}
            onClick={() => {
              callbackHandler(provider);
            }}
            className={`my-3 h-12 cursor-pointer  ${
              provider.name == "Google"
                ? `bg-[#FFFFFF] border border-gray-300`
                : provider.name == "Naver"
                ? `bg-[#5AC451]`
                : provider.name == "Kakao"
                ? `bg-[#FFCA42]`
                : provider.name == "Facebook"
                ? `bg-[#3975EA]`
                : ""
            } flex items-center gap-3 justify-center text-sm font-semibold rounded-[60px]`}
          >
            <Image
              src={`/images/icons/login/${provider.name.toLowerCase()}.svg`}
              width={20}
              height={20}
              alt=""
            />
            {t("loginContinue1")} {provider.name}
            {t("loginContinue2")}
          </div>
        ))}
      </section>
      {/* <Link href="/login/business">
        <p className="text-gray-600 underline">Login with business account</p>
      </Link> */}
    </main>
  );
};

export default Login;
