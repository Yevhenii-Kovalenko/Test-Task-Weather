import React from "react";
import { Button, CircularProgress } from "@mui/material";
import type { ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
  label: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  loading = false,
  label,
  disabled,
  ...rest
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : label}
    </Button>
  );
};
