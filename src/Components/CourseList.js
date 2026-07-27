import { React, useEffect, useMemo, useState } from "react";
import AxiosInstance from "./Axios";
import {
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import { Edit as EditIcon } from "@mui/icons-material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [courseListData, setCourseListData] = useState();
  const [loading, setLoading] = useState(true);

  const GetCourseList = () => {
    AxiosInstance.get(`courses/`).then((res) => {
      setCourseListData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetCourseList();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "Name",
        header: "Course Name",
        enableColumnOrdering: false,
      },
      {
        accessorKey: "Description",
        header: "Course Description",
        enableColumnOrdering: false,
      },
      {
        accessorKey: "Subject",
        header: "Subject",
        enableColumnOrdering: false,
      },
      {
        accessorKey: "NumberOfSteps",
        header: "Number Of Steps",
        enableColumnOrdering: false,
      },
    ],
    [],
  );

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={courseListData}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              <IconButton
                color="secondary"
                component={Link}
                to={`EditCourse/${row.original.CourseID}`}
              >
                <EditIcon />
              </IconButton>
            </Box>
          )}
        />
      )}
      <Box>
        <Button variant="contained" component={Link} to={"AddCourse/"}>
          Add New Course
        </Button>
      </Box>
    </div>
  );
};

export default CourseList;
