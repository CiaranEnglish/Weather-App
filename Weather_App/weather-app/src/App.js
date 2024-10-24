import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';


const App = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('/static/home.html')
      .then(response => response.text())
      .then(data => setHtmlContent(data));
  }, []);

  useEffect(() => {
    if (htmlContent) {
      const btn = document.getElementById('getWeather');
      if (btn) {
        btn.addEventListener('click', fetchWeather);
      }
    }
  }, [htmlContent]);

  const fetchWeather = async () => {
    const city = document.getElementById('cityInput').value;
    console.log('City:', city); // Log city input
    try {
      const response = await axios.get(`/weather?city=${city}`);
      console.log('Response:', response.data); // Log API response
      const weatherData = response.data;
      document.getElementById('weatherRes').innerHTML = `
        <h3>${weatherData.name}</h3>
        <p>${weatherData.weather[0].description}</p>
        <p>${weatherData.main.temp}°C</p>
      `;
    } catch (error) {
      console.error('Error fetching the forecast for your requested city:', error);
    }
  };

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default App;
