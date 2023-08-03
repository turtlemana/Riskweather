import { useState,useEffect,useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import arrow from "assets/icons/main/arrow.svg";
import bitcoin from "assets/icons/main/bitcoin.png";
import { COLORS } from "datas/main";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";


const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

  const markers=[
   

    {markerOffset: 0, name: "Washington", country:"United States of America", loc:"United States",koreanLoc:"미국",coordinates: [-87, 38.88333], ticker:"^IXIC" ,countryCode:"us" },
    {markerOffset: 0, name: "Ottawa", country:"Canada",loc:"Canada",koreanLoc:"캐나다",coordinates: [-79.7, 50.41667], ticker:"^GSPTSE", countryCode:"ca" },
    {markerOffset: 0, name: "Canberra", country:"Australia",loc:"Australia",koreanLoc:"호주",coordinates: [137.1333, -27.2667],ticker:"^AXJO" ,countryCode:"au"},

    {markerOffset: 0, name: "Seoul", country:"South Korea", loc:"Korea (South)",koreanLoc:"대한민국", coordinates: [126.9833, 37.55], ticker:"^KS11" ,countryCode:"kr"},
    {markerOffset: 0, name: "Tokyo", country:"Japan", loc:"Japan",koreanLoc:"일본",coordinates: [139.75, 35.6833],ticker:"^N225" ,countryCode:"jp"},
    {markerOffset: 0, name: "Beijing", country:"China", loc:"China" ,koreanLoc:"중국", coordinates: [116.383333, 39.9166666666666],ticker:"399001.SZ" ,countryCode:"cn"},
    {markerOffset: 0, name: "Paris", country:"France", loc:"France" ,koreanLoc:"프랑스",coordinates: [2.333333, 44.8666666666666],ticker:"ENX.PA",countryCode:"fr" },   
    {markerOffset: 0, name: "Brasilia", country:"Brazil", loc:"Brazil" ,koreanLoc:"브라질", coordinates: [-47.8825, -15.7942],ticker:"^BVSP",countryCode:"br"},
    {markerOffset: 0, name: "New Delhi", country:"India", loc:"India" ,koreanLoc:"인도", coordinates: [77.2, 28.6], ticker:"^NSEI",countryCode:"in" },
    {markerOffset: 0, name: "Berlin", country:"Germany",loc:"Germany",koreanLoc:"독일" ,coordinates: [13.4, 52.51667],ticker:"^GDAXI" ,countryCode:"de"},
    {markerOffset: 0, name: "Taipei", country:"Taiwan",loc:"Taiwan",koreanLoc:"대만" ,coordinates: [121.5167, 25.03333] ,ticker:"^TWII",countryCode:"tw"},
    {markerOffset: 0, name: "London", country:"United Kingdom",loc:"United Kingdom" ,koreanLoc:"영국",coordinates: [-0.083333, 51.5],ticker:"^FTSE" ,countryCode:"gb"},
  
    {markerOffset: 0, name: "Madrid", country:"Spain", loc:"Spain" ,koreanLoc:"스페인" ,coordinates: [-3.68333, 40.4],ticker:"^IBEX" ,countryCode:"es"},
    // {markerOffset: 0, name: "Moscow", country:"Russia",loc:"Russian Federation",coordinates: [102.6,65.75],ticker:"IMOEX.ME" ,countryCode:"ru"},
    {markerOffset: 0, name: "Rome", country:"Italy",loc:"Italy" ,koreanLoc:"이탈리아" ,coordinates: [12.483333, 41.9],ticker:"FTSEMIB.MI" ,countryCode:"it"},

    {markerOffset: 0, name: "Amsterdam", country:"Netherlands",loc:"Netherlands" ,koreanLoc:"네덜란드" ,coordinates: [4.916667, 52.35] ,ticker:"^AEX",countryCode:"nl"},
    {markerOffset: 0, name: "Jerusalem", country:"Israel",loc:"Israel" ,koreanLoc:"이스라엘" ,coordinates: [35.23333, 31.76667],ticker:"TASE.TA" ,countryCode:"il"},
    // {markerOffset: 25, name: "Kuwait City", country:"Kuwait",coordinates: [47.96667, 29.36667],ticker:"^FTSE" ,countryCode:"kw"},
    // {markerOffset: 25, name: "Doha", country:"Qatar",coordinates: [51.53333, 25.28333],ticker:"^FTSE" ,countryCode:"qa"},
    {markerOffset: 0, name: "Jakarta", country:"Indonesia",loc:"Indonesia" ,koreanLoc:"인도네시아" ,coordinates: [106.8167, -6.16667],ticker:"^JKSE" ,countryCode:"id"},
    {markerOffset: 0, name: "Helsinki", country:"Finland",loc:"Finland",coordinates: [24.93333, 60.36667],ticker:"^OMXH25" ,countryCode:"fi"},
    {markerOffset: 0, name: "Ankara", country:"Turkey", loc:"Turkey" ,koreanLoc:"튀르키예" ,coordinates: [32.86667, 39.93333],ticker:"XU100.IS" ,countryCode:"tr"},
    {markerOffset: 0, name: "Bangkok", country:"Thailand", loc:"Thailand" ,koreanLoc:"태국" ,coordinates: [100.5167, 13.75],ticker:"^SET.BK" ,countryCode:"th"},
    // {markerOffset: 0, name: "Hong Kong", country:"China", loc:"Hong Kong" ,koreanLoc:"홍콩" ,coordinates: [86.383333, 39.9166666666666],ticker:"^HSI" ,countryCode:"hk"},
    {markerOffset: 0, name: "Manila", country:"Philippines",loc:"Philippines" ,koreanLoc:"필리핀" ,coordinates: [120.9667, 14.6],ticker:"PSEI.PS" ,countryCode:"ph"},
    {markerOffset: 0, name: "Singapore", country:"Singapore", loc:"Singapore",koreanLoc:"싱가폴" ,coordinates: [103.85, 1.283333],ticker:"S68.SI" ,countryCode:"sg"},
    {markerOffset: 0, name: "Mexico City", country:"Mexico",loc:"Mexico" ,koreanLoc:"멕시코",coordinates: [-99.1333, 19.4333],ticker:"BOLSAA.MX" ,countryCode:"mx"},
    // {markerOffset: 0, name: "Bogota", country:"Colombia",loc:"Colombia",coordinates: [-74.0833, 4.6],ticker:"BVC.CL" ,countryCode:"co"},
    {markerOffset: 0, name: "Pretoria", country:"South Africa",loc:"South Africa" ,koreanLoc:"남아프리카 공화국",coordinates: [28.21667, -25.7],ticker:"JSE.JO" ,countryCode:"za"},
]



const sideBarMarkers=[
   

    {markerOffset: 0, name: "Washington", country:"United States of America", loc:"United States" ,koreanLoc:"미국" ,coordinates: [-87, 38.8833], ticker:"^IXIC" ,countryCode:"us" },
    {markerOffset: 0, name: "Ottawa", country:"Canada",loc:"Canada",koreanLoc:"캐나다" ,coordinates: [-75.7, 55.41667], ticker:"^GSPTSE", countryCode:"ca" },
    {markerOffset: 0, name: "Seoul", country:"South Korea", loc:"Korea (South)" ,koreanLoc:"대한민국" , coordinates: [126.9833, 47.55], ticker:"^KS11" ,countryCode:"kr"},
    {markerOffset: 0, name: "Tokyo", country:"Japan", loc:"Japan" ,koreanLoc:"일본" ,coordinates: [139.75, 38.6833],ticker:"^N225" ,countryCode:"jp"},
    {markerOffset: 0, name: "Beijing", country:"China", loc:"China" ,koreanLoc:"중국" , coordinates: [86.383333, 39.9166666666666],ticker:"399001.SZ" ,countryCode:"cn"},
    {markerOffset: 0, name: "Paris", country:"France", loc:"France" ,koreanLoc:"프랑스" ,coordinates: [2.333333, 48.8666666666666],ticker:"ENX.PA",countryCode:"fr" },   
    {markerOffset: 0, name: "Brasilia", country:"Brazil", loc:"Brazil" ,koreanLoc:"브라질" , coordinates: [-47.8825, -15.7942],ticker:"^BVSP",countryCode:"br"},
    {markerOffset: 0, name: "New Delhi", country:"India", loc:"India" ,koreanLoc:"인도" , coordinates: [77.2, 28.6], ticker:"^NSEI",countryCode:"in" },
    {markerOffset: 0, name: "Berlin", country:"Germany",loc:"Germany" ,koreanLoc:"독일" ,coordinates: [13.4, 50.51667],ticker:"^GDAXI" ,countryCode:"de"},
    {markerOffset: 0, name: "Amsterdam", country:"Netherlands",loc:"Netherlands" ,koreanLoc:"네덜란드" ,coordinates: [4.916667, 52.35] ,ticker:"^AEX",countryCode:"nl"},
    {markerOffset: 0, name: "Taipei", country:"Taiwan",loc:"Taiwan" ,koreanLoc:"대만" ,coordinates: [121.5167, 25.03333] ,ticker:"^TWII",countryCode:"tw"},
    {markerOffset: 0, name: "London", country:"United Kingdom",loc:"United Kingdom" ,koreanLoc:"영국" ,coordinates: [-0.083333, 51.5],ticker:"^FTSE" ,countryCode:"gb"},
    {markerOffset: 0, name: "Bern", country:"Switzerland",loc:"Switzerland" ,koreanLoc:"스위스" ,coordinates: [7.466667, 46.91667],ticker:"^SSMI" ,countryCode:"ch"},
    {markerOffset: 0, name: "Brussels", country:"Belgium",loc:"Belgium" ,koreanLoc:"벨기에" ,coordinates: [4.333333, 50.83333],ticker:"^BFX" ,countryCode:"be"},
    {markerOffset: 0, name: "Rome", country:"Italy",loc:"Italy" ,koreanLoc:"이탈리아" ,coordinates: [12.483333, 41.9],ticker:"FTSEMIB.MI" ,countryCode:"it"},
    {markerOffset: 0, name: "Madrid", country:"Spain", loc:"Spain" ,koreanLoc:"스페인" ,coordinates: [-3.68333, 40.4],ticker:"^IBEX" ,countryCode:"es"},
    {markerOffset: 0, name: "Lisbon", country:"Portugal", loc:"Portugal" ,koreanLoc:"포르투갈" ,coordinates: [-9.13333, 38.71667],ticker:"PSI20.LS" ,countryCode:"pt"},
    {markerOffset: 0, name: "Prague", country:"Czech Republic", loc:"Czech Republic" ,koreanLoc:"체코" ,coordinates: [14.46667, 50.08333],ticker:"CEZ.PR" ,countryCode:"cz"},
    {markerOffset: 0, name: "Ankara", country:"Turkey", loc:"Turkey" ,koreanLoc:"튀르키예" ,coordinates: [32.86667, 39.93333],ticker:"XU100.IS" ,countryCode:"tr"},
    // {markerOffset: 25, name: "Warsaw", country:"Poland",coordinates: [21, 52.25],ticker:"^FTSE" ,countryCode:"pl"},
    {markerOffset: 0, name: "Vienna", country:"Austria", loc:"Austria" ,koreanLoc:"오스트리아" ,coordinates: [16.36667, 48.2],ticker:"^ATX" ,countryCode:"at"},
    // {markerOffset: 25, name: "Budapest", country:"Hungary",coordinates: [19.083333, 47.5],ticker:"^FTSE" ,countryCode:"hu"},
    {markerOffset: 0, name: "Athens", country:"Greece", loc:"Greece" ,koreanLoc:"그리스" ,   coordinates: [23.73333, 37.983333],ticker:"EXAE.AT" ,countryCode:"gr"},
    // {markerOffset: 0, name: "Moscow", country:"Russia",loc:"Russian Federation",coordinates: [102.6,65.75],ticker:"IMOEX.ME" ,countryCode:"ru"},
    // {markerOffset: 25, name: "Stockholm", country:"Sweden",coordinates: [18.05, 59.33333],ticker:"^FTSE" ,countryCode:"se"},
    {markerOffset: 0, name: "Oslo", country:"Norway", loc:"Norway" ,koreanLoc:"노르웨이" , coordinates: [10.75, 59.91667],ticker:"OSEBX.OL" ,countryCode:"no"},
    {markerOffset: 0, name: "Copenhagen", country:"Denmark", loc:"Denmark" ,koreanLoc:"덴마크" ,coordinates: [12.58333, 55.66667],ticker:"^OMXC25" ,countryCode:"dk"},
    // {markerOffset: 0, name: "Helsinki", country:"Finland",loc:"Finland",coordinates: [24.93333, 62.16667],ticker:"^OMXH25" ,countryCode:"fi"},
    {markerOffset: 0, name: "Dublin", country:"Ireland",loc:"Ireland" ,koreanLoc:"아일랜드" ,coordinates: [-6.23333, 53.31667],ticker:"^ISEQ" ,countryCode:"ie"},
    {markerOffset: 0, name: "Canberra", country:"Australia",loc:"Australia" ,koreanLoc:"호주" ,coordinates: [137.1333, -27.2667],ticker:"^AXJO" ,countryCode:"au"},
    // {markerOffset: 0, name: "Wellington", country:"New Zealand",loc:"New Zealand",coordinates: [174.7833, -41.3],ticker:"^NZ50" ,countryCode:"nz"},
    // {markerOffset: 25, name: "Riyadh", country:"Saudi Arabia",coordinates: [46.7, 24.65],ticker:"^FTSE" ,countryCode:"sa"},
    // {markerOffset: 25, name: "Abu Dhabi", country:"United Arab Emirates",coordinates: [54.36667,24.46667],ticker:"^FTSE" ,countryCode:"ae"},
    {markerOffset: 0, name: "Jerusalem", country:"Israel",loc:"Israel" ,koreanLoc:"이스라엘" ,coordinates: [35.23333, 31.76667],ticker:"TASE.TA" ,countryCode:"il"},
    // {markerOffset: 25, name: "Kuwait City", country:"Kuwait",coordinates: [47.96667, 29.36667],ticker:"^FTSE" ,countryCode:"kw"},
    // {markerOffset: 25, name: "Doha", country:"Qatar",coordinates: [51.53333, 25.28333],ticker:"^FTSE" ,countryCode:"qa"},
    {markerOffset: 0, name: "Jakarta", country:"Indonesia",loc:"Indonesia" ,koreanLoc:"인도네시아" ,coordinates: [106.8167, -6.16667],ticker:"^JKSE" ,countryCode:"id"},
    {markerOffset: 0, name: "Singapore", country:"Singapore", loc:"Singapore" ,koreanLoc:"싱가폴" ,coordinates: [103.85, 1.283333],ticker:"S68.SI" ,countryCode:"sg"},
    {markerOffset: 0, name: "Bangkok", country:"Thailand", loc:"Thailand" ,koreanLoc:"태국" ,coordinates: [100.5167, 13.75],ticker:"^SET.BK" ,countryCode:"th"},
    {markerOffset: 0, name: "Hong Kong", country:"China", loc:"Hong Kong" ,koreanLoc:"홍콩" ,coordinates: [86.383333, 39.9166666666666],ticker:"^HSI" ,countryCode:"hk"},
    {markerOffset: 0, name: "Manila", country:"Philippines",loc:"Philippines" ,koreanLoc:"필리핀" ,coordinates: [120.9667, 14.6],ticker:"PSEI.PS" ,countryCode:"ph"},
    {markerOffset: 0, name: "Mexico City", country:"Mexico",loc:"Mexico" ,koreanLoc:"멕시코" ,coordinates: [-99.1333, 19.4333],ticker:"BOLSAA.MX" ,countryCode:"mx"},
    // {markerOffset: 25, name: "Lima", country:"Peru",coordinates: [-77.05, -12.05],ticker:"^FTSE" ,countryCode:"pe"},
    // {markerOffset: 0, name: "Bogota", country:"Colombia",loc:"Colombia",coordinates: [-74.0833, 4.6],ticker:"BVC.CL" ,countryCode:"co"},
    // {markerOffset: 25, name: "Santiago", country:"Chile",coordinates: [-70.6667, -33.45],ticker:"^FTSE" ,countryCode:"cl"},
    {markerOffset: 0, name: "Pretoria", country:"South Africa",loc:"South Africa" ,koreanLoc:"남아프리카 공화국" ,coordinates: [28.21667, -25.7],ticker:"JSE.JO" ,countryCode:"za"},
]
const originalMarkers = [...markers];
const originalSideBarMarkers = [...sideBarMarkers];
const Map = ({locData,locValid,mapSelect,setMapSelect,mapIndexData}) => {
  const touchStartPoint = useRef(0);

  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures this runs on mount and unmount only


  const router=useRouter();
  const {t}=useTranslation('map')
  const [isFull, setIsFull]=useState(false)
  const [mapMarkers, setMapMarkers]=useState(markers)
  const [sideMarkers, setSideMarkers]=useState(sideBarMarkers)
  const [isMounted,setIsMounted] = useState(false);
  const [position, setPosition] = useState({ coordinates: [25, 20], zoom: 1.05 ,color:"#EAEAEC"});
  const handleFilter = ({ constructor: { name } }) => {
    return name !== "WheelEvent" && name!=="MouseEvent";
  };



  const [index, setIndex] = useState(0);
  const [modalPage, setModalPage] = useState(1);
  const [data, setData] = useState({
    id: 0,
    name: "",
    image: bitcoin,
    subName: "",
    risk: "",
    maximumLoss: 0,
    weatherIcon: "",
    weather: "",
  });

  const handleImageError = (event,exchange) => {
    if(exchange==="KOSPI"){
      event.target.src='/images/logos/KOSPI.svg'
  } else if (exchange==="KOSDAQ"){
    event.target.src='/images/logos/KOSDAQ.svg'
  }
  else{
    event.target.src = '/images/logos/errorLogo.png'; // 기본 이미지로 설정
  }};



  useEffect(() => {
    setIsMounted(true);
    
    const updatedMarkers = markers.map(marker => {
      const matchedData = mapIndexData.find(data => data.ticker === marker.ticker);
      return matchedData ? {...marker, ...matchedData} : null;
    }).filter(Boolean); 
  
    const updatedSideBarMarkers = sideBarMarkers.map(marker => {
      const matchedData = mapIndexData.find(data => data.ticker === marker.ticker);
      return matchedData ? {...marker, ...matchedData} : null;
    }).filter(Boolean);  
  
    setMapMarkers(updatedMarkers);
    setSideMarkers(updatedSideBarMarkers);
  }, [mapIndexData]);
  const handleGoBack = () => {
    setMapSelect("");
    setPosition({ coordinates: [35, 10], zoom: 1, color: "#EAEAEC" });

    const indexDataMap = {};
    mapIndexData.forEach(data => {
        indexDataMap[data.ticker] = data;
    });

    const updatedMarkers = originalMarkers.map(marker => {
      const matchedData = indexDataMap[marker.ticker];
      return matchedData ? {...marker, ...matchedData} : null;
    }).filter(Boolean);
  
    const updatedSideBarMarkers = originalSideBarMarkers.map(marker => {
      const matchedData = indexDataMap[marker.ticker];
      return matchedData ? {...marker, ...matchedData} : null;
    }).filter(Boolean);
  
    setMapMarkers(updatedMarkers);
    setSideMarkers(updatedSideBarMarkers);
}


  return (
    <main className={`${locValid ? "bg-white " : "bg-mapBg " } ${windowHeight>=1024 ? "h-[865px] " : "h-[665px] "}  relative min-w-[360px] `}>
              <div className={(`max-w-1320 w-full ${windowHeight>=1024 ? "h-[490px] " : "h-[290px] "} mx-auto bg-white flex  overflow-hidden `) + (locValid ? `items-center` : ``)}>
              <div className={`overflow-auto w-full h-full bg-[#AFD5F0]`}>

      <ComposableMap className={`w-full h-full m-auto`} projectionConfig={{}} projection={"geoMercator"}  >
    <ZoomableGroup center={position.coordinates} zoom={position.zoom}       
 filterZoomEvent={handleFilter} translateExtent={[[0,0],[900,500]]}>
<Geographies geography={geoUrl}>
{({ geographies }) =>
  geographies.map((geo) => {
    const country=geo.properties.name

    return(
    <Geography
      key={geo.rsmKey}
      geography={geo}
    fill={country==position.name ? "#1E3F66": "#FFFEFC"}
      stroke="#AFD5F0"
      style={{
       default: {
         outline: "none",
       },
       hover: {
         outline: "none",
       },
       pressed: {
         outline: "none",
       },
     }}

    />)
})
}
</Geographies>

{sideMarkers.length>=2  
 ? 
mapMarkers.map(({ name, coordinates,country,assetName,loc,countryCode, ticker,markerOffset,risk,maxLoss,weather,weatherExplain },i) => (

(<Marker key={i} coordinates={coordinates}  >
 
                                  <g             onClick={()=>{setMapSelect(loc);setSideMarkers((marker)=>(marker.filter(country=>country.name==name)));setPosition((pos)=>({...pos,zoom:5,coordinates: coordinates, name:country}))}} className={`cursor-pointer w-full relative z-20 font-semibold  items-center bg-[#FFFFFF] border p-3 rounded-2xl flex text-[5px] opacity-100 justify-center`}
            stroke="#0198FF"
            strokeWidth="2"
           
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -23)">


              
                <path fill="#0198FF" d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                <circle cx="12" cy="10"  r="4" fill="#FFFFFF" />

                
  </g>


    
</Marker>)))
 : sideMarkers.map(({ name,assetKrName,EXP_CVaRNTS, exchg,coordinates,country,assetName,loc,koreanLoc,countryCode, ticker,markerOffset,risk,maxLoss,weather,weatherExplain,koreanWeatherExplain, koreanRisk },i) => (

  (<Marker key={i} coordinates={coordinates}  >

 <svg viewBox="450 -0 2700 2700">
 <foreignObject  width="350" height="500">


<main className="bg-white mr-6 p-5 justify-center items-center cursor-pointer rounded-20 min-w-[296px] max-h-[180px] shadow-[0_0_12px_0_rgba(121,120,132,0.15)]" onClick={()=>{router.push({pathname:`/detail/${ticker}`})}}>
      <section className="flex gap-3 items-center mb-3" >
        <div className={'w-10 h-auto '}>
        <Image loading="eager" unoptimized  width={50} height={50} quality={100} onError={(event)=>handleImageError(event,exchg)} src={`/images/logos/${ticker}.png` || ""} alt="" className="h-10 w-10 mr-3 "/>        </div>
        <article className="flex-1  ">
          <h6 className="mb-1 text-md truncate w-[120px] ">{router.locale=="ko" ? assetKrName : assetName}</h6>
          <p className="text-xs text-gray-500 ">{ticker}</p>
        </article>
        <div className={`py-1 px-3 items-center justify-center rounded-20 text-center ${COLORS[risk]}`}>
          <h6 className="text-sm h-3.5">{router.locale=="ko" ? koreanRisk : risk}</h6>
        </div>
      </section>
      <section className="flex pt-3 justify-between mb-4">
        <p className="text-sm text-gray-500">{t('tableLoss')}</p>
        <h6 className="text-[#DF1525]">-{EXP_CVaRNTS.toFixed(2)}%</h6>
      </section>
      <section className="text-center flex items-center justify-between bg-gray-100 rounded-20 pl-3 pr-4">
        <Image loading="eager" src={`/images/weather/${weather}.svg`} alt="" width={0} height={0} sizes="100vw" className="w-9 h-auto"  />
        <p className="text-xs font-medium">{router.locale=="ko" ? koreanWeatherExplain : weatherExplain}</p>
      </section>
    </main>

</foreignObject>
</svg>
</Marker>)))}
 




</ZoomableGroup>
</ComposableMap>
</div>

</div>
     
                  <div 
               
       
                  className={`absolute bg-white  ${isFull ? 'fixed top-0 left-0 w-full h-full z-50 ' : 'max-h-[375px] '}   overflow-scroll justify-center items-center w-full shadow-[4px_0_16px_0_rgba(121,120,132,0.15)] rounded-[30px_30px_0_0]`}>
                  {locData.length>=1 ?
                  
                  <div 

                  
                  className="flex justify-between sticky top-[0px] bg-white items-center py-4 px-5 text-sm border-b border-gray-100">

             <div className={'flex'}
                onClick={handleGoBack}
              > 
              <Image
                src={arrow}
                alt=""
                className="rotate-180 w-5 cursor-pointer mr-1 mb-[2px] "
              />
              <p className="flex-1 text-gray-900">{t('goBack')}</p>
              </div>
              {!isFull ?   <Image
              onClick={()=>setIsFull(true)}
              src={arrow}
                alt=""
                className=" w-5 -rotate-90 cursor-pointer mr-1 mb-[2px] "
              /> :   
              <Image
              onClick={()=>setIsFull(false)}
              src={arrow}
                alt=""
                className=" w-5 rotate-90 cursor-pointer mr-1 mb-[2px] "
              />}
              
 
            </div>  : 
            (!isFull) ?  <div 
                 
            className={` flex justify-between sticky top-[0px] bg-white items-center py-4 px-5 text-sm border-b border-gray-100`}>
        <p><span className={'text-blue-600 text-bold '}>{sideMarkers?.length}</span> {router.locale=="ko" ? "국가" : "Countries"}</p>
        <Image
        onClick={()=>setIsFull(true)}
        src={arrow}
          alt=""
          className=" w-5 -rotate-90 cursor-pointer mr-1 mb-[2px] "
        />
        
        

      </div>
    : 
    <div 
           
            className={` flex justify-between sticky top-[0px] bg-white items-center py-4 px-5 text-sm border-b border-gray-100`}>
                <p><span className={'text-blue-600 text-bold '}>{sideMarkers?.length}</span> {router.locale=="ko" ? "국가" : "Countries"}</p>

        <Image
        onClick={()=>setIsFull(false)}
        src={arrow}
          alt=""
          className=" w-5 rotate-90 cursor-pointer mr-1 mb-[2px] "
        />
        
        

      </div>  }
       
          {
          locData.length<1 &&!locValid ? 
          sideMarkers.map(({exchg, loc,koreanLoc,countryCode,name,country,coordinates,risk,weather,weatherExplain, koreanWeatherExplain, koreanRisk},i) => (
            <section
    
              key={i}
              className="flex p-5 border-t border-gray-100 justify-between items-center bg-white"
              onClick={() => {
                setIsFull(false);
                setMapSelect(loc);
                setSideMarkers((marker)=>(marker.filter(country=>country.name==name)));
                setPosition((pos)=>({...pos,zoom:5,coordinates:coordinates, name:country}))
              }}
            >
                  <Image unoptimized onError={(event)=>{handleImageError(event,exchg)}} width={0} height={0} className={'w-10   h-auto '} alt="flags" src={`/images/flags/${countryCode}.png`}/>
                <p className={'text-sm truncate font-semibold w-[80px]'}>{router.locale=="ko" ? koreanLoc : loc}</p>
              <div className={`py-1 px-2 rounded-20 ${COLORS[risk]} `}>
                <h6 className="text-xs">{router.locale=="ko" ? koreanRisk : risk}</h6>
              </div>
              <Image loading="eager" className={'mr-5 '} width={25} height={25} src={`/images/weather/${weather}.svg`} alt={`${weather}`} />
            </section>
          )) : 
          locValid ?
          <div className={'flex justify-center items-center'}>
          <svg aria-hidden="true" className="w-12 h-12 relative  text-gray-200 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          </div>

          :  
                   
          
          locData.map(({ITEM_CD_DL,EXP_CVaRNTS,ITEM_ENG_NM,ITEM_KR_NM,HR_ITEM_NM,WTHR_ENG_DL,WTHR_ENG_NM,CVaRNTS,CVaR_LV,CVaR_LV_KR, WTHR_KR_DL},i)=> 
       
          <section  key={i}  onClick={()=>{setIsFull(false);setSideMarkers((prev)=>[{...prev[0],exchg:HR_ITEM_NM,assetKrName:ITEM_KR_NM,assetName:ITEM_ENG_NM, ticker:ITEM_CD_DL, weather:WTHR_ENG_NM, weatherExplain:WTHR_ENG_DL, koreanWeatherExplain:WTHR_KR_DL, koreanRisk: CVaR_LV_KR, risk:CVaR_LV, maxLoss:CVaRNTS, EXP_CVaRNTS:EXP_CVaRNTS}])}}>
          
            

            <article className="flex-1 py-4 px-5 bg-white">
              <section className="flex items-start mb-3">
              <Image loading="eager" unoptimized  width={50} height={50} quality={100} onError={(event)=>handleImageError(event,HR_ITEM_NM)} src={`/images/logos/${ITEM_CD_DL}.png` || ""} alt="" className="h-10 w-10 mr-3 items-center "/>                <div className="flex-1">
                  <h6 className={'w-[180px] truncate'}>{router.locale=="ko" ? ITEM_KR_NM : ITEM_ENG_NM}</h6>
                  <p className="text-gray-500 text-xs">{ITEM_CD_DL}</p>
                </div>
                <div className={`py-1 px-3 rounded-20 ${COLORS[CVaR_LV]}`}>
                  <h6 className="text-xs">{router.locale=="ko" ? CVaR_LV_KR : CVaR_LV}</h6>
                </div>
              </section>
              <section className="bg-gray-100 rounded-20 py-2 px-3 flex items-center h-8 text-medium text-xs ">
                <p className="text-gray-400 mr-1.5">{t('tableLoss')}</p>
                <p className="text-[#DF1525] flex-1">-{EXP_CVaRNTS?.toFixed(2)}%</p>
                <Image
                loading="eager"
                  src={`/images/weather/${WTHR_ENG_NM}.svg`}
                  alt=""
                  className="mr-1.5 w-6 h-6"
                  width={0}
                  height={0}
                />
                <p className="text-gray-600 font-medium">{router.locale=="ko"? WTHR_KR_DL : WTHR_ENG_DL}</p>
              </section>
            </article>
          </section>)
     }
          </div>

    </main>
  );
};

export default Map;
