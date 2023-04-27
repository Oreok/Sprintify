import React from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";

export default function KanbanBreadCrumbBar(props) {
  const Navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.secondary",
        color: "text.default",
        width: "90%",
        borderRadius: "10px",
        mb: 5,
        p: 2,
      }}
    >
      {props.loading ? (
        <Skeleton variant="rectangular" width={"100%"} height={"40px"} />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <>
              <IconButton
                variant="default"
                onClick={() => {
                  Navigate(props.backButtonLink);
                }}
                sx={{ mr: 3 }}
              >
                <ArrowBackIcon />
              </IconButton>

              <BreadCrumbs info={props.breadCrumbInfo} />

              {props.editButton === undefined || props.showButtons === false ? (
                ""
              ) : (
                <IconButton
                  variant="default"
                  onClick={() => {
                    props.editButton(true);
                  }}
                  sx={{ ml: "auto" }}
                >
                  <EditIcon />
                </IconButton>
              )}

              {props.deleteButton === undefined ||
              props.showButtons === false ? (
                ""
              ) : (
                <IconButton
                  variant="default"
                  onClick={() => {
                    props.deleteButton(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              gap: 2,
            }}
          >
            <h3>Filter</h3>
            <FormControl sx={{ width: 200 }} size="small">
              <InputLabel id="project-select-label">Projekt</InputLabel>
              <Select
                labelId="project-select-label"
                id="project-select"
                value={props.selectedProject}
                variant="outlined"
                label="Projekt"
                onChange={(event) => {
                  props.setSelectedProject(event.target.value);
                }}
              >
                {props.projects.map((project) => (
                  <MenuItem value={project?._id} key={project?._id}>
                    {project?.projectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {props.teamFilterSelected ? (
              <Chip
                sx={{ color: "black", bgcolor: "#8899A6" }}
                label="Mein Team"
                onClick={() => props.teamFilter()}
                onDelete={() => props.teamFilter()}
              ></Chip>
            ) : (
              <Chip
                sx={{ color: "text.default" }}
                label="Mein Team"
                onClick={() => props.teamFilter()}
              />
            )}
            {props.userFilterSelected ? (
              <Chip
                sx={{ color: "black", bgcolor: "#8899A6" }}
                label="Meine Stories"
                onClick={() => props.userFilter()}
                onDelete={() => props.userFilter()}
              />
            ) : (
              <Chip
                sx={{ color: "text.default" }}
                label="Meine Stories"
                onClick={() => props.userFilter()}
              />
            )}
          </Box>

          <Box></Box>
        </>
      )}
    </Box>
  );
}
