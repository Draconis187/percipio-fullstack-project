import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./NavBarStudents";
import StudentEnroll from "./StudentEnroll";

const StudentPage = () => {
  const navigate = useNavigate();

  const checkUserCredentials = () => {
    const userType = sessionStorage.getItem("userType");
    if (userType === 2) {
      navigate(`/homePage`);
    } else if (userType === 0) {
      navigate(`/adminPage`);
    }
  };

  useEffect(() => {
    checkUserCredentials();
  }, []);

  return (
    <Box>
      <div>
        <NavBar />
        <StudentEnroll />
      </div>
    </Box>
  );
};

export default StudentPage;
