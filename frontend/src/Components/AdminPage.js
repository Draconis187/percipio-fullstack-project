import { Box } from "@mui/material";
import UserList from "./UserList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userType = sessionStorage.getItem("userType");
    if (userType === 1) {
      navigate(`/studentPage`);
    } else if (userType === 2) {
      navigate(`/homePage`);
    }
  }, []);

  return (
    <Box>
      <div>
        <NavBar />
        <UserList />
      </div>
    </Box>
  );
};

export default AdminPage;
