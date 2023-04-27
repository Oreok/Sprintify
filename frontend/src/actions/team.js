import fetchData from "./utils/fetchData.js";

const url = process.env.REACT_APP_backendURL + "/teams";

export const getAllTeams = async (dispatch, currentUser) => {
  const result = await fetchData({ url: url + "/", method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_TEAMS", payload: result });
  }
};

export const getTeamById = async (dispatch, teamId, currentUser) => {
  const result = await fetchData(
    { url: url + "/" + teamId, method: "GET" },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_TEAM", payload: result });
  }
};

export const getTeamsByProject = async (dispatch, projectId, currentUser) => {
  const result = await fetchData(
    { url: url + "/getTeamsByProject/" + projectId, method: "GET" },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_TEAMS", payload: result });
  }
};

export const addTeam = async (dispatch, team, currentUser) => {
  try {
    const result = await fetchData(
      { url: url + "/addTeam", method: "POST", body: team },
      dispatch
    );
    if (result) {
      dispatch({ type: "UPDATE_TEAM", payload: result });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Team wurde erfolgreich erstellt",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: "Team konnte nicht erstellt werden" + err.message,
      },
    });
  }
};

export const deleteTeam = async (dispatch, teamID, currentUser) => {
  dispatch({ type: "START_LOADING" });
  try {
    const result = await fetchData(
      {
        url: url + "/deleteTeam/" + teamID,
        method: "DELETE",
      },
      dispatch
    );
    if (result) {
      dispatch({ type: "UPDATE_TEAM", payload: result });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Team wurde erfolgreich gelöscht",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: "Team konnte nicht gelöscht werden" + err.message,
      },
    });
  }
  dispatch({ type: "END_LOADING" });
};

export const updateTeam = async (
  dispatch,
  teamId,
  updatedData,
  currentUser
) => {
  try {
    const result = await fetchData(
      { url: url + "/updateTeam/" + teamId, method: "PUT", body: updatedData },
      dispatch
    );
    if (result) {
      dispatch({ type: "UPDATE_TEAM", payload: result });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Team wurde erfolgreich aktualisiert",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: "Team konnte nicht aktualisiert werden" + err.message,
      },
    });
  }
};
