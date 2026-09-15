import { Box, Typography } from "@mui/material";
import CourseList from "./CourseList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./NavBar";
import CssBaseline from "@mui/material/CssBaseline";

const HomePage = () => {
  const navigate = useNavigate();

  const checkUserCredentials = () => {
    const userType = sessionStorage.getItem("userType");
    if (userType === 1) {
      navigate(`/studentPage`);
    }
  };

  useEffect(() => {
    checkUserCredentials();
  }, []);

  return (
    <Box>
      <CssBaseline />
      <div>
        <NavBar />
        <Box>
          <Typography variant="h4">Course List</Typography>
          <CourseList />
        </Box>
      </div>
    </Box>
  );
};

export default HomePage;
