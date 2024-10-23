import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  const fetchWeather = async () => {
    const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
    setWeather(response.data);
  };

  return (
    <div>
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city" 
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp}°C</p>
        </div>
      )}
    </div>
  );
};

export default App;
