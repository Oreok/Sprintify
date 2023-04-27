import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ProjectElement from "../components/Projects/ProjectElement";
import Layout from "../layout";
import { useValue } from "../context/ContextProvider";
import { getProjectsByTeam, getAllProjects } from "../actions/project";
import { endLoading, startLoading } from "../actions/utils/loading";
import BreadCrumbBar from "../components/BreadCrumbBar";
import CreateProject from "./ CreateProject";
import Skeleton from "@mui/material/Skeleton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import useAuth from "../hooks/useAuth";

export default function Projects() {
  const [showButton, setShowButton] = React.useState(false);
  const [showCreateProject, setShowCreateProject] = React.useState(false);
  const { auth } = useAuth();

  const {
    state: { currentUser, projects, loading },
    dispatch,
  } = useValue();

  React.useEffect(() => {
    startLoading(dispatch);
    if (currentUser !== null) {
      if (auth.admin) {
        getAllProjects(dispatch, currentUser);
        setShowButton(true);
      } else {
        getProjectsByTeam(dispatch, currentUser);
      }
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (projects !== null) {
      //wait 10 ms to show loading
      setTimeout(() => {
        endLoading(dispatch);
      }, 100);
    }
  }, [projects]);

  const [inputText, setInputText] = React.useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  let filteredData = [];
  if (projects !== null) {
    filteredData = projects.filter((title) => {
      //if no input the return the original
      if (inputText === "") {
        return title;
      }
      //return the item which contains the user input
      else {
        return title.projectName.toLowerCase().includes(inputText);
      }
    });
  }

  const projectElements = filteredData.map((project) => {
    return <ProjectElement project={project} key={project?._id} />;
  });

  // Breadcrumb information
  const breadCrumbInfo = [
    { name: "Dashboard", link: "/dashboard/" },
    { name: "Projekte", link: "/projects/" },
  ];

  return (
    <Layout
      inhalt={
        <>
          <BreadCrumbBar breadCrumbInfo={breadCrumbInfo} backButtonLink={"/dashboard"} loading={loading} />
          <CreateProject
            open={showCreateProject}
            setOpen={setShowCreateProject}
            close={() => {
              setShowCreateProject(false);
              startLoading(dispatch);
              setTimeout(() => {
                getAllProjects(dispatch, currentUser);
              }, 300);
              endLoading(dispatch);
            }}
          />
          <Box
            sx={{
              bgcolor: "background.secondary",
              color: "text.default",
              mx: "5%",
              mb: 5,
              p: 2,
              width: "90%",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {loading ? (
              <Skeleton variant="rectangular" width={"100%"} height={"500px"} />
            ) : (
              <>
                <Box display="flex" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", pl: 2 }}>
                    Projekte
                  </Typography>
                </Box>
                <Box
                  sx={{
                    alignItems: "left",
                    justifyContent: "space-between",
                    textAlign: "left",
                    mb: 1,
                    p: 2,
                  }}
                >
                  <TextField
                    id="outlined-helperText"
                    label="Projekte durchsuchen"
                    defaultValue=""
                    onChange={inputHandler}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 3,
                    py: 2,
                  }}
                >
                  {projectElements}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  {showButton ? (
                    <Button variant="create-button" onClick={() => setShowCreateProject(true)} sx={{ ml: "auto" }}>
                      <AddIcon /> Projekt erstellen
                    </Button>
                  ) : null}
                </Box>
              </>
            )}
          </Box>
        </>
      }
    />
  );
}
