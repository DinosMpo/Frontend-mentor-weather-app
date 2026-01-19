import TodaysWeather from "../TodaysWeather/TodaysWeather"
import DailyForecast from "../DailyForecast/DailyForecast";
import "./MainSection.css";

export default function MainSection({ dataMetric, dataImperial, geoData, activeDay, months, activeMonth, activeHour, date, temperature, windspeed, precipitation }) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const newDays = days.slice(date.getDay()).concat(days.slice(0, date.getDay()));

  const detailOfDays = {
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": [],
    "Sunday": [],
  }

  const dataOfDays = () => {
    //for every day of the week starting by today
    for (let i = 0; i < newDays.length; i++) {
      let hourCounter = 0;
      let pmOrAm = 'AM';
      let date = dataMetric.daily.time[i];

      for (let y = (0 + (i * 23)); y <= (23 + (i * 23)); y++) {
        detailOfDays[newDays[i]].push({
          hour: `${hourCounter} ${pmOrAm}`,
          degree_celsius: dataMetric.hourly.temperature_2m[y],
          degree_fahrenheit: dataImperial.hourly.temperature_2m[y],
          img: dataMetric.hourly.weather_code[y],
          day: date.substr(date.lastIndexOf("-") + 1, 2),
          month: date.substr(date.indexOf('-') + 1, 2),
          year: date.substr(0, date.indexOf("-")),
          feelsLike_celsius: dataMetric.hourly.apparent_temperature[y],
          feelsLike_fahrenheit: dataImperial.hourly.apparent_temperature[y],
          humidity: dataMetric.hourly.relativehumidity_2m[y],
          wind_kmh: dataMetric.hourly.wind_speed_10m[y],
          wind_mph: dataImperial.hourly.wind_speed_10m[y],
          precipitation_mm: dataMetric.hourly.precipitation[y],
          precipitation_inch: dataImperial.hourly.precipitation[y],
          weather_code: dataMetric.hourly.weather_code[y]
        });

        if (hourCounter == 12 && pmOrAm == 'AM') {
          hourCounter = 1;
          pmOrAm = 'PM';
        } else if (hourCounter == 11 && pmOrAm == 'AM') {
          hourCounter++;
          pmOrAm = 'PM';
        } else {
          hourCounter++;
        }
      }
    }
  };

  dataOfDays();

  return (
    <div className="main-section">
      <TodaysWeather
        detailOfDays={detailOfDays}
        geoData={geoData}
        activeDay={activeDay}
        months={months}
        activeMonth={activeMonth}
        activeHour={activeHour}
        date={date}
        temperature={temperature}
        windspeed={windspeed}
        precipitation={precipitation}
      />
      <DailyForecast dataMetric={dataMetric} dataImperial={dataImperial} temperature={temperature} />
    </div>
  )
}
