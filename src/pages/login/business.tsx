import { NextPage } from "next";
import WebComponent from "components/pages/w/login/Business";
import MobileComponent from "components/pages/m/login/Business";

interface Props {
  isMobile: boolean;
}

const Business: NextPage<Props> = ({ isMobile }) => {
  return isMobile ? <MobileComponent /> : <WebComponent />;
};

export default Business;
