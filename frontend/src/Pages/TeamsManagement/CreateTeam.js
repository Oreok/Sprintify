import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "dayjs/locale/de";
import Layout from "../../layout";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useValue } from "../../context/ContextProvider";
import { addTeam } from "../../actions/team";
import UserTable from "../../components/Teams/UserTable";
import BreadCrumbBar from "../../components/BreadCrumbBar";

export default function CreateTeam() {

  // Breadcrumb information
  const breadCrumbInfo = [
    { name: "Teams-Verwaltung", link: "/teamsManagement/" },
    { name: "Team hinzufügen" },
  ];

  const Navigate = useNavigate();

  const [selectedTeamsToAdd, setSelectedTeamsToAdd] = React.useState();
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  async function handleAddSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const team = {
      teamTitle: form.teamTitle.value,
      teamDescription: form.teamDescription.value,
      members: selectedTeamsToAdd,
    };
    await addTeam(dispatch, team, currentUser);

    Navigate(`/teamsManagement`);
  }

  return (
    <Layout
      inhalt={
        <>
          <BreadCrumbBar
            breadCrumbInfo={breadCrumbInfo}
            backButtonLink={"/teamsManagement"}
          />
          <Box
            sx={{
              bgcolor: "background.secondary",
              color: "text.default",
              mx: "5%",
              p: 2,
              width: "90%",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "10px",
            }}
          >
            <form onSubmit={(event) => handleAddSubmit(event)}>
              <Box
                display="flex"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Box display="flex">
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", ml: 2, mt: 1 }}
                  >
                    Team erstellen
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                sx={{
                  alignItems: "center",
                  justifyContent: "flex-start",
                  my: 5,
                  ml: 2,
                  gap: 3,
                }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Team Titel"
                  name="teamTitle"
                  variant="outlined"
                  sx={{ width: "100%" }} />
                <TextField
                  id="outlined"
                  label="Team Beschreibung"
                  name="teamDescription"
                  variant="outlined"
                  multiline
                  rows={1}
                  maxRows={4}
                  sx={{ width: "100%" }} />
              </Box>
              <Box
                display="flex"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Typography variant="h6" gutterBottom sx={{ pl: 2 }}>
                  Benutzer
                </Typography>
              </Box>
              <UserTable
                setSelectedTeamsToAdd={setSelectedTeamsToAdd}
                show="noMembers" />
              <Box sx={{ display: "flex", mt: 3, mr: 3 }}>
                <Button variant="create-button" type="submit" sx={{ ml: "auto" }}>
                  <AddIcon sx={{ mr: 1 }} /> Erstellen
                </Button>
              </Box>
            </form>
          </Box></>
      }
    />
  );
}
