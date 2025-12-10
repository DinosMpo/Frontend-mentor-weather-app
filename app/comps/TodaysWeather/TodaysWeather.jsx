import { act, useState } from 'react'
import { calculate_weatherCondition } from '@/app/lib/helpers';
import "./TodaysWeather.css";

export default function TodaysWeather({ data, geoData, activeDay, months, activeMonth, activeHour, date }) {
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
            let date = data.daily.time[i];

            for (let y = (0 + (i * 23)); y <= (23 + (i * 23)); y++) {
                detailOfDays[newDays[i]].push({
                    hour: `${hourCounter} ${pmOrAm}`,
                    degree: data.hourly.temperature_2m[y],
                    img: data.hourly.weather_code[y],
                    day: date.substr(date.lastIndexOf("-")+1, 2),
                    month: date.substr(date.indexOf('-')+1, 2),
                    year: date.substr(0, date.indexOf("-")),
                    feelsLike: data.hourly.apparent_temperature[y],
                    humidity: data.hourly.relativehumidity_2m[y],
                    wind: data.hourly.wind_speed_10m[y],
                    precipitation: data.hourly.precipitation[y],
                    weather_code: data.hourly.weather_code[y]
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
            // console.log(detailOfDays);
        }
    };

    dataOfDays();
    // console.log(detailOfDays[activeDay][activeHour].date);
    console.log("months");
    console.log(months);
    console.log("activeMonth");
    console.log(detailOfDays);

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
                    <div className="todays-temperature">{detailOfDays[activeDay][activeHour].degree}<span>°</span></div>
                </div>
            </div>

            <div id="todays-weather-details">
                <div className="details">
                    <div className='details-title'>Feels Like</div>
                    {/* <div>{data.hourly.apparent_temperature[activeHour]}°</div> */}
                    <div>{detailOfDays[activeDay][activeHour].feelsLike}°</div>
                </div>
                <div className="details">
                    <div className='details-title'>Humidity</div>
                    {/* <div>{data.hourly.relativehumidity_2m[activeHour]}%</div> */}
                    <div>{detailOfDays[activeDay][activeHour].humidity}%</div>
                </div>
                <div className="details">
                    <div className='details-title'>Wind</div>
                    {/* <div>{data.hourly.wind_speed_10m[activeHour]} mph</div> */}
                    <div>{detailOfDays[activeDay][activeHour].wind} mph</div>
                </div>
                <div className="details">
                    <div className='details-title'>Precipitation</div>
                    {/* <div>{data.hourly.precipitation[activeHour]} in</div> */}
                    <div>{detailOfDays[activeDay][activeHour].precipitation} in</div>
                </div>
            </div>
        </div>

    )
}
