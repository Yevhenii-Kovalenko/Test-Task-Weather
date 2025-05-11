import { setError, setForecast, setLoading, setWeather } from "./actions";
import type { HourlyForecast } from "./types";
import type { AppDispatch } from "../store";
import { API_KEY } from "../../config";

export const fetchWeatherForCity =
  (city: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok)
        throw new Error(
          "Не вдалося отримати погоду по заданому місту.Спробуйте ще раз!"
        );

      const data = await res.json();

      dispatch(
        setWeather({
          id: data.id,
          city: data.name,
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          lastUpdated: new Date().toISOString(),
          icon: data.weather[0].icon,
        })
      );
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateAllCities =
  () => async (dispatch: AppDispatch, getState: () => any) => {
    const cities = getState().weather.cities;
    for (const city of cities) {
      dispatch(fetchWeatherForCity(city.city));
    }
  };

export const fetchHourlyForecast =
  (city: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      const todayForecast = data.list.filter((entry: any) => {
        const datePart = entry.dt_txt.split(" ")[0];
        return datePart === today;
      });

      const hourly: HourlyForecast[] = todayForecast.map((entry: any) => {
        const time = entry.dt_txt.split(" ")[1]; // "12:00:00"
        const hour = parseInt(time.split(":")[0]); // 12
        return {
          hour,
          temp: Math.round(entry.main.temp),
        };
      });

      dispatch(setForecast({ city, forecast: hourly }));
    } catch (err: any) {
      dispatch(setError("Не вдалося отримати прогноз."));
    }
  };
