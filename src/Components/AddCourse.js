import React from "react";
import { Box, Button, Typography } from "@mui/material";
import MyMultiLineTextField from "./FormComponents/MyMultiLineField";
import MyTextField from "./FormComponents/MyTextField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import { Navigate, useNavigate } from "react-router-dom";

const defaultValues = {
  Name: "",
  Description: "",
  Subject: "",
  NumberOfSteps: 0,
};

const AddCourse = () => {
  const resetFields = () => {
    reset();
  };

  const navigate = useNavigate();

  const submitCourse = (course) => {
    AxiosInstance.post(`courses/`, {
      CreatorID: 1,
      Name: course.Name,
      Description: course.Description,
      Subject: course.Subject,
      NumberOfSteps: course.NumberOfSteps,
      IsDeleted: 0,
    }).then(() => {
      window.alert(`Created ${course.Name} successfully`);
      navigate(-1);
    });
  };

  const { handleSubmit, reset, control } = useForm({
    defaultValues: defaultValues,
  });

  return (
    <div>
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
