import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weather/slice";
import { loadWeatherState, saveWeatherState } from "./localStorage";
import type { WeatherState } from "./weather/types";

const defaultWeatherState: WeatherState = {
  cities: [],
  loading: false,
  error: null,
};

const preloadedWeather = loadWeatherState() ?? defaultWeatherState;

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  preloadedState: {
    weather: preloadedWeather,
  },
});

store.subscribe(() => {
  saveWeatherState(store.getState().weather);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
