

import { useState, useEffect } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import LocationSearch from './components/LocationSearch';
import TopBar from './components/TopBar';
import type { HourlyForecast as HourlyForecastType } from './types';
import type { DailyForecast as DailyForecastType } from './types';
import DailyForecast from './components/DailyForecastComponent';
import HourlyForecast from './components/HourlyForecastComponent';
import Settings from './components/Settings';
import Highlights from './components/Highlights';
import {
  getWeatherByLocation,
  getWeatherByCity,
  getForecastByLocation,
  getForecastByCity,
  getUVIndex,
  getAirQuality,
  getCurrentLocation
} from './services/weatherService';
import type { WeatherData, ForecastData, Theme, Units } from './types';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyForecastType[]>([]);
  const [dailyData, setDailyData] = useState<DailyForecastType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [units, setUnits] = useState<Units>('metric');
  const [activeTab, setActiveTab] = useState<'today' | 'week'>('today');
  const [showSettings, setShowSettings] = useState(false);

  const fetchWeather = async (lat?: number, lon?: number, city?: string) => {
    setLoading(true);
    setError(null);
    try {
      let data: WeatherData;
      let forecast: ForecastData;
      let coordLat: number;
      let coordLon: number;

      if (lat && lon) {
        [data, forecast] = await Promise.all([
          getWeatherByLocation(lat, lon, units),
          getForecastByLocation(lat, lon, units)
        ]);
        coordLat = lat;
        coordLon = lon;
      } else if (city) {
        [data, forecast] = await Promise.all([
          getWeatherByCity(city, units),
          getForecastByCity(city, units)
        ]);
        coordLat = data.coord.lat;
        coordLon = data.coord.lon;
      } else {
        throw new Error('No location provided');
      }

      // Fetch UV Index and Air Quality
      const [uvIndex, airQuality] = await Promise.all([
        getUVIndex(coordLat, coordLon, data.dt),
        getAirQuality(coordLat, coordLon)
      ]);

      // Extend weather data with UV and AQI
      const extendedData = {
        ...data,
        uvIndex,
        airQuality
      };

      setWeatherData(extendedData);
      setForecastData(forecast);
      processForecastData(forecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const processForecastData = (forecast: ForecastData) => {
    // Process hourly data (next 8 hours)
    const hourly = forecast.list.slice(0, 8).map(item => ({
      time: item.dt_txt,
      temp: item.main.temp,
      icon: item.weather[0].icon,
      description: item.weather[0].description
    }));
    setHourlyData(hourly);

    // Process daily data (next 7 days)
    const dailyMap = new Map();
    forecast.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          date,
          temp_max: item.main.temp,
          temp_min: item.main.temp,
          icon: item.weather[0].icon,
          description: item.weather[0].description
        });
      } else {
        const existing = dailyMap.get(date);
        existing.temp_max = Math.max(existing.temp_max, item.main.temp);
        existing.temp_min = Math.min(existing.temp_min, item.main.temp);
      }
    });

    const daily = Array.from(dailyMap.values()).slice(0, 7);
    setDailyData(daily);
  };

  const handleLocationSelect = (city: string) => {
    fetchWeather(undefined, undefined, city);
  };

  const handleCurrentLocation = async () => {
    try {
      const { lat, lon } = await getCurrentLocation();
      fetchWeather(lat, lon);
    } catch (err) {
      setError('Unable to get current location. Please search for a city instead.');
    }
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleThemeChange = (newTheme: Theme | 'blackwhite') => {
    setTheme(newTheme as Theme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleUnitsChange = (newUnits: Units) => {
    setUnits(newUnits);
    // Refetch data with new units if we have location data
    if (weatherData) {
      fetchWeather(undefined, undefined, weatherData.name);
    }
  };

  useEffect(() => {
    // Load weather for a default city on initial load
    fetchWeather(undefined, undefined, 'London');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={`app ${theme}`}>
      <TopBar
        onLocationSelect={handleLocationSelect}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSettingsClick={handleSettingsClick}
      />

      <div className="content-wrapper">
        <div className="sidebar">
          <WeatherDisplay weatherData={weatherData} loading={loading} error={error} />
        </div>

        <main className="main-content">
          {activeTab === 'today' && (
            <>
              <Highlights weatherData={weatherData} />
              <HourlyForecast hourlyData={hourlyData} units={units} />
            </>
          )}

          {activeTab === 'week' && (
            <>
              {weatherData && (
                <div className="weekly-forecast-bar">
                  {dailyData.slice(0, 7).map((day, index) => (
                    <div key={index} className="weekly-day">
                      <img
                        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                        alt={day.description}
                        className="weekly-icon"
                      />
                      <div className="weekly-temp">{Math.round(day.temp_max)}°</div>
                      <div className="weekly-date">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    </div>
                  ))}
                </div>
              )}
              <DailyForecast dailyData={dailyData} units={units} />
            </>
          )}
        </main>
      </div>

      {showSettings && (
        <div className="settings-overlay">
          <Settings
            theme={theme}
            units={units}
            onThemeChange={handleThemeChange}
            onUnitsChange={handleUnitsChange}
            onClose={() => setShowSettings(false)}
          />
        </div>
      )}

      <footer className="app-footer">
        <p>Powered by OpenWeatherMap API</p>
      </footer>
    </div>
  );
}

export default App;
