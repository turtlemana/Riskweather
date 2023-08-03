import { useState } from "react";
import Link from "next/link";

const FindId = () => {
  const [hasResult, setHasResult] = useState(false);

  return (
    <main className="pt-[192px] pb-[264px] bg-white text-center shadow-[0_0_12px_0_rgba(121,120,132,0.15)]">
      <p className="text-4xl text-[#111111] font-medium mb-14">
        Find Business ID
      </p>
      {hasResult ? (
        <section>
          <article className="mb-[44px] max-w-[327px] mx-auto bg-gray-100 py-[22px] rounded-20 text-[#111111]">
            riskweather00
          </article>
          <article
            className="h-12 bg-[#0198FF] py-3 max-w-[327px] mx-auto font-semibold rounded-[60px] mb-7 cursor-pointer hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
            onClick={() => setHasResult(true)}
          >
            <Link href="/login/business">
              <h1 className="text-white">Login</h1>
            </Link>
          </article>
        </section>
      ) : (
        <section>
          <article className="mb-[44px] max-w-[327px] mx-auto">
            <p className="mb-2 text-sm text-left">
              Please enter your Phone number
            </p>
            <input
              className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
              placeholder="010-0000-0000"
            />
          </article>
          <article
            className="h-12 bg-[#0198FF] py-3 max-w-[327px] mx-auto font-semibold rounded-[60px] mb-7 cursor-pointer hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
            onClick={() => setHasResult(true)}
          >
            <h1 className="text-white">Next</h1>
          </article>
        </section>
      )}
      <section>
        <Link href="/find/pw" className="text-[#0198FF] text-sm font-semibold">
          Forgot Password?
        </Link>
      </section>
    </main>
  );
};

export default FindId;
