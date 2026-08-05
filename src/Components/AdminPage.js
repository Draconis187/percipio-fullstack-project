import { Box } from "@mui/material";
import AddCourse from "./AddCourse";
import CourseList from "./CourseList";
import UserList from "./UserList";

const AdminPage = () => {
  return (
    <Box>
      <div>
        <UserList />
      </div>
    </Box>
  );
};

export default AdminPage;
