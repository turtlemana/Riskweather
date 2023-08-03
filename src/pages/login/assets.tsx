import { NextPage, GetServerSidePropsContext } from "next";
import WebComponent from "components/pages/w/login/Assets";
import MobileComponent from "components/pages/m/login/Assets";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Session, InterestedAssetsList } from "interfaces/login";

interface Props {
  isMobile: boolean;
  interestedAssetsList: InterestedAssetsList[];
  session: Session;
}

const Assets: NextPage<Props> = ({
  session,
  isMobile,
  interestedAssetsList,
}) => {
  return isMobile ? (
    <MobileComponent session={session} interestedList={interestedAssetsList} />
  ) : (
    <WebComponent session={session} interestedList={interestedAssetsList} />
  );
};

export default Assets;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const locale = ctx.locale || ctx.defaultLocale;
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/interestedAssets`);
  const interestedAssetsList = await res.json();

  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: `${process.env.NEXTAUTH_URL}/${locale}/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      interestedAssetsList,
      ...(await serverSideTranslations(locale as string, ["login"])),
    },
  };
}
