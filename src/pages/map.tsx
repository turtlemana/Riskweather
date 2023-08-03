import { NextPage } from "next";
import MobileComponent from "components/pages/m/Map";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import { IndexData } from "interfaces/main";

interface Props {
  isMobile: boolean;
  indexData: IndexData[];
}
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Map: NextPage<Props> = ({ isMobile, indexData }) => {
  const [mapSelect, setMapSelect] = useState("");
  const { data: locDt, isValidating: locValid } = useSWR(
    mapSelect ? `/api/mapResult?mapSelect=${mapSelect}` : null,
    fetcher
  );
  const locData = locDt ? [].concat(...locDt) : [];

  return isMobile ? (
    <MobileComponent
      mapIndexData={indexData}
      locData={locData}
      locValid={locValid}
      mapSelect={mapSelect}
      setMapSelect={setMapSelect}
    />
  ) : (
    <div></div>
  );
};

export default Map;

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  // const res = await axios.get(`http://localhost:8000`)
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/mapIndex`);
  // const data=JSON.stringify(res)
  const indexData = await res.json();

  return {
    props: {
      indexData,
      ...(await serverSideTranslations(locale as string, ["map"])),
    },
  };
}
