import React from 'react';
import type { WeatherData } from '../types';

interface HighlightsProps {
  weatherData: WeatherData | null;
}

const Highlights: React.FC<HighlightsProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  // Helper to format sunrise/sunset time
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWindDirectionIcon = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return '↑'; // N
    if (deg < 67.5) return '↗'; // NE
    if (deg < 112.5) return '→'; // E
    if (deg < 157.5) return '↘'; // SE
    if (deg < 202.5) return '↓'; // S
    if (deg < 247.5) return '↙'; // SW
    if (deg < 292.5) return '←'; // W
    return '↖'; // NW
  };

  const getAirQualityIcon = (status: string) => {
    if (status === 'Good') return '😊';
    if (status === 'Fair') return '😐';
    if (status === 'Moderate') return '😟';
    if (status === 'Poor') return '😷';
    return '😷'; // Very Poor
  };

  const uvIndex = weatherData.uvIndex || 0;
  const airQuality = weatherData.airQuality || { index: 0, status: 'Unknown' };

  return (
    <div className="highlights">
      <h3>Today's Highlights</h3>
      <div className="highlights-grid">
        {/* UV Index */}
        <div className="highlight-card uv-card">
          <div className="card-icon">☀️</div>
          <h4>UV Index</h4>
          <div className="uv-gauge">
            <div className="gauge-circle" style={{ ['--uv-value' as any]: `${uvIndex / 11 * 100}%` }}></div>
            <span className="uv-value">{uvIndex}</span>
          </div>
        </div>

        {/* Wind Status */}
        <div className="highlight-card">
          <div className="card-icon">🌪️</div>
          <h4>Wind Status</h4>
          <p>{weatherData.wind.speed.toFixed(1)} km/h {getWindDirectionIcon(weatherData.wind.deg)}</p>
        </div>

        {/* Sunrise/Sunset */}
        <div className="highlight-card">
          <div className="card-icon">🌅</div>
          <h4>Sunrise & Sunset</h4>
          <p>{formatTime(weatherData.sys.sunrise)} <br /> {formatTime(weatherData.sys.sunset)}</p>
        </div>

        {/* Humidity */}
        <div className="highlight-card">
          <div className="card-icon">💧</div>
          <h4>Humidity</h4>
          <p>{weatherData.main.humidity}%</p>
        </div>

        {/* Visibility */}
        <div className="highlight-card">
          <div className="card-icon">👁️</div>
          <h4>Visibility</h4>
          <p>{(weatherData.visibility / 1000).toFixed(1)} km</p>
        </div>

        {/* Air Quality */}
        <div className="highlight-card">
          <div className="card-icon">{getAirQualityIcon(airQuality.status)}</div>
          <h4>Air Quality</h4>
          <p>{airQuality.index} <br /> {airQuality.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
