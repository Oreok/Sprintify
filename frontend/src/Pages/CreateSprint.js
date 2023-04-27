import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BacklockItems from "../components/Project/BacklogItems";
import TextField from "@mui/material/TextField";
import Layout from "../layout";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useValue } from "../context/ContextProvider";
import { addSprint } from "../actions/sprint";
import { getStoriesByProject, updateStory } from "../actions/story";
import { getSprintsByProject } from "../actions/sprint";
import Date from "../components/Sprint/Date";
import dayjs from "dayjs";
import { getProjectById } from "../actions/project";
import BreadCrumbBar from "../components/BreadCrumbBar";
import { endLoading, startLoading } from "../actions/utils/loading";
import Skeleton from "@mui/material/Skeleton";

export default function CreateSprint() {
  const [startValue, setStartValue] = React.useState(dayjs());
  const [endValue, setEndValue] = React.useState(dayjs().add(14, "day"));
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [showButton, setShowButton] = React.useState(false);

  let Navigate = useNavigate();
  let { projectId } = useParams();
  const {
    state: { currentUser, sprints, project, stories, loading },
    dispatch,
  } = useValue();

  React.useEffect(() => {
    startLoading(dispatch);
    if (currentUser !== null) {
      getProjectById(dispatch, projectId, currentUser);
      getSprintsByProject(dispatch, projectId, currentUser);
      getStoriesByProject(dispatch, projectId, currentUser);
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (project !== null && sprints !== null && stories !== null) {
      //wait 10 ms to show loading
      setTimeout(() => {
        endLoading(dispatch);
      }, 100);
    }
  }, [project, stories, sprints]);

  const handleAlert = (open, severity, message) => {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: open,
        severity: severity,
        message: message,
      },
    });
  };

  async function handleAddSubmit(e) {
    e.preventDefault();

    if (selectedItems.length === 0) {
      handleAlert(
        true,
        "warning",
        "Es muss mindestens ein Backlogitem ausgewählt werden!"
      );
      return false;
    }

    const form = e.target;

    const sprint = {
      sprintTitle: form.sprintTitle.value,
      assignedProject: projectId,
      sprintStartDate: dayjs(startValue).format("YYYY-MM-DD"),
      sprintEndDate: dayjs(endValue).hour(23).minute(59),
      sprintBacklogItems: selectedItems,
    };

    addSprint(dispatch, sprint, currentUser);
    Navigate("/project/" + projectId);
  }

  // Breadcrumb information
  const breadCrumbInfo = [
    { name: "Dashboard", link: "/dashboard/" },
    { name: "Projekte", link: "/projects/" },
    { name: project?.projectName, link: "/project/" + projectId },
    {
      name: "Sprint erstellen",
      link: "/project/" + projectId + "/createsprint",
    },
  ];

  return (
    <Layout
      inhalt={
        <>
          <BreadCrumbBar
            breadCrumbInfo={breadCrumbInfo}
            backButtonLink={`/project/${projectId}`}
            loading={loading}
          />

          <Box
            sx={{
              bgcolor: "background.secondary",
              color: "text.default",
              mx: "5%",
              p: 2,
              width: "90%",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "10px",
            }}
          >
            {loading ? (
              <Skeleton variant="rectangular" width={"100%"} height={"710px"} />
            ) : (
              <form onSubmit={(event) => handleAddSubmit(event)}>
                <Box
                  display="flex"
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
                >
                  <Box display="flex">
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "bold", ml: 2, mt: 1 }}
                    >
                      Sprint erstellen
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  sx={{
                    alignItems: "center",
                    justifyContent: "flex-start",
                    my: 5,
                    ml: 2,
                    gap: 3,
                  }}
                >
                  <TextField
                    required
                    id="outlined-required"
                    label="Sprint Titel"
                    name="sprintTitle"
                    variant="outlined"
                    sx={{ width: "50%" }}
                  />
                  <Date
                    startValue={startValue}
                    endValue={endValue}
                    setStartValue={setStartValue}
                    setEndValue={setEndValue}
                    sprints={sprints}
                    setShowButton={setShowButton}
                  />
                </Box>

                <Box
                  display="flex"
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
                >
                  <Typography variant="h6" gutterBottom sx={{ pl: 2 }}>
                    Backlog-Items
                  </Typography>
                  <Typography gutterBottom sx={{ fontWeight: "medium" }}>
                    Storypoints gesamt:{" "}
                    {selectedItems.length !== 0
                      ? selectedItems
                          .map((item) => item.storypoints)
                          .reduce((a, b) => a + b)
                      : 0}
                  </Typography>
                  <Box></Box>
                </Box>
                <BacklockItems
                  project={project}
                  setSelectedItems={setSelectedItems}
                  stories={stories}
                  showSelection={true}
                />
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Button
                    disabled={showButton}
                    variant="create-button"
                    type="submit"
                    sx={{ ml: "auto" }}
                  >
                    <AddIcon /> Erstellen
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </>
      }
    />
  );
}
