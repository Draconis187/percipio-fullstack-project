import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyTextField(props) {
  const { label, width, placeholder, name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          onChange={onChange}
          value={value}
          sx={{ width: { width } }}
          id="standard-basic"
          label={label}
          variant="outlined"
          placeholder={placeholder}
        />
      )}
    />
  );
}
