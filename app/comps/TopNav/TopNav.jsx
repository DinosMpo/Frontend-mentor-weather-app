import { useState, useEffect } from 'react'
import Error from '../Error/Error';
import NoResult from '../NoResult/NoResult';
import SearchInProgress from '../SearchInProgress/SearchInProgress';
import "./TopNav.css";

export default function TopNav({
  isLoading,
  setLoading,
  setLoadingGeo,
  imperialOrMetric,
  setImperialOrMetric,
  temperature,
  setTemperature,
  windspeed,
  setWindspeed,
  precipitation,
  setPrecipitation,
  searchInput,
  setSearchInput,
  setLat,
  setLon,
  setRetry,
  setName,
  setCountry,
  setNoResult
}) {
  const [activeUnits, setActiveUnits] = useState(false);
  const [searchData, setSearchData] = useState('');
  const apiGeoUrl2 = `https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}&count=5&language=en&format=json`;

  useEffect(() => {
    fetch(apiGeoUrl2)
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
        console.log(data);
      })
    searchDataResults();
  }, [searchInput]);

  const changeImperialOrMetric = () => {
    setImperialOrMetric(() => imperialOrMetric == 'metric' ? 'imperial' : 'metric')
    if (imperialOrMetric == 'imperial') {
      setTemperature('celsius');
      setWindspeed('kmh');
      setPrecipitation('mm');
    } else {
      setTemperature('fahrenheit');
      setWindspeed('mph');
      setPrecipitation('inch');
    }
  }

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  }

  const handleKeyDown = (e) => {
    if(e.code == "Enter" || e.code == "NumpadEnter") searchInputButton();
  } 

  const fetchNewData = (lat, lon, name, country) => {
    setLat(lat);
    setLon(lon);
    setName(name);
    setCountry(country);
    setSearchInput('');
  }

  const searchDataResults = () => {
    if (searchData.results) {
      // console.log("searchData.results.length");
      // console.log(searchData.results.length);
      const listOfSearchResults = searchData.results.map((data, key) => {
        console.log("data");
        console.log(data);
        return (
          <div className="search-result" key={key} onClick={() => fetchNewData(data.latitude, data.longitude, data.name, data.country)}>
            {`${data.name}, ${data.country}, ${data.admin1}`}
          </div>
        );
      });
      return listOfSearchResults;
    }
  }

  const searchInputButton = () => {
    if (searchData.results) {
      fetchNewData(searchData.results[0].latitude, searchData.results[0].longitude, searchData.results[0].name, searchData.results[0].country);
      setNoResult(false);
    } else {
      // alert('Error');
      setNoResult(true);
    }
  }

  return (
    <div className="top-nav">
      <div className="top-wrapper">
        <img src="/logo.svg" />
        <div id="units-container" className={activeUnits ? 'units-container-active' : ''}>
          <div id="units-wrapper" onClick={() => setActiveUnits(preValue => !preValue)}>
            <img alt="eee" src="./icon-units.svg" />
            <div id="units">Units</div>
            <img alt="eee" src="./icon-dropdown.svg" />
          </div>
          {activeUnits ?
            <div id="units-dropdown">
              <div onClick={changeImperialOrMetric} className="unit-choice" id="unit-imp">{imperialOrMetric == 'imperial' ? "Switch to Metric" : "Switch to Imperial"}</div>
              <div className="unit-title" id="unit-tmp">Temperature</div>
              <div onClick={() => setTemperature('celsius')} className={`unit-choice ${temperature == 'celsius' ? "active-unit" : ''}`} id="unit-celsius">Celsius (C){temperature == 'celsius' ? <img src="./icon-checkmark.svg" alt="active-unit" /> : ''}</div>
              <div onClick={() => setTemperature('fahrenheit')} className={`unit-choice ${temperature == 'fahrenheit' ? "active-unit" : ''}`} id="unit-fahrenheit">Fahrenheit (F){temperature == 'fahrenheit' ? <img src="./icon-checkmark.svg" alt="active-unit" /> : ''}</div>
              <hr></hr>
              <div className="unit-title" id="unit-wind">Wind Speed</div>
              <div onClick={() => setWindspeed('kmh')} className={`unit-choice ${windspeed == 'kmh' ? "active-unit" : ''}`} id="unit-km">km/h{windspeed == 'kmh' ? <img src="./icon-checkmark.svg" alt="active-unit" /> : ''}</div>
              <div onClick={() => setWindspeed('mph')} className={`unit-choice ${windspeed == 'mph' ? "active-unit" : ''}`} id="unit-mph">mph{windspeed == 'mph' ? <img src="./icon-checkmark.svg" alt="active-unit" /> : ''}</div>
              <hr></hr>
              <div className="unit-title" id="unit-precipitation">Precipitation</div>
              <div onClick={() => setPrecipitation('mm')} className={`unit-choice ${precipitation == 'mm' ? "active-unit" : ''}`} id="unit-mm">Milimeters (mm){precipitation == 'mm' ? <img src="./icon-checkmark.svg" alt="active-unit" /> : ''}</div>
              <div onClick={() => setPrecipitation('inch')} className={`unit-choice ${precipitation == 'inch' ? "active-unit" : ''}`} id="unit-in">Inches (in){precipitation == 'inch' ? <img src="./icon-checkmark.svg" alt="active-unit" /> : ''}</div>
            </div>
            :
            ''
          }
        </div>
      </div>
      {
        isLoading ?
          <Error setRetry={setRetry} />
          :
          <div>
            <div id="title">How's the sky looking today?</div>
            <div id="search-wrapper">
              <div id="search-container">
                <div id="search-text">
                  {/* <div>img</div> */}
                  <img id="search-img" src="/icon-search.svg" />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search for a place..."
                    value={searchInput}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e)=> handleKeyDown(e)}
                  />
                  {searchInput.length > 1 ?
                    <div id="results-window">
                      {searchDataResults() ? searchDataResults() : <SearchInProgress /> }
                      {/* {searchDataResults()} */}
                    </div>
                    :
                    ''
                  }
                </div>
              </div>
              <div id="search-button" onClick={() => searchInputButton()}>Search</div>
            </div>
          </div>
      }
    </div>
  )
}
