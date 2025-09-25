import axios from 'axios';
import type { WeatherData, ForecastData, Units } from '../types';

const API_KEY = '477d9f3f397e6e3137e363917ce404c1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByLocation = async (lat: number, lon: number, units: Units = 'metric'): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`);
  return response.data;
};

export const getWeatherByCity = async (city: string, units: Units = 'metric'): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`);
  return response.data;
};

export const getForecastByLocation = async (lat: number, lon: number, units: Units = 'metric'): Promise<ForecastData> => {
  const response = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`);
  return response.data;
};

export const getForecastByCity = async (city: string, units: Units = 'metric'): Promise<ForecastData> => {
  const response = await axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`);
  return response.data;
};

export const getUVIndex = async (lat: number, lon: number, dt: number): Promise<number> => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&dt=${dt}&appid=${API_KEY}`);
  return response.data.value;
};

export const getAirQuality = async (lat: number, lon: number): Promise<{ index: number; status: string }> => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  const { aqi } = response.data.list[0].main;
  let status = '';
  if (aqi === 1) status = 'Good';
  else if (aqi === 2) status = 'Fair';
  else if (aqi === 3) status = 'Moderate';
  else if (aqi === 4) status = 'Poor';
  else if (aqi === 5) status = 'Very Poor';
  return { index: aqi, status };
};

export const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};
