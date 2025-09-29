import React from 'react';
import type { DailyForecast as DailyForecastType } from '../types';

interface DailyForecastProps {
  dailyData: DailyForecastType[];
  units: 'metric' | 'imperial';
}

const DailyForecast: React.FC<DailyForecastProps> = ({ dailyData, units }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTemp = (temp: number) => {
    const roundedTemp = Math.round(temp);
    return units === 'metric' ? `${roundedTemp}°C` : `${roundedTemp}°F`;
  };

  return (
    <div className="daily-forecast">
      <h3>6-Day Forecast</h3>
      <div className="daily-list">
        {dailyData.map((day, index) => (
          <div key={index} className="daily-item-card">
            <div className="daily-date-card">{formatDate(day.date)}</div>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@4x.png`}
              alt={day.description}
              className="daily-icon-card"
            />
            <div className="daily-description-card">{day.description}</div>
            <div className="daily-temps-card">
              <span className="daily-temp-high-card">{formatTemp(day.temp_max)}</span>
              <span className="daily-temp-low-card">{formatTemp(day.temp_min)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
