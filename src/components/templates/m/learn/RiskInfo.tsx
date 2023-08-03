import Image from "next/image";

import info from "assets/images/learn/m/riskInfo.svg";
import infoKr from "assets/images/learn/m/riskInfoKr.svg";
import { useRouter } from "next/router";

const RiskInfo = () => {
  const router = useRouter();
  return (
    <section className="bg-white pt-[60px] pb-10 px-5 max-w-1320">
      <h1 className="text-[#111111] mb-4">
        {router.locale === "ko"
          ? "직관적인 리스크 관련 정보 제공"
          : "Provides risk information intuitively"}
        ​
      </h1>
      <div className="text-gray-600 text-sm mb-10">
        <div className="mb-4">
          <span className="text-[#001B7B] font-bold mr-1">
            전세계의 주식과 코인 등 2000개 자산에 대한 리스크 정보를 직관적으로
            파악할 수 있습니다.
          </span>
          1일 동안 발생 가능한 최대 손실을
          <span className="text-[#DF1525] font-bold mx-1">“Maximum loss”</span>
          로 보기 쉽게 제공합니다.
        </div>
        <div>
          또한 2000개 자산 전체의 리스크 분포와 특정 자산의 리스크를 비교하여
          자산 별 내재 리스크 등급을 제공합니다.
          <span className="text-[#001B7B] font-bold ml-1">
            개별 자산의 리스크 등급을 통해 투자자는 자산의 리스크 특성을 한눈에
            파악할 수 있습니다.
          </span>
        </div>
      </div>
      <Image
        src={router.locale === "ko" ? infoKr : info}
        alt=""
        className="mx-auto"
        id="Portfolio"
      />
    </section>
  );
};

export default RiskInfo;
