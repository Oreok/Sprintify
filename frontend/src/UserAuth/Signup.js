import SignupCard from "./SignupCard";
import { themeLight } from "../theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

export default function Signup() {
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
        <SignupCard />
      </Box>
    </ThemeProvider>
  );
}
