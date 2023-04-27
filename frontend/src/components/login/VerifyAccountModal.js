import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useValue } from "../../context/ContextProvider";
import { resetPasswordWithToken, verfifyAccount } from "../../actions/user";
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

export default function VerifyAccountModal(props) {
  const Navigate = useNavigate();
  const { token } = useParams();
  const { dispatch } = useValue();

  const [message, setMessage] = React.useState("Verifiziere Account...");


  useEffect(() => {
    if (props.showVerify) {
      const res = verfifyAccount(dispatch, token);
      res.then((res) => {
        if(res === "activated"){
          setMessage("Account erfolgreich verifiziert! Sie können sich nun einloggen.");
        }
        else if(res === "link_invalid"){
          setMessage("Link ist ungültig!");
        }
        else if(res === "token_expired"){
          setMessage("Link ist abgelaufen!");
        }
      });
    }
  }, [props.showVerify]);

  const handleClose = () => {
    Navigate("/login");
  };

  return (
    <Dialog open={props.showVerify} onClose={handleClose} fullWidth>
      <DialogContent>
        <Box display="flex" alignItems="center" justifyContent="center">
          <h2>Account Verifikation</h2>
          <IconButton onClick={handleClose} sx={{ ml: "auto" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContentText sx={{ py: 3 }}>
          {message}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
