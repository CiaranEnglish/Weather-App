import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  //Pull weather information for city from flask server
  const fetchWeather = async () => {
    const city = document.getElementById('cityInput').value;
    try {
      const response = await axios.get(`/weather?city=${city}`);
      const weatherData = response.data;
      document.getElementById('weatherResult').innerHTML = `
        <h3>${weatherData.name}</h3>
        <p>${weatherData.weather[0].description}</p>
        <p>${weatherData.main.temp}°C</p>
      `;
    } catch (error) {
      console.error('Error fetching the weather data:', error);
    }
  };

  //Load home.html, when button is clicked call fetchWeather function
  useEffect(() => {
    fetch('/templates/home.html')
      .then(response => response.text())
      .then(data => setHtmlContent(data))
      .then(() => {
        document.getElementById('getWeather').addEventListener('click', fetchWeather);
      });
  }, []);

  return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }}/>
  );
};

export default App;
