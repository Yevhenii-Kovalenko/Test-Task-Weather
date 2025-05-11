import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";

const TITLE_TEXT = "Графік температури на сьогодні";

const Chart = ({ city }) => {
  return (
    <Box mt={6}>
      <Typography variant="h6" gutterBottom>
        {TITLE_TEXT}
      </Typography>
      <Box
        sx={{
          overflowX: "auto",
          borderRadius: 2,
          mt: 2,
          background: "rgba(255,255,255,0.1)",
          p: 2,
        }}
      >
        <LineChart
          xAxis={[
            {
              data: city.forecast.map((d) => d.hour),
              label: "Година",
              valueFormatter: (v) => `${v}:00`,
              tickMinStep: 1,
            },
          ]}
          series={[
            {
              data: city.forecast.map((d) => d.temp),
              label: "Температура °C",
              color: "#90caf9",
            },
          ]}
          width={600}
          height={300}
        />
      </Box>
    </Box>
  );
};

export default Chart;
