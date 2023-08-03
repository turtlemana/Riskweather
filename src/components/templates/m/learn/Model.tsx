import Image from "next/image";
import { useRouter } from "next/router";

import graph2 from "assets/images/learn/graph2.svg";

const Model = () => {
  const router = useRouter();
  return (
    <section className="bg-white py-[100px] px-5">
      <article className="w-full max-w-1320  mx-auto flex items-center justify-between ">
        <div>
          <h6 className="text-xl text-[#111111] mb-10">
            {router.locale === "ko"
              ? "Riskweather의 리스크 모델 정확도"
              : "Riskweather's model accuracy"}
          </h6>

          <div className="text-gray-600 text-sm mb-10">
            <p className="mb-8 max-w-[528px]">
              기존의 리스크 측정은 자산의 수익률이 정규분포라는 가정하에
              진행됩니다.
              <br />
              그러나 실제 세상에서 자산의 수익률은 정규분포 보다 꼬리 부분에
              해당하는 리스크 빈도가 큽니다. 이러한 분포를 “Fat Tail” 모형이라
              합니다.
              <br />
              이로 인해 예측된 리스크와 실제 리스크 간의 큰 차이가 발생하고,
              <br />
              이는 “서브프라임 모기지 사태”를 비롯한 리스크 관리 실패의 원인이
              됩니다.
            </p>
            <div className="flex">
              <p>
                <span className="text-[#001B7B] font-bold mr-1">
                  본 서비스에서는 Fat Tail 구조를 반영한 분포를 모델링하고자
                  <br />
                  NTS-ARMA-GARCH 모형을 사용하였습니다.
                </span>
                이를 통해 실제와 유사한
                <br />
                분포를 도출하여 더 정확한 리스크를 제공하고 있습니다.
              </p>
            </div>
          </div>
          <Image src={graph2} alt="" className="" id="Info" />
        </div>
      </article>
    </section>
  );
};

export default Model;
