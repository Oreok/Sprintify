import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { getSprintsByProject, updateSprint } from "../../actions/sprint";
import Date from "./Date";

export default function EditSprint(props) {
  let { projectId, sprintId } = useParams();
  const [currentSprint, setCurrentSprint] = React.useState();
  const [startValue, setStartValue] = React.useState();
  const [endValue, setEndValue] = React.useState();
  const [showButton, setShowButton] = React.useState(false);
  const sprints = props?.sprints;

  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  useEffect(() => {
    getCurrentSprint();
  }, [sprints]);

  const getCurrentSprint = () => {
    setCurrentSprint(sprints?.find((sprint) => sprint._id === sprintId));
    setStartValue(currentSprint?.sprintStartDate);
    setEndValue(currentSprint?.sprintEndDate);
  };

  const handleAlert = (open, severity, message) => {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: open,
        severity: severity,
        message: message,
      },
    });
  };

  function handleEditSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const sprintTitle = form.sprintTitle.value;
    const sprintStartDate = startValue;
    const sprintEndDate = endValue;
    const result = updateSprint(
      dispatch,
      sprintId,
      { sprintTitle, sprintStartDate, sprintEndDate },
      currentUser
    );
    if (result) {
      getCurrentSprint();
      handleClose();
    }
  }

  const handleClose = () => {
    props.close();
  };

  return (
    <Dialog open={props.showEditSprint} onClose={handleClose} fullWidth>
      <Container
        maxWidth="xl"
        sx={{
          p: 1,
          bgcolor: "background.secondary",
          color: "text.default",
        }}
      >
        <form onSubmit={(event) => handleEditSubmit(event)}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ py: 2 }}
          >
            <h2>Sprint bearbeiten</h2>

            <IconButton
              variant="default"
              onClick={handleClose}
              sx={{ ml: "auto" }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              required
              id="sprintTitle"
              label="Sprint Titel"
              name="sprintTitle"
              variant="outlined"
              size="small"
              defaultValue={currentSprint?.sprintTitle}
              sx={{ width: "100%", pb: 3 }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Date
              startValue={startValue}
              endValue={endValue}
              setStartValue={setStartValue}
              setEndValue={setEndValue}
              sprints={sprints}
              setShowButton={setShowButton}
              currentSprint={currentSprint}
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
              <Button
                disabled={showButton}
                variant="create-button"
                type="submit"
              >
                Speichern
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Container>
    </Dialog>
  );
}
