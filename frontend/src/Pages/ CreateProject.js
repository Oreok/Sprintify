import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useValue } from "../context/ContextProvider";
import TeamCard from "../components/Projects/TeamCard";
import Box from "@mui/material/Box";
import { addProject } from "../actions/project";
import { getAllTeams } from "../actions/team";
import { getProductOwners } from "../actions/user";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";

export default function CreateProject(props) {
  let navigate = useNavigate();

  const {
    state: { currentUser, teams, productOwners },
    dispatch,
  } = useValue();

  const [productOwner, setProductOwner] = useState(null);

  const handleClose = () => {
    props.setOpen(false);
  };

  React.useEffect(() => {
    if (currentUser !== null) {
      getAllTeams(dispatch, currentUser);
      getProductOwners(dispatch, currentUser);
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (productOwners !== null) {
      productOwners.map((po) => {
        po.label = po.firstName + " " + po.lastName;
      });
    }
  }, [productOwners]);

  const handleProjectSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const project = {
      projectName: form.projectName.value,
      projectDescription: form.projectDescription.value,
      productOwner: productOwner._id,
      teams: projectTeams,
    };

    addProject(dispatch, project, currentUser);
    props.close();
  };

  const [projectTeams, setProjectTeams] = useState([]);

  const teamElements = teams?.map((team) => {
    return (
      <TeamCard
        team={team}
        teams={projectTeams}
        setTeams={setProjectTeams}
        key={team?._id}
      />
    );
  });

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        sx: { bgcolor: "background.secondary", color: "text.default" },
      }}
    >
      <form onSubmit={(event) => handleProjectSubmit(event)}>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>Projekt hinzufügen</h2>
            <IconButton
              variant="default"
              onClick={handleClose}
              sx={{ ml: "auto" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box display="flex" sx={{ pt: 3, gap: 4, flexDirection: "column" }}>
            <TextField
              required
              id="outlined-required"
              label="Projektname"
              name="projectName"
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
            />
            <TextField
              required
              id="outlined-required"
              label="Beschreibung"
              name="projectDescription"
              variant="outlined"
              size="small"
              multiline
            />
            <Autocomplete
              disablePortal
              id="productOwner"
              name="productOwner"
              value={productOwner}
              onChange={(event, newValue) => {
                setProductOwner(newValue);
              }}
              options={productOwners === null ? [] : productOwners}
              sx={{ width: "100%", pb: 4 }}
              renderInput={(params) => (
                <TextField {...params} required label="Product Owners" />
              )}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              overflow: "auto",
              gap: 2,
              p: 1,
              width: "100%",
            }}
          >
            {teamElements}
          </Box>
        </DialogContent>
        <DialogActions>
          <Box sx={{ m: 1 }}>
            <Button
              onClick={handleClose}
              variant="create-button-secondary"
              sx={{ mr: 1 }}
            >
              Schließen
            </Button>
            <Button variant="create-button" type="submit">
              Erstellen
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
}
