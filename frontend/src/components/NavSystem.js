import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import "./Navsystem.css";
import { useValue } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoIcon } from "./Logo-Icon.svg";
import { alpha, Typography } from "@mui/material";
import Menu from "./Navsystem/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { getImageById } from "../actions/image";
import { endLoading, startLoading } from "../actions/utils/loading";

const drawerWidth = 220;

export default function NavSystem(props) {
  const { logoutCheck } = useAuth();
  const Navigate = useNavigate();

  const {
    state: { currentUser, image },
    dispatch,
  } = useValue();

  const [imageUrl, setImageUrl] = React.useState("");

  const url = process.env.REACT_APP_backendURL + "/images/";

  useEffect(() => {
    if (currentUser !== null) {
      if (currentUser.image !== null && currentUser.image !== undefined) {
        getImageById(dispatch, currentUser?.image, currentUser);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (image !== null) {
      setImageUrl(image?.filePath);
    }
  }, [image]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Sidebar */}
      <Drawer
        PaperProps={{
          style: {
            background: "rgb(48,52,80)",
            transition: "background 1.2s",
            background:
              localStorage.getItem("theme") === "light"
                ? "linear-gradient(  0deg, hsl(233deg 25% 42%) 12%, hsl(211deg 42% 48%) 49%, hsl(198deg 65% 49%) 100%)"
                : "linear-gradient(0deg, rgba(48,52,80,1) 12%, rgba(42,72,104,1) 49%, rgba(26,94,123,1) 100%)",
          },
        }}
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            color: "white",
          },
        }}
      >
        <Box
          onClick={() => Navigate("/dashboard")}
          sx={{
            display: "flex",
            width: "80px",
            height: "80px",
            p: 1.5,
            mx: "auto",
            mt: 3,
            borderRadius: "20px",
            cursor: "pointer",
          }}
          style={{ backgroundColor: alpha("#FFFFFF", 0.7) }}
        >
          <LogoIcon />
        </Box>
        <Menu />
        <Box
          width="100%"
          position="absolute"
          height="60px"
          bottom="5px"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Button
            variant="sidebar-button"
            onClick={() => Navigate("/profile")}
            disableRipple
            sx={{ textTransform: "none", gap: 1 }}
          >
            <Avatar
              sx={{ width: "40px", height: "40px" }}
              src={image && imageUrl ? url + imageUrl : ""}
              key={imageUrl}
            >
              {(
                currentUser?.firstName?.charAt(0) +
                currentUser?.lastName?.charAt(0)
              ).toString()}
            </Avatar>
            <Typography variant="body1" color="white">
              {" "}
              Profil
            </Typography>
          </Button>
          <IconButton
            onClick={() => {
              props.theme === "light"
                ? localStorage.setItem("theme", "dark")
                : localStorage.setItem("theme", "light");
              props.setTheme(localStorage.getItem("theme"));
              if (window.location.pathname === "/burndown")
                window.location.reload();
            }}
          >
            {props.theme === "light" ? (
              <DarkModeIcon sx={{ fontSize: "20px", color: "white" }} />
            ) : (
              <LightModeIcon sx={{ fontSize: "20px", color: "white" }} />
            )}
          </IconButton>
          <IconButton
            onClick={() => {
              logoutCheck();
              Navigate("/login");
            }}
          >
            <LogoutIcon sx={{ fontSize: "20px", color: "white" }} />
          </IconButton>
        </Box>
      </Drawer>
    </Box>
  );
}
