import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { useValue } from "../../context/ContextProvider";
import { updateStory } from "../../actions/story";

export default function EditStory(props) {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  function handleEditSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const newStory = props?.story;
    newStory.storyTitle = form.storyTitle.value;
    newStory.storyDescription = form.storyDescription.value;
    newStory.storyPriority = form.storyPriority.value;
    newStory.storypoints = form.storypoints.value;

    const result = updateStory(dispatch, newStory, currentUser);
    if (result) {
      handleClose();
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Das Item wurde erfolgreich bearbeitet!",
        },
      });
    }
  }

  const handleClose = () => {
    props.close();
  };

  React.useEffect(() => {
    setPriority(props?.story?.storyPriority);
    setStorypoints(props?.story?.storypoints);
  }, [props?.story]);

  const [priority, setPriority] = React.useState(props?.story?.storyPriority);
  const [storypoints, setStorypoints] = React.useState(
    props?.story?.storypoints
  );

  const handleChangePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleChangeStorypoints = (event) => {
    setStorypoints(event.target.value);
  };

  return (
    <Dialog open={props.showEditStory} onClose={handleClose} fullWidth>
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
            <h2>Backlog-Item bearbeiten</h2>

            <IconButton
              variant="default"
              onClick={handleClose}
              sx={{ ml: "auto" }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>

          <TextField
            required
            id="outlined-required"
            label="Titel"
            name="storyTitle"
            variant="outlined"
            size="small"
            defaultValue={props.story?.storyTitle}
            sx={{ width: "100%", pb: 3 }}
          />
          <Box display="flex" sx={{ gap: 2 }}>
            <FormControl fullWidth width="50%">
              <InputLabel id="storyPriority">Priorität</InputLabel>
              <Select
                required
                labelId="storyPriority"
                id="storyPrioritySelect"
                value={priority}
                label="Priority"
                name="storyPriority"
                onChange={handleChangePriority}
              >
                <MenuItem value={"Hoch"}>Hoch</MenuItem>
                <MenuItem value={"Mittel"}>Mittel</MenuItem>
                <MenuItem value={"Niedrig"}>Niedrig</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="storypoints">Storypoints</InputLabel>
              <Select
                required
                labelId="storypoints"
                id="storypointsSelect"
                value={storypoints}
                label="storypoints"
                name="storypoints"
                onChange={handleChangeStorypoints}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={21}>21</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            required
            id="outlined-required"
            label="Beschreibung"
            name="storyDescription"
            variant="outlined"
            size="large"
            defaultValue={props.story?.storyDescription}
            multiline
            rows={8}
            sx={{ width: "100%", mt: 3, mb: 1 }}
          />

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
                Speichern
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Container>
    </Dialog>
  );
}
