import Image from "next/image";
import { useEffect } from "react";
import { MEMBERSHIPS } from "datas/membership";
import bgLeft from "assets/images/membership/bgLeft.svg";
import bgRight from "assets/images/membership/bgRight.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import { Session } from "interfaces/login";
import { PaymentResponse } from "interfaces/membership";

interface Props {
  session: Session;
}

const Membership = ({ session }: Props) => {
  useEffect(() => {
    const scriptForJquery = document.createElement("script");
    scriptForJquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    scriptForJquery.type = "text/javascript";
    document.head.appendChild(scriptForJquery);

    const scriptForIamport = document.createElement("script");
    scriptForIamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.5.js";
    scriptForIamport.type = "text/javascript";
    document.head.appendChild(scriptForIamport);
  }, []);

  const onPaymentButtonClick = (koreanPrice: string) => {
    //@ts-ignore
    const { IMP } = window; // 아임포트 라이브러리 불러오기
    IMP.init("imp15240181"); // 본인의 아임포트 아이디를 입력

    const data = {
      // 결제창 호출
      pg: "nice",
      pay_method: "card", // 결제 방법
      merchant_uid: "merchant_" + new Date().getTime(), // 주문 번호
      name: "Membership", // 주문 이름
      amount: koreanPrice, // 결제 금액
      // buyer_email: 'iamport@siot.do',  // 구매자 이메일
      // buyer_name: '구매자이름',  // 구매자 이름
      // buyer_tel: '010-1234-5678',  // 구매자 전화번호
      // buyer_addr: '서울특별시 강남구 삼성동',  // 구매자 주소
      // buyer_postcode: '123-456',  //
      m_redirect_url: "/membership",
    };

    async function callback(response: PaymentResponse) {
      const { success, merchant_uid, error_msg } = response;

      if (success) {
        toast(
          router.locale == "ko"
            ? "결제에 성공하셨습니다"
            : "Payment has successfully completed",
          { hideProgressBar: true, autoClose: 2000, type: "success" }
        );
        let enteredInput = {
          membership: 1,
        };

        const data = await fetch(
          `/api/auth/addUserInfo?session=${session.user.email}`,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ enteredInput }),
          }
        ).then((res) => {
          if (res.ok) {
            toast(
              router.locale == "ko"
                ? "맴버십 단계가 스탠다드로 설정됐습니다"
                : "Your Membership is now registered as Standard",
              { hideProgressBar: true, autoClose: 2000, type: "success" }
            );
          } else {
            toast(
              router.locale == "ko"
                ? "네트워크 에러가 발생했습니다"
                : "Fetch Error",
              { hideProgressBar: true, autoClose: 2000, type: "error" }
            );
          }
        });
        // sessionUpdate()
      } else {
        toast(router.locale == "ko" ? "결제에 실패했습니다" : "Payment Error", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
      }
    }

    IMP.request_pay(data, callback);
  };
  const router = useRouter();
  const { t } = useTranslation("membership");
  return (
    <main className="min-w-[360px] pt-12 pb-[100px] px-5 relative">
      <Image
        src={bgLeft}
        alt=""
        className="absolute left-[-5%] top-[4%] -z-10"
      />
      <Image
        src={bgRight}
        alt=""
        className="absolute right-0 top-[-10%] -z-10"
      />
      <section className="mb-12 flex justify-center gap-2.5 text-2xl">
        <h6 className="text-[#111111]">{t("membershipTitle1")}</h6>
        <h6 className="text-[#0198FF] underline decoration-2">
          {t("membershipTitle2")}
        </h6>
      </section>
      <ul>
        {MEMBERSHIPS.map(
          ({
            id,
            title,
            price,
            request,
            koreanTitle,
            koreanPrice,
            showingKrPrice,
          }) => (
            <li
              key={id}
              className="py-10 px-8 mb-6 rounded-20 bg-white border border-gray-200 w-full"
            >
              <h6 className="text-2xl text-gray-600 mb-3">
                {router.locale == "ko" ? koreanTitle : title}
              </h6>
              <h1 className="text-xl text-[#111111] mb-10">
                {router.locale == "ko" ? showingKrPrice : price}
              </h1>
              <div className="flex gap-2.5 items-end mb-10">
                <h2 className="text-[#0198FF] text-2xl">{request}</h2>
                <p className="font-medium text-sm text-gray-800 mb-1">
                  {title == "Basic"
                    ? t("membershipRequest")
                    : t("membershipRequest2")}
                </p>
              </div>
              <button
                disabled={title === "Basic" ? true : false}
                onClick={() => onPaymentButtonClick(koreanPrice)}
                className="bg-[#0198FF] w-full py-[10px] rounded-[60px] hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
              >
                <h3 className="text-white text-sm">
                  {router.locale == "ko" ? showingKrPrice : price}
                </h3>
              </button>
            </li>
          )
        )}
      </ul>
    </main>
  );
};

export default Membership;
