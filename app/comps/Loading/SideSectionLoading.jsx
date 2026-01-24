import React from 'react'

export default function SideSectionLoading() {

  const listOfHours = [...Array(23).keys()].map((hour, key) => {
        return (
            <div className="forecast-hour-loading" key={key}></div>
        );
    });

  return (
    <div id="side-section-loading">
      <div id="hourly-forecast">
        <div>Hourly forecast</div>
        <div id="day-wrapper">
          <div id="active-day-wrapper">
            <div id="day">-</div>
            <img src="./icon-dropdown.svg" alt="dropdown" />
          </div>
        </div>
      </div>
      {/* hourly prediction 8 entries*/}
      <div id='list-of-hours-container-loading'>
        {listOfHours}
      </div>
    </div>
  )
}
