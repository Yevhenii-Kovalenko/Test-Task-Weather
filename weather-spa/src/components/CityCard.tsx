import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Stack,
} from "@mui/material";
import { Link } from "react-router";
import { CustomButton } from "./Button";
import type { WeatherData } from "../redux/weather/types";
import { fetchWeatherForCity } from "../redux/weather/thunks";
import { removeCity } from "../redux/weather/actions";
import { useAppDispatch } from "../hooks/useAppDispatch";

interface Props {
  data: WeatherData;
}

const CARD_STYLES = {
  minWidth: "250px",
  maxWidth: "320px",
  width: "100%",
  borderRadius: 4,
  px: { xs: 1, sm: 2 },
  py: { xs: 1.5, sm: 3 },
  color: "white",
  background: "rgba(255, 255, 255, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(5px)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 30px #61A3DC",
  },
};

export const CityCard: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();

  const handleRefresh = () => {
    dispatch(fetchWeatherForCity(data.city));
  };

  const handleDelete = () => {
    dispatch(removeCity(data.city));
  };

  const icon = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;

  return (
    <Card sx={CARD_STYLES}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <img
              src={icon}
              alt={`Піктограма погоди: ${data.description}`}
              width={50}
              height={50}
            />
            <Typography variant="h5" fontWeight="bold">
              {data.city}
            </Typography>
          </Box>
        </Box>

        <Typography color="white" variant="subtitle1" mb={1}>
          {data.description}
        </Typography>

        <Typography variant="h4" fontWeight="bold">
          {Math.round(data.temperature)}°C
        </Typography>

        <Typography variant="caption" color="white">
          Оновлено: {new Date(data.lastUpdated).toLocaleTimeString()}
        </Typography>
      </CardContent>

      <CardActions>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          width="100%"
          justifyContent="space-between"
          alignItems="stretch"
        >
          <CustomButton
            label="Оновити"
            size="small"
            variant="outlined"
            onClick={handleRefresh}
            fullWidth
          />
          <CustomButton
            label="Видалити"
            size="small"
            variant="outlined"
            color="error"
            onClick={handleDelete}
            fullWidth
          />
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            component={Link}
            to={`/city/${data.city}`}
            fullWidth
          >
            Детальніше
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
