import React from "react";
import { useNavigate } from "react-router-dom";
import { useValue } from "../context/ContextProvider";
import { register } from "../actions/user";
import { ReactComponent as Logo } from "../Logo.svg";
import { TextField, Button, Box, Link } from "@mui/material";

export default function SignUpCard() {
  const Navigate = useNavigate();

  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const passwordConfirm = form.passwordConfirm.value;

    if (password !== passwordConfirm) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message:
            "Die Passwörter stimmen nicht überein. Bitte versuchen Sie es erneut.",
        },
      });
    } else {
      register({ email, password, firstName, lastName }, dispatch);
    }
  };

  return (
    <Box
      sx={{
        px: 5,
        pb: 3,
        pt: 5,
        borderRadius: "26px",
        bgcolor: "white",
        width: 420,
      }}
    >
      <form onSubmit={(event) => handleRegister(event)}>
        <Logo style={{ transform: "scale(0.65)" }} />
        <TextField
          required
          id="outlined-required"
          label="Vorname"
          name="firstName"
          variant="outlined"
          size="small"
          type="text"
          sx={{ width: "100%", my: 3 }}
        />
        <TextField
          required
          id="outlined-required"
          label="Nachname"
          name="lastName"
          variant="outlined"
          size="small"
          type="text"
          sx={{ width: "100%", pb: 3 }}
        />
        <TextField
          required
          id="outlined-required"
          label="Email-Adresse"
          name="email"
          variant="outlined"
          size="small"
          type="email"
          sx={{ width: "100%", pb: 3 }}
        />

        <TextField
          required
          id="outlined-required"
          label="Passwort"
          variant="outlined"
          name="password"
          size="small"
          type="password"
          sx={{ width: "100%", pb: 3 }}
        />
        <TextField
          required
          id="outlined-required"
          label="Passwort Wiederholen"
          variant="outlined"
          name="passwordConfirm"
          size="small"
          type="password"
          sx={{ width: "100%" }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            pt: 5,
            pb: 4,
          }}
        >
          <Button variant="login-button" type="submit">
            Registrieren
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, pb: 1 }}>
          <p>Du hast bereits einen Account?</p>
          <Link variant="default-link" onClick={() => Navigate("/login")}>
            Anmelden
          </Link>
        </Box>
      </form>
    </Box>
  );
}
