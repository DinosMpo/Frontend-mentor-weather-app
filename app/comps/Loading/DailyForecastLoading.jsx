import React from 'react'

export default function DailyForecastLoading() {
    const listOfDays = [...Array(7).keys()].map((day, key) => {
        return <div className="day" key={key}></div>
    });

    return (
        <div id="daily-forecast">
            <div id="daily-forecast-title">Daily forecast</div>
            <div id="days">
                {listOfDays}
            </div>
        </div>
    )
}
