import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import "../../App.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { useValue } from "../../context/ContextProvider";
import { getProjectById, updateProject } from "../../actions/project";
import TeamCard from "../Projects/TeamCard";

export default function EditTeam(props) {
  let { projectId } = useParams();
  const teams = props?.allTeams;
  const project = props?.project;
  const [projectTeams, setProjectTeams] = React.useState();

  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  useEffect(() => {
    setProjectTeams(
      teams?.filter((team) => {
        if (project?.teams.includes(team._id)) {
          return team;
        }
      })
    );
  }, [teams]);

  function handleEditSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const projectName = project?.projectName;
    const projectDescription = project?.projectDescription;
    const productOwner = project?.productOwner;
    const teams = projectTeams;
    props.project.teams = projectTeams.map((team) => team._id);
    const result = updateProject(
      currentUser,
      projectId,
      { projectName, projectDescription, teams, productOwner },
      dispatch
    );
    if (result) {
      handleClose();
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Die Teams wurden erfolgreich bearbeitet!",
        },
      });
    }
  }

  const handleClose = () => {
    props.close();
  };

  const teamElements = teams?.map((team) => {
    return (
      <TeamCard
        team={team}
        teams={projectTeams}
        setTeams={setProjectTeams}
        key={team._id}
      />
    );
  });

  return (
    <Dialog
      open={props.showEditTeam}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <Container
        sx={{ p: 1, color: "text.default", bgcolor: "background.secondary" }}
      >
        <form onSubmit={(event) => handleEditSubmit(event)}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{
              py: 2,
            }}
          >
            <h2>Teams bearbeiten</h2>

            <IconButton
              variant="default"
              onClick={handleClose}
              sx={{ ml: "auto" }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              overflow: "auto",
              gap: 2,
              p: 1,
            }}
          >
            {teamElements}
          </Box>

          <DialogActions>
            <Box sx={{ m: 1 }}>
              <Button
                variant="create-button-secondary"
                onClick={handleClose}
                sx={{ mr: 1 }}
              >
                Schließen
              </Button>
              <Button variant="create-button" type="submit">
                Speichern
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Container>
    </Dialog>
  );
}
