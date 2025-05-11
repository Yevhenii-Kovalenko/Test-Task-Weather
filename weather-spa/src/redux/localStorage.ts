import type { WeatherState } from "./weather/types";

const STORAGE_KEY = "weatherState";

export const loadWeatherState = (): WeatherState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Failed to load from localStorage", e);
    return undefined;
  }
};

export const saveWeatherState = (state: WeatherState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
};
