import { NextPage } from "next";
import WebComponent from "components/pages/w/Policy";
import MobileComponent from "components/pages/m/Policy";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";

interface Props {
  isMobile: boolean;
}

const Policy: NextPage<Props> = ({ isMobile }) => {
  return isMobile ? <MobileComponent /> : <WebComponent />;
};

export default Policy;

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: { ...(await serverSideTranslations(locale as string, ["policy"])) },
  };
}
