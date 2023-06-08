import { useState } from "react";
import Link from "next/link";

const FindPw = () => {
  const [hasResult, setHasResult] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <main className="relative pt-[192px] pb-[264px] bg-white text-center shadow-[0_0_12px_0_rgba(121,120,132,0.15)]">
      {hasResult ? (
        <section>
          <p className="text-4xl text-[#111111] font-medium mb-14">
            Reset Password
          </p>
          <article className="mb-6 max-w-[327px] mx-auto">
            <p className="mb-2 text-sm text-left">Enter New Password</p>
            <input
              className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
              placeholder="Password"
            />
          </article>
          <article className="mb-[44px] max-w-[327px] mx-auto">
            <p className="mb-2 text-sm text-left">Confirm Password</p>
            <input
              className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
              placeholder="Confirm Password"
            />
          </article>
          <article
            className="h-12 bg-[#0198FF] py-3 max-w-[327px] mx-auto font-semibold rounded-[60px] mb-7 cursor-pointer hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
            onClick={() => setIsOpenModal(true)}
          >
            <h1 className="text-white">Reset Password</h1>
          </article>
        </section>
      ) : (
        <section>
          <p className="text-4xl text-[#111111] font-medium mb-14">
            Find Business Password
          </p>
          <article className="mb-[44px] max-w-[327px] mx-auto">
            <p className="mb-2 text-sm text-left">Please enter ID</p>
            <input
              className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
              placeholder="ID"
            />
          </article>
          <article
            className="h-12 bg-[#0198FF] py-3 max-w-[327px] mx-auto font-semibold rounded-[60px] mb-7 cursor-pointer hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
            onClick={() => setHasResult(true)}
          >
            <h1 className="text-white">Next</h1>
          </article>
          <Link
            href="/find/id"
            className="text-[#0198FF] text-sm font-semibold"
          >
            Forgot ID?
          </Link>
        </section>
      )}
      {isOpenModal && (
        <section className="absolute top-1/2 left-1/2 translate-x-half translate-y-half bg-white py-12 px-[34px] rounded-20 border border-gray-200">
          <h1 className="text-[#111111] text-2xl mb-4">Password changed</h1>
          <p className="text-[#111111] mb-9">
            You can now login with your new password.
          </p>
          <article className="h-12 bg-[#0198FF] py-3 w-[351px] mx-auto rounded-[60px] cursor-pointer hover:bg-[#0085E6] disabled:bg-[#D1D5DB]">
            <Link href="/login">
              <h1 className="text-white">Login</h1>
            </Link>
          </article>
        </section>
      )}
    </main>
  );
};

export default FindPw;
