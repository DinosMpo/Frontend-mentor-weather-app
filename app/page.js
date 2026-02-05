"use client"
import { useState, useEffect } from "react";
import MainSection from "./comps/MainSection/MainSection";
import TopNav from "./comps/TopNav/TopNav";
import SideSection from "./comps/SideSection/SideSection";
import Loading from "./comps/Loading/Loading";
import "./page.css";
import "./page.mobile.css";
import NoResult from "./comps/NoResult/NoResult";

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
  const [searchInput, setSearchInput] = useState('');
  const [lat, setLat] = useState('37.98376');
  const [lon, setLon] = useState('23.72784');
  const [name, setName] = useState('Athens');
  const [country, setCountry] = useState('Greece');
  const [retry, setRetry] = useState(false);
  const [noResult, setNoResult] = useState(false);

  const apiForecastUrlMetric = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&wind_speed_unit=${windspeed}&precipitation_unit=${precipitation}&hourly=temperature_2m&hourly=precipitation&hourly=wind_speed_10m&hourly=relativehumidity_2m&hourly=apparent_temperature&hourly=weather_code&daily=weather_code`;
  const apiForecastUrlImperial = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&hourly=temperature_2m&hourly=precipitation&hourly=wind_speed_10m&hourly=relativehumidity_2m&hourly=apparent_temperature&hourly=weather_code&daily=weather_code`;
  const apiGeoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&country=${country}&language=en&format=json`;

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

    fetch(apiGeoUrl)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setGeoData(data)
        setLoadingGeo(false)
      })
  }, [lat, lon, retry])

  useEffect(() => {
    if (retry === true) {
      setRetry(false);
      setLoading(false);
      setLoadingGeo(false);
      console.log('eeeee');
    }
  }, [retry]);

  // if (isLoading && isLoadingGeo) return <Loading />
  if (!dataMetric || !dataImperial || !geoData) return <Loading searchInput={searchInput} />

  return (
    <div id="container">
      <TopNav
        isLoading={isLoading}
        setLoading={setLoading}
        setLoadingGeo={setLoadingGeo}
        imperialOrMetric={imperialOrMetric}
        setImperialOrMetric={setImperialOrMetric}
        temperature={temperature}
        setTemperature={setTemperature}
        windspeed={windspeed}
        setWindspeed={setWindspeed}
        precipitation={precipitation}
        setPrecipitation={setPrecipitation}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setLat={setLat}
        setLon={setLon}
        setRetry={setRetry}
        setName={setName}
        setCountry={setCountry}
        setNoResult={setNoResult}
      />
      {
        isLoading && isLoadingGeo ?
          // <Loading searchInput={searchInput}/>
          ""
          :
          !noResult ?
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
              <SideSection dataMetric={dataMetric} dataImperial={dataImperial} activeDay={activeDay} setActiveDay={setActiveDay} temperature={temperature} />
            </div>
          :
            <NoResult />
      }
    </div>
  );
}
