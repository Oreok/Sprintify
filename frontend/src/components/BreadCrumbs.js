import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useValue } from "../context/ContextProvider";

export default function BreadCrumbs(props) {
  const Navigate = useNavigate();

  const {
    state: { currentUser, sprintStats, activeSprint },
    dispatch,
  } = useValue();

  function handleClick(event) {
    event.preventDefault();
  }

  const breadcrumObjects = props.info.map((item, i) => {
    const color = i + 1 === props.info.length ? "text.default" : "inherit";

    return (
      <Link
        underline="hover"
        color={color}
        onClick={() => {
          dispatch({ type: "UPDATE_ACTIVE_SPRINT", payload: null });
          dispatch({ type: "UPDATE_SPRINT_STATS", payload: null });
          Navigate(item.link);
        }}
        sx={{ cursor: "pointer" }}
        key={i}
      >
        {item.name}
      </Link>
    );
  });

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">{breadcrumObjects}</Breadcrumbs>
    </div>
  );
}
