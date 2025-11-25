import React from 'react'
import { calculate_weatherCondition } from '@/app/lib/helpers';
import "./TodaysWeather.css";

export default function TodaysWeather({ data, geoData }) {
    const date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const activeDay = days[date.getDay()];
    const activeMonth = months[date.getMonth()];
    const activeHour = date.getHours();

    return (
        <div id="todays-weather-wrapper">
            <div className="todays-weather-container">
                <div id="todays-weather-information">
                    {/* <div id="todays-weather-place">Berlin, Germany</div> */}
                    <div id="todays-weather-place">{`${geoData.results[0].name}, ${geoData.results[0].country}`}</div>
                    {/* <div id="todays-weather-date">Tuesday, Aug 5, 2025</div> */}
                    <div id="todays-weather-date">{`${activeDay}, ${activeMonth} ${date.getDate()}`}</div>
                </div>
                <div className='todays-weather-temperature'>
                    {/* <div>The sun</div> */}
                    <img id='todays-weather-img' src={calculate_weatherCondition(data.hourly.weather_code[activeHour])} />
                    <div className="todays-temperature">{data.hourly.temperature_2m[activeHour]}<span>°</span></div>
                </div>
            </div>

            <div id="todays-weather-details">
                <div className="details">
                    <div className='details-title'>Feels Like</div>
                    <div>{data.hourly.apparent_temperature[activeHour]}°</div>
                </div>
                <div className="details">
                    <div className='details-title'>Humidity</div>
                    <div>{data.hourly.relativehumidity_2m[activeHour]}%</div>
                </div>
                <div className="details">
                    <div className='details-title'>Wind</div>
                    <div>{data.hourly.wind_speed_10m[activeHour]} mph</div>
                </div>
                <div className="details">
                    <div className='details-title'>Precipitation</div>
                    <div>{data.hourly.precipitation[activeHour]} in</div>
                </div>
            </div>
        </div>

    )
}
