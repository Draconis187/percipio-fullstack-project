import React from "react";
import { Box, Button, Typography } from "@mui/material";
import MyMultiLineTextField from "./FormComponents/MyMultiLineField";
import MyTextField from "./FormComponents/MyTextField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const AddCourse = () => {
  const resetFields = () => {
    reset();
  };

  const navigate = useNavigate();

  const submitCourse = (course) => {
    AxiosInstance.post(`courses/`, {
      CreatorID: sessionStorage.getItem("userId"),
      Name: course.Name,
      Description: course.Description,
      Subject: course.Subject,
      NumberOfSteps: course.NumberOfSteps,
      IsDeleted: 0,
    }).then((res) => {
      if (res.status === 201) {
        window.alert(`Created ${course.Name} successfully`);
        navigate("/homePage");
      } else {
        window.alert("Error creating course, see form for details.");
      }
    });
  };

  const { handleSubmit, reset, control } = useForm({
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
          <Typography variant="h4" sx={{ marginLeft: "20px" }}>
            Add new course
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
              error
              label="Subject"
              name="Subject"
              control={control}
              placeholder="Subject"
              width={"95%"}
            />
          </Box>
          <Box sx={{ display: "flex", marginTop: "1.8%" }}>
            <MyTextField
              error
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
          <Button variant="outlined" type="reset" onClick={resetFields}>
            Reset form
          </Button>
          <Button variant="contained" type="submit">
            Add Course
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddCourse;
