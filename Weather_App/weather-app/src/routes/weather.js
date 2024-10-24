import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Weather = () => {
  const location = useLocation();
  const [htmlContent, setHtmlContent] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch('/weather.html')
      .then(response => response.text())
      .then(data => setHtmlContent(data));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const city = params.get('city');
    fetchWeather(city);
  }, [location]);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`/weather?city=${city}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching the weather data:', error);
    }
  };

  useEffect(() => {
    if (weatherData && htmlContent) {
      const weatherBox = document.getElementById('weatherBox');
      if (weatherBox) {
        weatherBox.innerHTML = `
          <h3>${weatherData.name}</h3>
          <p>${weatherData.weather[0].description}</p>
          <p>${weatherData.main.temp}°C</p>
        `;
      }
    }
  }, [weatherData, htmlContent]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default Weather;
