import { CircularProgress, Box } from "@mui/material";

export const Preloader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="info" size={80} />
    </Box>
  );
};
