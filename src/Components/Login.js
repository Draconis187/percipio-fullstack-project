import * as React from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useForm } from "react-hook-form";
import MyTextField from "./FormComponents/MyTextField";
import MyPasswordField from "./FormComponents/MyPasswordField";
import AxiosInstance from "./Axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  const defaultValues = {
    username: "",
    password: "",
  };

  const submission = (data) => {
    AxiosInstance.post();
  };

  const { handleSubmit, reset, control } = useForm({
    defaultValues: defaultValues,
  });

  const submitLogin = (user) => {
    AxiosInstance.post(`login/`, {
      username: user.username,
      password: user.password,
    })
      .then((res) => {
        sessionStorage.setItem("Token", res.data.token);
        sessionStorage.setItem("userId", res.data.id);
        AxiosInstance.get(`users/${res.data.id}`).then((loggedIn) => {
          switch (loggedIn.data.userType) {
            case 0:
              return navigate("/adminPage");
            case 1:
              return navigate("/studentEnroll");
            case 2:
              return navigate("/homePage");
            default:
              break;
          }
        });

        //navigate("/adminPage");
      })
      .catch((error) => {
        console.error("Error during login", error);
      });
  };

  return (
    <Box component="section">
      <Container>
        <h1>Welcome to the Learning Management System</h1>
        <h3>Please log in</h3>
      </Container>
      <Container>
        <Box sx={{ borderRadius: 1, borderWidth: "2px" }}>
          <form onSubmit={handleSubmit(submitLogin)}>
            <Container>
              <Box sx={{ display: "flex", marginTop: "1.8%" }}>
                <MyTextField
                  label="Username"
                  name="username"
                  control={control}
                  placeholder="Username"
                  width={"50%"}
                />
              </Box>
            </Container>
            <Container>
              <Box sx={{ display: "flex", marginTop: "1.8%" }}>
                <MyPasswordField
                  label="Password"
                  name="password"
                  control={control}
                  placeholder="Password"
                  width={"50%"}
                />
              </Box>
            </Container>
            <Container sx={{ display: "flex", marginTop: "1.8%" }}>
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
