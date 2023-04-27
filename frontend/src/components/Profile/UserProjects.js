import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import StarsIcon from "@mui/icons-material/Stars";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export default function UserProjects({ projects }) {
  if (projects.length === 0) {
    return (
      <React.Fragment key="projects">
        <Card
          sx={{
            textAlign: "left",
            position: "relative",
            borderRadius: "10px",
            boxShadow: 3,
            color: "text.default",
            width: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              pt: 2,
              pl: 3,
              color: "text.default",
            }}
            variant="h5"
            component="div"
          >
            Deine Projekte
          </Typography>

          <Typography
            sx={{ fontWeight: "bold", color: "text.default", mx: "auto" }}
          >
            Du bist aktuell in keinem Projekt!
          </Typography>

          <div></div>
        </Card>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment key={"projects"}>
      <Card
        sx={{
          textAlign: "left",
          position: "relative",
          borderRadius: "10px",
          boxShadow: 3,
          color: "text.default",
          width: "40%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            color: "text.default",
            pt: 2,
            pl: 3,
          }}
          variant="h5"
          component="div"
        >
          Deine Projekte
        </Typography>
        <List
          sx={{
            width: "100%",
            mt: 1,
            bgcolor: "background.secondary",
            overflow: "scroll",
            maxHeight: 260,
            borderRadius: "10px",
            "& ul": { padding: 0 },
          }}
        >
          {projects?.map((project) => (
            <div key={`item-${project?._id.toString()}`}>
              <ListItem sx={{ minWidth: "200px" }}>
                <ListItemAvatar sx={{ minWidth: "45px" }}>
                  <Avatar sx={{ width: "25px", height: "25px" }}>
                    <StarsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${project.projectName}`} />
              </ListItem>
              <Divider variant="inset" component="li" sx={{ ml: 8 }} />
            </div>
          ))}
        </List>
      </Card>
    </React.Fragment>
  );
}
