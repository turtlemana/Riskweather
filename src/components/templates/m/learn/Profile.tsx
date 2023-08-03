import Image from "next/image";

import profile from "assets/images/learn/m/profile.svg";
import profileKr from "assets/images/learn/m/profileKr.svg";
import { useRouter } from "next/router";
const Profile = () => {
  const router = useRouter();

  return (
    <section className="bg-white pt-[60px] pb-[80px] px-5 max-w-1320">
      <h1 className="text-[#111111] mb-4">투자성향 파악</h1>
      <div className="text-gray-600 text-sm mb-10">
        <p className="mb-4">
          투자자는 관심있는 자산들을 선택하여 자신의 투자 성향을 파악할 수
          있습니다.
        </p>
        투자자가 선택한 관심 자산들로 구성된 포트폴리오의 리스크를 산출하여
        투자자의 투자 성향 정보를 제공합니다.
        <span className="text-[#001B7B] font-bold ml-1">
          투자자는 관심 자산을 선택하기만 해도 자신의 투자 성향을 파악하고
          적절한 투자 전략을 세울 수 있습니다.
        </span>
      </div>
      <Image
        src={router.locale === "ko" ? profileKr : profile}
        alt=""
        className="mx-auto"
      />
    </section>
  );
};

export default Profile;
