import fetchData from "./utils/fetchData.js";

const url =  process.env.REACT_APP_backendURL + "/image";

export const createImg = async (dispatch, data, currentUser) => {
  try {
    const result = await fetchData(
      { url: url + "/upload", method: "POST", body: data, isFile: true },
      dispatch
    );
    if (result) {
      dispatch({ type: "UPDATE_IMAGE", payload: result });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "image wurde erfolgreich erstellt",
        },
      });
      return await result;
    }
  } catch (err) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: "image konnte nicht erstellt werden" + err.message,
      },
    });
  }
};

export const getImageById = async (dispatch, imageId, currentUser) => {
  const result = await fetchData(
    { url: url + "/" + imageId, method: "GET" },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_IMAGE", payload: result });
  }
};

export const deleteImage = async (dispatch, ImageId, currentUser, data) => {
  dispatch({ type: "START_LOADING" });
  try {
    const result = await fetchData(
      {
        url: url + "/deleteImage/" + ImageId,
        method: "DELETE",
        body: data,
      },
      dispatch
    );
    if (result) {
      dispatch({ type: "UPDATE_IMAGE", payload: result });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Image wurde erfolgreich gelöscht",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: "Image konnte nicht gelöscht werden" + err.message,
      },
    });
  }
  dispatch({ type: "END_LOADING" });
};
