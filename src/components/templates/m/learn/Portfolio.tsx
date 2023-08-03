import Image from "next/image";

import portfolio from "assets/images/learn/m/portfolio.svg";
import asset from "assets/images/learn/m/asset.svg";
import portfolioKr from "assets/images/learn/m/portfolioKr.svg";
import assetKr from "assets/images/learn/m/assetKr.svg";
import { useRouter } from "next/router";

const Portfolio = () => {
  const router = useRouter();
  return (
    <main className="bg-white pt-[60px] pb-10 px-5  max-w-1320">
      <h1 className="text-xl text-[#001B7B] text-center">효과적인 자산관리</h1>
      <h1 className="text-[#111111] mt-10">포트폴리오를 통한 RISK 관리​</h1>
      <section className="mt-4 text-gray-600 text-sm mb-10">
        <p className="mb-4">
          투자자는 Crypto, Stock, Index가 함께 포함된 포트폴리오를 구성하고,
          개별 자산 뿐만 아니라 포트폴리오에 대한 리스크 정보도 함께 제공받을 수
          있습니다.
        </p>
        <p className="mb-4">
          매 시간 주요 통화의 환율(매매기준율)을 기준으로 포트폴리오 가격을
          업데이트 하며, 사용자는 새로고침 버튼을 통해, 포트폴리오의 리스크를
          최신으로 유지할 수 있습니다.
        </p>
        또한 현재 포트폴리오의 리스크가 최소화 되도록 자산을 관리하는
        “포트폴리오 리밸런싱” 서비스를 준비중에 있습니다.
        <span className="text-[#001B7B] font-bold ml-1">
          이를 통해, 투자자는 투자하고 있는 전체 자산 포트폴리오의 리스크를
          효과적으로 관리할 수 있습니다.
        </span>
      </section>
      <Image
        src={router.locale === "ko" ? portfolioKr : portfolio}
        alt=""
        className="mb-10 mx-auto"
      />
      <Image
        src={router.locale === "ko" ? assetKr : asset}
        alt=""
        className="mx-auto"
        id="Profile"
      />
    </main>
  );
};

export default Portfolio;
