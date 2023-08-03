import Image from "next/image";

import { COLORS } from "datas/main";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useHandleImageError from "utils/useHandleImageError";

interface Props {
  name?: string;
  ticker?: string;
  riskLevel: string;
  maxLoss?: number;
  EXP_CVaRNTS: number;
  weather?: string;
  weatherExplain?: string;
  koreanWeatherExplain?: string;
  koreanRiskLevel?: string;
  riskDescriptionKr?: string;
  riskDescriptionEn?: string;
  krName?: string;
  exchg: string;
}

const CorrCard = ({
  EXP_CVaRNTS,
  exchg,
  krName,
  riskDescriptionEn,
  riskDescriptionKr,
  name,
  ticker,
  riskLevel,
  maxLoss,
  weather,
  weatherExplain,
  koreanRiskLevel,
  koreanWeatherExplain,
}: Props) => {
  const { t } = useTranslation("detail");
  const router = useRouter();
  const handleImageError = useHandleImageError();

  return (
    <main
      className="mr-6 p-5 cursor-pointer rounded-20 min-w-[296px] shadow-[0_0_12px_0_rgba(121,120,132,0.15)] overflow-auto"
      onClick={() => {
        router.push({ pathname: `/detail/${ticker}` });
      }}
    >
      <section className="flex gap-3 items-start mb-3">
        <Image
          loading="eager"
          unoptimized
          width={50}
          height={50}
          quality={100}
          onError={(event) => handleImageError(event, exchg)}
          src={`/images/logos/${ticker}.png` || "/images/logos/errorLogo.png"}
          alt=""
          className="h-10 w-10 mr-3 "
        />{" "}
        <article className="flex-1">
          <h6
            className="mb-1 w-[100px] truncate"
            title={router.locale == "ko" ? krName : name}
          >
            {router.locale == "ko" ? krName : name}
          </h6>
          <p className="text-[12px] text-gray-500">{ticker}</p>
        </article>
        <div
          data-tooltip-id="riskLevel"
          data-tooltip-content={
            router.locale == "ko" ? riskDescriptionKr : riskDescriptionEn
          }
          className={`py-1 px-3 rounded-20 text-center ${COLORS[riskLevel]}`}
        >
          <h6 className="text-xs ">
            {router.locale == "ko" ? koreanRiskLevel : riskLevel}
          </h6>
        </div>
      </section>
      <section className="flex pt-3 justify-between mb-4">
        <p className="text-[12px] text-gray-500">{t("headerLoss")}</p>
        <h6 className="text-[#DF1525]">-{EXP_CVaRNTS?.toFixed(2)}%</h6>
      </section>
      <section className="text-center flex items-center justify-between bg-gray-100 rounded-20 pl-3 pr-4">
        <Image
          loading="eager"
          src={`/images/weather/${weather}.svg`}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-9 h-auto"
        />
        <p className="text-xs font-medium">
          {router.locale == "ko" ? koreanWeatherExplain : weatherExplain}
        </p>
      </section>
    </main>
  );
};

export default CorrCard;
