import React from 'react'
import "./CurrentDate.css";

export default function CurrentDate() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const currentDate = `${days[date.getDay() - 1]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    return (
        // <div id="todays-weather-date">Tuesday, Aug 5, 2025</div>
        <div id="todays-weather-date">{currentDate}</div>
    )
}
