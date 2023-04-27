import { useValue } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import { getUsers, updateUser, getUser } from "../../actions/user";
import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";

const UserManagementActions = ({ params, rowId, setRowId }) => {
  const {
    dispatch,
    state: { currentUser, users },
  } = useValue();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { lastName, firstName, email, role, team, title, active, _id } =
      params.row;

    const result = await updateUser(
      { lastName, firstName, email, role, team, title, active },
      _id,
      dispatch,
      currentUser
    );
    setSuccess(true);
    if (result) {
      setSuccess(true);
      setRowId(null);
      getUsers(dispatch, currentUser);
    }
    setLoading(false);
    getUser(currentUser.id, dispatch, currentUser);
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Der Nutzer wurde erfolgreich bearbeitet!",
      },
    });
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default UserManagementActions;
