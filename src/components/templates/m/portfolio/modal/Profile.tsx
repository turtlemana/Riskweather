import { Dispatch, SetStateAction, useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";

import close from "assets/icons/contact/close.svg";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import blueCheck from "assets/icons/portfolio/blueCheck.svg";
import cameraButton from "assets/icons/portfolio/camerButton.svg";
import { UserInfo } from "interfaces/portfolio";
import { Session } from "interfaces/login";
import useHandleWeatherImageError from "utils/useHandleWeatherImageError";

interface Props {
  setIsOpenProfileModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  userProfile: UserInfo;
  isValidating: boolean;
  mutate: () => void;
  session: Session;
}

const BUCKET_URL = "https://riskweather.s3.ap-northeast-2.amazonaws.com/";

const Profile = ({
  session,
  setIsOpenProfileModal,
  setIsOpenDeleteModal,
  userProfile,
  isValidating,
  mutate,
}: Props) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const { t } = useTranslation("portfolio");
  const [defaultImage, setDefaultImage] = useState(0);

  const defaultImageClick = (i: number) => {
    if (defaultImage === i) {
      setDefaultImage(0);
    } else {
      setDefaultImage(i);
    }
    // setDefaultImage(i)
  };

  const sessionUpdate = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploadingStatus, setUploadingStatus] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files?.length) {
      setFile(e.target.files[0]);

      setUploadingStatus("Uploading the file to AWS S3");
      let { data } = await axios.post(
        `/api/auth/profileImage?session=${session.user.email}`,
        {
          name: e.target.files[0].name,
          type: e.target.files[0].type,
          imageUrl: BUCKET_URL + e.target.files[0].name,
        }
      );

      const url = data.url;
      let { data: newData } = await axios.put(url, e.target.files[0], {
        headers: {
          "Content-type": e.target.files[0].type,
          "Access-Control-Allow-Origin": "*",
        },
      });

      setUploadedFile(BUCKET_URL + e.target.files[0].name);
      setFile(null);
      toast(
        router.locale == "ko"
          ? "프로필 이미지 변경이 완료됐습니다"
          : "Successfully changed your profile image",
        { hideProgressBar: true, autoClose: 2000, type: "success" }
      );
      mutate();
    }
    // sessionUpdate();
  };

  const imageButtonClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    imageInput.current?.click();
    setDefaultImage(0);
  };

  const saveClick = async () => {
    const userName = nameInput.current?.value;

    if (
      (userName == "" || userName == userProfile?.name) &&
      defaultImage == 0
    ) {
      setIsOpenProfileModal(false);
    } else if (userName && userName.length > 49) {
      return toast(
        router.locale == "ko"
          ? "이름은 50자 이내여야 합니다"
          : "Your name should be lesser than 50 words",
        { hideProgressBar: true, autoClose: 2000, type: "error" }
      );
    } else {
      let enteredInput;

      if (defaultImage == 0) {
        enteredInput = {
          name: userName,
        };
      } else {
        enteredInput = {
          name: userName,
          profileImage: `/images/users/default${defaultImage}.svg`,
        };
      }

      const data = await fetch(`/api/auth/user?session=${session.user.email}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ enteredInput }),
      }).then((res) => {
        if (res.ok) {
          toast(
            router.locale == "ko"
              ? "프로필 변경이 완료됐습니다"
              : "Successfully changed your profile",
            { hideProgressBar: true, autoClose: 2000, type: "success" }
          );
          mutate();
        } else {
          toast(
            router.locale == "ko"
              ? "네트워크 에러가 발생했습니다"
              : "Fetch Error",
            { hideProgressBar: true, autoClose: 2000, type: "error" }
          );
        }
      });
      setIsOpenProfileModal(false);
      mutate();
      // sessionUpdate()
    }
  };
  const handleImageError = useHandleWeatherImageError();
  // console.log(session?.user?.image.split("/")[3][7])

  return (
    <main className="z-20 fixed bg-white p-6 rounded-20 top-1/2 left-1/2 translate-x-half translate-y-half border w-full max-w-[332px]">
      <header className="flex mb-5">
        <h1 className="text-xl flex-1">{t("profileTitle")}</h1>
        <Image
          src={close}
          alt=""
          className="mb-1 cursor-pointer"
          onClick={() => setIsOpenProfileModal(false)}
        />
      </header>
      <section>
        <article className="relative w-[100px] mb-6 mx-auto">
          <Image
            src={userProfile?.profileImage || "/images/logos/errorLogo.png"}
            width={50}
            height={50}
            unoptimized
            onError={handleImageError}
            referrerPolicy="no-referrer"
            loading="eager"
            className="w-[100px] h-[100px] rounded-full"
            alt=""
          />
          <input
            type="file"
            accept="image/*"
            ref={imageInput}
            style={{ display: "none" }}
            onChange={uploadFile}
          />
          {/* <Image
            onClick={imageButtonClick}
            src={camera}
            alt=""
            className="absolute right-0 bottom-0 cursor-pointer"
          /> */}
        </article>
        <article
          className={
            "flex border border-gray-100 gap-2 mb-5 items-center justify-center p-3 "
          }
        >
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={"relative"}>
              <Image
                key={i}
                src={`/images/users/default${i}.svg`}
                onError={handleImageError}
                onClick={() => defaultImageClick(i)}
                width={10}
                height={10}
                unoptimized
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-[45px] h-[45px] rounded-full cursor-pointer"
                alt=""
              />
              {defaultImage == i ? (
                <Image
                  src={blueCheck}
                  alt=""
                  className="absolute right-0 bottom-0 cursor-pointer"
                />
              ) : (
                ""
              )}
            </div>
          ))}
          <Image
            onClick={imageButtonClick}
            src={cameraButton}
            alt=""
            className="w-[45px] h-[45px] rounded-full cursor-pointer"
          />
        </article>
        <article className="mb-6">
          <p className="text-sm text-gray-500 font-medium mb-3">
            {t("profileName")}
          </p>
          <input
            type="text"
            defaultValue={userProfile?.name}
            className="bg-white border border-gray-200 rounded-20 px-3 py-2.5 w-full text-sm h-10"
            ref={nameInput}
          />
        </article>
        {/* <article className="mb-10">
          <p className="text-sm text-gray-500 font-medium mb-3">Country</p>
          <article className="flex items-center relative justify-between w-full">
            <div
              onClick={() => setIsActive(!isActive)}
              className={`cursor-pointer border rounded-20 w-full h-10 py-2.5 px-3.5 flex justify-between ${
                isActive ? "border-[#0198FF]" : "border-gray-200 "
              } `}
            >
              <p
                className={`text-sm ${
                  isActive ? "text-[#0198FF]" : "text-black"
                }`}
              >
                {DATAS[index].title}
              </p>
              {isActive ? (
                <Image src={blueArrow} alt="" />
              ) : (
                <Image src={arrow} alt="" />
              )}
            </div>
            {isActive && (
              <div
                className={
                  "z-10 absolute top-11 right-0 bg-white py-3 px-2 border-gray-200 border rounded-20 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] w-full"
                }
              >
                {DATAS.map(({ id, title }) => (
                  <div
                    key={id}
                    className={`flex gap-2 px-3 py-1.5 cursor-pointer`}
                    onClick={() => {
                      setIndex(id);
                      setIsActive(false);
                    }}
                  >
                    <h6
                      className={`text-sm mt-px ${
                        index === id ? "text-[#0198FF]" : "text-gray-500"
                      }`}
                    >
                      {title}
                    </h6>
                  </div>
                ))}
              </div>
            )}
          </article>
        </article> */}
      </section>
      <button
        className="bg-[#0198FF] w-full p-2.5 h-10 rounded-[60px] text-white font-bold mb-5 hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
        onClick={saveClick}
      >
        {t("profileSaveBtn")}
      </button>
      <div
        className="text-[#868686] text-center text-sm underline cursor-pointer"
        onClick={() => {
          setIsOpenProfileModal(false);
          setIsOpenDeleteModal(true);
        }}
      >
        {t("profileDelete")}
      </div>
    </main>
  );
};

export default Profile;
