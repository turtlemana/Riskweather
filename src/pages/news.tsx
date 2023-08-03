import { NextPage } from "next";
import WebComponent from "components/pages/w/News";
import MobileComponent from "components/pages/m/News";

interface Props {
  isMobile: boolean;
}

const News: NextPage<Props> = ({ isMobile }) => {
  return isMobile ? <MobileComponent /> : <WebComponent />;
};

export default News;
