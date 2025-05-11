import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectWeatherState = (state: RootState) => state.weather;

export const selectCities = createSelector(
  selectWeatherState,
  (state) => state.cities
);

export const selectWeatherLoading = createSelector(
  selectWeatherState,
  (state) => state.loading
);

export const selectWeatherError = createSelector(
  selectWeatherState,
  (state) => state.error
);
