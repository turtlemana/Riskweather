import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import close from "assets/icons/contact/close.svg";

interface Props {
  onClose: () => void;
  email: string;
}

const Contact = ({ onClose, email }: Props) => {
  const router = useRouter();
  const [detail, setDetail] = useState("");
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
    const data = await fetch(`/api/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ detail }),
    }).then((res) => {
      if (res.ok) {
        toast(
          router.locale == "ko"
            ? "문의사항이 성공적으로 전송됐습니다"
            : "Successfully sent you enquiry",
          { hideProgressBar: true, autoClose: 2000, type: "success" }
        );
        setDetail("");
        onClose();
      } else {
        toast(
          router.locale == "ko"
            ? "네트워크 에러가 발생했습니다"
            : "There was an error, while sending your enquiry",
          { hideProgressBar: true, autoClose: 2000, type: "error" }
        );
      }
    });
  };

  return (
    <main className="z-20 border absolute bg-white p-8 rounded-20 top-1/2 left-1/2 translate-x-half translate-y-half">
      <header className="flex mb-5">
        <h1 className="text-2xl flex-1">
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
        <p className="text-sm text-gray-600 mb-10">
          {router.locale == "ko"
            ? "문의를 남겨주시면"
            : "Complete the form and"}
          <br />
          {router.locale == "ko"
            ? "매니저가 빠른 시일 내에 답해드리겠습니다"
            : "Manager will be in touch soon."}
        </p>
        <article className="mb-6">
          <p className="text-sm mb-2">
            {router.locale == "ko" ? "이메일" : "Email"}
          </p>
          <input
            placeholder={router.locale == "ko" ? "이메일" : "Email"}
            value={email}
            disabled
            className="border border-gray-200 rounded-20 px-3 py-2.5 w-[326px] text-sm h-10 focus:border-[#4B5563] outline-none"
          />
        </article>
        <article className="mb-10">
          <p className="text-sm mb-2">
            {router.locale == "ko" ? "상세 내용" : "Detail"}{" "}
          </p>
          <textarea
            placeholder={router.locale == "ko" ? "문의사항" : "Enquiry"}
            value={detail}
            className="border border-gray-200 rounded-20 mb-2 px-3 py-2.5 w-[326px] text-sm h-[220px] resize-none focus:border-[#4B5563] outline-none"
            onChange={contactDetail}
          />
          <p className="text-right text-gray-400 text-xs">
            {detail.length}/500
          </p>
        </article>
      </section>
      <button
        className="bg-[#0198FF] w-full p-3 rounded-[60px] text-white font-bold hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
        onClick={submitHandler}
      >
        {router.locale == "ko" ? "보내기" : "Send"}
      </button>
    </main>
  );
};

export default Contact;
