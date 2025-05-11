import { createAction } from "@reduxjs/toolkit";
import type { HourlyForecast, WeatherData } from "./types";

export const WEATHER_SLICE_NAME = "weather";

export const setWeather = createAction<WeatherData>(
  `${WEATHER_SLICE_NAME}/setWeather`
);
export const removeCity = createAction<string>(
  `${WEATHER_SLICE_NAME}/removeCity`
);
export const setLoading = createAction<boolean>(
  `${WEATHER_SLICE_NAME}/setLoading`
);
export const setError = createAction<string | null>(
  `${WEATHER_SLICE_NAME}/setError`
);
export const setForecast = createAction<{
  city: string;
  forecast: HourlyForecast[];
}>(`${WEATHER_SLICE_NAME}/setForecast`);
