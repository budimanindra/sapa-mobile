import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Main from './screens/Main';

export class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Main />
        <FlashMessage position="top" />
      </NavigationContainer>
    );
  }
}

export default App;
