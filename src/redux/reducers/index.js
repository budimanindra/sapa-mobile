// import {combineReducers} from 'redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {persistReducer} from 'redux-persist';

// import authReducer from './auth';
// import movieReducer from './movie';
// import transactionReducer from './transaction';

// const rootPersistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   blacklist: ['auth'],
// };

// const authConfig = {
//   key: 'auth',
//   storage: AsyncStorage,
// };

// const reducers = combineReducers({
//   auth: persistReducer(authConfig, authReducer),
//   movie: movieReducer,
//   transaction: transactionReducer,
// });

// export default persistReducer(rootPersistConfig, reducers);
