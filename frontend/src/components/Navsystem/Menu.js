import React, { memo, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { menuItems } from "./menuItems";
import { useValue } from "../../context/ContextProvider";
import { getUser } from "../../actions/user";
import { useNavigate } from "react-router-dom";
import { getProjectsByTeam } from "../../actions/project";
import useAuth from "../../hooks/useAuth";

export default function Menu(props) {
  const [showUserButtons, setShowUserButtons] = React.useState(false);
  const Navigate = useNavigate();
  const { auth } = useAuth();

  const {
    state: { currentUser, projects },
    dispatch,
  } = useValue();

  React.useEffect(() => {
    if (currentUser !== null) {
      if (currentUser.team !== null && currentUser.team !== undefined) {
        getProjectsByTeam(dispatch, currentUser);
      }
    }
  }, [currentUser]);

  const projectChildren = projects?.map((item) => {
    return {
      title: item.projectName,
      path: "/project/" + item._id,
    };
  });

  const MenuItem = ({ item, padd }) => {
    const Component = item.hasChildren ? MultiLevel : SingleLevel;
    return <Component item={item} padd={padd} />;
  };

  const SingleLevel = ({ item, padd }) => {
    return (
      <ListItem disablePadding>
        <ListItemButton
          href={item.path}
          sx={{ pl: padd }}
          onClick={() => getUser(currentUser.id, dispatch, currentUser)}
        >
          {item.icon}
          <ListItemText sx={{ pl: 1 }}>{item.title}</ListItemText>
        </ListItemButton>
      </ListItem>
    );
  };

  const MultiLevel = ({ item, padd }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen((prev) => !prev);
    };

    return auth.admin ? (
      <>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => Navigate("/projects")}
            sx={{ pl: padd }}
          >
            {item.icon}
            <ListItemText sx={{ pl: 1 }}>{item.title}</ListItemText>
          </ListItemButton>
        </ListItem>
      </>
    ) : projects.length === 0 ? (
      <>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick} sx={{ pl: padd }}>
            {item.icon}
            <ListItemText sx={{ pl: 1 }}>{item.title}</ListItemText>

            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <Typography
                variant="body"
                noWrap
                sx={{
                  pl: 2,
                  pt: 1,
                  display: "flex",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              >
                Keine Projekte vorhanden
              </Typography>
            </ListItem>
          </List>
        </Collapse>
      </>
    ) : (
      <>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick} sx={{ pl: padd }}>
            {item.icon}
            <ListItemText sx={{ pl: 1 }}>{item.title}</ListItemText>

            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children === "project"
              ? projectChildren.map((item) => (
                  <MenuItem
                    key={item.title.toString()}
                    item={item}
                    padd={padd + 4}
                  />
                ))
              : ""}
          </List>
        </Collapse>
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        mb: "70px",
        pt: 5,
        "&::-webkit-scrollbar": {
          width: 5,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "white",
          borderRadius: 2,
        },
        "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
          backgroundColor: "transparent",
        },
      }}
    >
      {menuItems.map((item) => {
        if (item.name === "Verwaltung" && auth.admin === false) {
          return "";
        } else {
          return (
            <Box key={item.name.toString()} sx={{ pb: 5 }}>
              <Typography
                variant="p"
                noWrap
                sx={{
                  pl: 2,
                  display: "flex",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "#ffffffba",
                  fontWeight: "bold",
                  letterSpacing: "0.1rem",
                  fontSize: "12px",
                }}
              >
                {item.name}
              </Typography>
              {item.items.map((item) => (
                <MenuItem key={item.title.toString()} item={item} />
              ))}
            </Box>
          );
        }
      })}
    </Box>
  );
}
