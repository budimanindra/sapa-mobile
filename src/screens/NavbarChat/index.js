import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import logout from '../../assets/logout.png';

class NavbarNonMember extends Component {
  render() {
    const {userBar, rowDirection, userName} = styles;
    return (
      <View style={userBar}>
        <View style={rowDirection}>
          <TouchableOpacity>
            <Icon name="bars" size={18} color="white" />
          </TouchableOpacity>
          <Text style={userName}>@ShiroTama</Text>
          <TouchableOpacity>
            <Icon name="phone" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="camera" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="users" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userBar: {
    backgroundColor: '#212226',
    height: 60,
  },
  rowDirection: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  userName: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NavbarNonMember;
