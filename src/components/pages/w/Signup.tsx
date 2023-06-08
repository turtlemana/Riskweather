import Link from "next/link";

const Signup = () => {
  return (
    <main className="pt-[100px] pb-[120px] bg-white text-center shadow-[0_0_12px_0_rgba(121,120,132,0.15)]">
      <p className="text-4xl text-[#111111] font-medium mb-[80px]">
        Sign up for a Business account
      </p>
      <section className="max-w-[440px] mx-auto">
        <h5 className="font-medium text-[#0198FF] text-left mb-8">
          Personal Information
        </h5>
        <article className="mb-6">
          <p className="mb-2 text-sm text-left">Name</p>
          <input
            className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Name"
          />
        </article>
        <article className="mb-6">
          <p className="mb-2 text-sm text-left">Phone number</p>
          <input
            className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Phone number"
          />
        </article>
        <article className="mb-6">
          <p className="mb-2 text-sm text-left">Email</p>
          <input
            className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Email"
          />
        </article>
      </section>
      <div className="bg-gray-200 h-px my-10" />
      <section className="max-w-[440px] mx-auto">
        <h5 className="font-medium text-[#0198FF] text-left mb-8">
          ID&Password
        </h5>
        <article className="mb-6">
          <p className="mb-2 text-sm text-left">ID</p>
          <input
            className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="ID"
          />
        </article>
        <article className="mb-6">
          <p className="mb-2 text-sm text-left">Password</p>
          <input
            className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Password"
          />
        </article>
      </section>
      <div className="bg-gray-200 h-px my-10" />
      <section className="max-w-[440px] mx-auto mb-[60px]">
        <h5 className="font-medium text-[#0198FF] text-left mb-8">
          Business Information
        </h5>
        <article className="mb-6">
          <p className="mb-2 text-sm text-left">Company name</p>
          <input
            className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Company name"
          />
        </article>
        <article className="mb-6">
          <p className="mb-2 text-sm text-left">Department</p>
          <input
            className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Department"
          />
        </article>
        <article className="mb-6">
          <p className="mb-2 text-sm text-left">Position</p>
          <input
            className="h-10 text-sm rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Position"
          />
        </article>
      </section>
      <article className="h-12 bg-[#0198FF] py-3 max-w-[440px] mx-auto rounded-[60px] cursor-pointer hover:bg-[#0085E6] disabled:bg-[#D1D5DB]">
        <Link href="/login/business">
          <h1 className="text-white">Sign up</h1>
        </Link>
      </article>
    </main>
  );
};

export default Signup;
