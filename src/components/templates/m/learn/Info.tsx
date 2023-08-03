import Image from "next/image";
import { useRouter } from "next/router";
import card from "assets/images/learn/m/weatherCard2.svg";
import card2 from "assets/images/learn/m/weatherCard2Kr.svg";
import weatherInfo from "assets/images/learn/m/weatherInfo.svg";
import weatherInfoKr from "assets/images/learn/m/weatherInfoKr.svg";

const Info = () => {
  const router = useRouter();
  return (
    <section className="bg-white pt-[60px] px-5 pb-[132px]  max-w-1320">
      <h1 className="text-xl text-[#001B7B] text-center">
        일반 투자자들도 이해하기 쉬운 <br />
        Risk 정보 제공​
      </h1>
      <h1 className="text-[#111111] mt-10 mb-4">위험에 대한 일기예보​</h1>
      <section className="text-gray-600 text-sm">
        <div className="mb-4">
          NTS-ARMA-GARCH 모형을 통해 도출한 리스크와 정규분포를 가정하여 도출한
          리스크 간의 차이를 “RWI”라 합니다. RWI가 커질 때 시장의 리스크도
          커지는 경향이 있습니다.
          <span className="text-[#001B7B] mb-8 font-bold mx-1">
            즉 RWI는 미래의 리스크에 대한 일기예보 같은 역할을 합니다.
          </span>
        </div>
        <div>
          Risk Weather는 자산의 RWI를 측정한 후
          <span className="text-[#001B7B] font-bold mx-1">
            일기예보 처럼 날씨로 미래의 리스크를 표현합니다.
          </span>
          투자자는 날씨 정보를 통해 현재 시장이 어떻게 변하고 있는지 파악하고
          빠르게 대응할 수 있습니다.
        </div>
      </section>
      <Image
        src={router.locale === "ko" ? card2 : card}
        alt=""
        className="mx-auto my-10"
      />
      <div className="text-center">
        <h6 className="mb-7 text-[#111111]">
          {router.locale === "ko" ? "날씨 정보" : "Weather Info"}
        </h6>
        <div className="overflow-scroll customScrollBar h-[136px] overflow-y-hidden flex items-center">
          <Image
            src={router.locale === "ko" ? weatherInfoKr : weatherInfo}
            alt=""
            className="min-w-[1017px]"
            id="Info of RISK"
          />
        </div>
      </div>
    </section>
  );
};

export default Info;
