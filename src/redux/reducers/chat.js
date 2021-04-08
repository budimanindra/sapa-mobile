const initialState = {
  pageInfoDM: null,
  FriendList: [],
  message: '',
  errorMsg: null,
  chatLoaded: false,
};

function chat(state = initialState, action) {
  switch (action.type) {
    case 'GET_USER_CHAT_FRIENDS': {
      return {
        ...state,
        FriendList: action.chat,
        pageInfoDM: action.pageInfo,
        chatLoaded: action.chatLoaded,
      };
    }
    case 'PAGING_GET_USER_CHAT_FRIENDS': {
      const oldData = state.FriendList;
      const newData = [...oldData, ...action.chat];
      return {
        ...state,
        FriendList: newData,
        pageInfoDM: action.pageInfo,
        chatLoaded: action.chatLoaded,
      };
    }
    case 'SET_USER_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload,
        message: '',
      };
    }
    case 'CLEAR_CHAT': {
      return {
        ...state,
        FriendList: [],
        pageInfoDM: null,
        chatLoaded: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
}

export default chat;
