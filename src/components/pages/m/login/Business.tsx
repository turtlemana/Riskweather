import Link from "next/link";

const Business = () => {
  return (
    <main className="pt-[104px] pb-[200px] bg-white text-center px-5 text-sm">
      <p className="text-[28px] text-[#111111] font-medium mb-[52px]">
        Business Login
      </p>
      <section className="mb-6 max-w-[335px] mx-auto">
        <p className="mb-2 text-left">ID</p>
        <input
          className="h-10 rounded-20 border-gray-200 border w-full py-2.5 px-3 focus:border-[#4B5563] outline-none"
          placeholder="ID"
        />
      </section>
      <section className="mb-10 max-w-[335px] mx-auto">
        <p className="mb-2 text-left">Password</p>
        <input
          className="h-10 rounded-20 border-gray-200 border w-full py-2.5 px-3 focus:border-[#4B5563] outline-none"
          placeholder="Password"
        />
      </section>
      <article className="h-12 bg-[#0198FF] py-3 max-w-[335px] mx-auto rounded-[60px] mb-7 cursor-pointer hover:bg-[#0085E6] disabled:bg-[#D1D5DB]">
        <Link href="/">
          <h1 className="text-white mt-[2px]">Login</h1>
        </Link>
      </article>
      <section>
        <article className="flex gap-2 items-center justify-center mb-4">
          <p className="text-gray-600">Don’t have a business account?</p>
          <Link href="/signup" className="text-[#0198FF] font-medium">
            Sign up
          </Link>
        </article>
        <Link href="/find/id" className="text-[#0198FF] font-medium">
          Forgot ID&Password?
        </Link>
      </section>
    </main>
  );
};

export default Business;
