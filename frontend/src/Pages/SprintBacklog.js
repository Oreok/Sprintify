import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import BacklockItems from "../components/Project/BacklogItems";
import dayjs from "dayjs";
import "dayjs/locale/de";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosRounded";
import Layout from "../layout";
import { useParams } from "react-router-dom";
import history from "../history";
import { useValue } from "../context/ContextProvider";
import { getSprintById } from "../actions/sprint";

export default function SprintBacklog() {
  const [startValue, setStartValue] = React.useState(dayjs());
  const [endValue, setEndValue] = React.useState(dayjs().add(14, "day"));
  const [selectedItems, setSelectedItems] = React.useState();

  let { projectId, sprintId } = useParams();
  const {
    state: { currentUser, sprints },
    dispatch,
  } = useValue();

  async function handleAddSubmit(e) {}

  React.useEffect(() => {
    if (currentUser !== null) {
      getSprintById(dispatch, sprintId, currentUser);
    }
  }, [currentUser]);

  const handleChangeStart = (newValue) => {
    setStartValue(newValue);
  };

  const handleChangeEnd = (newValue) => {
    setEndValue(newValue);
  };

  return (
    <Layout
      inhalt={
        <Box
          sx={{
            bgcolor: "white",
            mx: "5%",
            p: 2,
            width: "90%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <form onSubmit={(event) => handleAddSubmit(event)}>
            <Box
              display="flex"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Box display="flex">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  onClick={() => {
                    history.push(`/project/${projectId}`);
                    window.location.reload();
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", ml: 2, mt: 1 }}
                >
                  {sprints?.sprintTitle}
                </Typography>
              </Box>

              <Button variant="create-button" type="submit">
                <EditIcon sx={{ mr: 1 }} /> Bearbeiten
              </Button>
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
              <Typography>{sprints?.sprintTitle}</Typography>
              <Typography>{sprints?.sprintStartDate}</Typography>
              <Typography>{sprints?.sprintEndDate}</Typography>
            </Box>

            <Box
              display="flex"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Typography variant="h6" gutterBottom sx={{ pl: 2 }}>
                Backlog-Items
              </Typography>
              <Typography gutterBottom sx={{ fontWeight: "medium" }}>
                Storypoints gesamt: 100
              </Typography>
              <Box></Box>
            </Box>
            <BacklockItems
              projectId={projectId}
              setSelectedItems={setSelectedItems}
              showSelection={false}
            />
          </form>
        </Box>
      }
    />
  );
}
