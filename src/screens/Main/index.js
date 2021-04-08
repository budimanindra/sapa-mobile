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
import AddFriend from '../AddFriend';
import MyAccount from '../MyAccount';
import ChatRoom from '../ChatRoom';
import EditUsername from '../EditUsername';
import EditPassword from '../EditPassword';
import EditEmail from '../EditEmail';
import NavbarEditUsername from '../NavbarEditUsername';
import NavbarEditPassword from '../NavbarEditPassword';
import NavbarEditEmail from '../NavbarEditEmail';
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

export const DMTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DM" component={DM} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export const FriendsTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Friends"
        component={Friends}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const UserSettingsTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserSettings"
        component={UserSettings}
        options={{headerShown: false}}
        // options={{
        //   header: (props) => <HeaderContacts {...props} />,
        // }}
      />
    </Stack.Navigator>
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
        component={DMTab}
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
        component={FriendsTab}
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
        component={UserSettingsTab}
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
              name="AddFriend"
              options={{headerShown: false}}
              component={AddFriend}
            />
            <Stack.Screen
              name="MyAccount"
              options={() => ({
                header: (props) => <NavbarMyAccount {...props} />,
              })}
              component={MyAccount}
            />
            <Stack.Screen
              name="EditUsername"
              options={() => ({
                header: (props) => <NavbarEditUsername {...props} />,
              })}
              component={EditUsername}
            />
            <Stack.Screen
              name="EditEmail"
              options={() => ({
                header: (props) => <NavbarEditEmail {...props} />,
              })}
              component={EditEmail}
            />
            <Stack.Screen
              name="EditPassword"
              options={() => ({
                header: (props) => <NavbarEditPassword {...props} />,
              })}
              component={EditPassword}
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
