import Header from "components/templates/learn/Hearder";
import WeatherCard from "components/templates/learn/WeatherCard";
import RisksImportance from "components/templates/learn/RisksImportance";
import Risk from "components/templates/learn/Risk";
import Model from "components/templates/learn/Model";
import Info from "components/templates/learn/Info";
import RiskInfo from "components/templates/learn/RiskInfo";
import Portfolio from "components/templates/learn/Portfolio";
import Profile from "components/templates/learn/Profile";

const Learn = () => {
  return (
    <main className={"min-w-[1024px]"}>
      <Header />
      <WeatherCard />
      <RisksImportance />
      <Risk />
      <Model />
      <Info />
      <RiskInfo />
      <Portfolio />
      <Profile />
    </main>
  );
};

export default Learn;
