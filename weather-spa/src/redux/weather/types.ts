export interface HourlyForecast {
  hour: number;
  temp: number;
}

export interface WeatherData {
  id: number;
  city: string;
  temperature: number;
  description: string;
  lastUpdated: string;
  icon: string;
  forecast?: HourlyForecast[];
}

export interface CityWeather {
  id: string;
  name: string;
  data: WeatherData | null;
}

export interface WeatherState {
  cities: WeatherData[];
  loading: boolean;
  error: string | null;
}
