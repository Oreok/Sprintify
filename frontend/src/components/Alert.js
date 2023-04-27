import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useValue } from "../context/ContextProvider";

export default function Alert() {
  const {
    state: { alert },
    dispatch,
  } = useValue();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    dispatch({ type: "UPDATE_ALERT", payload: { ...alert, open: false } });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={alert.duration !== undefined ? alert.duration : 6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert severity={alert.severity}>{alert.message}</MuiAlert>
    </Snackbar>
  );
}
