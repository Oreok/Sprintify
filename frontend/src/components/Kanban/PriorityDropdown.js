import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { updateStory } from "../../actions/story";
import { useValue } from "../../context/ContextProvider";

export default function PriorityDropdown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  var story = props.story;

  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const handleMenuItemClick = (index) => {
    if (index == 1) {
      props.story.storyPriority = "Hoch";
    } else if (index == 2) {
      props.story.storyPriority = "Mittel";
    } else {
      props.story.storyPriority = "Niedrig";
    }

    updateStory(dispatch, story, currentUser);
   

    setSelectedIndex(index);
    setAnchorEl(null);
  };

  var CircleColor = () => {
    if (props.story.storyPriority === "Hoch") {
      return "#FF6361";
    } else if (props.story.storyPriority === "Mittel") {
      return "#FAC200";
    } else {
      return "#6F975C";
    }
  };

  const setPriority = () => {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircleIcon sx={{ width: 15, color: CircleColor, mr: 1 }} />
        <Typography>Priorität {props.story.storyPriority}</Typography>
      </Box>
    );
  };

  return (
    <div>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? "true" : undefined}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
          sx={{ p: 0 }}
        >
          <ListItemText primary={setPriority()} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        <MenuItem key={"high"} onClick={() => handleMenuItemClick(1)}>
          <CircleIcon sx={{ width: 15, color: "#FF6361", mr: 1 }} />
          <p>Priorität Hoch</p>
        </MenuItem>
        <MenuItem
          key={"middle"}
          onClick={() => handleMenuItemClick(2)}
          sx={{ my: 2 }}
        >
          <CircleIcon sx={{ width: 15, color: "#FAC200", mr: 1 }} />
          <p>Priorität Mittel</p>
        </MenuItem>
        <MenuItem key={"low"} onClick={() => handleMenuItemClick(3)}>
          <CircleIcon sx={{ width: 15, color: "#6F975C", mr: 1 }} />
          <p>Priorität Niedrig</p>
        </MenuItem>
      </Menu>
    </div>
  );
}
