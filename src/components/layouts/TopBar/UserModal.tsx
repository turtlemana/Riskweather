import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  onClose: () => void;
  onLogout?: () => void;
  onOpenContactModal: () => void;
}

const UserModal = ({ onClose, onOpenContactModal }: Props) => {
  const router = useRouter();

  return (
    <main className="z-10 py-3 px-2 absolute shadow-[0_0_12px_0_rgba(121,120,132,0.15)] bg-white w-[150px] rounded-20 overflow-hidden">
      {/* <Link href="/membership">
        <p
          className="px-3 py-1.5 text-sm cursor-pointer hover:bg-[#F3F4F6]"
          onClick={onClose}
        >
          {router.locale=="ko" ? "멤버십" : "My Membership"}
        </p>
      </Link> */}
      <p
        className="px-3 py-1.5 text-sm cursor-pointer hover:bg-[#F3F4F6]"
        onClick={onOpenContactModal}
      >
        {router.locale == "ko" ? "문의하기" : "Contact"}
      </p>
      <button
        className="px-3 py-1.5 text-sm cursor-pointer hover:bg-[#F3F4F6]"
        onClick={() => {
          signOut({ callbackUrl: `/${router.locale}/login` });
        }}
      >
        {router.locale == "ko" ? "로그아웃" : "Logout"}
      </button>
    </main>
  );
};

export default UserModal;
