import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  TextInput,
} from 'react-native';

import auth from '../../assets/auth.png';
// import {REACT_APP_API_URL} from '@env';
import avatar from '../../assets/user.png';

import Icon from 'react-native-vector-icons/FontAwesome';

import {REACT_APP_API_URL} from '@env';

import {connect} from 'react-redux';

import http from '../../helpers/http';

import {updateProfileDetails, getUser, logout} from '../../redux/actions/auth';

import {showMessage} from 'react-native-flash-message';

import {launchImageLibrary} from 'react-native-image-picker';

class EditUsername extends Component {
  state = {
    floatButtonVisible: false,
    passwordVisible: true,
    password: '',
  };

  updatePassword = async () => {
    const {password} = this.state;
    const token = this.props.auth.token;
    const params = new URLSearchParams();
    params.append('password', password);
    const results = await http(token).patch(
      '/profile/update-profile-password',
      params,
    );
    if (results.data.message !== 'Successfully to edit profile') {
      showMessage({
        message: 'Failed',
        description: 'Failed to edit password',
        type: 'danger',
      });
    } else {
      showMessage({
        message: 'Success',
        description: 'Successfully to edit profile',
        type: 'success',
      });
    }
  };

  render() {
    return (
      <View style={styles.bgColor}>
        <ScrollView>
          <View style={styles.editUserName}>
            <View style={styles.form}>
              <TextInput
                style={styles.textInput}
                placeholder="New password"
                placeholderTextColor="#51545b"
                onChangeText={(password) => this.setState({password})}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => this.updatePassword()}>
          <Icon
            name="save"
            size={25}
            color="white"
            style={styles.floatingIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  floatingIcon: {
    marginBottom: 30,
    marginLeft: 280,
    width: 50,
    height: 50,
    padding: 15,
    backgroundColor: '#737dc9',
    borderRadius: 25,
  },
  bgColor: {
    flex: 1,
    backgroundColor: '#363940',
  },
  editUserName: {
    padding: 20,
  },
  form: {
    borderRadius: 4,
    borderBottomColor: '#51545b',
    borderBottomWidth: 2,
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
  col: {
    flexDirection: 'column',
  },
});

const mapStateToProps = (state) => ({auth: state.auth});

const mapDispatchToProps = {updateProfileDetails, getUser, logout};

export default connect(mapStateToProps, mapDispatchToProps)(EditUsername);
