// const initialState = {
//   token: null,
//   profile: {},
//   errorMsg: '',
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOGIN': {
//       return {
//         ...state,
//         token: action.payload,
//       };
//     }
//     case 'SET_LOGIN_MESSAGE': {
//       return {
//         ...state,
//         errorMsg: action.payload,
//       };
//     }
//     case 'UPDATE_PROFILE_DETAILS': {
//       return {
//         ...state,
//         profile: action.payload,
//       };
//     }
//     case 'SET_UPDATE_PROFILE_DETAILS_MESSAGE': {
//       return {
//         ...state,
//         errorMsg: action.payload,
//       };
//     }
//     case 'LOGOUT': {
//       return {
//         ...state,
//         token: null,
//         profile: {},
//       };
//     }
//     default: {
//       return {
//         ...state,
//       };
//     }
//   }
// };

// export default authReducer;
