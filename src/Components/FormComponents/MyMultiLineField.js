import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyMultiLineTextField(props) {
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
          id="multiline-flexible"
          label={label}
          multiline
          maxRows={4}
          placeholder={placeholder}
        />
      )}
    />
  );
}
