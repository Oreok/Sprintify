import React from "react";
import Grid from "@mui/material/Grid";
import Status from "../components/Kanban/Status";
import Task from "../components/Kanban/Story";
import Layout from "../layout";
import { useValue } from "../context/ContextProvider";
import {
  getAllStories,
  getKanbanStoriesByProject,
  updateStory,
} from "../actions/story";
import { useEffect } from "react";
import KanbanBreadCrumbBar from "../components/Kanban/KanbanBreadCrumbBar";
import { getAllProjects, getProjectsByTeam } from "../actions/project";
import { getActiveSprintByProject } from "../actions/sprint";
import { DragDropContext } from "react-beautiful-dnd";
import { getUser } from "../actions/user";
import { endLoading, startLoading } from "../actions/utils/loading";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import useAuth from "../hooks/useAuth";

export default function Kanban() {
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const cachedProject = JSON.parse(localStorage.getItem("selectedProject"));
  const [selectedProject, setSelectedProject] = React.useState(
    cachedProject === undefined || cachedProject === null ? "" : cachedProject
  );
  const [teamFilterSelected, setTeamFilterSelected] = React.useState(false);
  const [userFilterSelected, setUserFilterSelected] = React.useState(false);

  const teamFilter = () => {
    setTeamFilterSelected(!teamFilterSelected);
    if (userFilterSelected) {
      setUserFilterSelected(false);
    }
  };

  const userFilter = () => {
    setUserFilterSelected(!userFilterSelected);
    if (teamFilterSelected) {
      setTeamFilterSelected(false);
    }
  };

  const {
    state: { currentUser, stories, projects, activeSprint, user, loading },
    dispatch,
  } = useValue();

  const { auth } = useAuth();

  useEffect(() => {
    startLoading(dispatch);
    if (currentUser !== null) {
      getUser(currentUser.id, dispatch, currentUser);
      if (selectedProject !== "") {
        getKanbanStoriesByProject(dispatch, selectedProject, currentUser);
      }
      if (auth.admin) {
        getAllProjects(dispatch, currentUser);
      } else {
        if (currentUser?.team !== null) {
          getProjectsByTeam(dispatch, currentUser);
        }
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if ((projects !== null && stories !== null) || currentUser?.team === null) {
      endLoading(dispatch);
    }
  }, [projects, stories, activeSprint, user]);

  useEffect(() => {
    if (
      selectedProject !== "" &&
      selectedProject !== undefined &&
      currentUser !== null
    ) {
      getActiveSprintByProject(dispatch, selectedProject);
      getKanbanStoriesByProject(dispatch, selectedProject, currentUser);
      startLoading(dispatch);
      localStorage.setItem("selectedProject", JSON.stringify(selectedProject));
    }
  }, [selectedProject]);

  // Get stories with right status and returns right stories in jsx-elements
  const filterStories = (stories) =>
    stories?.filter(
      (story) =>
        story.assignedProject === selectedProject &&
        (activeSprint === null || story.assignedSprint === activeSprint[0]?._id)
    );

  const getStoriesByProject = (number) =>
    filterStories(stories)
      ?.filter(
        (story) =>
          story.storyStatus ===
          (number === 1 ? "TODO" : number === 2 ? "IN_PROGRESS" : "DONE")
      )
      .map((story, index) => (
        <Task story={story} index={index} state={state} key={story._id} />
      ));

  const getStoriesByTeam = (number) =>
    filterStories(stories)
      ?.filter(
        (story) =>
          story?.assignedUser?.team._id === currentUser?.team &&
          story.storyStatus ===
            (number === 1 ? "TODO" : number === 2 ? "IN_PROGRESS" : "DONE")
      )
      .map((story) => (
        <Task story={story} stories={stories} state={state} key={story._id} />
      ));

  const getStoriesByUser = (number) =>
    filterStories(stories)
      ?.filter(
        (story) =>
          story?.assignedUser?._id === currentUser?.id &&
          story.storyStatus ===
            (number === 1 ? "TODO" : number === 2 ? "IN_PROGRESS" : "DONE")
      )
      .map((story, index) => (
        <Task story={story} index={index} state={state} key={story._id} />
      ));

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (
      result.destination.index === result.source.index &&
      result.destination.droppableId === result.source.droppableId
    )
      return;

    stories?.map((story) => {
      if (story._id === result.draggableId) {
        story.storyStatus = result.destination.droppableId;
        story.index = result.destination.index;

        if (result.destination.droppableId === "TODO") {
          story.assignedUser = null;

          updateStory(dispatch, story, currentUser);
        }
        if (
          result.destination.droppableId !== "TODO" &&
          story.assignedUser === null
        ) {
          getUser(currentUser?.id, dispatch, currentUser);
          story.assignedUser = currentUser?.id;
          updateStory(dispatch, story, currentUser);
          story.assignedUser = user;
        } else {
          updateStory(dispatch, story, currentUser);
        }
      }
    });
    setTimeout(() => {
      dispatch({
        type: "UPDATE_STORIES",
        payload: stories,
      });
      getKanbanStoriesByProject(dispatch, selectedProject, currentUser);
    }, 50);
    forceUpdate();
  };

  // Breadcrumb information
  const breadCrumbInfo = [
    { name: "Dashboard", link: "/dashboard/" },
    { name: "Kanbanboard" },
  ];

  return (
    <Layout
      inhalt={
        <>
          <KanbanBreadCrumbBar
            breadCrumbInfo={breadCrumbInfo}
            backButtonLink={"/dashboard"}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            projects={projects}
            teamFilterSelected={teamFilterSelected}
            teamFilter={teamFilter}
            userFilterSelected={userFilterSelected}
            userFilter={userFilter}
            loading={loading}
          />
          {stories?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "background.secondary",
                borderRadius: "10px",
                width: "90%",
                height: "100px",
                p: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: "text.default" }}>
                Kein aktiver Sprint
              </Typography>
            </Box>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item>
                  <Status
                    name="TODO"
                    droppableId={"TODO"}
                    status={state}
                    storyElements={getStoriesByProject(1)}
                    loading={loading}
                  />
                </Grid>
                <Grid item>
                  <Status
                    name="IN PROGRESS"
                    droppableId={"IN_PROGRESS"}
                    storyElements={
                      teamFilterSelected
                        ? getStoriesByTeam(2)
                        : userFilterSelected
                        ? getStoriesByUser(2)
                        : getStoriesByProject(2)
                    }
                    loading={loading}
                  />
                </Grid>
                <Grid item>
                  <Status
                    name="DONE"
                    droppableId={"DONE"}
                    storyElements={
                      teamFilterSelected
                        ? getStoriesByTeam(3)
                        : userFilterSelected
                        ? getStoriesByUser(3)
                        : getStoriesByProject(3)
                    }
                    loading={loading}
                  />
                </Grid>
              </Grid>
            </DragDropContext>
          )}
        </>
      }
    />
  );
}
