import Image from "next/image";

import coin from "assets/images/learn/m/coin.svg";
import riskLevel from "assets/images/learn/m/riskLevel.svg";
import loss from "assets/images/learn/m/loss.svg";
import weather from "assets/images/learn/m/weather.svg";
import weatherCard from "assets/images/learn/m/weatherCard.svg";
import { useRouter } from "next/router";
import coinKr from "assets/images/learn/m/coinKr.svg";
import riskLevelKr from "assets/images/learn/m/riskLevelKr.svg";
import lossKr from "assets/images/learn/m/lossKr.svg";
import weatherKr from "assets/images/learn/m/weatherKr.svg";
import weatherCardKr from "assets/images/learn/m/weatherCardKr.svg";

const WeatherCard = () => {
  const router = useRouter();

  return (
    <main className="bg-white py-6 px-5 max-w-1320">
      <h6 className="text-[#111111] mb-9">
        {router.locale == "ko" ? "날씨 카드" : "Weather Card"}
      </h6>
      <section className="flex items-center mb-8 gap-5 text-xs font-medium text-[#111111]">
        <Image src={router.locale === "ko" ? coinKr : coin} alt="" />
        <p>자산 이름, 로고</p>
      </section>
      <section className="flex items-center mb-8 justify-end gap-5 text-xs font-medium text-[#111111]">
        <article>
          <p>자산의 내재 리스크 등급</p>
          <p className="text-gray-400 mt-1">
            {router.locale === "ko"
              ? "(안전, 적절, 높음, 매우높음)"
              : "(Low, Moderate, High, Very High)"}
          </p>
        </article>
        <Image src={router.locale === "ko" ? riskLevelKr : riskLevel} alt="" />
      </section>
      <section className="flex items-center mb-8 gap-5 text-xs font-medium text-[#111111]">
        <Image src={router.locale === "ko" ? lossKr : loss} alt="" />
        <p>
          자산의 1일 최대 <br />
          손실 가능액
        </p>
      </section>
      <section className="flex flex-col items-end mb-10 gap-4 text-xs font-medium text-[#111111]">
        <Image src={router.locale === "ko" ? weatherKr : weather} alt="" />
        <p className="text-right pr-4">
          자산의 미래 위험도를 나타내는 Risk <br />
          Weather
        </p>
      </section>
      <Image
        src={router.locale === "ko" ? weatherCardKr : weatherCard}
        alt=""
        className="mx-auto mb-4"
        id="Importance of RISK"
      />
    </main>
  );
};

export default WeatherCard;
