import React, { useState } from 'react'
import axios from 'axios';

export default function Weather() {

   // State to store the input value for the city.
  const[city,setCity]=useState('');

  // State to store the weather data fetched from the API.
  const[weather,setWeather]=useState(null);

    // API key for OpenWeatherMap API.
  const apiKey= 'bde4c1c4b24b5072b85314cf8adb5eda';


// Function to fetch weather data for the entered city.
  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);

        // Log an error if the API request fails.
    } catch (error) {
      console.error("Error fetching the weather data:", error);
    }
  };

// Function to handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
    setCity('');
  };
  return (
    <div className='container'>
        <h1>Weather App</h1>

          {/* Form to capture city input and submit the request. */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
        </form>

        {/*  Conditional rendering: Show weather details only if data is available. */}
        {weather && (
        <div className='weather-container'>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
      
    </div>
  )
}
