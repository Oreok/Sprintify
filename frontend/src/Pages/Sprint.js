import React from "react";
import Layout from "../layout";
import { useValue } from "../context/ContextProvider";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getActiveSprintByProject,
  getSprintById,
  getSprintsByProject,
} from "../actions/sprint";
import { getProjectById } from "../actions/project";
import BreadCrumbBar from "../components/BreadCrumbBar";
import SprintOverview from "../components/Sprint/SprintOverview";
import SprintItemOverview from "../components/Sprint/SprintItemOverview";
import DeleteModal from "../components/DeleteModal";
import EditSprint from "../components/Sprint/EditSprint";
import { getTeamsByProject } from "../actions/team";
import { getStoriesBySprint } from "../actions/story";
import { endLoading, startLoading } from "../actions/utils/loading";
import useAuth from "../hooks/useAuth";
import dayjs from "dayjs";

export default function Sprint() {
  let { projectId, sprintId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEditSprint, setShowEditSprint] = React.useState(false);
  const [showButtons, setShowButtons] = React.useState(false);

  const Navigate = useNavigate();
  const { auth } = useAuth();

  const {
    state: {
      currentUser,
      project,
      sprint,
      sprints,
      teams,
      stories,
      activeSprint,
      loading,
    },
    dispatch,
  } = useValue();

  React.useEffect(() => {
    if (currentUser !== null) {
      if (auth.admin || auth.productOwner) {
        setShowButtons(true);
      }
      startLoading(dispatch);
      getSprintById(dispatch, sprintId, currentUser);
      getSprintsByProject(dispatch, projectId, currentUser);
      getProjectById(dispatch, projectId, currentUser);
      getTeamsByProject(dispatch, projectId, currentUser);
      getStoriesBySprint(dispatch, sprintId, currentUser);
      getActiveSprintByProject(dispatch, projectId, currentUser);
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (
      project !== null &&
      teams !== null &&
      stories !== null &&
      sprints !== null &&
      sprint !== null
    ) {
      if (sprintId === activeSprint[0]?._id) {
        setShowButtons(false);
      }
      if ((dayjs(sprint?.sprintEndDate)).isBefore(dayjs())) {
        setShowButtons(false);
      }
      //wait 10 ms to show loading
      setTimeout(() => {
        endLoading(dispatch);
      }, 100);
    }
  }, [project, teams, stories, sprints, sprint]);

  // Breadcrumb information
  const breadCrumbInfo = [
    { name: "Dashboard", link: "/dashboard/" },
    { name: "Projekte", link: "/projects/" },
    { name: project?.projectName, link: "/project/" + projectId },
    { name: "Sprints", link: "/project/" + projectId + "/sprints/" },
    sprint?.moved
      ? { name: sprint?.sprintTitle + " (archiviert)" }
      : { name: sprint?.sprintTitle },
  ];

  return (
    <Layout
      inhalt={
        <>
          <BreadCrumbBar
            breadCrumbInfo={breadCrumbInfo}
            backButtonLink={"/project/" + projectId}
            editButton={setShowEditSprint}
            deleteButton={setShowDeleteModal}
            loading={loading}
            showButtons={showButtons}
          />

          <EditSprint
            showEditSprint={showEditSprint}
            sprints={sprints}
            close={() => {
              setShowEditSprint(false);
              setTimeout(() => {
                getSprintById(dispatch, sprintId, currentUser);
                dispatch({
                  type: "UPDATE_SPRINT",
                  payload: stories,
                });
              }, 300);
              dispatch({
                type: "UPDATE_ALERT",
                payload: {
                  open: true,
                  severity: "success",
                  message: "Der Sprint wurde erfolgreich bearbeitet!",
                },
              });
            }}
          />

          <DeleteModal
            showDeleteModal={showDeleteModal}
            close={() => {
              setShowDeleteModal(false);
            }}
            submitdelete={() => {
              setShowDeleteModal(false);
              Navigate("/project/" + projectId);
            }}
            id={sprint?._id}
            dispatch={dispatch}
            type="sprint"
            currentUser={currentUser}
            message={`Wollen Sie den Sprint "${sprint?.sprintTitle}" wirklich löschen? Diese Aktion kann nicht
            rückgängig gemacht werden!`}
          />

          <SprintOverview
            sprint={sprint}
            activeSprint={activeSprint}
            loading={loading}
          />

          <SprintItemOverview
            project={project}
            teams={teams}
            stories={stories}
            loading={loading}
          />
        </>
      }
    />
  );
}
