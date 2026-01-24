import React from 'react'
import DailyForecastLoading from './DailyForecastLoading';
import "./Loading.css";

export default function MainSectionLoading() {
    return (
        <div className="main-section">
            {/* <TodaysWeather /> */}
            {/* <DailyForecast /> */}
            <div id="todays-weather-wrapper">
                <div className="todays-weather-container-loading">
                    Loading...
                </div>

                <div id="todays-weather-details">
                    <div className="details-loading">
                        <div className='details-title'>Feels Like</div>
                        <div>-</div>
                    </div>
                    <div className="details-loading">
                        <div className='details-title'>Humidity</div>
                        <div>-</div>
                    </div>
                    <div className="details-loading">
                        <div className='details-title'>Wind</div>
                        <div>-</div>
                    </div>
                    <div className="details-loading">
                        <div className='details-title'>Precipitation</div>
                        <div>-</div>
                    </div>
                </div>
            </div>
            <DailyForecastLoading />
        </div>
    )
}
