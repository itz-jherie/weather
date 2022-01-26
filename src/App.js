import React, { useState } from 'react';
import './App.css';

const api = {
  key: "c3acbdb0783f23253761b713751dcab4",
  keys: "55743b671ba718a00cfda57036966923",
  base: "https://api.openweathermap.org/data/2.5"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  const search = e => {
    if (e.key === "Enter") {
        fetch(`${api.base}/weather?q=${query}&APPID=${api.key}`)
          .then(res =>  res.json())
          .then(result =>  {
            setWeather(result);
            setQuery('');
          if(result.cod === 404 || 400) {
            setError(result.message)
          }
          })
          .catch(err => {setError(err.message)})
      
    }
 }
  
    return (
    <div className={(typeof weather.main != "undefined") ? (((weather.main.temp)-273.15 > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
      <div className='search-box'>
          <input
          type='text' 
          className='search-bar' 
          placeholder='Search..' 
          onChange={e => setQuery(e.target.value)} 
          value ={query} 
          onKeyPress={search}>

          </input>
        </div>
        {error && <div className='error'>{ error }</div>}
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className='country'>{weather.name}, <span>{weather.sys.country}</span></div>
          <div className='date'>{new Date().toDateString()}</div>
          <div className= 'temp'>{Math.round((weather.main.temp)-273.15)}°c</div>
          <div className='desc'>{weather.weather[0].main}</div>
          <div className='container'>
              <div>
                <div className="list-container">
                  <div className="maxtemp">Max-temp: {(Math.round((weather.main.temp_max)-273.15))}°c</div>
                  <div className="mintemp">Min-temp: {(Math.round((weather.main.temp_min)-273.15))}°c</div>
                  <div className="windspeed">Windspeed: {weather.wind.speed}m/s</div>
                  <div className="humidity">Humidity: {weather.main.humidity}%</div>
                  <div className="visibility">Pressure: {weather.main.pressure}hPa</div>
                  <div className="timezone">Visibility: {Math.round(weather.visibility)/ 1000}km</div>
                </div>
              </div>
          </div>
        </div>
        ) : ('')}
      </main>
      
 

    </div>
  );
}

export default App;
