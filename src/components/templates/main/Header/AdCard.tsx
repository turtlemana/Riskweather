import Image from "next/image";
import { useRouter } from "next/router";

const AdCard = ({ rand }: { rand: number }) => {
  const router = useRouter();

  const handleClick = () => {
    // window.location.href = 'https://m-able.app/viuuuu ';
    window.open(
      rand < 0.5
        ? "https://m-able.app/viuuuu"
        : "http://www.juroinstruments.com/about",
      "_blank"
    );
  };

  return (
    <main
      onClick={handleClick}
      className="relative pt-3 justify-center items-center rounded-t-20 cursor-pointer bg-white min-w-[282px] h-[262px]"
    >
      <section className="flex px-6 justify-between items-start mb-2">
        <article className="">
          <h6 className={`text-md font-bold `}>
            {rand < 0.5
              ? router.locale === "ko"
                ? "KB증권"
                : "KB Securities"
              : router.locale === "ko"
              ? "유로인스트루먼츠"
              : "JURO Instruments"}
          </h6>
        </article>
        <div className={`text-center`}>
          <h6 className="text-md text-[#9CA3AF] ">{"Sponsored"}</h6>
        </div>
      </section>

      {rand <= 0.5 ? (
        <Image
          src="/images/ads/DirectIndexA.jpg"
          quality={100}
          width={1080}
          height={1080}
          alt="이미지"
          className="object-fit  w-full h-full"
        />
      ) : (
        <Image
          src="/images/ads/UrosysWeb.jpg"
          quality={100}
          width={1080}
          height={1080}
          alt="이미지"
          className="object-fit  w-full h-[220px]"
        />
      )}
    </main>
  );
};

export default AdCard;
