import Link from "next/link";

const Signup = () => {
  return (
    <main className="pt-9 pb-10 bg-white text-center">
      <p className="text-2xl text-[#111111] font-medium mb-10">
        Sign up for a <br />
        Business account
      </p>
      <section className="px-5 mx-auto">
        <h5 className="font-medium text-[#0198FF] text-left mb-8">
          Personal Information
        </h5>
        <article className="mb-6 text-sm ">
          <p className="mb-2 text-left">Name</p>
          <input
            className="h-10 rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Name"
          />
        </article>
        <article className="mb-6 text-sm">
          <p className="mb-2 text-left">Phone number</p>
          <input
            className="h-10 rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Phone number"
          />
        </article>
        <article className="text-sm">
          <p className="mb-2 text-left">Email</p>
          <input
            className="h-10 rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Email"
          />
        </article>
      </section>
      <div className="bg-gray-200 h-px my-7" />
      <section className="px-5 mx-auto">
        <h5 className="font-medium text-[#0198FF] text-left mb-8">
          ID&Password
        </h5>
        <article className="mb-6 text-sm">
          <p className="mb-2 text-left">ID</p>
          <input
            className="h-10 rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="ID"
          />
        </article>
        <article className="mb-6 text-sm">
          <p className="mb-2 text-left">Password</p>
          <input
            className="h-10 rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Password"
          />
        </article>
      </section>
      <div className="bg-gray-200 h-px my-7" />
      <section className="px-5 mx-auto mb-10">
        <h5 className="font-medium text-[#0198FF] text-left mb-8">
          Business Information
        </h5>
        <article className="mb-6 text-sm">
          <p className="mb-2 text-left">Company name</p>
          <input
            className="h-10 rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Company name"
          />
        </article>
        <article className="mb-6 text-sm">
          <p className="mb-2 text-left">Department</p>
          <input
            className="h-10 rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Department"
          />
        </article>
        <article className="mb-6 text-sm">
          <p className="mb-2 text-left">Position</p>
          <input
            className="h-10 rounded-20 border-gray-200 border w-full py-[10px] px-3 focus:border-[#4B5563] outline-none"
            placeholder="Position"
          />
        </article>
      </section>
      <section className="px-5">
        <article className="h-12 bg-[#0198FF] py-3 mx-auto rounded-[60px] cursor-pointer hover:bg-[#0085E6] disabled:bg-[#D1D5DB]">
          <Link href="/login/business">
            <h1 className="text-white">Sign up</h1>
          </Link>
        </article>
      </section>
    </main>
  );
};

export default Signup;
