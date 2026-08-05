import React from "react";
import { Box, Button, FormControl, Typography } from "@mui/material";
import MyMultiLineTextField from "./FormComponents/MyMultiLineField";
import MyTextField from "./FormComponents/MyTextField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import { Navigate, useNavigate } from "react-router-dom";
import MyPasswordField from "./FormComponents/MyPasswordField";
import MySelectField from "./FormComponents/MySelectField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const defaultValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  userType: 1,
};

const userTypes = [1, 2];

const AddUser = () => {
  const resetFields = () => {
    reset();
  };

  const [userType, setUserType] = React.useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setUserType(event.target.value);
  };

  const navigate = useNavigate();

  const submitUser = (user) => {
    AxiosInstance.post(`users/`, {
      username: user.username,
      email: user.email,
      password: user.password,
      userType: userType,
    }).then(() => {
      window.alert(`Created ${user.username} successfully`);
      navigate("/AdminPage");
    });
  };

  const { handleSubmit, reset, control } = useForm({
    defaultValues: defaultValues,
  });

  return (
    <div>
      <form onSubmit={handleSubmit(submitUser)}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginLeft: "20px" }}>Add new user</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "95%",
            boxShadow: 2,
            padding: 4,
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", marginTop: "1.8%" }}>
            <MyTextField
              label="Username"
              name="username"
              control={control}
              placeholder="Username"
              width={"95%"}
            />
          </Box>
          <Box sx={{ display: "flex", marginTop: "1.8%" }}>
            <MyTextField
              label="Email"
              name="email"
              control={control}
              placeholder="Email address"
              width={"95%"}
            />
          </Box>
          <Box sx={{ display: "flex", marginTop: "1.8%" }}>
            <MyPasswordField
              label="Password"
              name="password"
              control={control}
              placeholder="password"
              width={"95%"}
            />
          </Box>
          <Box sx={{ display: "flex", marginTop: "1.8%" }}>
            <MyPasswordField
              label="Confirm password"
              name="confirmPassword"
              control={control}
              placeholder="password"
              width={"95%"}
            />
          </Box>
          <Box sx={{ display: "flex", marginTop: "1.8%" }}>
            <FormControl fullWidth>
              <InputLabel id="user-group-select">User Group</InputLabel>
              <Select
                labelId="user-group-select"
                value={userType}
                label="User group"
                onChange={handleChange}
              >
                <MenuItem value={1}>Student</MenuItem>
                <MenuItem value={2}>Teacher</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            marginTop: "1.8%",
            justifyContent: "space-around",
          }}
        >
          <Button variant="outlined" type="reset" onClick={resetFields}>
            Reset form
          </Button>
          <Button variant="contained" type="submit">
            Add new User
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddUser;
