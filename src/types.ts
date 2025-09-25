export interface WeatherData {
  coord: {
    lat: number;
    lon: number;
  };
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  dt: number;
  uvIndex?: number;
  airQuality?: {
    index: number;
    status: string;
  };
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
      main: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

export interface HourlyForecast {
  time: string;
  temp: number;
  icon: string;
  description: string;
}

export interface DailyForecast {
  date: string;
  temp_max: number;
  temp_min: number;
  icon: string;
  description: string;
}

export interface Location {
  name: string;
  lat: number;
  lon: number;
}

export type Theme = 'light' | 'dark';
export type Units = 'metric' | 'imperial';
