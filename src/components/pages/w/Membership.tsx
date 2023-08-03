import { MEMBERSHIPS } from "datas/membership";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Session } from "interfaces/login";

interface Props {
  session: Session;
}

const Membership = ({ session }: Props) => {
  console.log(session);
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
    const { IMP }: any = window; // 아임포트 라이브러리 불러오기
    IMP.init("imp15240181"); // 본인의 아임포트 아이디를 입력

    const data = {
      // 결제창 호출
      pg: "nice",
      pay_method: "card", // 결제 방법
      merchant_uid: "merchant_" + new Date().getTime(), // 주문 번호
      name: "Membership", // 주문 이름
      amount: koreanPrice, // 결제 금액
      buyer_email: "iamport@siot.do", // 구매자 이메일
      buyer_name: "구매자이름", // 구매자 이름
      buyer_tel: "010-1234-5678", // 구매자 전화번호
      buyer_addr: "서울특별시 강남구 삼성동", // 구매자 주소
      buyer_postcode: "123-456", //
    };

    async function callback(response: any) {
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
    <main className="min-w-[1024px] pt-[108px] pb-[240px] px-5 bg-backgroundMembership bg-cover bg-no-repeat bg-center">
      <div className="mb-[120px] flex justify-center gap-2.5 text-[44px]">
        <h6 className="text-[#111111]">{t("membershipTitle1")}</h6>
        <h6 className="text-[#0198FF] underline decoration-2">
          {t("membershipTitle2")}
        </h6>
      </div>
      <ul className="flex justify-center gap-[30px]">
        {MEMBERSHIPS.map(
          ({
            id,
            title,
            koreanTitle,
            price,
            showingKrPrice,
            koreanPrice,
            request,
          }) => (
            <li
              key={id}
              className="py-[60px] px-12 rounded-20 bg-white border border-gray-200 w-full max-w-[440px]"
            >
              <h6 className="text-4xl text-gray-600 mb-5">
                {router.locale == "ko" ? koreanTitle : title}
              </h6>
              <h1 className="text-[28px] text-[#111111] mb-[56px]">
                {router.locale == "ko" ? showingKrPrice : price}
              </h1>
              <div className="flex gap-2.5 items-end mb-12 justify-center">
                <h2 className="text-[#0198FF] text-2xl">{request}</h2>
                <p className="font-medium text-lg text-gray-800 ">
                  {title == "Basic"
                    ? t("membershipRequest")
                    : t("membershipRequest2")}
                </p>
              </div>
              <button
                disabled={title === "Basic" ? true : false}
                onClick={() => onPaymentButtonClick(koreanPrice)}
                className="bg-[#0198FF] w-full py-3 rounded-[60px] hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
              >
                <h3 className="text-white ">
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
