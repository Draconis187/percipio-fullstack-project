import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import StudentEnroll from "./Components/StudentEnroll";
import AddCourse from "./Components/AddCourse";
import HomePage from "./Components/HomePage";
import EditCourse from "./Components/EditCourse";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/studentEnroll" element={<StudentEnroll />} />
        <Route path="homePage/addCourse" element={<AddCourse />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="homePage/editCourse/:id" element={<EditCourse />} />
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
