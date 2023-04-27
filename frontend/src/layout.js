import React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import { themeLight, themeDark } from "./theme";
import NavSystem from "./components/NavSystem";
import { useValue } from "./context/ContextProvider";
import { getUser } from "./actions/user";
import { useMemo } from "react";

export default function Layout(props) {
  const theme = () => {
    if (
      localStorage.getItem("theme") === undefined ||
      localStorage.getItem("theme") === null
    ) {
      localStorage.setItem("theme", "light");
    }

    return localStorage.getItem("theme");
  };

  if (
    localStorage.getItem("gotProjects") === undefined ||
    localStorage.getItem("gotProjects") === null
  ) {
    localStorage.setItem("gotProjects", false);
  }

  const [currentTheme, setCurrentTheme] = React.useState(theme);

  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  React.useEffect(() => {
    setTimeout(() => {
      if (currentUser !== null && currentUser.team === null) {
        getUser(currentUser.id, dispatch, currentUser);
      }
    }, 15000);
  }, [currentUser]);

  return (
    <ThemeProvider theme={currentTheme === "light" ? themeLight : themeDark}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <NavSystem theme={currentTheme} setTheme={setCurrentTheme} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "auto",
            width: "100%",
            pt: "50px",
          }}
        >
          {props.inhalt}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
