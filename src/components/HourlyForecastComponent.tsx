import React from 'react';
import type { HourlyForecast as HourlyForecastType } from '../types';

interface HourlyForecastProps {
  hourlyData: HourlyForecastType[];
  units: 'metric' | 'imperial';
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData, units }) => {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    });
  };

  const formatTemp = (temp: number) => {
    const roundedTemp = Math.round(temp);
    return units === 'metric' ? `${roundedTemp}°C` : `${roundedTemp}°F`;
  };

  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      <div className="hourly-list-scroll">
        {hourlyData.slice(0, 8).map((hour, index) => (
          <div key={index} className="hourly-item-card">
            <div className="hourly-time-card">{formatTime(hour.time)}</div>
            <img
              src={`https://openweathermap.org/img/wn/${hour.icon}@4x.png`}
              alt={hour.description}
              className="hourly-icon-card"
            />
            <div className="hourly-temp-card">{formatTemp(hour.temp)}</div>
            <div className="hourly-description-card">{hour.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
