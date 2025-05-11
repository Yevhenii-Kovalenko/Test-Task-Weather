import { createSlice } from "@reduxjs/toolkit";
import type { WeatherState } from "./types";
import { weatherReducers } from "./reducers";

const initialState: WeatherState = {
  cities: [],
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    weatherReducers(builder);
  },
});

export default weatherSlice.reducer;
