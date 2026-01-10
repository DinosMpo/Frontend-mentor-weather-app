import React from 'react'
import { calculate_weatherCondition } from '@/app/lib/helpers';
import "./DailyForecast.css";

export default function DailyForecast({ dataMetric, dataImperial, temperature }) {
    const date = new Date();
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    days = days.slice(date.getDay() - 1).concat(days.slice(0, date.getDay() - 1));
    const activeDay = date.getDay();

    const maxTemp = (data, start, end) => {
        let max = 0;
        let initialValue = false;

        for (let i = start; i < end; i++) {
            if (!initialValue) {
                max = data[i];
                initialValue = true;
            }
            if (max < data[i]) max = data[i];
        }
        return max;
    }

    const minTemp = (data, start, end) => {
        let min = 0;
        let initialValue = false;

        for (let i = start; i < end; i++) {
            if (!initialValue) {
                min = data[i];
                initialValue = true;
            }
            if (min > data[i]) min = data[i];
        }
        return min;
    }

    const infoOfDays = [
        {
            day: days[0],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[0]),
            max_celsius: maxTemp(dataMetric.hourly.temperature_2m, 0, 23),
            min_celsius: minTemp(dataMetric.hourly.temperature_2m, 0, 23),
            max_fahrenheit: maxTemp(dataImperial.hourly.temperature_2m, 0, 23),
            min_fahrenheit: minTemp(dataImperial.hourly.temperature_2m, 0, 23)

        },
        {
            day: days[1],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[1]),
            max_celsius: maxTemp(dataMetric.hourly.temperature_2m, 24, 47),
            min_celsius: minTemp(dataMetric.hourly.temperature_2m, 24, 47),
            max_fahrenheit: maxTemp(dataImperial.hourly.temperature_2m, 24, 47),
            min_fahrenheit: minTemp(dataImperial.hourly.temperature_2m, 24, 47)
        },
        {
            day: days[2],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[2]),
            max_celsius: maxTemp(dataMetric.hourly.temperature_2m, 48, 71),
            min_celsius: minTemp(dataMetric.hourly.temperature_2m, 48, 71),
            max_fahrenheit: maxTemp(dataImperial.hourly.temperature_2m, 48, 71),
            min_fahrenheit: minTemp(dataImperial.hourly.temperature_2m, 48, 71)
        },
        {
            day: days[3],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[3]),
            max_celsius: maxTemp(dataMetric.hourly.temperature_2m, 72, 95),
            min_celsius: minTemp(dataMetric.hourly.temperature_2m, 72, 95),
            max_fahrenheit: maxTemp(dataImperial.hourly.temperature_2m, 72, 95),
            min_fahrenheit: minTemp(dataImperial.hourly.temperature_2m, 72, 95)
        },
        {
            day: days[4],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[4]),
            max_celsius: maxTemp(dataMetric.hourly.temperature_2m, 96, 109),
            min_celsius: minTemp(dataMetric.hourly.temperature_2m, 96, 109),
            max_fahrenheit: maxTemp(dataImperial.hourly.temperature_2m, 96, 109),
            min_fahrenheit: minTemp(dataImperial.hourly.temperature_2m, 96, 109)
        },
        {
            day: days[5],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[5]),
            max_celsius: maxTemp(dataMetric.hourly.temperature_2m, 110, 133),
            min_celsius: minTemp(dataMetric.hourly.temperature_2m, 110, 133),
            max_fahrenheit: maxTemp(dataImperial.hourly.temperature_2m, 110, 133),
            min_fahrenheit: minTemp(dataImperial.hourly.temperature_2m, 110, 133)
        },
        {
            day: days[6],
            img: calculate_weatherCondition(dataMetric.daily.weather_code[6]),
            max_celsius: maxTemp(dataMetric.hourly.temperature_2m, 134, 167),
            min_celsius: minTemp(dataMetric.hourly.temperature_2m, 134, 167),
            max_fahrenheit: maxTemp(dataImperial.hourly.temperature_2m, 134, 167),
            min_fahrenheit: minTemp(dataImperial.hourly.temperature_2m, 134, 167)
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
                    <div className="high-temperature">{temperature == "celsius" ? day.max_celsius : day.max_fahrenheit}°</div>
                    <div className="low-temperature">{temperature == "celsius" ? day.min_celsius : day.min_fahrenheit}°</div>
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
