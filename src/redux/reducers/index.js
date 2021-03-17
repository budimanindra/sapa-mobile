import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import authReducer from './auth';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth'],
};

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  auth: persistReducer(authConfig, authReducer),
});

export default persistReducer(rootPersistConfig, reducers);
