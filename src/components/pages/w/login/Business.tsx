import Link from "next/link";

const Business = () => {
  return (
    <main className="pt-[192px] pb-[136px] bg-white text-center shadow-[0_0_12px_0_rgba(121,120,132,0.15)]">
      <p className="text-4xl text-[#111111] font-medium mb-14">
        Business Login
      </p>
      <section className="mb-6 max-w-[327px] mx-auto">
        <p className="mb-2 text-sm text-left">ID</p>
        <input
          className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
          placeholder="ID"
        />
      </section>
      <section className="mb-11 max-w-[327px] mx-auto">
        <p className="mb-2 text-sm text-left">Password</p>
        <input
          className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
          placeholder="Password"
        />
      </section>
      <article className="h-12 bg-[#0198FF] py-3 max-w-[327px] mx-auto font-semibold rounded-[60px] mb-7 cursor-pointer hover:bg-[#0085E6] disabled:bg-[#D1D5DB]">
        <Link href="/">
          <h1 className="text-white">Login</h1>
        </Link>
      </article>
      <section>
        <article className="flex gap-2 items-center justify-center mb-4">
          <p className="text-sm text-gray-600">
            Don’t have a business account?
          </p>
          <Link href="/signup" className="text-[#0198FF] text-sm font-semibold">
            Sign up
          </Link>
        </article>
        <Link href="/find/id" className="text-[#0198FF] text-sm font-semibold">
          Forgot ID&Password?
        </Link>
      </section>
    </main>
  );
};

export default Business;
