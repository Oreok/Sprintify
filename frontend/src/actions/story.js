import fetchData from "./utils/fetchData.js";

const url = process.env.REACT_APP_backendURL + "/story";

export const getAllStories = async (dispatch, currentUser) => {
  const result = await fetchData({ url: url + "/", method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_STORIES", payload: result });
  }
};

export const getStoriesByTeam = async (dispatch, teamId, currentUser) => {
  const result = await fetchData(
    { url: url + "/getStoriesByTeam/" + teamId, method: "GET" },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_STORIES", payload: result });
  }
};

export const getStoriesByProject = async (dispatch, projectId, currentUser) => {
  const result = await fetchData(
    { url: url + "/getStoriesByProject/" + projectId, method: "GET" },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_STORIES", payload: result });
  }
};

export const getStoriesBySprint = async (dispatch, sprintId, currentUser) => {
  const result = await fetchData(
    { url: url + "/getStoriesBySprint/" + sprintId, method: "GET" },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_STORIES", payload: result });
  }
};

export const getInProgressStoriesByUser = async (dispatch, userId, currentUser) => {
  const result = await fetchData(
    { url: url + "/getInProgressStoriesByUser/" + userId, method: "GET", token: currentUser.token, },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_STORIES", payload: result });
  }
};

export const getKanbanStoriesByProject = async (dispatch, projectId, currentUser) => {
  const result = await fetchData(
    { url: url + "/getKanbanStoriesByProject/" + projectId, method: "GET", token: currentUser?.token, },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_STORIES", payload: result });
  }
};

export const addStory = async (dispatch, story, currentUser) => {
  try {
    const result = await fetchData(
      { url: url + "/addStory", method: "POST", body: story, token: currentUser.token, },
      dispatch
    );
    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Story wurde erfolgreich erstellt",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: "Story konnte nicht erstellt werden" + err.message,
      },
    });
  }
};

export const updateStory = async (dispatch, story, currentUser) => {

  try {
    const result = await fetchData(
      { url: url + "/updateStory/" + story._id, method: "PUT", body: story, token: currentUser.token, },
      dispatch
    );
    if (result) {
      dispatch({ type: "UPDATE_STORIES", payload: result });
      
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Story wurde erfolgreich aktualisiert",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: "Story konnte nicht aktualisiert werden" + err.message,
      },
    });
  }
};

export const deleteStory = async (dispatch, storyId, currentUser) => {
  const result = await fetchData(
    {
      url: url + "/deleteStory/" + storyId,
      method: "DELETE",
      token: currentUser.token,
    },
    dispatch
  );
  if (result) {
  }
};
