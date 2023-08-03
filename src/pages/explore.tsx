import { NextPage } from "next";
import WebComponent from "components/pages/w/Explore";
import MobileComponent from "components/pages/m/Explore";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";

interface Props {
  isMobile: boolean;
}

const Explore: NextPage<Props> = ({ isMobile }) => {
  return isMobile ? <MobileComponent /> : <WebComponent />;
};

export default Explore;

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: { ...(await serverSideTranslations(locale as string, ["explore"])) },
  };
}
