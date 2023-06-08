import { NextPage } from "next";
import WebComponent from "components/pages/w/Signup";
import MobileComponent from "components/pages/m/Signup";

interface Props {
  isMobile: boolean;
}

const Signup: NextPage<Props> = ({ isMobile }) => {
  return isMobile ? <MobileComponent /> : <WebComponent />;
};

export default Signup;
