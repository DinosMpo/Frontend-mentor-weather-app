import React from 'react'
import "./TodaysWeather.css";

export default function TodaysWeather({geoData}) {
    return (
        <div id="todays-weather-wrapper">
            <div className="todays-weather-container">
                <div id="todays-weather-information">
                    {/* <div id="todays-weather-place">Berlin, Germany</div> */}
                    <div id="todays-weather-place">{`${geoData.results[0].name}, ${geoData.results[0].country}`}</div>
                    <div id="todays-weather-date">Tuesday, Aug 5, 2025</div>
                </div>
                <div className='todays-weather-temperature'>
                    {/* <div>The sun</div> */}
                    <img id='todays-weather-img' src="/icon-sunny.webp" />
                    <div className="todays-temperature">68<span>°</span></div>
                </div>
            </div>

            <div id="todays-weather-details">
                <div className="details">
                    <div className='details-title'>Feels Like</div>
                    <div>64°</div>
                </div>
                <div className="details">
                    <div className='details-title'>Humidity</div>
                    <div>46%</div>
                </div>
                <div className="details">
                    <div className='details-title'>Wind</div>
                    <div>9 mph</div>
                </div>
                <div className="details">
                    <div className='details-title'>Precipitation</div>
                    <div>0 in</div>
                </div>
            </div>
        </div>

    )
}
