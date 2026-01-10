"use client"
import { useState, useEffect } from "react";
import MainSection from "./comps/MainSection/MainSection";
import TopNav from "./comps/TopNav/TopNav";
import SideSection from "./comps/SideSection/SideSection";
import "./page.css";

export default function Home() {
  const [dataMetric, setDataMetric] = useState(null);
  const [dataImperial, setDataImperial] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [geoData, setGeoData] = useState(null);
  const [isLoadingGeo, setLoadingGeo] = useState(true);
  const [imperialOrMetric, setImperialOrMetric] = useState('metric');
  const [temperature, setTemperature] = useState('celsius');
  const [windspeed, setWindspeed] = useState('kmh');
  const [precipitation, setPrecipitation] = useState('mm');
  const date = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [activeDay, setActiveDay] = useState(days[date.getDay()]);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const activeMonth = months[date.getMonth()];
  const activeHour = date.getHours();
  const lat = 52.52;
  const lon = 13.405;
  const apiForecastUrlMetric = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&wind_speed_unit=${windspeed}&precipitation_unit=${precipitation}&hourly=temperature_2m&hourly=precipitation&hourly=wind_speed_10m&hourly=relativehumidity_2m&hourly=apparent_temperature&hourly=weather_code&daily=weather_code`;
  const apiForecastUrlImperial = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&hourly=temperature_2m&hourly=precipitation&hourly=wind_speed_10m&hourly=relativehumidity_2m&hourly=apparent_temperature&hourly=weather_code&daily=weather_code`;
  const apiGeotUrl = `https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=1&language=en&format=json`;

  useEffect(() => {
    fetch(apiForecastUrlMetric)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setDataMetric(data)
        setLoading(false)
      })

    fetch(apiForecastUrlImperial)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setDataImperial(data)
        setLoading(false)
      })

    fetch(apiGeotUrl)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setGeoData(data)
        setLoadingGeo(false)
      })
  }, [])

  if (isLoading || isLoadingGeo) return <p>Loading...</p>
  if (!dataMetric || !dataImperial || !geoData) return <p>No data</p>

  return (
    <div id="container">
      <TopNav
        imperialOrMetric={imperialOrMetric}
        setImperialOrMetric={setImperialOrMetric}
        temperature={temperature}
        setTemperature={setTemperature}
        windspeed={windspeed}
        setWindspeed={setWindspeed}
        precipitation={precipitation}
        setPrecipitation={setPrecipitation}
      />
      <div id="sections">
        <MainSection
          dataMetric={dataMetric}
          dataImperial={dataImperial}
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
        <SideSection dataMetric={dataMetric} dataImperial={dataImperial} activeDay={activeDay} setActiveDay={setActiveDay} />
      </div>
    </div>
  );
}
