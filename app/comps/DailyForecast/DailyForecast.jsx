import React from 'react'
import { calculate_weatherCondition } from '@/app/lib/helpers';
import "./DailyForecast.css";

export default function DailyForecast({ dataMetric, geoData }) {
    const date = new Date();
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    days = days.slice(date.getDay() - 1).concat(days.slice(0, date.getDay() - 1));
    const activeDay = date.getDay();

    const maxTemp = (dataMetric, start, end) => {
        let max = 0;
        let initialValue = false;

        for (let i = start; i < end; i++) {
            if (!initialValue) {
                max = dataMetric[i];
                initialValue = true;
            }
            if (max < dataMetric[i]) max = dataMetric[i];
        }
        return max;
    }

    const minTemp = (dataMetric, start, end) => {
        let min = 0;
        let initialValue = false;

        for (let i = start; i < end; i++) {
            if (!initialValue) {
                min = dataMetric[i];
                initialValue = true;
            }
            if (min > dataMetric[i]) min = dataMetric[i];
        }
        return min;
    }

    const infoOfDays = [
        {
            day: days[0],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[0]),
            max: maxTemp(dataMetric.hourly.temperature_2m, 0, 23),
            min: minTemp(dataMetric.hourly.temperature_2m, 0, 23)
        },
        {
            day: days[1],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[1]),
            max: maxTemp(dataMetric.hourly.temperature_2m, 24, 47),
            min: minTemp(dataMetric.hourly.temperature_2m, 24, 47)
        },
        {
            day: days[2],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[2]),
            max: maxTemp(dataMetric.hourly.temperature_2m, 48, 71),
            min: minTemp(dataMetric.hourly.temperature_2m, 48, 71)
        },
        {
            day: days[3],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[3]),
            max: maxTemp(dataMetric.hourly.temperature_2m, 72, 95),
            min: minTemp(dataMetric.hourly.temperature_2m, 72, 95)
        },
        {
            day: days[4],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[4]),
            max: maxTemp(dataMetric.hourly.temperature_2m, 96, 109),
            min: minTemp(dataMetric.hourly.temperature_2m, 96, 109)
        },
        {
            day: days[5],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[5]),
            max: maxTemp(dataMetric.hourly.temperature_2m, 110, 133),
            min: minTemp(dataMetric.hourly.temperature_2m, 110, 133)
        },
        {
            day: days[6],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[6]),
            max: maxTemp(dataMetric.hourly.temperature_2m, 134, 167),
            min: minTemp(dataMetric.hourly.temperature_2m, 134, 167)
        },
    ];

    const listOfDays = infoOfDays.map((day, key) => {
        return (
            <div className="day" key={key}>
                <div className="day-name">{day.day}</div>
                <div className="weather-img">
                    <img className='weather-of-day' src={day.img} />
                </div>
                <div className="days-temperatures">
                    <div className="high-temperature">{day.max}°</div>
                    <div className="low-temperature">{day.min}°</div>
                </div>
            </div>
        );
    });

    return (
        <div className="daily-forecast">
            <div id="daily-forecast-title">Daily forecast</div>
            {/* weekly days */}
            <div id="days">
                {listOfDays}
            </div>
        </div>
    )
}
