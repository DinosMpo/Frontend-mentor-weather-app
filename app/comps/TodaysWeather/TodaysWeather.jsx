import { useState } from 'react'
import { calculate_weatherCondition } from '@/app/lib/helpers';
import "./TodaysWeather.css";

export default function TodaysWeather({ detailOfDays, geoData, activeDay, months, activeHour, temperature, windspeed, precipitation }) {
    return (
        <div id="todays-weather-wrapper">
            <div className="todays-weather-container">
                <div id="todays-weather-information">
                    {/* <div id="todays-weather-place">Berlin, Germany</div> */}
                    <div id="todays-weather-place">{`${geoData.results[0].name}, ${geoData.results[0].country}`}</div>
                    {/* <div id="todays-weather-date">Tuesday, Aug 5, 2025</div> */}
                    {/* <div id="todays-weather-date">{`${activeDay}, ${activeMonth} ${date.getDate()}, ${date.getFullYear()}`}</div> */}
                    <div id="todays-weather-date">{`${activeDay}, ${months[detailOfDays[activeDay][activeHour].month-1]} ${detailOfDays[activeDay][activeHour].day}, ${detailOfDays[activeDay][activeHour].year}`}</div>
                </div>
                <div className='todays-weather-temperature'>
                    {/* <div>The sun</div> */}
                    <img id='todays-weather-img' src={calculate_weatherCondition(detailOfDays[activeDay][activeHour].weather_code)} />
                    {/* <img id='todays-weather-img' src={calculate_weatherCondition(data.hourly.weather_code[activeHour])} /> */}
                    {/* <div className="todays-temperature">{data.hourly.temperature_2m[activeHour]}<span>°</span></div> */}
                    {/* allagh apo celsius se fahrenheit */}
                    <div className="todays-temperature">{temperature == 'celsius' ? detailOfDays[activeDay][activeHour].degree_celsius : detailOfDays[activeDay][activeHour].degree_fahrenheit}<span>°</span></div>
                </div>
            </div>

            <div id="todays-weather-details">
                <div className="details">
                    <div className='details-title'>Feels Like</div>
                    {/* <div>{data.hourly.apparent_temperature[activeHour]}°</div> */}
                    <div>{temperature == 'celsius' ? detailOfDays[activeDay][activeHour].feelsLike_celsius : detailOfDays[activeDay][activeHour].feelsLike_fahrenheit}°</div>
                </div>
                <div className="details">
                    <div className='details-title'>Humidity</div>
                    {/* <div>{data.hourly.relativehumidity_2m[activeHour]}%</div> */}
                    <div>{detailOfDays[activeDay][activeHour].humidity}%</div>
                </div>
                <div className="details">
                    <div className='details-title'>Wind</div>
                    {/* <div>{data.hourly.wind_speed_10m[activeHour]} mph</div> */}
                    <div>{windspeed == 'kmh' ? `${detailOfDays[activeDay][activeHour].wind_kmh} km/h` : `${detailOfDays[activeDay][activeHour].wind_mph} mph`}</div>
                </div>
                <div className="details">
                    <div className='details-title'>Precipitation</div>
                    {/* <div>{data.hourly.precipitation[activeHour]} in</div> */}
                    <div>{precipitation == 'mm' ? `${detailOfDays[activeDay][activeHour].precipitation_mm} mm` : `${detailOfDays[activeDay][activeHour].precipitation_inch} in`}</div>
                </div>
            </div>
        </div>
    )
}
