import type { PayloadAction } from "@reduxjs/toolkit";
import type { HourlyForecast, WeatherData, WeatherState } from "./types";
import {
  setWeather,
  removeCity,
  setLoading,
  setError,
  setForecast,
} from "./actions";

import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const weatherReducers = (
  builder: ActionReducerMapBuilder<WeatherState>
) => {
  builder
    .addCase(setWeather, (state, action: PayloadAction<WeatherData>) => {
      const existing = state.cities.find((c) => c.city === action.payload.city);
      if (existing) {
        Object.assign(existing, action.payload);
      } else {
        state.cities.push(action.payload);
      }
    })
    .addCase(
      removeCity,
      (state: WeatherState, action: PayloadAction<string>) => {
        state.cities = state.cities.filter((c) => c.city !== action.payload);
      }
    )
    .addCase(
      setLoading,
      (state: WeatherState, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      }
    )
    .addCase(
      setError,
      (state: WeatherState, action: PayloadAction<string | null>) => {
        state.error = action.payload;
      }
    )
    .addCase(
      setForecast,
      (
        state,
        action: PayloadAction<{ city: string; forecast: HourlyForecast[] }>
      ) => {
        const city = state.cities.find((c) => c.city === action.payload.city);
        if (city) {
          city.forecast = action.payload.forecast;
        }
      }
    );
};
