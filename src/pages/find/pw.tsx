import { NextPage } from "next";
import WebComponent from "components/pages/w/find/Pw";
import MobileComponent from "components/pages/m/find/Pw";

interface Props {
  isMobile: boolean;
}

const Pw: NextPage<Props> = ({ isMobile }) => {
  return isMobile ? <MobileComponent /> : <WebComponent />;
};

export default Pw;
