import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {showMessage} from 'react-native-flash-message';

import {connect} from 'react-redux';

import {logout} from '../../redux/actions/auth';
import {clearChat} from '../../redux/actions/chat';

import logoutPng from '../../assets/logout.png';

class NavbarUserSettings extends Component {
  doLogout = async () => {
    await this.props.clearChat();
    await this.props.logout();
    showMessage({
      message: 'Success',
      description: 'Succesfully logged out',
      type: 'success',
    });
  };

  render() {
    const {header, row, iconSpace, text, logoutIcon} = styles;
    return (
      <View>
        <View style={header}>
          <Text style={text}>User Settings</Text>
          <View style={row}>
            <TouchableOpacity style={iconSpace} onPress={this.doLogout}>
              <Image source={logoutPng} style={logoutIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="ellipsis-v" size={25} color="white" />
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
    paddingTop: 20,
    paddingBottom: 10,
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

const mapStateToProps = (state) => ({auth: state.auth});

const mapDispatchToProps = {logout, clearChat};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarUserSettings);
