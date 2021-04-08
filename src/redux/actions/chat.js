import http from '../../helpers/http';

export const getChat = (
  token,
  search = '',
  page = 1,
  by = 'username',
  sort = 'ASC',
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      });
      const result = await http(token).get(
        `/friends?search=${search}&page=${page}&by=${by}&sort=${sort}`,
      );
      dispatch({
        type: 'GET_USER_CHAT_FRIENDS',
        chat: result.data.results,
        pageInfo: result.data.pageInfo,
        chatLoaded: true,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      });
    }
  };
};

export const pagingGetChat = (
  token,
  search = '',
  page = 1,
  by = 'username',
  sort = 'ASC',
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      });
      const result = await http(token).get(
        `/friends?search=${search}&page=${page}&by=${by}&sort=${sort}`,
      );
      dispatch({
        type: 'PAGING_GET_USER_CHAT_FRIENDS',
        chat: result.data.results,
        pageInfo: result.data.pageInfo,
        chatLoaded: true,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      });
    }
  };
};

export const clearChat = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'CLEAR_CHAT',
      });
    } catch (err) {
      dispatch({
        type: 'CLEAR_CHAT',
      });
    }
  };
};
