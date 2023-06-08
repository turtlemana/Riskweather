import { NextPage } from "next";
import WebComponent from "components/pages/w/find/Id";
import MobileComponent from "components/pages/m/find/Id";

interface Props {
  isMobile: boolean;
}

const Id: NextPage<Props> = ({ isMobile }) => {
  return isMobile ? <MobileComponent /> : <WebComponent />;
};

export default Id;
