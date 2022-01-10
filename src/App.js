import React, { useState } from 'react';
import './App.css';

const api = {
  key: "c3acbdb0783f23253761b713751dcab4",
  keys: "55743b671ba718a00cfda57036966923",
  base: "https://api.openweathermap.org/data/2.5",
  fetch: "https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=55743b671ba718a00cfda57036966923",
  getch2: "${api.base}weather?q=${query}&units=metric&appid=${api.keys}"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}/weather?q=${query}&APPID=${api.key}`)
        .then(res => res.json())
        .then(result =>  {
          setWeather(result);
          setQuery('');
        });
    }
 }
  return (
    <div className={(typeof weather.main != "undefined") ? (((weather.main.temp)-273.15 > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className='country'>{weather.name}, <span>{weather.sys.country}</span></div>
          <div className='date'>{new Date().toDateString()}</div>
          <div className= 'temp'>{Math.round((weather.main.temp)-273.15)}°c</div>
          <div className='desc'>{weather.weather[0].main}</div>
        </div>
        ) : ('')}
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
      </main>
      
 

    </div>
  );
}

export default App;
