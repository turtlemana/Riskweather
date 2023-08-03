import { NextPage } from "next";
import WebComponent from "components/pages/w/Membership";
import MobileComponent from "components/pages/m/Membership";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { Session } from "interfaces/login";

interface Props {
  isMobile: boolean;
  session: Session;
}

const Membership: NextPage<Props> = ({ isMobile, session }) => {
  return isMobile ? (
    <MobileComponent session={session} />
  ) : (
    <WebComponent session={session} />
  );
};

export default Membership;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const locale = ctx.locale || ctx.defaultLocale;

  const session: Session | null = await getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  console.log(session);

  if (session && session.user.accessLevel == 1) {
    return {
      redirect: {
        destination: `${process.env.NEXTAUTH_URL}/${locale}/login/assets`,
        permanent: false,
      },
    };
  }

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
      ...(await serverSideTranslations(locale as string, ["membership"])),
    },
  };
}
