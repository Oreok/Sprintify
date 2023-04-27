//used to fetchData from the backend
const fetchData = async (
  { url, method = 'POST', token = '', body = null, isFile = false },
  dispatch
) => {
  let headers = {};
  if (!isFile) {
    headers = token
      ? { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
      : { 'Content-Type': 'application/json' };
    body = body ? { body: JSON.stringify(body) } : {};
  }

  try {
    let response;
    
    if (!isFile) {
      response = await fetch(url, { method, headers, ...body });
    } else {
      response = await fetch(url, { method, body });
    }

    const data = await response.json();
    if (!data.success) {
      if (response.status === 401)
        dispatch({ type: 'UPDATE_USER', payload: null });
      throw new Error(data.message);
    }
    return data.result;
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: error.message },
    });
    console.log(error);
    return null;
  }
};

export default fetchData;