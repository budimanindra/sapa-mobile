import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {showMessage} from 'react-native-flash-message';

class NavbarDM extends Component {
  render() {
    const {header, title} = styles;
    return (
      <View>
        <View style={header}>
          <Text style={title}>Direct Messages</Text>
          <TouchableOpacity>
            <Icon name="envelope" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#36393f',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});

export default NavbarDM;
