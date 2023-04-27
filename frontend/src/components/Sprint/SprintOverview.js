import React from "react";
import { useValue } from "../../context/ContextProvider";
import { useParams } from "react-router-dom";
import { getSprintById, getActiveSprintByProject } from "../../actions/sprint";
import StoryOverview from "../Sprint/StoryOverview";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Skeleton from "@mui/material/Skeleton";

export default function SprintOverview(props) {
  const sprint = props.sprint;
  const activeSprint = props.activeSprint;

  const [showActive, setShowActive] = React.useState(false);

  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  React.useEffect(() => {
    if (currentUser !== null) {
      if (sprint?._id !== undefined && activeSprint !== null) {
        if (sprint?._id === activeSprint[0]?._id) {
          setShowActive(true);
        }
      }
    }
  }, [currentUser, props.sprint, props.activeSprint]);

  return (
    <Box
      sx={{
        bgcolor: "background.secondary",
        color: "text.default",
        mb: 5,
        p: 2,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
      }}
    >
      {props.loading ? (
        <Skeleton variant="rectangular" width={"100%"} height={"230px"} />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/*Überschrift*/}
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", px: 2, pb: 2 }}
              >
                Übersicht
              </Typography>

              {/* Show if it is active sprint */}
              {showActive ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                    pb: 2,
                    color: "#cd5c5c",
                    gap: 1,
                  }}
                >
                  <FiberManualRecordIcon fontSize="string" />

                  <Typography sx={{ fontWeight: "bold" }}>aktiv</Typography>
                </Box>
              ) : (
                ""
              )}
            </Box>

            {/*Sprint-Datum*/}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <CalendarMonthIcon />
              <Typography sx={{ fontSize: 18, pl: 1 }}>
                {dayjs(sprint?.sprintStartDate).format("DD.MM.YYYY")} -{" "}
                {dayjs(sprint?.sprintEndDate).format("DD.MM.YYYY")}
              </Typography>
            </Box>
          </Box>

          {/*Story-Übersicht*/}
          <StoryOverview />
        </>
      )}
    </Box>
  );
}
