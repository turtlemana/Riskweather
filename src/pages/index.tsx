import { NextPage } from "next";
import WebComponent from "components/pages/w/Main";
import MobileComponent from "components/pages/m/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import { IndexData } from "interfaces/main";

interface Props {
  isMobile: boolean;
  indexData: IndexData[];
}

const Main: NextPage<Props> = ({ isMobile, indexData }) => {
  return isMobile ? (
    <MobileComponent />
  ) : (
    <WebComponent indexData={indexData} />
  );
};

export default Main;

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/mapIndex`);
  const indexData = await res.json();

  return {
    props: {
      indexData,
      ...(await serverSideTranslations(locale as string, ["index"])),
    },
  };
}
