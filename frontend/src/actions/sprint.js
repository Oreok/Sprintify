import fetchData from "./utils/fetchData.js";

const url = process.env.REACT_APP_backendURL + "/sprint";

export const getSprintsByProject = async (dispatch, projectId, currentUser) => {
  const result = await fetchData(
    { url: url + "/getSprintsByProject/" + projectId, method: "GET" },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_SPRINTS", payload: result });
  }
};

export const getSprintById = async (dispatch, sprintId, currentUser) => {
  const result = await fetchData(
    {
      url: url + "/getSprintById/" + sprintId,
      method: "GET",
      token: currentUser.token,
    },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_SPRINT", payload: result });
  }
};

export const getSprintStatsById = async (dispatch, sprintId, currentUser) => {
  const result = await fetchData(
    {
      url: url + "/getSprintStatsById/" + sprintId,
      method: "GET",
      token: currentUser.token,
    },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_SPRINT_STATS", payload: result });
  }
};

export const getSprintStatsByTeam = async (dispatch, teamId, currentUser) => {
  const result = await fetchData(
    {
      url: url + "/getSprintStatsByTeam/" + teamId,
      method: "GET",
      token: currentUser.token,
    },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_SPRINT_STATS", payload: result });
  }
};

export const getActiveSprintByProject = async (
  dispatch,
  projectId,
  currentUser
) => {
  const result = await fetchData(
    {
      url: url + "/getActiveSprintByProject/" + projectId,
      method: "GET",
    },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_ACTIVE_SPRINT", payload: result });
  }
};

export const addSprint = async (dispatch, sprint, currentUser) => {
  try {
    const result = await fetchData(
      {
        url: url + "/addSprint",
        method: "POST",
        body: sprint,
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Der Sprint wurde erfolgreich erstellt!",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: "Der Sprint konnte nicht erstellt werden!" + error.message,
      },
    });
  }
};

export const deleteSprint = async (dispatch, sprintId, currentUser) => {
  dispatch({ type: "START_LOADING" });
  try {
    const result = await fetchData(
      {
        url: url + "/deleteSprint/" + sprintId,
        method: "DELETE",
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      dispatch({ type: "END_LOADING" });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Der Sprint wurde erfolgreich gelöscht!",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: "Der Sprint konnte nicht gelöscht werden!" + error.message,
      },
    });
  }
};

export const updateSprint = async (dispatch, sprintId, sprint, currentUser) => {
  try {
    const result = await fetchData(
      {
        url: url + "/updateSprint/" + sprintId,
        method: "PATCH",
        body: sprint,
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Sprint wurde erfolgreich aktualisiert",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: "Sprint konnte nicht aktualisiert werden" + error.message,
      },
    });
  }
};

export const handleOldSprint = async (dispatch, sprintId, currentUser) => {
  try {
    const result = await fetchData(
      {
        url: url + "/handleOldSprint/" + sprintId,
        method: "PATCH",
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Der Sprint wurde erfolgreich beendet",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: "Der Sprint konnte nicht beendet werden" + error.message,
      },
    });
  }
};

export const checkIfIsMoved = async (dispatch, sprintId, currentUser) => {
  const result = await fetchData(
    {
      url: url + "/checkIfIsMoved/" + sprintId,
      method: "PATCH",
      token: currentUser.token,
    },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_SPRINT", payload: result });
  }
};
