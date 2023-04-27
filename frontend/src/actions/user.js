import fetchData from "./utils/fetchData.js";

const url = process.env.REACT_APP_backendURL + "/user";

export const getUsers = async (dispatch, currentUser) => {
  const result = await fetchData(
    {
      url: url + "/getUsers",
      method: "GET",
      token: currentUser.token,
      user: currentUser,
    },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_USERS", payload: result });
  }
};

export const getProductOwners = async (dispatch, currentUser) => {
  const result = await fetchData(
    {
      url: url + "/getProductOwners",
      method: "GET",
      token: currentUser.token,
      user: currentUser,
    },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_PRODUCT_OWNERS", payload: result });
  }
};

export const getUser = async (userID, dispatch, currentUser) => {
  const result = await fetchData(
    {
      url: url + "/getUser/" + userID,
      method: "GET",
      token: currentUser.token,
      user: currentUser,
    },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_USER_INFO",
      payload: { ...currentUser, ...result },
    });
  }
};

export const register = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    { url: url + "/register", body: user },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "warning",
        message:
          "Ihr Account wurde erfolgreich erstellt, bitte aktivieren Sie ihren Account in der E-Mail, die Ihnen zugesendet wurde.",
      },
    });
  }
  dispatch({ type: "END_LOADING" });
};

export const login = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData({ url: url + "/login", body: user }, dispatch);

  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Erfolgreich eingeloggt",
      },
    });
  }
  dispatch({ type: "END_LOADING" });

  return Promise.resolve(result);
};

export const logout = (dispatch) => {
  dispatch({ type: "UPDATE_USER", payload: null });
  dispatch({
    type: "UPDATE_ALERT",
    payload: {
      open: true,
      severity: "success",
      message: "Erfolgreich ausgeloggt",
    },
  });
};

export const updateUser = async (
  updatedFields,
  userID,
  dispatch,
  currentUser
) => {
  try {
    const result = await fetchData(
      {
        url: url + "/updateUser/" + userID,
        method: "PATCH",
        token: currentUser.token,
        body: updatedFields,
      },
      dispatch
    );
    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Benutzer wurde erfolgreich aktualisiert",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message + " Benutzer konnte nicht aktualisiert werden",
      },
    });
  }
};

export const deleteUser = async (dispatch, userID, currentUser) => {
  dispatch({ type: "START_LOADING" });
  try {
    const result = await fetchData(
      {
        url: url + "/deleteUser/" + userID,
        method: "DELETE",
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      getUsers(dispatch, currentUser);
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Benutzer wurde erfolgreich gelöscht",
        },
      });
    }
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message + " Benutzer konnte nicht gelöscht werden",
      },
    });
  }
};

export const updateProfile = async (
  currentUser,
  userID,
  updatedFields,
  dispatch
) => {
  dispatch({ type: "START_LOADING" });

  try {
    const result = await fetchData(
      {
        url: url + "/updateProfile/",
        method: "PATCH",
        body: updatedFields,
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      dispatch({ type: "UPDATE_USER", payload: { ...currentUser, ...result } });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Ihr Profil wurde erfolgreich aktualisiert",
        },
      });
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { open: false },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
    console.log(error);
  }
  dispatch({ type: "END_LOADING" });
};

export const resetPassword = async (dispatch, email) => {
  try {
    const result = await fetchData(
      {
        url: url + "/resetPassword",
        method: "POST",
        body: { email: email },
      },
      dispatch
    );
    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Email wurde erfolgreich versendet",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
  }
};

export const verfifyAccount = async (dispatch, token) => {
  try {
    const result = await fetchData(
      {
        url: `${process.env.REACT_APP_backendURL}/auth/verify/${token}`,
        method: "PATCH",
      },
      dispatch
    );
    if (result) {
      return Promise.resolve(result);
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
  }
};

export const resetPasswordWithToken = async (dispatch, password, token) => {
  try {
    console.log(token);
    const result = await fetchData(
      {
        url: url + "/resetPasswordWithToken",
        method: "PATCH",
        body: { password: password, token: token },
      },
      dispatch
    );
    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Passwort wurde erfolgreich aktualisiert",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
  }
};
