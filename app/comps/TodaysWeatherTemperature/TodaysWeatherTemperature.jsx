import React from 'react'
import "./TodaysWeatherTemperature.css";

export default function TodaysWeatherTemperature({data, activeHour}) {
    const temperature = data.hourly.temperature_2m[activeHour];
    return (
        <div className='todays-weather-temperature'>
            <img id='todays-weather-img' src="/icon-sunny.webp" />
            <div className="todays-temperature">{temperature}<span>°</span></div>
        </div>
    )
}
