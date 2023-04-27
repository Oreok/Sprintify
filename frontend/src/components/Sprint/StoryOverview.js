import React from "react";
import { useValue } from "../../context/ContextProvider";
import { useParams } from "react-router-dom";
import { getSprintStatsById, getSprintStatsByTeam } from "../../actions/sprint";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import UpdateIcon from "@mui/icons-material/Update";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";

export default function StoryOverview(props) {
  let { projectId, sprintId } = useParams();

  const {
    state: { currentUser, sprintStats },
    dispatch,
  } = useValue();

  React.useEffect(() => {
    if (currentUser !== null) {
      if (sprintId === undefined) {
        /*if (props.teamId !== undefined) {
          getSprintStatsByTeam(dispatch, props.teamId, currentUser);
        } else*/ if (props.sprintId !== "") {
          sprintId = props.sprintId;
        }
      }
      getSprintStatsById(dispatch, sprintId, currentUser);
    }
  }, [currentUser, props.sprintId]);

  const overviewInfo = [
    {
      id: 0,
      icon: <AutoAwesomeMotionIcon />,
      title: "Realisierte Storypoints",
      value: sprintStats?.doneStorypoints,
      value2: sprintStats?.allStorypoints,
    },
    {
      id: 1,
      icon: <ContentPasteGoIcon />,
      title: "Stories in TODO",
      value: sprintStats?.todoLength,
      value2: sprintStats?.sprintBacklogItemsLength,
    },
    {
      id: 2,
      icon: <UpdateIcon />,
      title: "Stories in PROGRESS",
      value: sprintStats?.inProgressLength,
      value2: sprintStats?.sprintBacklogItemsLength,
    },
    {
      id: 3,
      icon: <DoneIcon />,
      title: "Stories in DONE",
      value: sprintStats?.doneLength,
      value2: sprintStats?.sprintBacklogItemsLength,
    },
  ];

  const overviewObjects = overviewInfo.map((info) => {
    return (
      <Box
        key={info.id}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          width: "220px",
          height: "140px",
          bgcolor: info.id === 0 ? "secondary3.main" : "secondary.main",
          color: info.id === 0 ? "white" : "text.default",
          borderRadius: "2px",
        }}
      >
        {info.icon}
        <Typography
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            fontWeight: "bold",
            fontSize: 14,
            py: 2,
            pb: 3,
            height: 150,
          }}
        >
          {info.title}
        </Typography>
        <p>
          {info.value} / {info.value2}
        </p>
      </Box>
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        overflow: "auto",
        gap: 3,
        py: 2,
        pb: 3,
      }}
    >
      {overviewObjects}
    </Box>
  );
}
