import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box, Paper, Divider, Fade, Stack } from "@mui/material";
import { selectCities } from "../redux/weather/selectors";
import {
  fetchHourlyForecast,
  fetchWeatherForCity,
} from "../redux/weather/thunks";
import Chart from "../components/Chart";
import { Preloader } from "../components/Preloader";
import { CustomButton } from "../components/Button";

const PAGE_STYLES = {
  container: {
    minHeight: "100vh",
    p: { xs: 2, sm: 6 },
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    color: "white",
  },
  paper: {
    px: { xs: 3, sm: 6 },
    py: 4,
    borderRadius: 5,
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(12px)",
    color: "white",
  },
};

export const CityDetailsPage: React.FC = () => {
  const { name: cityName } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cities = useSelector(selectCities);
  const city = cities.find((c) => c.city === cityName);

  const icon = `https://openweathermap.org/img/wn/${city?.icon}@4x.png`;

  useEffect(() => {
    if (cityName) {
      dispatch(fetchWeatherForCity(cityName) as never);
      dispatch(fetchHourlyForecast(cityName) as never);
    }
  }, [dispatch, cityName]);

  if (!city) {
    return <Preloader />;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Fade in timeout={600}>
      <Box sx={PAGE_STYLES.container}>
        <Paper elevation={10} sx={PAGE_STYLES.paper}>
          <CustomButton
            label="← Назад"
            variant="outlined"
            sx={{ mb: 3, borderColor: "white", color: "white" }}
            onClick={handleBackClick}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {city.city}
              </Typography>

              <Typography variant="h5" gutterBottom>
                {city.description}
              </Typography>
            </Stack>
            <img src={icon} alt={city.description} width={150} height={150} />
          </Box>

          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }} />

          <Typography variant="h4" fontWeight="medium">
            {Math.round(city.temperature)}°C
          </Typography>

          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            Оновлено: {new Date(city.lastUpdated).toLocaleString()}
          </Typography>

          {city.forecast && city.forecast.length > 0 && <Chart city={city} />}
        </Paper>
      </Box>
    </Fade>
  );
};
