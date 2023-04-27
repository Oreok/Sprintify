import { useState, useEffect } from "react";
import { useValue } from "../context/ContextProvider";
import Box from "@mui/material/Box";
import Layout from "../layout";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import {
  getInProgressStoriesByUser,
  getStoriesByProject,
  getStoriesByTeam,
} from "../actions/story";
import NotificationBox from "../components/Dashboard/NotificationBox";
import { getNotifications } from "../actions/notification";
import TodoTable from "../components/Dashboard/TodoTable";
import StoryOverview from "../components/Sprint/StoryOverview";
import { endLoading, startLoading } from "../actions/utils/loading";
import Skeleton from "@mui/material/Skeleton";
import LayersIcon from "@mui/icons-material/Layers";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { getAllProjects, getProjectsByTeam } from "../actions/project";
import {
  getActiveSprintByProject,
  getSprintStatsById,
} from "../actions/sprint";
import CircularProgress from "@mui/material/CircularProgress";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const cachedProject = JSON.parse(localStorage.getItem("selectedProject"));
  const [selectedProject, setSelectedProject] = useState(
    cachedProject === null ? "" : cachedProject
  );
  const [noTeam, setNoTeam] = useState(false);

  const {
    state: {
      currentUser,
      stories,
      notifications,
      projects,
      activeSprint,
      loading,
      sprintStats,
    },
    dispatch,
  } = useValue();

  const { auth } = useAuth();

  const [data, setData] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    startLoading(dispatch);
    if (currentUser !== null) {
      if (currentUser.team === null) {
        setNoTeam(true);
        endLoading(dispatch);
      }
      if (auth.productOwner) {
        getStoriesByProject(dispatch, selectedProject, currentUser);
      } else {
        getInProgressStoriesByUser(dispatch, currentUser.id, currentUser);
      }
      getNotifications(dispatch, currentUser);
      if (currentUser?.team !== null) {
        getProjectsByTeam(dispatch, currentUser);
      } else if (auth.admin) {
        getAllProjects(dispatch, currentUser);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (stories !== null) {
      const tableData = stories?.filter((story) => {
        story.projectName = story.assignedProject.projectName;
        return story;
      });
      setTableData(tableData);
    }
  }, [stories]);

  useEffect(() => {
    if (selectedProject !== "") {
      getActiveSprintByProject(dispatch, selectedProject, currentUser);
      localStorage.setItem("selectedProject", JSON.stringify(selectedProject));
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject === "" && projects[0]?._id !== undefined) {
      setSelectedProject(projects[0]?._id);
    }
    if (activeSprint !== null && activeSprint._id !== undefined) {
      getSprintStatsById(dispatch, activeSprint?._id, currentUser);
    }
    if (
      activeSprint !== null &&
      stories !== null &&
      projects !== null &&
      notifications !== null
    ) {
      endLoading(dispatch);
    }
  }, [activeSprint, stories, projects, notifications]);

  return (
    <Layout
      inhalt={
        <Box
          sx={{
            mx: "1%",
            mb: 5,
            p: 2,
            mt: -5,
            width: "98%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "stretch",
              height: windowSize.current[1] * 0.7,
              pb: 2,
              gap: 2,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              {noTeam ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    p: 2,
                    borderRadius: "6px",
                    boxShadow: 3,
                    bgcolor: "background.secondary",
                    color: "text.default",
                    pb: 9,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Du bist keinem Team zugeordnet. Bitte wende dich an einen
                    Admin.
                  </Typography>
                </Box>
              ) : (
                <TodoTable
                  tableData={tableData}
                  loading={loading}
                  role={currentUser?.role}
                />
              )}
            </Box>
            <NotificationBox notifications={notifications} loading={loading} />
          </Box>

          <Box
            sx={{
              bgcolor: "background.secondary",
              color: "text.default",
              mt: 3,
              p: 2,

              boxShadow: 3,
              borderRadius: "6px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {loading ? (
              <Skeleton variant="rectangular" width={"100%"} height={"200px"} />
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    mb: 2,
                    mt: 0,
                    gap: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <LayersIcon sx={{ fontSize: "30px" }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Projekt-Übersicht
                    </Typography>
                  </Box>
                  {sprintStats !== null ? (
                    <Box
                      sx={{
                        position: "relative",
                        display: "inline-flex",
                        bgcolor: "secondary.main",
                        borderRadius: "100%",
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
                  <FormControl sx={{ width: 200 }} size="small">
                    <InputLabel id="project-select-label">Projekt</InputLabel>
                    <Select
                      labelId="project-select-label"
                      id="project-select"
                      value={selectedProject}
                      variant="outlined"
                      label="Projekt"
                      onChange={(event) => {
                        setSelectedProject(event.target.value);
                      }}
                    >
                      {projects?.map((project) => (
                        <MenuItem value={project?._id} key={project?._id}>
                          {project?.projectName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {activeSprint === null || activeSprint.length === 0 ? (
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
                    <Typography
                      sx={{
                        fontSize: 20,
                        pl: 2,
                        pr: 3,
                        height: 140,
                        //center text
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {noTeam
                        ? "Kein Projekt ausgewählt"
                        : "Kein aktiver Sprint vorhanden"}
                    </Typography>
                  </Box>
                ) : (
                  <StoryOverview
                    sprintId={activeSprint[0]?._id}
                    teamId={currentUser?.team}
                  />
                )}
              </>
            )}
          </Box>
        </Box>
      }
    />
  );
}
