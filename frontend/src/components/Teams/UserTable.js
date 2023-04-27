import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useValue } from "../../context/ContextProvider";
import { getUsers } from "../../actions/user";
import { useEffect } from "react";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    width: 190,
    editable: false,
    hide: true,
  },
  {
    field: "lastName",
    headerName: "Nachname",
    width: 150,
    editable: false,
  },
  {
    field: "firstName",
    headerName: "Vorname",
    width: 150,
    editable: false,
  },
  {
    field: "title",
    headerName: "Berufsbezeichnung",
    width: 250,
    editable: false,
  },
  {
    field: "location",
    headerName: "Standort",
    width: 250,
    editable: false,
  },
];

export default function UserTable(props) {
  const {
    state: { currentUser, users },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (currentUser !== null) {
      getUsers(dispatch, currentUser);
    }
  }, [currentUser]);

  const rows = users
    .filter((user) => {
      if (props.show === "noMembers") {
        return user.team === null;
      }
      if (props.show === "members") {
        return user?.team?._id === props.teamId;
      }
    })
    .map((users) => ({
      _id: users._id,
      firstName: users.firstName,
      lastName: users.lastName,
      title: users.title,
      location: users.location,
    }));

  return (
    <Box sx={{ height: 500, width: "96%", mx: "2%", my: "15px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        getRowId={(rows) => rows._id}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        onSelectionModelChange={(id) => {
          const selectedIDs = new Set(id);
          const selectedRowData = rows.filter((row) =>
            selectedIDs.has(row._id)
          );
          if (props.show === "noMembers")
            props.setSelectedTeamsToAdd(selectedRowData);
          if (props.show === "members")
            props.setSetSelectedTeamsToRemove(selectedRowData);
        }}
      />
    </Box>
  );
}
