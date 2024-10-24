import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Weather = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
      const locationElement = document.getElementById('weatherLocation');
      if (locationElement) {
        locationElement.textContent = weatherData.name;
      }
      document.getElementById('weatherDescription').innerHTML = `<p>${weatherData.weather[0].description}</p>`;
      document.getElementById('weatherTemp').innerHTML = `<p>${weatherData.main.temp}°C</p>`;
      document.getElementById('weatherHumidity').innerHTML = `<p>Humidity: ${weatherData.main.humidity}%</p>`;
      document.getElementById('weatherWind').innerHTML = `<p>Wind Speed: ${weatherData.wind.speed} m/s</p>`;
    }
  }, [weatherData, htmlContent]);

  useEffect(() => {
    if (htmlContent) {
      const btn = document.getElementById('getWeather');
      if (btn) {
        btn.addEventListener('click', handleSearch);
      }
    }
  }, [htmlContent]);

  const handleSearch = () => {
    const city = document.getElementById('cityInput').value;
    navigate(`/weather?city=${city}`);
  };

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default Weather;
