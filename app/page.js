"use client"

// import Image from "next/image";
import { useState, useEffect } from "react";
import MainSection from "./comps/MainSection/MainSection";
import TopNav from "./comps/TopNav/TopNav";
import SideSection from "./comps/SideSection/SideSection";
import "./page.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [geoData, setGeoData] = useState(null);
  const [isLoadingGeo, setLoadingGeo] = useState(true);
  const date = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [activeDay, setActiveDay] = useState(days[date.getDay()]);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const activeMonth = months[date.getMonth()];
  const activeHour = date.getHours();
  const lat = 52.52;
  const lon = 13.405;
  const apiForecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&hourly=precipitation&hourly=wind_speed_10m&hourly=relativehumidity_2m&hourly=apparent_temperature&hourly=weather_code&daily=weather_code`;
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

  if (isLoading || isLoadingGeo) return <p>Loading...</p>
  if (!data || !geoData) return <p>No data</p>

  return (
    <div id="container">
      <TopNav />
      <div id="sections">
        <MainSection data={data} geoData={geoData} activeDay={activeDay} months={months} activeMonth={activeMonth} activeHour={activeHour} date={date}/>
        <SideSection data={data} activeDay={activeDay} setActiveDay={setActiveDay} />
      </div>
    </div>
  );
}
