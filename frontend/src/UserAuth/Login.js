import LoginCard from "./LoginCard";
import PasswordResetModal from "../components/login/PasswordResetModal";
import VerifyAccountModal from "../components/login/VerifyAccountModal";
import { themeLight } from "../theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

export default function Login(props) {
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(  0deg, hsl(233deg 25% 42%) 12%, hsl(211deg 42% 48%) 49%, hsl(198deg 65% 49%) 100%)",
        }}
      >
        <LoginCard />
        <PasswordResetModal showReset={props.showReset} />
        <VerifyAccountModal showVerify={props.showVerify} />
      </Box>
    </ThemeProvider>
  );
}
