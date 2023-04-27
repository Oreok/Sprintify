import React from "react";
import { useValue } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../Logo.svg";
import ForgotPassword from "./ForgotPassword";
import useAuth from "../hooks/useAuth";
import { Link, Box, TextField, Button, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';

export default function LoginCard() {
  const Navigate = useNavigate();
  const { loginCheck } = useAuth();
  const [openForgotPassword, setOpenForgotPassword] = React.useState(false);

  const {
    state: { currentUser },
    dispatch,
  } = useValue();


  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginCheck({ email, password }, dispatch).then(Navigate("/dashboard"));
  };

  return (
    <Box
      sx={{
        pb: 3,
        pt: 5,
        px: 5,
        borderRadius: "26px",
        bgcolor: "white",
        width: 420,
      }}
    >
      <ForgotPassword
        open={openForgotPassword}
        setOpen={setOpenForgotPassword}
      />
      <form onSubmit={(event) => handleLogin(event)}>
        <Logo style={{ transform: "scale(0.65)" }} />
        <TextField
          required
          id="outlined-required"
          label="Email-Adresse"
          name="email"
          variant="outlined"
          size="small"
          type="email"
          sx={{ width: "100%", mt: 4.0, mb: 3 }}
        />


        <TextField
          required
          id="outlined-required"
          label="Passwort"
          variant="outlined"
          name="password"
          size="small"
          type="password"
          sx={{ width: "100%" }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            pt: 3,
            pb: 4,
            mt: 2,
          }}
        >
          <Link
            variant="default-link"
            onClick={() => setOpenForgotPassword(true)}
          >
            Passwort vergessen?
          </Link>
          <Button variant="login-button" type="submit">
          <LoginIcon sx={{ mr: 1 }} />
          Login
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, pb: 1 }}>
          <p>Neu bei Sprintify?</p>
          <Link variant="default-link" onClick={() => Navigate("/signup")}>
            Erstelle einen Account
          </Link>
        </Box>
        
      </form>
    </Box>
  );
}
