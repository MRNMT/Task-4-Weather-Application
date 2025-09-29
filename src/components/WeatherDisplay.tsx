import React from 'react';
import type { WeatherData } from '../types';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  units: 'metric' | 'imperial';
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, loading, error, units }) => {
  if (loading) {
    return (
      <div className="weather-display loading">
        <div className="loading-spinner"></div>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return <div className="weather-display error">Error: {error}</div>;
  }

  if (!weatherData) {
    return <div className="weather-display">No weather data available</div>;
  }

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  // Convert temperature to Fahrenheit if units is imperial
  const temp = units === 'imperial'
    ? Math.round((weatherData.main.temp * 9) / 5 + 32)
    : Math.round(weatherData.main.temp);

  const unitSymbol = units === 'imperial' ? '°F' : '°C';

  return (
    <div className="weather-display">
      <h2 className="location-name">{weatherData.name}</h2>
      <div className="weather-main">
        <div className="weather-icon-large">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
        </div>
        <div className="temperature-section-large">
          <div className="current-temp-large">
            <span className="temp-value-large">{temp}</span>
            <span className="temp-unit-large">{unitSymbol}</span>
          </div>
          <div className="date-description">
            <p className="current-date">{formatDate()}</p>
            <p className="weather-description-large">{weatherData.weather[0].description}</p>
          </div>
          <div className="humidity-section">
            <span className="humidity-icon">☁️</span>
            <span className="humidity-value">{weatherData.main.humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
