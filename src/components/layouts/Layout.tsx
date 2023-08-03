import { ReactNode, useState } from "react";
import TopBar from "components/layouts/TopBar";
import Footer from "components/layouts/Footer";
import MobileTopBar from "components/layouts/m/TopBar";
import MobileFooter from "components/layouts/m/Footer";

interface Props {
  isMobile: boolean;
  children?: ReactNode;
}

const Layout = ({ isMobile, children }: Props) => {
  return (
    <>
      {isMobile ? (
        <>
          <MobileTopBar />
          <div className="mt-16">{children}</div>
          <MobileFooter />
        </>
      ) : (
        <>
          <TopBar />
          <div>{children}</div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
