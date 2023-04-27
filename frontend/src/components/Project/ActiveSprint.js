import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Skeleton from "@mui/material/Skeleton";
import StoryOverview from "../Sprint/StoryOverview";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CircularProgress from "@mui/material/CircularProgress";

export default function ActiveSprint(props) {
  let { projectId } = useParams();
  const sprintStats = props?.sprintStats;
  const activeSprint = props?.activeSprint;
  const Navigate = useNavigate();

  return (
    <>
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
          <Skeleton variant="rectangular" width={"100%"} height={"250px"} />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mr: 3,
                pb: 3,
              }}
            >
              {/*Überschrift und Details anzeigen*/}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", px: 2 }}>
                  Aktueller Sprint
                </Typography>
                {sprintStats != null ? (
                  <a
                    onClick={() => {
                      Navigate(
                        "/project/" +
                          projectId +
                          "/sprint/" +
                          activeSprint[0]?._id
                      );
                    }}
                    style={{
                      textDecoration: "none",
                      color: "primary3",
                      cursor: "pointer",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <KeyboardArrowRightIcon />
                      <p>Details anzeigen</p>
                    </Box>
                  </a>
                ) : (
                  ""
                )}
              </Box>
              {sprintStats != null ? (
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-flex",
                    bgcolor: "secondary.main",
                    borderRadius: "100%",
                    mr: 8.5,
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={
                      (sprintStats?.doneStorypoints /
                        sprintStats?.allStorypoints) *
                      100
                    }
                    size={46}
                    thickness={3}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.default"
                    >
                      {`${Math.round(
                        (sprintStats?.doneStorypoints /
                          sprintStats?.allStorypoints) *
                          100
                      )}%`}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                ""
              )}

              {/*Sprint-Datum*/}
              {sprintStats != null ? (
                <Box
                  sx={{
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CalendarMonthIcon sx={{}} />
                  <Typography sx={{ fontSize: 18, pl: 1 }}>
                    {dayjs(activeSprint[0]?.sprintStartDate).format(
                      "DD.MM.YYYY"
                    )}{" "}
                    -{" "}
                    {dayjs(activeSprint[0]?.sprintEndDate).format("DD.MM.YYYY")}
                  </Typography>
                </Box>
              ) : (
                ""
              )}
            </Box>

            {/*Story-Overview*/}
            {sprintStats != null ? (
              <StoryOverview
                projectId={projectId}
                sprintId={activeSprint[0]?._id}
              />
            ) : (
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
                <Typography sx={{ fontSize: 20, pl: 2, pr: 3 }}>
                  Kein aktiver Sprint vorhanden
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 2,
                mr: 3,
                pl: 2,
              }}
            >
              {/*Alle Sprints anzeigen*/}
              <a
                onClick={() => {
                  Navigate("/project/" + projectId + "/sprints");
                }}
                style={{
                  textDecoration: "none",
                  color: "primary3",
                  cursor: "pointer",
                }}
              >
                Alle Sprints anzeigen
              </a>

              {/*Sprint planen*/}
              {!props.showButtons ? (
                ""
              ) : (
                <Button
                  onClick={() => {
                    Navigate(`/project/${projectId}/createsprint`);
                  }}
                  variant="create-button"
                  sx={{ ml: "auto" }}
                >
                  <AddIcon sx={{ mr: 1 }} /> Sprint planen
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
