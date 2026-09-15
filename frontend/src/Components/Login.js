import * as React from "react";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import MyTextField from "./FormComponents/MyTextField";
import MyPasswordField from "./FormComponents/MyPasswordField";
import AxiosInstance from "./Axios";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const Login = (props) => {
  const navigate = useNavigate();
  const [loginErrorMessage, showLoginErrorMessage] = useState(false);

  const defaultValues = {
    username: "",
    password: "",
  };

  const schema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required."),
  });

  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const submitLogin = (user) => {
    AxiosInstance.post(`login/`, {
      username: user.username,
      password: user.password,
    })
      .then((res) => {
        sessionStorage.setItem("Token", res.data.token);
        sessionStorage.setItem("userId", res.data.id);
        sessionStorage.setItem("userType", res.data.userType);
        switch (res.data.userType) {
          case "0":
            return navigate("/adminPage");
          case "1":
            return navigate("/studentPage");
          case "2":
            return navigate("/homePage");
          default:
            break;
        }
      })
      .catch((error) => {
        showLoginErrorMessage(true);
        setTimeout(() => {
          showLoginErrorMessage(false);
        }, 3000);
      });
  };

  return (
    <Box
      component="section"
      sx={{
        mx: "5px",
        pb: "5px",
        textAlign: "center",
      }}
    >
      <Container>
        <h1>Welcome to the Learning Management System</h1>
      </Container>
      <Container>
        <Box
          sx={{
            border: "1px solid lightgrey",
            borderRadius: "10px",
            pb: "10px",
            width: "60%",
            bgcolor: "white",
            display: "inline-block",
          }}
        >
          <form onSubmit={handleSubmit(submitLogin)}>
            <Container>
              <Box
                sx={{
                  marginTop: "5%",
                  width: { xs: "100%", sm: "259px" },
                  display: "inline-block",
                }}
              >
                <MyTextField
                  label="Username"
                  name="username"
                  control={control}
                  placeholder="Username"
                  width={"100%"}
                />
              </Box>

              <Box sx={{ display: "block", marginTop: "5%" }}>
                <MyPasswordField
                  label="Password"
                  name="password"
                  control={control}
                  placeholder="Password"
                  width={"100px"}
                />
              </Box>
            </Container>
            {loginErrorMessage ? (
              <Typography color="error">
                The username or password are not valid
              </Typography>
            ) : null}
            <Container sx={{ display: "block", marginTop: "5%" }}>
              <Button variant="contained" type="submit">
                Log in
              </Button>
            </Container>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
