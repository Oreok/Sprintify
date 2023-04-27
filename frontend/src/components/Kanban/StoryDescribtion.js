import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import EditStory from "./EditStory";

export default function StoryDescribtion(props) {
  const [showEditStory, setShowEditStory] = React.useState(false);

  const closeEditStory = () => {
    setShowEditStory(false);
  };

  const handleClose = () => {
    props.close();
  };

  return (
    <>
      <EditStory
        story={props.story}
        showEditStory={showEditStory}
        close={closeEditStory}
      />
      <Dialog open={props.show} onClose={handleClose} fullWidth>
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
            <h2>
              {props.story?.storyTitle}{" "}
              {props.editable ? (
                <IconButton
                  variant="default"
                  onClick={() => setShowEditStory(true)}
                >
                  <EditIcon />
                </IconButton>
              ) : (
                " "
              )}
            </h2>

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
              color: "primary2.main",
              gap: 4,
              py: 2,
            }}
          >
            <Typography>Storypoints: {props.story.storypoints}</Typography>
            <Typography>Priorität: {props.story.storyPriority}</Typography>
          </Box>

          <DialogContent dividers>
            <DialogContentText
              sx={{ px: 3, color: "text.default" }}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              {props.story.storyDescription}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button variant="create-button" onClick={handleClose}>
              Schließen
            </Button>
          </DialogActions>
        </Container>
      </Dialog>
    </>
  );
}
