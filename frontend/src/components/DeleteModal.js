import React from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { deleteUser } from "../actions/user";
import { deleteProject } from "../actions/project";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import WarningIcon from "@mui/icons-material/Warning";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import { deleteSprint } from "../actions/sprint";
import { deleteStory } from "../actions/story";
import { deleteTeam } from "../actions/team";

export default function DeleteModal(props) {
  const handleClose = () => {
    props.close();
  };

  const handleDeleteClose = () => {
    props.submitdelete();
  };

  const userDelete = () => {
    props.id.map(async (user) => {
      await deleteUser(props.dispatch, user._id, props.currentUser);
    });
    handleDeleteClose();
  };

  const projectDelete = () => {
    deleteProject(props.dispatch, props.id, props.currentUser);
    handleDeleteClose();
  };

  const sprintDelete = () => {
    deleteSprint(props.dispatch, props.id, props.currentUser);
    handleDeleteClose();
  };

  const storyDelete = () => {
    props.id.map(async (story) => {
      await deleteStory(props.dispatch, story._id, props.currentUser);
      handleDeleteClose();
    });
  };

  const teamDelete = () => {
    deleteTeam(props.dispatch, props.id, props.currentUser);
    handleDeleteClose();
  };

  return (
    <Dialog open={props.showDeleteModal} onClose={handleClose} fullWidth>
      <Container
        maxWidth="xl"
        sx={{ p: 1, bgcolor: "background.secondary", color: "text.default" }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ py: 2 }}
        >
          <WarningIcon />
          <Typography variant="h6" sx={{ fontWeight: "bold", pl: 2 }}>
            Achtung!
          </Typography>

          <IconButton
            variant="default"
            onClick={handleClose}
            sx={{ ml: "auto" }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
        <Typography gutterBottom sx={{ pl: 2 }}>
          {props.message}
        </Typography>

        <DialogActions>
          <Box sx={{ m: 1 }}>
            <Button
              onClick={handleClose}
              variant="create-button-secondary"
              sx={{ mr: 1 }}
            >
              Abbrechen
            </Button>
            <Button
              onClick={() => {
                props.type === "project"
                  ? projectDelete()
                  : props.type === "sprint"
                  ? sprintDelete()
                  : props.type === "story"
                  ? storyDelete()
                  : props.type === "team"
                  ? teamDelete()
                  : userDelete();
              }}delete-button
              variant="delete-button"
              type="submit"
            >
              Löschen
            </Button>
          </Box>
        </DialogActions>
      </Container>
    </Dialog>
  );
}
