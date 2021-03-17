import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';

import persistedStore from './redux/store';

import Main from './screens/Main';

export default class App extends Component {
  render() {
    const {persistor, store} = persistedStore();
    return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <NavigationContainer>
            <Main />
            <FlashMessage position="top" />
          </NavigationContainer>
        </Provider>
      </PersistGate>
    );
  }
}
