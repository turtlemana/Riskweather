import { NextPage } from "next";
import WebComponent from "components/pages/w/Explore";
import MobileComponent from "components/pages/m/Explore";

interface Props {
  isMobile: boolean;
}

const Explore: NextPage<Props> = ({ isMobile }) => {
  return isMobile ? <MobileComponent /> : <WebComponent />;
};

export default Explore;
