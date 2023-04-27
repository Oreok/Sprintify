import React from "react";
import { useValue } from "../../context/ContextProvider";
import { useParams } from "react-router-dom";
import { getSprintStatsById } from "../../actions/sprint";
import BacklockItems from "../Project/BacklogItems";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

export default function SprintItemOverview(props) {
  let { projectId, sprintId } = useParams();

  const {
    state: { currentUser, sprintStats },
    dispatch,
  } = useValue();

  React.useEffect(() => {
    if (currentUser !== null) {
      getSprintStatsById(dispatch, sprintId, currentUser);
    }
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.secondary",
        color: "text.default",
        p: 2,
        width: "90%",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "10px",
      }}
    >
      {props.loading ? (
        <Skeleton variant="rectangular" width={"100%"} height={"450px"} />
      ) : (
        <>
          {/*Überschrift und Storypoints-Anzeige*/}
          <Box
            display="flex"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              pb: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", pl: 2 }}>
              Sprint-Items
            </Typography>
            <Typography sx={{ fontWeight: "medium", mr: 3 }}>
              Storypoints gesamt: {sprintStats?.allStorypoints}
            </Typography>
          </Box>

          {/*Backlog-Items-Table*/}
          <BacklockItems
            project={props?.project}
            teams={props?.teams}
            sprintId={sprintId}
            stories={props?.stories}
            editable={false}
          />
        </>
      )}
    </Box>
  );
}
