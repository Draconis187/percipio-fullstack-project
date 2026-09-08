import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

export default function MySelectField(props) {
  const { label, width, placeholder, name, control } = props;
  const [group, setGroup] = React.useState("");

  const handleChange = (event) => {
    setGroup(event.target.value);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, formState }) => (
        <FormControl fullWidth>
          <InputLabel>User Group</InputLabel>
          <Select value={value} label={label} onChange={handleChange}>
            <MenuItem value={value}>{label}</MenuItem>
          </Select>
        </FormControl>
      )}
    />
  );
}
