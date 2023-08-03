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
    <main className="fixed bg-white p-6 rounded-20 top-1/2 left-1/2 translate-x-half translate-y-half border max-w-[332px] w-full">
      <header className="flex mb-6">
        <h1 className="text-xl flex-1">Add Portfolio</h1>
        <Image
          src={close}
          alt=""
          className="mb-1 cursor-pointer"
          onClick={() => setIsOpenAddModal(false)}
        />
      </header>
      <p className="mb-3 text-sm text-gray-500 font-medium">Portfolio Name</p>
      <input
        className="border w-full py-2.5 px-3 rounded-20 mb-10 h-10 text-sm outline-none focus:border-[#4B5563]"
        placeholder="Portfolio Name"
      />
      <button
        className="bg-[#0198FF] p-2.5 rounded-[60px] h-10 text-white w-full hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
        onClick={() => setIsOpenAddModal(false)}
      >
        <h1 className="text-sm">Add</h1>
      </button>
    </main>
  );
};

export default Add;
