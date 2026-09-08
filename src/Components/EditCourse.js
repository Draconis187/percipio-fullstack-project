import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import MyMultiLineTextField from "./FormComponents/MyMultiLineField";
import MyTextField from "./FormComponents/MyTextField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NavBar from "./NavBar";

const defaultValues = {
  Name: "",
  Description: "",
  Subject: "",
  NumberOfSteps: 0,
};

const schema = yup.object({
  Name: yup.string().required("Course Name is required."),
  Description: yup.string().required("Description is required."),
  Subject: yup.string().required("Subject is required."),
  NumberOfSteps: yup
    .number("Must be a number")
    .positive("Number can not be negative")
    .integer("Must be a number")
    .moreThan(0, "Must be higher than 0.")
    .required("This field is required."),
});

const EditCourse = () => {
  const courseParams = useParams();
  const editCourseID = courseParams.id;
  const [originalCreatorID, setOriginalCreatorID] = useState();

  const navigate = useNavigate();

  const GetCourse = () => {
    AxiosInstance.get(`courses/${editCourseID}`).then((res) => {
      setOriginalCreatorID(res.data.CreatorID);
      setValue("Name", res.data.Name);
      setValue("Description", res.data.Description);
      setValue("Subject", res.data.Subject);
      setValue("NumberOfSteps", res.data.NumberOfSteps);
    });
  };

  useEffect(() => {
    GetCourse();
  }, []);

  const undoChanges = () => {
    GetCourse();
  };

  const deleteCourse = (course) => {
    if (
      window.confirm(
        `Are you sure you wish to delete the ${course.Name} course?`,
      ) == true
    ) {
      AxiosInstance.put(`courses/${editCourseID}/`, {
        CreatorID: originalCreatorID,
        Name: course.Name,
        Description: course.Description,
        Subject: course.Subject,
        NumberOfSteps: course.NumberOfSteps,
        IsDeleted: 1,
      }).then(() => {
        window.alert(`Successfully deleted ${course.Name}`);
        navigate("/homePage");
      });
    }
  };

  const submitCourse = (course) => {
    AxiosInstance.put(`courses/${editCourseID}/`, {
      CreatorID: originalCreatorID,
      Name: course.Name,
      Description: course.Description,
      Subject: course.Subject,
      NumberOfSteps: course.NumberOfSteps,
      IsDeleted: 0,
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        window.alert(`Updated ${course.Name} successfully`);
        navigate(`/homePage`);
      } else {
        window.alert("Error editing course, see form for details.");
      }
    });
  };

  const { handleSubmit, reset, control, setValue } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit(submitCourse)}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginLeft: "20px" }}>Add new course</Typography>
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
              label="Course Name"
              name="Name"
              control={control}
              placeholder="Course Name"
              width={"95%"}
            />
          </Box>
          <Box sx={{ display: "flex", marginTop: "1.8%" }}>
            <MyMultiLineTextField
              label="Description"
              name="Description"
              control={control}
              placeholder="Full description of the course's contents"
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
            onClick={handleSubmit(deleteCourse)}
          >
            <DeleteIcon />
            Delete Course
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

export default EditCourse;
