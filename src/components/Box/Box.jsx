import { useState } from "react";
import "../Box/box.css";

export default function Box() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(""); // Manage input value

  // Function to fetch weather data
  const search = async (city) => {
    const apiKey = "85f3c344b7493fe04fba8ab9239f5790";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Celsius temperature

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Couldn't fetch data");
      }
      const data = await response.json();
      setWeatherData(data); // Set fetched data to state
      setError(null); // Reset error state if request is successful
    } catch (error) {
      setError(error.message); // Set error if request fails
      setWeatherData(null); // Reset weather data in case of error
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (city) {
      search(city); // Call search function with the city
    }
  };

  // Function to determine the emoji based on weather description
  const getWeatherEmoji = (description) => {
    switch (description.toLowerCase()) {
      case "clear sky":
        return "🌞"; // Sun emoji for clear sky
      case "few clouds":
      case "scattered clouds":
        return "⛅"; // Cloud with sun emoji
      case "broken clouds":
        return "🌥"; // Cloud with sun behind it
      case "shower rain":
      case "light rain":
      case "rain":
        return "🌧️"; // Rainy emoji
      case "thunderstorm":
        return "⚡"; // Thunderstorm emoji
      case "snow":
        return "❄️"; // Snowflake emoji
      case "mist":
      case "haze":
        return "🌫️"; // Mist emoji
      default:
        return "🌤️"; // Default: partly cloudy emoji
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <form className="weatherForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search city"
            className="city-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" id="magnifier">
            🔎
          </button>
        </form>
        {error && <div>{error}</div>} {/* Display error if it exists */}
        {weatherData ? (
          <div className="info">
            <span>{getWeatherEmoji(weatherData.weather[0].description)}</span>
            <h2>{weatherData.main.temp}°C</h2>
            <h3>{weatherData.name}</h3>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="extra-info">
          <div className="col">
            <img src="" alt="" />
            <div>
              <p>{weatherData ? weatherData.main.humidity : "Loading..."}</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src="" alt="" />
            <div>
              <p>{weatherData ? weatherData.wind.speed : "Loading..."}</p>
              <span>Wind speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
