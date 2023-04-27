import fetchData from "./utils/fetchData.js";

const url = process.env.REACT_APP_backendURL + "/notification";


export const getNotifications = async (dispatch, currentUser) => {
  const result = await fetchData(
    { url: url + "/getNotificationsByUser/", method: "POST", body: currentUser },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_NOTIFICATIONS", payload: result });
  }
};
