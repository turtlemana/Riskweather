import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";
import { CONTACTS, INFO, MENUS } from "datas/footer";

const Footer = () => {
  const router = useRouter();
  const handleImageError = useHandleWeatherImageError();
  return (
    <footer className="pt-10 pb-[60px] border-t">
      <div className="min-w-[1024px] max-w-1320 gap-[86px] mx-auto flex items-start desktop:max-w-5xl desktop:px-3 laptop:max-w-3xl laptop:px-3 laptop:flex-col laptop:gap-10">
        <Image
          onError={handleImageError}
          width={100}
          height={50}
          src={`/images/icons/footer/logo.png`}
          alt="logo"
          className={"w-[54px] h-7"}
        />
        <section className="flex-1">
          <h4 className="text-gray-600 mb-7 laptop:mb-5">
            {router.locale == "ko" ? "고객센터" : "Customer Service"}
          </h4>
          <ul className="flex items-center gap-5 mb-2">
            {CONTACTS.map(({ id, title, koreanTitle, content, border }) => (
              <li key={id} className="flex items-center gap-3">
                <p className="text-sm text-gray-400 w-[60px]">
                  {router.locale == "ko" ? koreanTitle : title}
                </p>
                <p className="text-sm text-gray-800">{content}</p>
                {border && (
                  <div className="h-3 w-px border border-solid border-gray-200 ml-2" />
                )}
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-7 mb-12 laptop:mb-10">
            {INFO.map(({ id, title, content, koreanTitle, koreanContent }) => (
              <li key={id} className="flex items-center gap-3">
                <p className="text-sm text-gray-400">
                  {router.locale == "ko" ? koreanTitle : title}
                </p>
                <p className="text-sm text-gray-800">
                  {router.locale == "ko" ? koreanContent : content}
                </p>
              </li>
            ))}
          </ul>
          <ul className="flex gap-4 text-gray-600 font-medium text-sm ">
            {MENUS.map(({ id, title, path, koreanTitle }) => (
              <li key={id} className="w-[115px] flex items-center ">
                <Link href={path}>
                  {router.locale == "ko" ? koreanTitle : title}
                </Link>
                {title != "Privacy policy" && (
                  <div className="h-3 w-px border border-solid border-gray-200 ml-8" />
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
