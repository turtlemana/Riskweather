import { ReactNode,useState,useEffect,useCallback } from "react";
import { useRouter } from "next/router";
import TopBar from "components/layouts/TopBar";
import Footer from "components/layouts/Footer";
import MobileTopBar from "components/layouts/m/TopBar";
import MobileFooter from "components/layouts/m/Footer";
import axios from 'axios'
import useSWR from 'swr'

interface Props {
  isMobile: boolean;
  children?: ReactNode;
}
const fetcher = (url:string) => axios.get(url).then((res) => res.data)


const Layout = ({ isMobile, children }: Props) => {
  const [search,setSearch]=useState("")
  const router=useRouter()

  const {data}=useSWR(search ? `/api/headerSearch?search=${search}` : null,fetcher)
  const {data:topRiskData, isValidating:topRiskValid,mutate:topRiskMutate}=useSWR(`/api/topRwRisk`,fetcher)
  const searchList=data?[].concat(...data) : [];
  const topRiskList=topRiskData?[].concat(...topRiskData) : [];
  
  const onSearch=useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
    const query=e?.target?.value
    if(query?.length>20){return;}
    setSearch(query)
  },[])
  useEffect(()=>{  
    router.events.on('routeChangeStart', ()=>{setSearch("")})
},[router.events])


  return (
    <>
      {isMobile ? (
        <>
          <MobileTopBar  topRisk={topRiskList} search={search} onSearch={onSearch} searchList={searchList}/>
          <div className="mt-16">{children}</div>
          <MobileFooter />
        </>
      ) : (
        <>
          <TopBar topRisk={topRiskList} search={search} onSearch={onSearch} searchList={searchList} />
          <div>{children}</div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
