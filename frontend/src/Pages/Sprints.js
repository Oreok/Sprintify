import React from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BreadCrumbBar from "../components/BreadCrumbBar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../layout";
import { useValue } from "../context/ContextProvider";
import { useParams } from "react-router-dom";
import {
  getSprintsByProject,
  getActiveSprintByProject,
  checkIfIsMoved,
} from "../actions/sprint";
import { getProjectById } from "../actions/project";
import SprintAccordion from "../components/Sprints/SprintAccordion";
import { endLoading, startLoading } from "../actions/utils/loading";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function createData(id, sprintTitle, date, moved) {
  return { id, sprintTitle, date, moved };
}

export default function Sprints() {
  const [showButtons, setShowButtons] = React.useState(false);
  let { projectId } = useParams();
  const Navigate = useNavigate();
  const { auth } = useAuth();

  const {
    state: { currentUser, sprints, project, activeSprint, loading },
    dispatch,
  } = useValue();

  React.useEffect(() => {
    startLoading(dispatch);
    if (currentUser !== null) {
      if (auth.admin || auth.productOwner) {
        setShowButtons(true);
      }
      getSprintsByProject(dispatch, projectId, currentUser);
      getActiveSprintByProject(dispatch, projectId, currentUser);
      getProjectById(dispatch, projectId, currentUser);
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (sprints !== null) {
      sprints?.map((sprint) =>
        checkIfIsMoved(dispatch, sprint?._id, currentUser)
      );
    }
  }, [sprints]);

  React.useEffect(() => {
    if (project !== null && sprints !== null && activeSprint !== null) {
      //wait 10 ms to show loading
      setTimeout(() => {
        endLoading(dispatch);
      }, 100);
    }
  }, [project, sprints, activeSprint]);

  const getRow = (row) =>
    sprints
      ?.sort((a, b) => {
        if (a.sprintStartDate < b.sprintStartDate) {
          return -1;
        }
        if (a.sprintStartDate > b.sprintStartDate) {
          return 1;
        }
        return 0;
      })
      .filter((sprint) => {
        if (row === 0) {
          return dayjs().isBetween(
            sprint?.sprintStartDate,
            sprint?.sprintEndDate
          );
        } else if (row === 1) {
          return dayjs(sprint?.sprintStartDate).isAfter(dayjs());
        } else if (row === 2) {
          return dayjs(sprint?.sprintEndDate).isBefore(dayjs());
        }
      })
      .map((sprint) => {
        return createData(
          sprint?._id,
          sprint?.sprintTitle,
          `${dayjs(sprint?.sprintStartDate).format("DD.MM.YYYY")} - 
        ${dayjs(sprint?.sprintEndDate).format("DD.MM.YYYY")}`,
          sprint?.moved
        );
      });

  const rowsActive = getRow(0);
  const rowsPlanned = getRow(1);
  const rowsPast = getRow(2);

  // Breadcrumb information
  const breadCrumbInfo = [
    { name: "Dashboard", link: "/dashboard/" },
    { name: "Projekte", link: "/projects/" },
    { name: project?.projectName, link: "/project/" + projectId },
    { name: "Sprints" },
  ];

  return (
    <Layout
      inhalt={
        <>
          <BreadCrumbBar
            breadCrumbInfo={breadCrumbInfo}
            backButtonLink={"/project/" + projectId}
            editButtonLink={"/projects/"}
            loading={loading}
          />
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
            {" "}
            {loading ? (
              <Skeleton variant="rectangular" width={"100%"} height={"450px"} />
            ) : (
              <>
                <Typography
                  align="left"
                  variant="h6"
                  sx={{ fontWeight: "bold", pb: 3, pl: 2 }}
                >
                  Alle Sprints
                </Typography>

                <SprintAccordion
                  number={1}
                  row={rowsActive}
                  dispatch={dispatch}
                  currentUser={currentUser}
                  showButtons={showButtons}
                  key={1}
                />
                <SprintAccordion
                  number={2}
                  row={rowsPlanned}
                  dispatch={dispatch}
                  currentUser={currentUser}
                  showButtons={showButtons}
                  key={2}
                />
                <SprintAccordion
                  number={3}
                  row={rowsPast}
                  dispatch={dispatch}
                  currentUser={currentUser}
                  showButtons={showButtons}
                  key={3}
                />

                {showButtons ? (
                  <Button
                    onClick={() => {
                      Navigate(`/project/${projectId}/createsprint`);
                    }}
                    variant="create-button"
                    style={{ float: "right", marginTop: "20px" }}
                  >
                    <AddIcon sx={{ mr: 1 }} /> Sprint planen
                  </Button>
                ) : (
                  ""
                )}
              </>
            )}
          </Box>
        </>
      }
    />
  );
}
