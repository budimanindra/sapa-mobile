import React, {Component} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';

import http from '../../helpers/http';

import {showMessage} from 'react-native-flash-message';

class EditUsername extends Component {
  state = {
    floatButtonVisible: false,
    passwordVisible: true,
    email: '',
  };

  updateEmail = async () => {
    const {email} = this.state;
    const token = this.props.auth.token;
    const params = new URLSearchParams();
    params.append('email', email);
    const results = await http(token).patch(
      '/profile/update-profile-details',
      params,
    );
    if (results.data.message !== 'Successfully to edit profile') {
      showMessage({
        message: 'Failed',
        description: 'Failed to edit email',
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
                placeholder="New email"
                placeholderTextColor="#51545b"
                onChangeText={(email) => this.setState({email})}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => this.updateEmail()}>
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

export default connect(mapStateToProps, null)(EditUsername);
