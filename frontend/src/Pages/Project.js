import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BacklockItems from "../components/Project/BacklogItems";
import AddBacklogItem from "../components/Project/AddBacklogItem";
import Layout from "../layout";
import { useValue } from "../context/ContextProvider";
import { useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { getProjectById, getProjectStatsById } from "../actions/project";
import { getAllTeams } from "../actions/team";
import TeamCard from "../components/Project/TeamCard";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import BreadCrumbBar from "../components/BreadCrumbBar";
import ActiveSprint from "../components/Project/ActiveSprint";
import EditProject from "../components/Project/EditProject";
import DeleteModal from "../components/DeleteModal";
import { useNavigate } from "react-router-dom";
import { getStoriesByProject } from "../actions/story";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTeam from "../components/Project/EditTeam";
import { endLoading, startLoading } from "../actions/utils/loading";
import Skeleton from "@mui/material/Skeleton";
import {
  getActiveSprintByProject,
  getSprintStatsById,
} from "../actions/sprint";
import useAuth from "../hooks/useAuth";

export default function Project() {
  const [showaddBacklog, setShowAddBacklog] = React.useState(false);
  const [showEditProject, setShowEditProject] = React.useState(false);
  const [showEditTeam, setShowEditTeam] = React.useState(false);
  const [showButtons, setShowButtons] = React.useState(false);
  const [deleteModalProject, setDeleteModalProject] = React.useState(false);
  const [deleteModalStories, setDeleteModalStories] = React.useState(false);
  const [selected, setSelected] = useState([]);
  const [teamElements, setTeamElements] = useState([]);
  let { projectId } = useParams();
  const url = process.env.REACT_APP_backendURL + "/images/";
  const { auth } = useAuth();

  const {
    state: {
      currentUser,
      project,
      teams,
      projectStats,
      sprintStats,
      activeSprint,
      stories,
      loading,
    },
    dispatch,
  } = useValue();

  const Navigate = useNavigate();

  React.useEffect(() => {
    startLoading(dispatch);
    if (currentUser !== null) {
      if (auth.admin || auth.productOwner) {
        setShowButtons(true);
      }
      getProjectStatsById(dispatch, projectId, currentUser);
      getProjectById(dispatch, projectId, currentUser);
      getAllTeams(dispatch, currentUser);
      getStoriesByProject(dispatch, projectId, currentUser);
      if (activeSprint === null) {
        getActiveSprintByProject(dispatch, projectId, currentUser);
      }
      if (activeSprint !== null) {
        if (activeSprint.length > 0) {
          getSprintStatsById(dispatch, activeSprint[0]?._id, currentUser);
        }
      }
    }
  }, [currentUser, activeSprint]);

  React.useEffect(() => {
    if (
      project !== null &&
      teams !== null &&
      projectStats !== null &&
      stories !== null
    ) {
      //wait 10 ms to show loading
      setTimeout(() => {
        endLoading(dispatch);
      }, 100);
    }

    setTeamElements(
      teams?.map((team) => {
        if (project?.teams.includes(team._id)) {
          return <TeamCard team={team} key={team._id} />;
        }
      })
    );
  }, [project, teams, projectStats, stories, sprintStats, activeSprint]);

  // Breadcrumb information
  const breadCrumbInfo = [
    { name: "Dashboard", link: "/dashboard/" },
    { name: "Projekte", link: "/projects/" },
    { name: project?.projectName, link: "/project/" + projectId },
  ];

  return (
    <Layout
      inhalt={
        <>
          <AddBacklogItem
            showaddBacklog={showaddBacklog}
            projectId={projectId}
            close={() => {
              setShowAddBacklog(false);
              startLoading(dispatch);
              setTimeout(() => {
                getStoriesByProject(dispatch, projectId, currentUser);
                dispatch({
                  type: "UPDATE_STORIES",
                  payload: stories,
                });
                getProjectStatsById(dispatch, projectId, currentUser);
              }, 100);
              endLoading(dispatch);
            }}
          />
          <EditProject
            showEditProject={showEditProject}
            project={project}
            close={() => {
              setShowEditProject(false);
            }}
          />
          <EditTeam
            showEditTeam={showEditTeam}
            setTeamElements={setTeamElements}
            allTeams={teams}
            project={project}
            close={() => {
              setShowEditTeam(false);
              setTeamElements(
                teams?.map((team) => {
                  if (project?.teams.includes(team._id)) {
                    return <TeamCard team={team} key={team._id} />;
                  }
                })
              );
            }}
          />

          <DeleteModal
            showDeleteModal={deleteModalProject}
            close={() => {
              setDeleteModalProject(false);
            }}
            submitdelete={() => {
              setDeleteModalProject(false);
              Navigate("/projects/");
            }}
            id={projectId}
            dispatch={dispatch}
            type="project"
            currentUser={currentUser}
            message={`Wollen Sie das Projekt "${project?.projectName}" wirklich löschen? Diese Aktion kann nicht
            rückgängig gemacht werden!`}
          />
          <DeleteModal
            showDeleteModal={deleteModalStories}
            close={() => {
              setDeleteModalStories(false);
            }}
            submitdelete={() => {
              setDeleteModalStories(false);
              const toRemove = selected?.map((story) => {
                return story?._id;
              });
              const newStories = stories?.filter((story) => {
                return !toRemove.includes(story?._id);
              });
              dispatch({
                type: "UPDATE_STORIES",
                payload: newStories,
              });
              getProjectStatsById(dispatch, projectId, currentUser);
              setSelected([]);
              dispatch({
                type: "UPDATE_ALERT",
                payload: {
                  open: true,
                  severity: "success",
                  message:
                    "Die ausgewählte(n) Backlogitem(s) wurde(n) erfolgreich gelöscht!",
                },
              });
            }}
            id={selected}
            type="story"
            message="Wollen Sie die ausgewählte(n) Backlogitem(s) wirklich löschen? Diese Aktion kann nicht
            rückgängig gemacht werden!"
            dispatch={dispatch}
            currentUser={currentUser}
          />
          <BreadCrumbBar
            breadCrumbInfo={breadCrumbInfo}
            backButtonLink={"/projects/"}
            editButton={setShowEditProject}
            deleteButton={setDeleteModalProject}
            loading={loading}
            showButtons={showButtons}
          />

          <ActiveSprint
            activeSprint={activeSprint}
            sprintStats={sprintStats}
            loading={loading}
            showButtons={showButtons}
          />

          {/*Backlog-Items-Box*/}
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
            {loading ? (
              <Skeleton variant="rectangular" width={"100%"} height={"400px"} />
            ) : (
              <>
                {/*Überschrift und Hinzufügen Button*/}
                <Box
                  display="flex"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", pl: 2 }}
                  >
                    Backlog-Items
                  </Typography>
                  <Typography gutterBottom sx={{ fontWeight: "medium", mr: 3 }}>
                    Verbleibende Storypoints: {projectStats?.allStorypoints}
                  </Typography>
                </Box>

                {/*Backlog-Items-Table*/}
                <BacklockItems
                  project={project}
                  teams={teams}
                  stories={stories}
                  setSelectedItems={setSelected}
                  editable={true}
                  showSelection={true}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                    mr: 3,
                  }}
                >
                  <IconButton
                    variant="default"
                    disabled={selected.length === 0}
                    onClick={() => {
                      setDeleteModalStories(true);
                    }}
                    sx={{
                      mr: 1,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Button
                    onClick={() => setShowAddBacklog(true)}
                    variant="create-button"
                  >
                    <AddIcon sx={{ mr: 1 }} /> Hinzufügen
                  </Button>
                </Box>
              </>
            )}
          </Box>

          <Box
            sx={{
              bgcolor: "background.secondary",
              color: "text.default",
              my: 5,
              p: 2,
              width: "90%",

              borderRadius: "10px",
            }}
          >
            {loading ? (
              <Skeleton variant="rectangular" width={"100%"} height={"200px"} />
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold", pl: 2 }}>
                    Teams
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mx: "auto" }}
                  >
                    <Avatar
                      src={
                        project?.productOwner?.image
                          ? url + project?.productOwner?.image?.filePath
                          : ""
                      }
                    >
                      {(
                        project?.productOwner?.firstName?.charAt(0) +
                        project?.productOwner?.lastName?.charAt(0)
                      ).toString()}
                    </Avatar>
                    <Typography sx={{ fontWeight: "medium", ml: 1 }}>
                      {project?.productOwner?.firstName +
                        " " +
                        project?.productOwner?.lastName +
                        " (PO)"}
                    </Typography>
                  </Box>
                  {showButtons ? (
                    <IconButton
                      variant="default"
                      aria-label="more"
                      id="long-button"
                      onClick={() => {
                        setShowEditTeam(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  ) : (
                    ""
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    overflow: "auto",
                    gap: 3,
                    p: 2,
                    pb: 3,
                  }}
                >
                  {teamElements}
                </Box>
              </>
            )}
          </Box>
        </>
      }
    />
  );
}
