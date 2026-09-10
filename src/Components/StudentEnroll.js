import { useEffect, useMemo, useState } from "react";
import AxiosInstance from "./Axios";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Switch, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

const StudentEnroll = () => {
  const navigate = useNavigate();

  const checkUserCredentials = () => {
    const userType = sessionStorage.getItem("userType");
    if (userType === 2) {
      navigate(`/homePage`);
    } else if (userType === 0) {
      navigate(`/adminPage`);
    }
  };

  const [courseListData, setCourseListData] = useState();
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState();
  const [allCourses, setAllCourses] = useState(true);

  const GetCourseLists = () => {
    let studentsCourses = [];
    AxiosInstance.get(`courses/`).then((res) => {
      setCourseListData(res.data);
      const studentCoursesCompare = res.data;

      AxiosInstance.get(`studentsAndCourses/`).then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          const currentSACCourseID = res.data[index].CourseID;

          if (res.data[index].UserID === sessionStorage.getItem("userId")) {
            for (let index = 0; index < studentCoursesCompare.length; index++) {
              if (
                studentCoursesCompare[index].CourseID === currentSACCourseID
              ) {
                studentsCourses.push(studentCoursesCompare[index]);
              }
            }
          }
        }
        setEnrolledCourses(studentsCourses);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    checkUserCredentials();
    GetCourseLists();
  }, [checkUserCredentials, GetCourseLists]);

  const allCoursesClick = () => {
    setAllCourses(!allCourses);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "Name",
        header: "Course Name",
        enableColumnOrdering: false,
      },
      {
        accessorKey: "Subject",
        header: "Subject",
        enableColumnOrdering: false,
      },
      {
        accessorKey: "NumberOfSteps",
        header: "Number of Steps",
        enableColumnOrdering: false,
      },
    ],
    [],
  );
  return (
    <div>
      <Box>
        <Typography>
          See my enrolled courses{" "}
          <Switch defaultChecked={false} onClick={allCoursesClick} />
        </Typography>
      </Box>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={allCourses ? courseListData : enrolledCourses}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              <IconButton
                color="secondary"
                nativeButton={false}
                component={Link}
                to={`courseDetails/${row.original.CourseID}`}
              >
                <InfoIcon />
              </IconButton>
            </Box>
          )}
        />
      )}
    </div>
  );
};

export default StudentEnroll;
