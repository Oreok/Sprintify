import fetchData from "./utils/fetchData.js";

const url = process.env.REACT_APP_backendURL + "/projects"; 

export const getAllProjects = async (dispatch, currentUser) => {
  const result = await fetchData(
    { url: url + "/", user: currentUser, method: "GET" },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_NAV_PROJECTS", payload: result });
  }
};

export const getProjectsByTeam = async (dispatch, currentUser) => {
  const teamId = currentUser?.team;
  const result = await fetchData(
    { url: url + "/getProjectsByTeam/" + teamId, method: "GET" },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_NAV_PROJECTS", payload: result });
  }
};
