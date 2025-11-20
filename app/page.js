"use client"

// import Image from "next/image";
import { useState, useEffect} from "react";
import MainSection from "./comps/MainSection/MainSection";
import TopNav from "./comps/TopNav/TopNav";
import SideSection from "./comps/SideSection/SideSection";
import "./page.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [geoData, setGeoData] = useState(null);
  const [isLoadingGeo, setLoadingGeo] = useState(true);
  const lat = 52.52;
  const lon = 13.405;
  const apiForecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&hourly=precipitation&hourly=wind_speed_10m&hourly=relativehumidity_2m&hourly=apparent_temperature&hourly=weather_code`;
  const apiGeotUrl = `https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=1&language=en&format=json`;

  useEffect(() => {
    fetch(apiForecastUrl)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      setData(data)
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

  const days = [
    {
      day: 'Tue',
      img: '',
      high_temp: '68',
      low_temp: '57'
    },
    {
      day: 'Wed',
      img: '',
      high_temp: '70',
      low_temp: '59'
    },
    {
      day: 'Thu',
      img: '',
      high_temp: '75',
      low_temp: '57'
    },
    {
      day: 'Fri',
      img: '',
      high_temp: '77',
      low_temp: '55'
    },
    {
      day: 'Sat',
      img: '',
      high_temp: '70',
      low_temp: '59'
    },
    {
      day: 'Sun',
      img: '',
      high_temp: '77',
      low_temp: '61'
    },
    {
      day: 'Mon',
      img: '',
      high_temp: '75',
      low_temp: '59'
    }
  ];

  const listOfDays = days.map((day, key) => {
    return (
      <div className="day">
        <div className="day-name">{day.day}</div>
        <div className="weather-img">{day.img}</div>
        <div className="days-temperatures">
          <div className="high-temperature">{day.high_temp}</div>
          <div className="low-temperature">{day.low_temp}</div>
        </div>
      </div>
    );
  });

  if (isLoading || isLoadingGeo) return <p>Loading...</p>
  if (!data || !geoData) return <p>No data</p>

  return (
    <div id="container">
      <TopNav />
      <div id="sections">
        <MainSection data={data} geoData={geoData}/>
        <SideSection />
      </div>
    </div>
  );
}
