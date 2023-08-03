import Image from "next/image";

import risk from "assets/images/learn/risk.svg";
import riskEng from "assets/images/learn/riskEng.svg";
import { useRouter } from "next/router";

const RisksImportance = () => {
  const router = useRouter();
  return (
    <section className="bg-white py-[52px] px-5 pb-10 max-w-1320">
      <h1 className="text-[#111111] mb-4">
        {router.locale === "ko" ? "리스크의 중요성" : "Importance of Risk"}
      </h1>
      <article className="text-gray-600 text-sm">
        <p className="mb-4">
          10%의 수익률이 기대되는 자산 A와 7%의 수익률이 기대되는 자산 B가
          있다면, 대부분 A에 투자할 것입니다.
        </p>
        <p className="mb-4">
          하지만 10%의 수익률과 함께 최대 90%의 손실을 볼 수 있는 자산 A와 7%의
          수익률과 함께 최대 50%의 손실을 볼 수 있는 자산 B가 있다면 B에
          투자하는 것이 합리적입니다.​
        </p>
        <span className="text-[#001B7B] font-bold mr-1">
          이처럼 자산의 수익률 만큼이나 중요한 것이 자산의 리스크입니다.
        </span>
        그러나 일반 투자자들이 리스크에 대한 정보를 얻는 것은 쉽지 않습니다.
        Risk weather에서는 투자자에게 자산의 리스크에 대한 정보를 쉽고 빠르게
        전달합니다.
      </article>
      <Image
        id="Risk"
        src={router.locale == "ko" ? risk : riskEng}
        alt=""
        className="px-4 pt-[60px]"
      />
    </section>
  );
};

export default RisksImportance;
