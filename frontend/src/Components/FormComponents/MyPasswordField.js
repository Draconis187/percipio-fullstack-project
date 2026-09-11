import React, { useState } from "react";
import { IconButton, InputLabel, OutlinedInput } from "@mui/material";
import { FormHelperText } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller } from "react-hook-form";

export default function MyPasswordField(props) {
  const [passwordVisibility, togglePasswordVisibility] = useState(false);

  const { label, name, control } = props;

  const handleClickShowPassword = () =>
    togglePasswordVisibility((visible) => !visible);

  const handleMouseDownpassword = (event) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            onChange={onChange}
            value={value}
            error={!!error}
            type={passwordVisibility ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownpassword}
                  edge="end"
                >
                  {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
          />
          <FormHelperText sx={{ color: "#d32f2f" }}>
            {error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
