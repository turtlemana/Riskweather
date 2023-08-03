import { Dispatch, SetStateAction } from "react";
import { signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface Props {
  setIsOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  deleteHandler: () => Promise<void>;
}

const Delete = ({ setIsOpenDeleteModal, deleteHandler }: Props) => {
  const { t } = useTranslation("portfolio");
  const router = useRouter();

  return (
    <main className="z-30 absolute text-center bg-white p-6 rounded-20 top-1/2 left-1/2 translate-x-half translate-y-half border max-w-[332px] w-full shadow-[0_0_12px_0_rgba(121,120,132,0.15)]">
      <h1 className="text-xl mb-4">
        {t("deleteExplain1")}
        <br /> {t("deleteExplain2")}
      </h1>
      <p className="mb-9 text-sm">{t("deleteExplain3")}</p>
      <section className="flex gap-3">
        <button
          className="bg-gray-500 p-2.5 rounded-[60px] text-white h-10 font-medium flex-1"
          onClick={() => setIsOpenDeleteModal(false)}
        >
          {t("deleteCancel")}
        </button>
        <button
          className="bg-[#0198FF] p-2.5 rounded-[60px] text-white h-10 font-bold flex-1 hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
          onMouseDown={deleteHandler}
          onClick={() => {
            signOut({ callbackUrl: `/${router.locale}/login` });
          }}
        >
          <h1>{t("delete")}</h1>
        </button>
      </section>
    </main>
  );
};

export default Delete;
