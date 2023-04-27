import fetchData from "./utils/fetchData.js";

const url = process.env.REACT_APP_backendURL + "/projects";

export const getProjectsByTeam = async (dispatch, currentUser) => {
  const teamId = currentUser?.team;
  const result = await fetchData({ url: url + "/getProjectsByTeam/" + teamId, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_PROJECTS", payload: result });
  }
};

export const getAllProjects = async (dispatch, currentUser) => {
  const result = await fetchData({ url: url + "/", user: currentUser, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_PROJECTS", payload: result });
  }
};

export const getProjectById = async (dispatch, projectId, currentUser) => {
  const result = await fetchData({ url: url + "/getProjectById/" + projectId, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_PROJECT", payload: result });
  }
};

export const getProjectStatsById = async (dispatch, projectId, currentUser) => {
  const result = await fetchData({ url: url + "/getProjectStatsById/" + projectId, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_PROJECT_STATS", payload: result });
  }
};

export const getProjectStatsforTeam = async (dispatch, projectId, teamId, currentUser) => {
  const result = await fetchData(
    {
      url: url + "/getProjectStatsforTeam/" + projectId + "/" + teamId,
      method: "GET",
    },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_PROJECT_STATS", payload: result });
  }
};

export const addProject = async (dispatch, project, currentUser) => {
  try {
    const result = await fetchData(
      { url: url + "/addproject", method: "POST", body: project, token: currentUser.token },
      dispatch
    );
    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Projekt wurde erfolgreich erstellt",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: "Projekt konnte nicht erstellt werden" + error.message,
      },
    });
  }
};

export const updateProject = async (currentUser, projectId, updatedFields, dispatch) => {
  dispatch({ type: "START_LOADING" });

  try {
    const result = await fetchData(
      {
        url: url + "/updateProject/" + projectId,
        method: "PATCH",
        body: updatedFields,
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      dispatch({
        type: "UPDATE_PROJECT",
        payload: { ...result },
      });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Projekt wurde erfolgreich aktualisiert",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message + "Projekt konnte nicht aktualisiert werden",
      },
    });
    console.log(error);
  }
  dispatch({ type: "END_LOADING" });
};

export const deleteProject = async (dispatch, projectId, currentUser) => {
  dispatch({ type: "START_LOADING" });
  try {
    const result = await fetchData(
      {
        url: url + "/deleteProject/" + projectId,
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
          message: "Das Projekt wurde erfolgreich gelösch!",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message + "Das Projekt konnte nicht gelöscht werden!",
      },
    });
  }
};
