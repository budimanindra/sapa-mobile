import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Login';
import Register from '../Register';
import ForgotPassword from '../ForgotPassword';
import UserSettings from '../UserSettings';
import NavbarUserSettings from '../NavbarUserSettings';
import NavbarChat from '../NavbarChat';
import SplashScreen from '../SplashScreen';
import Welcome from '../Welcome';
import Friends from '../Friends';
import ChatRoom from '../ChatRoom';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavbarFriends from '../NavbarFriends';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={ChatRoom}
        options={() => ({
          header: (props) => <NavbarChat {...props} />,
        })}
        name="ChatRoom"
      />
      <Tab.Screen
        component={Friends}
        options={() => ({
          header: (props) => <NavbarFriends {...props} />,
        })}
        name="Friends"
      />
      <Tab.Screen
        component={UserSettings}
        options={() => ({
          header: (props) => <NavbarUserSettings {...props} />,
        })}
        name="UserSettings"
      />
    </Tab.Navigator>
  );
}

export class Main extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          component={SplashScreen}
          options={{headerShown: false}}
          name="SplashScreen"
        />
        <Stack.Screen
          component={Welcome}
          options={{headerShown: false}}
          name="Welcome"
        />
        <Stack.Screen
          component={Login}
          options={{headerShown: false}}
          name="Login"
        />
        <Stack.Screen
          component={Register}
          options={{headerShown: false}}
          name="Register"
        />
        <Stack.Screen
          component={ForgotPassword}
          options={{headerShown: false}}
          name="ForgotPassword"
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeTabs}
        />
        {/* <Stack.Screen
          component={UserSettings}
          options={() => ({
            header: (props) => <NavbarUserSettings {...props} />,
          })}
          name="UserSettings"
        />
        <Stack.Screen
          component={ChatRoom}
          options={() => ({
            header: (props) => <NavbarChat {...props} />,
          })}
          name="ChatRoom"
        />
        <Stack.Screen
          component={Friends}
          options={() => ({
            header: (props) => <NavbarFriends {...props} />,
          })}
          name="Friends"
        /> */}
      </Stack.Navigator>
    );
  }
}

export default Main;
