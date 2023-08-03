import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { CONTACTS, MENUS } from "datas/footer";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";

const Footer = () => {
  const router = useRouter();
  const handleImageError = useHandleWeatherImageError();
  return (
    <footer className="min-w-[360px] pt-7 pb-10 border-t px-5 bg-gray-50">
      <div>
        <Image
          onError={handleImageError}
          unoptimized
          width={100}
          height={50}
          src={`/images/icons/footer/logo.png`}
          alt="logo"
          className="h-7 w-[54px] mb-7"
        />
        <h1 className="text-gray-600 mb-4 text-sm">
          {router.locale == "ko" ? "고객센터" : "Customer Service"}
        </h1>
        <ul className="mb-[30px]">
          {CONTACTS.map(({ id, title, koreanTitle, content }) => (
            <li key={id} className="flex items-center gap-2 mb-2.5 text-xs">
              <p className="text-gray-400 w-[56px]">
                {router.locale == "ko" ? koreanTitle : title}
              </p>
              <p className="text-gray-800">{content}</p>
            </li>
          ))}
        </ul>
        <ul className="flex gap-4 text-gray-600 font-medium text-sm ">
          {MENUS.map(({ id, title, koreanTitle, path }) => (
            <li key={id} className={"flex items-center text-[10px]"}>
              <Link href={path}>
                {router.locale == "ko" ? koreanTitle : title}
              </Link>
              {title != "Privacy policy" && (
                <div className="h-3 w-px border border-solid border-gray-200 ml-3" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
