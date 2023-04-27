import { useEffect, useState, useMemo } from "react";
import { useValue } from "../../context/ContextProvider";
import UserManagementActions from "./UserManagementActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getUsers } from "../../actions/user";
import { getAllTeams } from "../../actions/team";
import Layout from "../../layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../../components/DeleteModal";
import BreadCrumbBar from "../../components/BreadCrumbBar";
import { endLoading, startLoading } from "../../actions/utils/loading";
import Skeleton from "@mui/material/Skeleton";

export default function UserManagement() {
  const {
    state: { currentUser, users, teams, loading },
    dispatch,
  } = useValue();

  users.map((user) => {
    if (user.team !== null && user.team !== undefined) {
      user.teamName = user.team.teamTitle;
    } else {
      user.teamName = "Kein Team";
    }
    return user;
  });

  const [rowId, setRowId] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [teamNames, setTeamNames] = useState(["Kein Team"]);

  useEffect(() => {
    startLoading(dispatch);
    if (currentUser !== null) {
      getUsers(dispatch, currentUser);
      getAllTeams(dispatch, currentUser);
      if (teams !== null)
        teams.map((team) => {
          setTeamNames((teamNames) => [...teamNames, team.teamTitle]);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (teams !== null) {
      endLoading(dispatch);
    }
  }, [teams]);

  const columns = useMemo(
    () => [
      {
        field: "_id",
        headerName: "ID",
        width: 190,
        editable: false,
        hide: true,
      },
      {
        field: "actions",
        headerName: "Speichern",
        type: "actions",
        renderCell: (params) => (
          <UserManagementActions {...{ params, rowId, setRowId }} />
        ),
      },
      {
        field: "lastName",
        headerName: "Nachname",
        width: 100,
        editable: true,
      },
      {
        field: "firstName",
        headerName: "Vorname",
        width: 100,
        editable: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
        editable: true,
      },
      {
        field: "role",
        headerName: "Rolle",
        type: "singleSelect",
        valueOptions: ["Mitarbeiter", "Admin", "Product Owner"],
        width: 120,
        editable: true,
      },
      {
        field: "title",
        headerName: "Berufsbezeichnung",
        type: "singleSelect",
        valueOptions: [
          "Keine Bezeichnung",
          "Software Developer",
          "UI/UX Designer",
          "Tester",
        ],
        width: 160,
        editable: true,
      },
      {
        field: "teamName",
        headerName: "Team",
        type: "singleSelect",
        valueOptions: teamNames,
        width: 115,
        editable: false,
      },
      {
        field: "active",
        headerName: "Aktiviert",
        type: "boolean",
        width: 80,
        editable: true,
      },
    ],
    [rowId]
  );

  // Breadcrumb information
  const breadCrumbInfo = [
    { name: "Dashboard", link: "/dashboard/" },
    { name: "Nutzerverwaltung" },
  ];

  return (
    <Layout
      inhalt={
        <>
          <DeleteModal
            showDeleteModal={showDeleteModal}
            close={() => {
              setShowDeleteModal(false);
              getUsers(dispatch, currentUser); //load users again works only > 1 user
            }}
            submitdelete={() => {
              setShowDeleteModal(false);
              getUsers(dispatch, currentUser); //load users again works only > 1 user
            }}
            id={selected}
            type="user"
            message="Wollen Sie die/den ausgewählten Nutzer wirklich löschen? Diese Aktion kann nicht
            rückgängig gemacht werden!"
            dispatch={dispatch}
            currentUser={currentUser}
          />
          <BreadCrumbBar
            breadCrumbInfo={breadCrumbInfo}
            backButtonLink={"/dashboard/"}
            loading={loading}
          />
          <Box
            sx={{
              bgcolor: "background.secondary",
              color: "text.default",
              mx: "5%",
              mb: 5,
              p: 2,
              width: "90%",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {loading ? (
              <Skeleton variant="rectangular" width={"100%"} height={"600px"} />
            ) : (
              <>
                <Box
                  display="flex"
                  sx={{ alignItems: "center", justifyContent: "left", mb: 2 }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", pl: 2 }}
                  >
                    Nutzerverwaltung
                  </Typography>

                  <Button
                    onClick={() => setShowDeleteModal(true)}
                    variant="delete-button"
                    disabled={selected.length === 0}
                    sx={{ ml: "auto" }}
                  >
                    <DeleteIcon sx={{ mr: 1 }} /> Löschen
                  </Button>
                </Box>
                <Grid container sx={{ height: 650, width: "100%" }}>
                  <DataGrid
                    getRowId={(users) => users._id}
                    rows={users}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    disableExportButton={true}
                    experimentalFeatures={{ newEditingApi: false }}
                    onCellEditCommit={(params) => setRowId(params.id)}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    onSelectionModelChange={(id) => {
                      const selectedIDs = new Set(id);
                      const selectedRowData = users.filter((row) =>
                        selectedIDs.has(row._id)
                      );
                      setSelected(selectedRowData);
                    }}
                  />
                </Grid>
              </>
            )}
          </Box>
        </>
      }
    />
  );
}
