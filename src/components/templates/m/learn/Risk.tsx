import Image from "next/image";

import graph from "assets/images/learn/graph.svg";
import { useRouter } from "next/router";

const Risk = () => {
  const router = useRouter();
  return (
    <main className="bg-white pt-[52px] pb-10 px-5 max-w-1320">
      <h1 className="text-[#111111] mb-4">
        {router.locale === "ko" ? "리스크" : "Risk"}
      </h1>
      <section className="text-gray-600 text-sm">
        <p className="mb-4">
          자산의 수익률 분포는 정규분포와 유사한 형태를 보입니다.
          <br />
          기대 수익률 0을 중심으로 수익률은 +또는 -일 수 있으며, 그 크기가
          클수록 발생 확률은 낮아집니다.
        </p>
        <p className="mb-4">
          이때 분포의 왼쪽 끝 부분, 99% 신뢰수준에서 예상되는 기대 손실을
          “CVaR”라고 합니다.
        </p>
        <h1 className="text-[#001B7B]">
          서비스 모델에서는 CVaR를 자산의 리스크로 하여 자산과 포트폴리오의
          리스크 정보를 제공합니다.
        </h1>
      </section>
      <Image src={graph} alt="" className="pt-10 px-4" id="Model" />
    </main>
  );
};

export default Risk;
