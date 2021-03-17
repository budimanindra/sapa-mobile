import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import logout from '../../assets/logout.png';

class NavbarFriends extends Component {
  render() {
    const {header, row, iconSpace, text, logoutIcon} = styles;
    return (
      <View>
        <View style={header}>
          <Text style={text}>Friends</Text>
          <View style={row}>
            <TouchableOpacity style={iconSpace}>
              <Icon name="comment" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="user-plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2f3136',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  iconSpace: {
    marginRight: 30,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  logoutIcon: {
    width: 22,
    height: 22,
  },
});

export default NavbarFriends;
