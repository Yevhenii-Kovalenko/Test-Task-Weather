import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Alert, Typography } from "@mui/material";
import { CityCard } from "./CityCard";
import { Preloader } from "./Preloader";
import {
  selectCities,
  selectWeatherError,
  selectWeatherLoading,
} from "../redux/weather/selectors";
import { updateAllCities } from "../redux/weather/thunks";
import { useAppDispatch } from "../hooks/useAppDispatch";

const NO_ITEMS_TITLE = "No cities added yet!";

export const CityList: React.FC = () => {
  const dispatch = useAppDispatch();
  const cities = useSelector(selectCities);
  const loading = useSelector(selectWeatherLoading);
  const error = useSelector(selectWeatherError);

  useEffect(() => {
    dispatch(updateAllCities() as never);
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 5 }}>
          {error}
        </Alert>
      )}
      {cities.length === 0 && (
        <Typography
          variant="h5"
          color="white"
          textAlign="center"
          fontWeight="bold"
        >
          {NO_ITEMS_TITLE}
        </Typography>
      )}
      <Grid container spacing={4}>
        {cities.map((city) => (
          <Grid item xs={12} sm={6} md={4} key={city.id}>
            <CityCard data={city} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
