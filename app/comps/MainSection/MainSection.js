import TodaysWeather from "../TodaysWeather/TodaysWeather"
import DailyForecast from "../DailyForecast/DailyForecast";
import "./MainSection.css";

export default function MainSection({data, geoData}) {
  // console.log("eeee")
  // console.log(geoData)
  return (
    <div className="main-section">
      <TodaysWeather data={data} geoData={geoData}/>
      <DailyForecast data={data} geoData={geoData}/>
    </div>
  )
}
