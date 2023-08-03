import { useState } from "react";
import Link from "next/link";

const FindPw = () => {
  const [hasResult, setHasResult] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <main className="relative pt-[104px] pb-[284px] px-5 bg-white text-center">
      {hasResult ? (
        <section>
          <p className="text-[28px] text-[#111111] font-medium mb-[52px]">
            Reset Password
          </p>
          <article className="mb-6 text-sm">
            <p className="mb-2 text-left">Enter New Password</p>
            <input
              className="h-10 rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
              placeholder="Password"
            />
          </article>
          <article className="mb-10 text-sm">
            <p className="mb-2 text-left">Confirm Password</p>
            <input
              className="h-10 rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
              placeholder="Confirm Password"
            />
          </article>
          <article
            className="h-12 bg-[#0198FF] py-3 rounded-[60px] cursor-pointer hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
            onClick={() => setIsOpenModal(true)}
          >
            <h1 className="text-white">Reset Password</h1>
          </article>
        </section>
      ) : (
        <section>
          <p className="text-[28px] text-[#111111] font-medium mb-[52px]">
            Find Business Password
          </p>
          <article className="mb-10 text-sm">
            <p className="mb-2 text-left">Please enter ID</p>
            <input
              className="h-10 rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
              placeholder="ID"
            />
          </article>
          <article
            className="h-12 bg-[#0198FF] py-3 rounded-[60px] mb-7 cursor-pointer hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
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
        <section className="max-w-[332px] w-full absolute text-sm top-1/2 left-1/2 translate-x-half translate-y-half bg-white p-6 rounded-20 border border-gray-200 shadow-[0_0_12px_0_rgba(121,120,132,0.15)]">
          <h1 className="text-xl mb-4">Password changed</h1>
          <p className="mb-6">You can now login with your new password.</p>
          <article className="h-10 bg-[#0198FF] py-2.5 rounded-[60px] cursor-pointer hover:bg-[#0085E6] disabled:bg-[#D1D5DB]">
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
