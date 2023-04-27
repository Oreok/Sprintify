import React from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import WarningIcon from "@mui/icons-material/Warning";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import { useValue } from "../../context/ContextProvider";
import { handleOldSprint } from "../../actions/sprint";

export default function MoveStories(props) {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const handleClose = () => {
    props.close();
  };

  const handleUpdateClose = () => {
    handleOldSprint(dispatch, props?.sprintId, currentUser);

    props.submit();
  };

  return (
    <Dialog open={props.showMoveModal} onClose={handleClose} fullWidth>
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
          Möchten Sie wirklich noch nicht abgeschlossene Stories wieder in den
          Backlog verschieben?
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
              onClick={handleUpdateClose}
              variant="delete-button"
              type="submit"
            >
              Verschieben
            </Button>
          </Box>
        </DialogActions>
      </Container>
    </Dialog>
  );
}
