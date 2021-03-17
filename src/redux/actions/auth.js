import http from '../../helpers/http';

export const resetError = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOGIN_MESSAGE',
      payload: '',
    });
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('email', username);
    params.append('password', password);
    try {
      dispatch({
        type: 'SET_LOGIN_MESSAGE',
        payload: null,
      });
      const results = await http().post('/auth/login', params);
      dispatch({
        type: 'LOGIN',
        payload: results.data.results,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_LOGIN_MESSAGE',
        payload: message,
      });
    }
  };
};

export const register = (email, username, password) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('username', username);
    params.append('password', password);
    try {
      dispatch({
        type: 'SET_LOGIN_MESSAGE',
        payload: '',
      });
      const results = await http().post('/auth/register', params);
      dispatch({
        type: 'LOGIN',
        payload: results.data.token,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_LOGIN_MESSAGE',
        payload: message,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'LOGOUT',
      });
    } catch (err) {
      dispatch({
        type: 'LOGOUT',
      });
    }
  };
};

export const getUser = (token) => {
  return async (dispatch) => {
    try {
      const results = await http(token).get('/profile/');
      dispatch({
        type: 'UPDATE_PROFILE_DETAILS',
        payload: results.data.results,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_UPDATE_PROFILE_DETAILS_MESSAGE',
        payload: message,
      });
    }
  };
};

export const updateProfileDetails = (
  email,
  password,
  fullName,
  phoneNumber,
  token,
) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('fullName', fullName);
    params.append('email', email);
    params.append('phoneNumber', phoneNumber);
    params.append('password', password);
    try {
      const results = await http(token).patch(
        '/profile/update-profile-details',
        params,
      );
      dispatch({
        type: 'SET_LOGIN_MESSAGE',
        payload: '',
      });
      dispatch({
        type: 'UPDATE_PROFILE_DETAILS',
        payload: results.data.results,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_UPDATE_PROFILE_DETAILS_MESSAGE',
        payload: message,
      });
    }
  };
};
