import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import UserModal from "components/layouts/TopBar/UserModal";
import Contact from "components/templates/Contact";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import useModalClose from "utils/useModalClose";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";

const SessionComponent = () => {
  //@ts-ignore
  const { data: session }: { data: Session | null } = useSession();
  const [isUserOpenModal, setIsUserOpenModal] = useState(false);
  const [isOpenContactModal, setIsOpenContactModal] = useState(false);
  const router = useRouter();
  const modalRef = useModalClose(isUserOpenModal, setIsUserOpenModal);
  const handleWeatherImageError = useHandleWeatherImageError();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsUserOpenModal(false);
    });
  }, [router.events]);

  return session ? (
    <div
      //@ts-ignore
      ref={modalRef}
      className="flex-row items-center"
      onClick={() => setIsUserOpenModal((prev) => !prev)}
    >
      <Image
        src={session?.user?.image}
        onError={handleWeatherImageError}
        quality={100}
        width={100}
        height={100}
        referrerPolicy="no-referrer"
        loading="eager"
        alt="profile"
        className="mr-6 w-10 h-10 rounded-full cursor-pointer laptop:mr-3"
      />
      {isUserOpenModal && (
        <UserModal
          onClose={() => setIsUserOpenModal((prev) => !prev)}
          onLogout={() => signOut({ callbackUrl: "/login" })}
          onOpenContactModal={() => setIsOpenContactModal(true)}
        />
      )}
      {isOpenContactModal && (
        <Contact
          email={session?.user?.email}
          onClose={() => setIsOpenContactModal(false)}
        />
      )}
    </div>
  ) : (
    <button
      onClick={() => router.push({ pathname: "/login" })}
      type="button"
      className="py-2 px-5 text-sm font-semibold text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      {router.locale == "ko" ? "로그인" : "Sign In"}
    </button>
  );
};

export default SessionComponent;
