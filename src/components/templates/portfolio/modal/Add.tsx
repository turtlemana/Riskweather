import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import close from "assets/icons/contact/close.svg";
import { UserInfo } from "interfaces/portfolio";

interface Props {
  setIsOpenAddModal: Dispatch<SetStateAction<boolean>>;
  userProfile: UserInfo;
  isValidating: boolean;
  mutate: () => void;
}

const Add = ({
  setIsOpenAddModal,
  userProfile,
  isValidating,
  mutate,
}: Props) => {
  return (
    <main className="absolute text-center text-[#111111] bg-white p-8 rounded-20 top-1/2 left-1/2 translate-x-half translate-y-half border max-w-[415px] w-full">
      <header className="flex mb-12">
        <h1 className="text-2xl flex-1 text-left text-[#111111]">
          Add Portfolio
        </h1>
        <Image
          src={close}
          alt=""
          className="mb-1 cursor-pointer"
          onClick={() => setIsOpenAddModal(false)}
        />
      </header>
      <p className="mb-3 text-sm text-gray-500 font-medium text-left">
        Portfolio Name
      </p>
      <input
        className="border w-full py-2.5 px-3 rounded-20 mb-10 max-h-10 text-sm text-[#111111] outline-none focus:border-[#4B5563]"
        placeholder="Portfolio Name"
      />
      <button
        className="bg-[#0198FF] p-3 rounded-[60px] text-white w-full hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
        onClick={() => setIsOpenAddModal(false)}
      >
        <h1>Add</h1>
      </button>
    </main>
  );
};

export default Add;
