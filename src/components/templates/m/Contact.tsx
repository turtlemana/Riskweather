import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import close from "assets/icons/contact/close.svg";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Session } from "interfaces/login";

const Contact = ({ onClose }: { onClose: () => void }) => {
  //@ts-ignore
  const { data: session }: Session = useSession();
  const router = useRouter();

  const [detail, setDetail] = useState("");
  const [email, setEmail] = useState(
    session?.user?.email ? session?.uesr?.email : ""
  );

  useEffect(() => {
    if (session) {
      setEmail(session?.user?.email);
    }
  }, [session]);

  const contactDetail = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (detail.length == 500 && e.target.value.length > detail.length) {
      return toast(
        router.locale == "ko"
          ? "500자 이내여야 합니다"
          : "Less than 500 words required",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
    }
    setDetail(e.target.value);
  };

  const submitHandler = async () => {
    if (detail.length > 500) {
      return toast(
        router.locale == "ko"
          ? "500자 이내여야 합니다"
          : "Your enquiry should be less than 500 words",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
    }
    if (detail.length == 0) {
      return toast(
        router.locale == "ko"
          ? "문의사항을 작성해주시길 바랍니다"
          : "Your can't send enquiry without a message",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
    }
    if (!email) {
      return toast(
        router.locale == "ko"
          ? "이메일 형식을 확인해주시길 바랍니다"
          : "Please check your email format",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
    }
    if (email && !email?.includes("@")) {
      return toast(
        router.locale == "ko"
          ? "이메일 형식을 확인해주시길 바랍니다"
          : "Please check your email format",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
    }
    const contact = {
      email: email,
      detail: detail,
    };
    const data = await fetch(`/api/mobileContact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ contact }),
    }).then((res) => {
      if (res.ok) {
        toast(
          router.locale == "ko"
            ? "문의사항이 성공적으로 전송됐습니다"
            : "Successfully sent you enquiry",
          { hideProgressBar: true, autoClose: 2000, type: "success" }
        );
        setDetail("");
        setEmail("");
        onClose();
      } else {
        toast(
          router.locale == "ko"
            ? "네트워크 에러가 발생했습니다"
            : `${res.status}There was an error, while sending your enquiry`,
          { hideProgressBar: true, autoClose: 2000, type: "error" }
        );
      }
    });
  };

  return (
    <main className="z-30 border absolute bg-white p-6 rounded-20 top-[90%] left-1/2 translate-x-half max-w-[332px]">
      <header className="flex mb-2">
        <h1 className="text-xl flex-1">
          {router.locale == "ko" ? "문의사항을 남겨주세요" : "Contact Us"}
        </h1>
        <Image
          src={close}
          alt=""
          className="mb-1 cursor-pointer"
          onClick={onClose}
        />
      </header>
      <section>
        <p className="text-xs text-gray-600 mb-6">
          {router.locale == "ko"
            ? "문의를 남겨주시면"
            : "Complete the form and"}{" "}
          <br />
          {router.locale == "ko"
            ? "매니저가 빠른 시일 내에 답해드리겠습니다"
            : "Manager will be in touch soon."}
        </p>
        <article className="mb-6">
          <p className="text-sm mb-2">
            {router.locale == "ko" ? "이메일" : "Email"}{" "}
          </p>
          <input
            value={email}
            disabled={session ? true : false}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={router.locale == "ko" ? "이메일" : "Email"}
            className="border border-gray-200 rounded-20 px-3 py-2.5 w-full text-sm h-10 focus:border-[#4B5563] outline-none"
          />
        </article>
        <article className="mb-8">
          <p className="text-sm mb-2">
            {router.locale == "ko" ? "상세 내용" : "Detail"}
          </p>
          <textarea
            placeholder={router.locale == "ko" ? "문의사항" : "Enquiry"}
            value={detail}
            className="border border-gray-200 rounded-20 mb-2 px-3 py-2.5 w-[284px] text-sm h-[200px] resize-none focus:border-[#4B5563] outline-none"
            onChange={contactDetail}
          />
          <p className="text-right text-gray-400 text-xs">
            {detail.length}/500
          </p>
        </article>
      </section>
      <button
        className="bg-[#0198FF] w-full h-10 p-3 rounded-[60px] text-white font-bold hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
        onClick={submitHandler}
      >
        {router.locale == "ko" ? "보내기" : "Send"}
      </button>
    </main>
  );
};

export default Contact;
