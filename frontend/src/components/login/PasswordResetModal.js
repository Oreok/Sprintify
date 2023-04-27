import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useValue } from "../../context/ContextProvider";
import { resetPasswordWithToken } from "../../actions/user";
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

export default function PasswordResetModal(props) {
  const Navigate = useNavigate();
  const { token } = useParams();
  const { dispatch } = useValue();

  const handleClose = () => {
    Navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const passwordRepeat = form.passwordRepeat.value;

    if (password !== passwordRepeat) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "Die Passwörter stimmen nicht überein!",
        },
      });
    } else {
      resetPasswordWithToken(dispatch, password, token);
      handleClose();
    }
  };

  return (
    <Dialog open={props.showReset} onClose={handleClose} fullWidth>
      <form onSubmit={(event) => handleSubmit(event)}>
        <DialogContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            <h2>Passwort zurücksetzen</h2>
            <IconButton onClick={handleClose} sx={{ ml: "auto" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContentText sx={{ py: 3 }}>
            Möchten Sie wirklich Ihr Passwort zurücksetzen?
          </DialogContentText>
          <Box display="flex" sx={{ gap: 2, flexDirection: "column" }}>
            <TextField
              required
              id="password"
              label="Passwort"
              type="password"
              name="password"
              variant="outlined"
              size="small"
              sx={{ width: "100%", pb: 1 }}
            />
            <TextField
              required
              id="passwordRepeat"
              label="Passwort wiederholen"
              name="passwordRepeat"
              type="password"
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Box sx={{ m: 1 }}>
            <Button
              onClick={handleClose}
              variant="create-button-secondary"
              sx={{ mr: 1 }}
            >
              Abbrechen
            </Button>
            <Button variant="create-button" type="submit">
              Zurücksetzen
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
}
