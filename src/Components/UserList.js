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

const UserList = () => {
  const [UserListData, setUserListData] = useState();
  const [loading, setLoading] = useState(true);

  const GetUserList = () => {
    AxiosInstance.get(`users/`).then((res) => {
      setUserListData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetUserList();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "username",
        header: "User Name",
        enableColumnOrdering: false,
      },
      {
        accessorKey: "email",
        header: "Email Address",
        enableColumnOrdering: false,
      },
      {
        accessorKey: "userType",
        header: "User Type",
        Cell: ({ row }) => {
          switch (row.original.userType) {
            case 1:
              return <span>Student</span>;
            case 2:
              return <span>Teacher</span>;

            default:
              return <span>Admin</span>;
          }
        },
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
          data={UserListData}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              <IconButton
                color="secondary"
                nativeButton={false}
                component={Link}
                // to={`EditUser/${row.original.UserID}`}
              >
                <EditIcon />
              </IconButton>
            </Box>
          )}
        />
      )}
      <Box sx={{ display: "flex", marginTop: "1.8%" }}>
        <Button variant="contained" component={Link} to={"AddUser/"}>
          Add New User
        </Button>
      </Box>
    </div>
  );
};

export default UserList;
