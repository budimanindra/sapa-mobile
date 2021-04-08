import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class NavbarEditUsername extends Component {
  render() {
    const {header, col, text1, text2} = styles;
    return (
      <View>
        <View style={header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MyAccount')}>
            <Icon name="arrow-left" color="white" size={20} />
          </TouchableOpacity>
          <View style={col}>
            <Text style={text1}>Edit Username</Text>
            <Text style={text2}>User Settings</Text>
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
  },
  col: {
    flexDirection: 'column',
    marginLeft: 30,
  },
  iconSpace: {
    marginRight: 30,
  },
  text1: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  text2: {
    color: '#a9abaf',
    fontSize: 14,
  },
});

export default NavbarEditUsername;
