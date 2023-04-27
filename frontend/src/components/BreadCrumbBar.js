import React from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Skeleton from "@mui/material/Skeleton";
import { useValue } from "../context/ContextProvider";

export default function BreadCrumbBar(props) {
  const {
    state: { currentUser, sprintStats, activeSprint },
    dispatch,
  } = useValue();
  const Navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
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
          <IconButton
            variant="default"
            onClick={() => {
              dispatch({ type: "UPDATE_ACTIVE_SPRINT", payload: null });
              dispatch({ type: "UPDATE_SPRINT_STATS", payload: null });
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

          {props.deleteButton === undefined || props.showButtons === false ? (
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
      )}
    </Box>
  );
}
