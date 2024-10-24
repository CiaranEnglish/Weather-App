import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('/home.html')
      .then(response => response.text())
      .then(data => setHtmlContent(data));
  }, []);

  const handleSearch = () => {
    const city = document.getElementById('cityInput').value;
    navigate(`/weather?city=${city}`);
  };

  useEffect(() => {
    if (htmlContent) {
      const btn = document.getElementById('getWeather');
      if (btn) {
        btn.addEventListener('click', handleSearch);
      }
    }
  }, [htmlContent]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default Home;

