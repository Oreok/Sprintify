import React from "react";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import ArticleIcon from "@mui/icons-material/Subject";
import PriorityDropdown from "./PriorityDropdown";
import { useValue } from "../../context/ContextProvider";
import { updateStory } from "../../actions/story";

export default function StoryButtons(props) {
  const {
    state: { currentUser, stories },
    dispatch,
  } = useValue();



  const handleStatus = (number) => {
    updateStory(dispatch, props.story, currentUser);

    const newStories = stories.map((story) => {
      if (story._id === props.story._id) {
        return props.story;
      } else {
        return story;
      }
    });
    dispatch({ type: "UPDATE_STORIES", payload: newStories });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          pt: 1,
        }}
      >
        <PriorityDropdown story={props.story} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pt: 1,
        }}
      >
        <IconButton
          variant="default"
          aria-label="more"
          id="long-button"
          onClick={props.showDescribtion}
        >
          <ArticleIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
