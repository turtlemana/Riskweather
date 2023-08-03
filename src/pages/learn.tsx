import { NextPage } from "next";
import WebComponent from "components/pages/w/Learn";
import MobileComponent from "components/pages/m/Learn";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";

interface Props {
  isMobile: boolean;
}

const Learn: NextPage<Props> = ({ isMobile }) => {
  return isMobile ? <MobileComponent /> : <WebComponent />;
};

export default Learn;

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: { ...(await serverSideTranslations(locale as string, ["learn"])) },
  };
}
