import { useSession } from "next-auth/react";
import Image from "next/image";

import { useRouter } from "next/router";

import useHandleWeatherImageError from "utils/useHandleWeatherImageError";
import Link from "next/link";
import my from "assets/icons/header/my.svg";

const SessionComponent = () => {
  //@ts-ignore
  const { data: session }: { data: Session | null } = useSession();

  const router = useRouter();
  const handleWeatherImageError = useHandleWeatherImageError();

  return session ? (
    <Link href={`/${router.locale}/portfolio`}>
      <Image
        onError={handleWeatherImageError}
        quality={100}
        width={100}
        height={100}
        src={session?.user?.image}
        referrerPolicy="no-referrer"
        loading="eager"
        alt="profile"
        className="mr-6 w-8 h-8 rounded-full cursor-pointer laptop:mr-3"
      />
    </Link>
  ) : (
    <Link href={`/${router.locale}/login`}>
      <Image src={my} alt="" className="w-6 h-6" />
    </Link>
  );
};

export default SessionComponent;
