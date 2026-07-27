import { Box } from "@mui/material";
import AddCourse from "./AddCourse";
import CourseList from "./CourseList";

const HomePage = () => {
  return (
    <Box>
      <div>
        <CourseList />
      </div>
    </Box>
  );
};

export default HomePage;
