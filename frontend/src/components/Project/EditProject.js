import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import "../../App.css";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { useValue } from "../../context/ContextProvider";
import { updateProject } from "../../actions/project";
import { getProductOwners } from "../../actions/user";
import Autocomplete from "@mui/material/Autocomplete";

export default function EditProject(props) {
  const {
    state: { currentUser, productOwners },
    dispatch,
  } = useValue();

  const [productOwner, setProductOwner] = useState(null);

  useEffect(() => {
    if (currentUser !== null) {
      getProductOwners(dispatch, currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (productOwners !== null) {
      productOwners.map((po) => {
        po.label = po.firstName + " " + po.lastName;
      });
    }
    if (props.project?.productOwner.firstName !== undefined) {
      setProductOwner(
        props.project?.productOwner.firstName +
          " " +
          props.project?.productOwner.lastName
      );
    }
  }, [productOwners]);

  function handleEditSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const projectName = form.projectName.value;
    const projectDescription = form.projectDescription.value;
    const teams = props?.project?.teams;
    props.project.projectName = form.projectName.value;
    props.project.projectDescription = form.projectDescription.value;
    const result = updateProject(
      currentUser,
      props.project?._id,
      { projectName, productOwner, projectDescription, teams },
      dispatch
    );
    if (result) {
      handleClose();
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Das Projekt wurde erfolgreich bearbeitet!",
        },
      });
    }
  }

  const handleClose = () => {
    props.close();
  };

  return (
    <Dialog open={props.showEditProject} onClose={handleClose} fullWidth>
      <Container
        maxWidth="xl"
        sx={{ p: 1, bgcolor: "background.secondary", color: "text.default" }}
      >
        <form onSubmit={(event) => handleEditSubmit(event)}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ py: 2 }}
          >
            <h2>Projekt bearbeiten</h2>

            <IconButton
              variant="default"
              onClick={handleClose}
              sx={{ ml: "auto" }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Box sx={{ gap: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                required
                id="projectName"
                label="Projektname"
                name="projectName"
                variant="outlined"
                size="small"
                defaultValue={props.project?.projectName}
                sx={{ width: "100%", pb: 3 }}
              />
              <Autocomplete
                disablePortal
                id="productOwner"
                name="productOwner"
                size="small"
                value={productOwner}
                onChange={(event, newValue) => {
                  setProductOwner(newValue);
                }}
                options={productOwners === null ? [] : productOwners}
                sx={{ width: "70%" }}
                renderInput={(params) => (
                  <TextField {...params} required label="Product Owners" />
                )}
              />
            </Box>
            <TextField
              required
              id="projectDescription"
              label="Projektbeschreibung"
              name="projectDescription"
              variant="outlined"
              defaultValue={props.project?.projectDescription}
              size="large"
              multiline
              rows={2}
              sx={{ width: "100%", pb: 3 }}
            />
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
