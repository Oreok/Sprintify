export const startLoading = async (dispatch) => {
  dispatch({ type: "START_LOADING" });
};

export const endLoading = async (dispatch) => {
  dispatch({ type: "END_LOADING" });
};
