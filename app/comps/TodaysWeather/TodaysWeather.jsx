import React from 'react'
import "./TodaysWeather.css";

export default function TodaysWeather({data, geoData}) {
    const date = new Date();
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const activeDay = days[date.getDay()-1];
    const activeMonth = months[date.getMonth()];
    const activeHour = date.getHours();

    // sunny 0 1
    // partly cloudy 2
    // overcast 3
    // fog 45, 48
    // drizzle 51 53 55 56 57
    // rain 61 63 65 66 67 80 81 82
    // snow 71 73 75 77 85 86
    // storm 95 96 99

    const calculate_weatherCondition = (data) => {
        if(data == 0 || data == 1) {
            return "/icon-sunny.webp";
        }else if(data == 2) {
            //partly cloudy 2
        }else if(data == 3) {
            //overcast
        }else if(data == 45 || data == 48) {
            //fog
        }else if(data == 51 || data == 53 || data == 55 || data == 56 || data == 57) {
            //drizzle
        }else if(data == 61 ||data == 63 ||data == 65 ||data == 66 ||data == 67 ||data == 80 ||data == 81 ||data == 82) {
            //rain
        }else if(data == 71 ||data == 73 ||data == 75 ||data == 77 ||data == 85 ||data == 86) {
            //snow
        }else if(data == 95 ||data == 96 ||data == 99) {
            //storm
        }
    }

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
                    <img id='todays-weather-img' src="/icon-sunny.webp" />
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
