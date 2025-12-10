import { useState } from 'react';
import { calculate_weatherCondition } from '@/app/lib/helpers';
import "./SideSection.css";

export default function SideSection({ data, activeDay, setActiveDay }) {
    const [activeDayClicked, setActiveDayClicked] = useState(false);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    // const activeDay = days[date.getDay()];
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

    const getTheDetailsOfDays = () => {
        for (let i = 0; i < newDays.length; i++) {
            let hourCounter = 0;
            let pmOrAm = 'AM';
            for (let y = (0 + (i * 23)); y <= (23 + (i * 23)); y++) {
                detailOfDays[newDays[i]].push({
                    hour: `${hourCounter} ${pmOrAm}`,
                    degree: data.hourly.temperature_2m[y],
                    img: data.hourly.weather_code[y]
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
    }

    getTheDetailsOfDays();

    const listOfHours = detailOfDays[activeDay].map((hour, key) => {
        return (
            <div className="forecast-hour" key={key}>
                <div className='forecast-hour-wrapper'>
                    <div className='forecast-hour-wrapper'>
                        <img className='forecast-hour-weather' src={calculate_weatherCondition(hour.img)} />
                    </div>
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
                <div id="day-wrapper">
                    <div id="active-day-wrapper" onClick={() => setActiveDayClicked(!activeDayClicked)}>
                        <div id="day">{activeDay}</div>
                        <img src="./icon-dropdown.svg" alt="dropdown" />
                    </div>
                    {activeDayClicked
                        ?
                        <div id="active-day-drop-down">
                            <div className='day-choice' onClick={()=> {setActiveDay("Monday"); setActiveDayClicked(false)}}>Monday</div>
                            <div className='day-choice' onClick={()=> {setActiveDay("Tuesday"); setActiveDayClicked(false)}}>Tuesday</div>
                            <div className='day-choice' onClick={()=> {setActiveDay("Wednesday"); setActiveDayClicked(false)}}>Wednesday</div>
                            <div className='day-choice' onClick={()=> {setActiveDay("Thursday"); setActiveDayClicked(false)}}>Thursday</div>
                            <div className='day-choice' onClick={()=> {setActiveDay("Friday"); setActiveDayClicked(false)}}>Friday</div>
                            <div className='day-choice' onClick={()=> {setActiveDay("Saturday"); setActiveDayClicked(false)}}>Saturday</div>
                            <div className='day-choice' onClick={()=> {setActiveDay("Sunday"); setActiveDayClicked(false)}}>Sunday</div>
                        </div>
                        :
                        ''
                    }
                </div>
            </div>
            {/* hourly prediction 8 entries*/}
            <div id='list-of-hours-container'>
                {listOfHours}
            </div>
        </div>
    )
}
