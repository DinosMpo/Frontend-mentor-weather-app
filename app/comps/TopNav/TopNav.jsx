import { useState } from 'react'
import "./TopNav.css";

export default function TopNav({ imperialOrMetric, setImperialOrMetric, temperature, setTemperature, windspeed, setWindspeed, precipitation, setPrecipitation }) {
  const [activeUnits, setActiveUnits] = useState(false);

  const changeImperialOrMetric = () => {
    setImperialOrMetric(()=> imperialOrMetric == 'metric' ? 'imperial' : 'metric')
    if(imperialOrMetric == 'imperial') {
      setTemperature('celsius');
      setWindspeed('kmh');
      setPrecipitation('mm');
    }else {
      setTemperature('fahrenheit');
      setWindspeed('mph');
      setPrecipitation('inch');
    }
  }

  return (
    <div className="top-nav">
      <div className="top-wrapper">
        <img src="/logo.svg" />
        <div id="units-container">
          <div id="units-wrapper" onClick={() => setActiveUnits(preValue => !preValue)}>
            <img alt="eee" src="./icon-units.svg" />
            <div id="units">Units</div>
            <img alt="eee" src="./icon-dropdown.svg" />
          </div>
          {activeUnits ?
            <div id="units-dropdown">
              <div onClick={changeImperialOrMetric} className="unit-choice" id="unit-imp">{imperialOrMetric == 'imperial' ? "Switch to Metric" : "Switch to Imperial"}</div>
              <div className="unit-title" id="unit-tmp">Temperature</div>
              <div onClick={()=> setTemperature('celsius')} className={`unit-choice ${temperature == 'celsius' ? "active-unit" : ''}`} id="unit-celsius">Celsius (C){temperature == 'celsius' ? <img src="./icon-checkmark.svg" alt="active-unit"/> : ''}</div>
              <div onClick={()=> setTemperature('fahrenheit')} className={`unit-choice ${temperature == 'fahrenheit' ? "active-unit" : ''}`} id="unit-fahrenheit">Fahrenheit (F){temperature == 'fahrenheit' ? <img src="./icon-checkmark.svg" alt="active-unit"/> : ''}</div>
              <hr></hr>
              <div className="unit-title" id="unit-wind">Wind Speed</div>
              <div onClick={()=> setWindspeed('kmh')} className={`unit-choice ${windspeed == 'kmh' ? "active-unit" : ''}`} id="unit-km">km/h{windspeed == 'kmh' ? <img src="./icon-checkmark.svg" alt="active-unit"/> : ''}</div>
              <div onClick={()=> setWindspeed('mph')} className={`unit-choice ${windspeed == 'mph' ? "active-unit" : ''}`} id="unit-mph">mph{windspeed == 'mph' ? <img src="./icon-checkmark.svg" alt="active-unit"/> : ''}</div>
              <hr></hr>
              <div className="unit-title" id="unit-precipitation">Precipitation</div>
              <div onClick={()=> setPrecipitation('mm')} className={`unit-choice ${precipitation == 'mm' ? "active-unit" : ''}`} id="unit-mm">Milimeters (mm){precipitation == 'mm' ? <img src="./icon-checkmark.svg" alt="active-unit"/> : ''}</div>
              <div onClick={()=> setPrecipitation('inch')} className={`unit-choice ${precipitation == 'inch' ? "active-unit" : ''}`} id="unit-in">Inches (in){precipitation == 'inch' ? <img src="./icon-checkmark.svg" alt="active-unit"/> : ''}</div>
            </div>
            :
            ''
          }
        </div>
      </div>
      <div id="title">How's the sky looking today?</div>
      <div id="search-wrapper">
        <div id="search-text">
          {/* <div>img</div> */}
          <img id="search-img" src="/icon-search.svg" />
          <input type="text" placeholder="Search for a place..." />
        </div>
        <div id="search-button">Search</div>
      </div>
    </div>
  )
}
