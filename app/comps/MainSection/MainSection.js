import TodaysWeather from "../TodaysWeather/TodaysWeather"
import DailyForecast from "../DailyForecast/DailyForecast";
import "./MainSection.css";

export default function MainSection({geoData}) {
  console.log("eeee")
  console.log(geoData)
  return (
    <div className="main-section">
      <TodaysWeather geoData={geoData}/>
      <DailyForecast />
    </div>
  )
}
