import { Box, Button, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import MyTextField from "./FormComponents/MyTextField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MyPasswordField from "./FormComponents/MyPasswordField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NavBar from "./NavBar";

const defaultValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  userType: "",
};

const schema = yup.object({
  username: yup.string().required("Username is required."),
  email: yup.string().required("email is required."),
  password: yup.string().required("Subject is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
  userType: yup.number("Select an option"),
});

const EditUser = () => {
  const UserParams = useParams();
  const editUserID = UserParams.id;

  const navigate = useNavigate();

  const GetUser = () => {
    AxiosInstance.get(`users/${editUserID}`).then((res) => {
      setValue("username", res.data.username);
      setValue("email", res.data.email);
      setValue("userType", res.data.userType);
    });
  };

  useEffect(() => {
    GetUser();
  }, []);

  const undoChanges = () => {
    GetUser();
  };

  const deleteUser = (user) => {
    if (
      window.confirm(
        `Are you sure you wish to delete the ${user.Name} user?`,
      ) === true
    ) {
      AxiosInstance.put(`users/${editUserID}/`, {
        username: user.username,
        email: user.email,
        is_active: 0,
      }).then(() => {
        window.alert(`Successfully deleted ${user.Name}`);
        navigate("/homePage");
      });
    }
  };

  const submitUser = (user) => {
    AxiosInstance.put(`users/${editUserID}/`, {
      username: user.username,
      email: user.email,
      password: user.password,
      userType: user.userType,
    }).then(() => {
      window.alert(`Updated ${user.Name} successfully`);
      navigate(`/homePage`);
    });
  };

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit(submitUser)}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ marginLeft: "20px" }}>
            Edit user details
          </Typography>
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
        </Box>
        <Box
          sx={{
            display: "flex",
            marginTop: "1.8%",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="outlined"
            color="warning"
            onClick={handleSubmit(deleteUser)}
          >
            <DeleteIcon />
            Delete User
          </Button>
          <Button variant="outlined" type="reset" onClick={undoChanges}>
            <RestartAltIcon />
            Undo Changes
          </Button>
          <Button variant="contained" type="submit">
            <SaveIcon />
            Save Changes
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditUser;
