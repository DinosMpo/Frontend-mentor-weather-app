import React from 'react'
import "./DailyForecast.css";

export default function DailyForecast({ data, geoData }) {
    // console.log("data");
    console.log(data.daily.weather_code);
    // console.log(data);
    // console.log("geoData");
    // console.log(geoData);
    //i have to find the highest and the lowest temperature for every day. I find a way for that
    //i have to find a way to display the days with the correct order. Πρεπει να δειχνει πχ οτι σημερα ειναι Τεταρτη και να μπορω μετα να γραψω τις μερες με αυτη την σειρα Τεταρτη, Πεμπτη, Παρασκευη, 
    // Σαββατο, Κυριακη, Δευτερα, Τριτη. Λογικα θα παρω το array με τις μερες που εχω και αναλογως με το σε ποια μερα ειμαι να αλλαζω την σειρα του array. 

    // sunny 0 1
    // partly cloudy 2
    // overcast 3
    // fog 45, 48
    // drizzle 51 53 55 56 57
    // rain 61 63 65 66 67 80 81 82
    // snow 71 73 75 77 85 86
    // storm 95 96 99


    const date = new Date();
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    days = days.slice(date.getDay() - 1).concat(days.slice(0, date.getDay() - 1));

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
            max: maxTemp(data.hourly.temperature_2m, 0, 23),
            min: minTemp(data.hourly.temperature_2m, 0, 23)
        },
        {
            day: days[1],
            max: maxTemp(data.hourly.temperature_2m, 24, 47),
            min: minTemp(data.hourly.temperature_2m, 24, 47)
        },
        {
            day: days[2],
            max: maxTemp(data.hourly.temperature_2m, 48, 71),
            min: minTemp(data.hourly.temperature_2m, 48, 71)
        },
        {
            day: days[3],
            max: maxTemp(data.hourly.temperature_2m, 72, 95),
            min: minTemp(data.hourly.temperature_2m, 72, 95)
        },
        {
            day: days[4],
            max: maxTemp(data.hourly.temperature_2m, 96, 109),
            min: minTemp(data.hourly.temperature_2m, 96, 109)
        },
        {
            day: days[5],
            max: maxTemp(data.hourly.temperature_2m, 110, 133),
            min: minTemp(data.hourly.temperature_2m, 110, 133)
        },
        {
            day: days[6],
            max: maxTemp(data.hourly.temperature_2m, 134, 167),
            min: minTemp(data.hourly.temperature_2m, 134, 167)
        },
    ];

    const listOfDays = infoOfDays.map((day, key) => {
        return (
            <div className="day" key={key}>
                <div className="day-name">{day.day}</div>
                <div className="weather-img">{day.img}</div>
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
