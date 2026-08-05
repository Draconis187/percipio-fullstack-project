import React from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import MyMultiLineTextField from "./FormComponents/MyMultiLineField";
import MyTextField from "./FormComponents/MyTextField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const defaultValues = {
  Name: "",
  Description: "",
  Subject: "",
  NumberOfSteps: 0,
};

const EditUser = () => {
  const UserParams = useParams();
  const editUserID = UserParams.id;
  const [loading, setLoading] = useState(true);
  const [EditorID, setEditorID] = useState();

  const navigate = useNavigate();

  const GetUser = () => {
    AxiosInstance.get(`users/${editUserID}`).then((res) => {
      setEditorID(res.data.CreatorID);
      setValue("username", res.data.username);
      setValue("email", res.data.email);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetUser();
  }, []);

  const undoChanges = () => {
    setLoading(true);
    GetUser();
  };

  const deleteUser = (user) => {
    if (
      window.confirm(
        `Are you sure you wish to delete the ${user.Name} user?`,
      ) == true
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
      CreatorID: EditorID,
      Name: user.Name,
      Description: user.Description,
      Subject: user.Subject,
      NumberOfSteps: user.NumberOfSteps,

      IsDeleted: 0,
    }).then(() => {
      window.alert(`Updated ${user.Name} successfully`);
      navigate(`/homePage`);
    });
  };

  const { handleSubmit, reset, control, setValue } = useForm({
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
          <Typography sx={{ marginLeft: "20px" }}>Add new User</Typography>
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
              label="User Name"
              name="Name"
              control={control}
              placeholder="User Name"
              width={"95%"}
            />
          </Box>
          <Box sx={{ display: "flex", marginTop: "1.8%" }}>
            <MyMultiLineTextField
              label="Description"
              name="Description"
              control={control}
              placeholder="Full description of the User's contents"
              width={"95%"}
            />
          </Box>
          <Box sx={{ display: "flex", marginTop: "1.8%" }}>
            <MyTextField
              label="Subject"
              name="Subject"
              control={control}
              placeholder="Subject"
              width={"95%"}
            />
          </Box>
          <Box sx={{ display: "flex", marginTop: "1.8%" }}>
            <MyTextField
              label="Number of steps"
              name="NumberOfSteps"
              control={control}
              placeholder="0"
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
