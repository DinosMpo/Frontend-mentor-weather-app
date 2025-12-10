import TodaysWeather from "../TodaysWeather/TodaysWeather"
import DailyForecast from "../DailyForecast/DailyForecast";
import "./MainSection.css";

export default function MainSection({data, geoData, activeDay, months, activeMonth, activeHour, date }) {
  // console.log("eeee")
  // console.log(geoData)
  return (
    <div className="main-section">
      <TodaysWeather data={data} geoData={geoData} activeDay={activeDay} months={months} activeMonth={activeMonth} activeHour={activeHour} date={date}/>
      <DailyForecast data={data} geoData={geoData}/>
    </div>
  )
}
