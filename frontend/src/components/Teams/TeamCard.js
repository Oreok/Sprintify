import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { useValue } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllTeams } from "../../actions/team";

export default function OutlinedCard(props) {
  //create a new array by filtering the original array
  let filteredData = [];
  if (props.team !== null) {
    filteredData = props.team.filter((title) => {
      //if no input the return the original
      if (props.input === "") {
        return title;
      }
      //return the item which contains the user input
      else {
        return title.teamTitle.toLowerCase().includes(props.input);
      }
    });
  }
  const {
    state: { currentUser, teams },
    dispatch,
  } = useValue();

  const [open, setOpen] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const URL = process.env.REACT_APP_backendURL + "/images/";
  const Navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const card = filteredData.map((filteredTeam) => (
    <React.Fragment key={filteredTeam._id.toString()}>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        close={() => {
          setShowDeleteModal(false);
        }}
        submitdelete={() => {
          setShowDeleteModal(false);
          setTimeout(() => {
            getAllTeams(dispatch, currentUser);
            dispatch({
              type: "UPDATE_TEAMS",
              payload: teams,
            });
          }, 300);
        }}
        id={filteredTeam?._id}
        dispatch={props.dispatch}
        type="team"
        currentUser={props.currentUser}
        message={`Wollen Sie das Team "${filteredTeam?.teamTitle}" wirklich löschen? Diese Aktion kann nicht
            rückgängig gemacht werden!`}
      />
      <Card
        sx={{
          textAlign: "left",
          width: 300,
          minHeight: 400,
          position: "relative",
          borderRadius: "5%",
          boxShadow: 3,
          color: "text.default",
        }}
      >
        <CardContent>
          {/* vorherige color: "#374D5A" */}
          <Typography sx={{ fontSize: 14, color: "text.default" }} gutterBottom>
            Team
          </Typography>
          {/* vorherige color: "#374D5A" */}
          <Typography
            sx={{
              color: "text.default",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            variant="h5"
            component="div"
          >
            {filteredTeam.teamTitle}
          </Typography>
          {/* vorherige bgcolor: "#f5f5f5" */}
          <List
            sx={{
              width: "100%",
              marginTop: 2,
              maxWidth: 360,
              bgcolor: "background.secondary",
              overflow: "auto",
              maxHeight: 250,
              borderRadius: "10px",
              "& ul": { padding: 0 },
            }}
          >
            <ul>
              {filteredTeam.members.map((user) => (
                <ListItem key={`item-${user._id.toString()}`}>
                  <ListItemAvatar>
                    <Avatar
                      alt="J"
                      src={user?.image ? URL + user?.image.filePath : ""}
                    >
                      {(user?.firstName?.charAt(0).toString() +
                      user?.lastName?.charAt(0).toString()).toString()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={`${user.title}`}
                  />
                </ListItem>
              ))}
            </ul>
          </List>
          {/* vorherige color: "#374D5A" */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography sx={{ color: "text.default", mt: 2 }} variant="body2">
              {filteredTeam.teamDescription}
            </Typography>
          </Collapse>
          <CardActions sx={{ justifyContent: "flex-end", mt: 2 }}>
            <IconButton
              onClick={() => setShowDeleteModal(true)}
              variant="card-icon-button"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              variant="card-icon-button"
              onClick={() => {
                Navigate(`/teamsManagement/editTeam/${filteredTeam._id}`);
              }}
            >
              <EditIcon />
            </IconButton>
            <Button variant="create-button" onClick={handleClick}>
              {open ? <ExpandLess /> : <ExpandMore />}
              <Typography variant="body2">Details</Typography>
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </React.Fragment>
  ));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        py: 2,
      }}
    >
      {card}
    </Box>
  );
}
