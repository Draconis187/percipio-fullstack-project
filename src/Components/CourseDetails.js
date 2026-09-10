import { Box, Button, Typography, IconButton, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

const defaultValues = {
  Name: "",
  Description: "",
  Subject: "",
  NumberOfSteps: 0,
};

const CourseDetails = () => {
  const courseParams = useParams();
  const courseID = courseParams.id;
  const [loading, setLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState();
  const userType = sessionStorage.getItem("userType");

  const navigate = useNavigate();
  const GetCourse = () => {
    AxiosInstance.get(`courses/${courseID}`).then((res) => {
      setCourseDetails(res.data);
      setLoading(false);
    });
  };

  const submitCourse = (course) => {
    AxiosInstance.post(`studentsAndCourses/`, {
      UserID: sessionStorage.getItem("userId"),
      CourseID: courseID,
    }).then(() => {
      window.alert(`Enrolled in ${courseDetails.Name} successfully`);
      navigate("/studentPage");
    });
  };

  useEffect(() => {
    GetCourse();
  }, [GetCourse]);

  const navigateBack = () => {
    if (userType === 1) {
      navigate(`/studentPage`);
    } else {
      navigate(`/homePage`);
    }
  };

  const { handleSubmit } = useForm({
    defaultValues: defaultValues,
  });

  return (
    <div>
      <NavBar />
      <div>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                marginBottom: "10px",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" sx={{ marginLeft: "20px" }}>
                Course Details
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
                <Container>
                  <Typography variant="h6">Course Name</Typography>
                  <Typography variant="body1">{courseDetails.Name}</Typography>
                </Container>
              </Box>
              <Box sx={{ display: "flex", marginTop: "1.8%" }}>
                <Container>
                  <Typography variant="h6">Full course description</Typography>
                  <Typography variant="body1">
                    {courseDetails.Description}
                  </Typography>
                </Container>
              </Box>
              <Box sx={{ display: "flex", marginTop: "1.8%" }}>
                <Container>
                  <Typography variant="h6">Course subject</Typography>
                  <Typography variant="body1">
                    {courseDetails.Subject}
                  </Typography>
                </Container>
              </Box>
              <Box sx={{ display: "flex", marginTop: "1.8%" }}>
                <Container>
                  <Typography variant="h6">
                    Number of steps in the course to complete
                  </Typography>
                  <Typography variant="body1">
                    {courseDetails.NumberOfSteps}
                  </Typography>
                </Container>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginTop: "1.8%",
                justifyContent: "space-around",
              }}
            >
              <Button variant="outlined" type="reset" onClick={navigateBack}>
                Back to course list
              </Button>
              <Button
                variant="contained"
                type="submit"
                onClick={handleSubmit(submitCourse)}
                disabled={userType === 1 ? false : true}
              >
                Enroll in this course
              </Button>
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
