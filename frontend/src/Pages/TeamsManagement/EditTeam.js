import React from "react";
import Box from "@mui/material/Box";
import { updateTeam, getTeamById } from "../../actions/team";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "dayjs/locale/de";
import Layout from "../../layout";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { useValue } from "../../context/ContextProvider";
import UserTable from "../../components/Teams/UserTable";
import { useEffect } from "react";
import BreadCrumbBar from "../../components/BreadCrumbBar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function EditTeam() {

  // Breadcrumb information
  const breadCrumbInfo = [
    { name: "Teams-Verwaltung", link: "/teamsManagement/" },
    { name: "Team bearbeiten" },
  ];

  const Navigate = useNavigate();

  let { teamId } = useParams();
  const [selectedTeamsToAdd, setSelectedTeamsToAdd] = React.useState();
  const [setSelectedTeamsToRemove, setSetSelectedTeamsToRemove] =
    React.useState();
  const [teamTitle, setTeamTitle] = React.useState();
  const [teamDescription, setTeamDescription] = React.useState();

  const {
    state: { currentUser, team },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (currentUser !== null) {
      getTeamById(dispatch, teamId, currentUser);
    }
  }, [currentUser]);

  const handleTitleInputChange = (event) => {
    team.teamTitle = event.target.value;
    setTeamTitle(event.target.value);
  };

  const handleDescriptionInputChange = (event) => {
    team.teamDescription = event.target.value;
    setTeamDescription(event.target.value);
  };

  async function handleAddSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      teamTitle: form.teamTitle.value,
      teamDescription: form.teamDescription.value,
      members: selectedTeamsToAdd,
      membersToRemove: setSelectedTeamsToRemove,
    };
    await updateTeam(dispatch, teamId, updatedData, currentUser);

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
                    Team bearbeiten
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
                  id="outlined"
                  label="Team Titel"
                  value={team?.teamTitle || ""}
                  name="teamTitle"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onChange={handleTitleInputChange} />
                <TextField
                  id="outlined"
                  label="Team Beschreibung"
                  value={team?.teamDescription || ""}
                  name="teamDescription"
                  variant="outlined"
                  multiline
                  rows={1}
                  maxRows={4}
                  sx={{ width: "100%" }}
                  onChange={handleDescriptionInputChange} />
              </Box>
              <Accordion sx={{ color: "text.default" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6" gutterBottom sx={{ pl: 2 }}>
                    Benutzer zum Team hinzufügen
                  </Typography>
                </AccordionSummary>
                <UserTable
                  setSelectedTeamsToAdd={setSelectedTeamsToAdd}
                  show="noMembers"
                  teamId={teamId} />
              </Accordion>
              <Accordion sx={{ color: "text.default" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6" gutterBottom sx={{ pl: 2 }}>
                    Benutzer aus dem Team entfernen
                  </Typography>
                </AccordionSummary>
                <UserTable
                  setSetSelectedTeamsToRemove={setSetSelectedTeamsToRemove}
                  show="members"
                  teamId={teamId} />
              </Accordion>
              <Box sx={{ display: "flex", mt: 3, mr: 3 }}>
                <Button variant="create-button" type="submit" sx={{ ml: "auto" }}>
                  <AddIcon sx={{ mr: 1 }} /> Speichern
                </Button>
              </Box>
            </form>
          </Box></>
      }
    />
  );
}
