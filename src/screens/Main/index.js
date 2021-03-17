import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {connect} from 'react-redux';

import Login from '../Login';
import Register from '../Register';
import ForgotPassword from '../ForgotPassword';
import UserSettings from '../UserSettings';
import NavbarMyAccount from '../NavbarMyAccount';
import NavbarChat from '../NavbarChat';
import SplashScreen from '../SplashScreen';
import Welcome from '../Welcome';
import Friends from '../Friends';
import MyAccount from '../MyAccount';
import ChatRoom from '../ChatRoom';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Image} from 'react-native';
import DM from '../DM';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const IconBottom = (props) => {
  const {color, focused} = props.data;
  let colorSelected = focused ? color : 'grey';
  return (
    <View>
      <Image
        source={props.image}
        style={{
          width: 30,
          height: 30,
          tintColor: colorSelected,
          marginTop: 15,
        }}
      />
    </View>
  );
};

function HomeTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#212226',
        },
      }}>
      <Tab.Screen
        component={DM}
        options={{
          title: '',
          tabBarIcon: (props) => (
            <IconBottom
              data={props}
              image={require('../../assets/splash.png')}
            />
          ),
        }}
        name="DM"
      />
      <Tab.Screen
        component={Friends}
        options={{
          title: '',
          tabBarIcon: (props) => (
            <IconBottom
              data={props}
              image={require('../../assets/adduser.png')}
            />
          ),
        }}
        name="Friends"
      />
      <Tab.Screen
        component={UserSettings}
        options={{
          title: '',
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('../../assets/user.png')} />
          ),
        }}
        name="UserSettings"
      />
    </Tab.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      <Stack.Navigator>
        {this.props.auth.token === null && (
          <React.Fragment>
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
          </React.Fragment>
        )}

        {this.props.auth.token !== null && (
          <React.Fragment>
            <Stack.Screen
              name="Home"
              options={{headerShown: false}}
              component={HomeTabs}
            />
            <Stack.Screen
              name="ChatRoom"
              options={{headerShown: false}}
              component={ChatRoom}
            />
            <Stack.Screen
              name="MyAccount"
              options={() => ({
                header: (props) => <NavbarMyAccount {...props} />,
              })}
              component={MyAccount}
            />
          </React.Fragment>
        )}
      </Stack.Navigator>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
