import * as React from "react";
import { useValue } from "../context/ContextProvider";
import { resetPassword } from "../actions/user";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ForgotPassword(props) {
  const { dispatch } = useValue();

  const handleClose = () => {
    props?.setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    resetPassword(dispatch, email);
    handleClose();
  };

  return (
    <Dialog open={props?.open} onClose={handleClose}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <DialogContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            <h2>Passwort vergessen</h2>
            <IconButton onClick={handleClose} sx={{ ml: "auto" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContentText sx={{ py: 3 }}>
            Sie haben ihr Passwort vergessen? Bitte geben Sie Ihre Email-Adresse
            an. Sie erhalten eine Mail mit einem Link, um ihr Passwort
            zurückzusetzen.
          </DialogContentText>
          <TextField
            required
            id="email"
            label="E-Mail"
            name="email"
            variant="outlined"
            type="email"
            size="small"
            sx={{ width: "95%" }}
          />
        </DialogContent>
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
              Abschicken
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
}
