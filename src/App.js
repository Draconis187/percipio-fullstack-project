import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import StudentEnroll from "./Components/StudentEnroll";
import AddCourse from "./Components/AddCourse";
import HomePage from "./Components/HomePage";
import EditCourse from "./Components/EditCourse";
import CourseDetails from "./Components/CourseDetails";
import AdminPage from "./Components/AdminPage";
import EditUser from "./Components/EditUser";
import AddUser from "./Components/AddUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/studentEnroll" element={<StudentEnroll />} />
        <Route path="homePage/addCourse" element={<AddCourse />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="homePage/editCourse/:id" element={<EditCourse />} />
        <Route path="homePage/courseDetails/:id" element={<CourseDetails />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="adminPage/addUser" element={<AddUser />} />
        <Route path="admin/editUser" element={<EditUser />} />
      </Routes>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
