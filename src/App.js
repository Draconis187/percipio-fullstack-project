import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import AddCourse from "./Components/AddCourse";
import HomePage from "./Components/HomePage";
import EditCourse from "./Components/EditCourse";
import CourseDetails from "./Components/CourseDetails";
import AdminPage from "./Components/AdminPage";
import EditUser from "./Components/EditUser";
import AddUser from "./Components/AddUser";
import StudentPage from "./Components/StudentPage";
import ProtectedRoute from "./Components/ProtectedRoutes";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

function App() {
  return (
    <Box className="App">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="homePage/addCourse" element={<AddCourse />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="homePage/editCourse/:id" element={<EditCourse />} />
          <Route
            path="homePage/courseDetails/:id"
            element={<CourseDetails />}
          />
          <Route path="/studentPage" element={<StudentPage />} />
          <Route
            path="studentPage/courseDetails/:id"
            element={<CourseDetails />}
          />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="adminPage/addUser" element={<AddUser />} />
          <Route path="adminPage/editUser/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
