import React, { useState } from "react";
import { TextField, Stack, Paper, Typography } from "@mui/material";
import { CustomButton } from "./Button";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchWeatherForCity } from "../redux/weather/thunks";

const FORM_STYLES = {
  px: { xs: 3, sm: 5 },
  py: 4,
  mt: 4,
  mb: 6,
  mx: "auto",
  width: { xs: "80%", sm: "80%", md: "60%" },
  borderRadius: 5,
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(12px)",
  color: "white",
};

const TITLE_TEXT = "Пошук погоди за містом";

const AddCityForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [city, setCity] = useState("");

  const handleAddCity = () => {
    if (!city.trim()) return;
    dispatch(fetchWeatherForCity(city.trim()));
    setCity("");
  };

  const onChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <Paper elevation={6} sx={FORM_STYLES}>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{
          mb: "10px",
          fontSize: { xs: "20px", md: "24px" },
          textAlign: { xs: "center" },
        }}
      >
        {TITLE_TEXT}
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
      >
        <TextField
          fullWidth
          label="Назва міста"
          variant="outlined"
          value={city}
          onChange={onChange}
          aria-label="city name"
        />
        <CustomButton
          label="Пошук"
          variant="contained"
          color="info"
          size="large"
          onClick={handleAddCity}
        />
      </Stack>
    </Paper>
  );
};

export default AddCityForm;
