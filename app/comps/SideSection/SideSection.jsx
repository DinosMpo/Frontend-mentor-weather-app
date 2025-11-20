import React from 'react';
import "./SideSection.css";

export default function SideSection() {
    const hours = [
        {
            hour: "3 PM",
            degree: "68"
        },
        {
            hour: "4 PM",
            degree: "68"
        },
        {
            hour: "5 PM",
            degree: "68"
        },
        {
            hour: "6 PM",
            degree: "68"
        },
        {
            hour: "7 PM",
            degree: "68"
        },
        {
            hour: "8 PM",
            degree: "64"
        },
        {
            hour: "9 PM",
            degree: "63"
        }, {
            hour: "10 PM",
            degree: "63"
        }
    ];

    const listOfHours = hours.map((hour, key) => {
        return (
            <div className="forecast-hour" key={key}>
                <div className='forecast-hour-wrapper'>
                    <div>img</div>
                    <div className="hour">{hour.hour}</div>
                </div>
                <div className="degree">{hour.degree}°</div>
            </div>
        );
    });

    return (
        <div id="side-section">
            <div id="hourly-forecast">
                <div>Hourly forecast</div>
                <div id="day">Tuesday</div>
            </div>
            {/* hourly prediction 8 entries*/}
            <div id='list-of-hours-container'>
                {listOfHours}
            </div>
        </div>
    )
}
