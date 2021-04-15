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

import {updateProfileDetails} from '../../redux/actions/auth';

import {showMessage} from 'react-native-flash-message';

class EditUsername extends Component {
  state = {
    floatButtonVisible: false,
    username: '',
  };

  updateUsername = async () => {
    const {username} = this.state;
    const token = this.props.auth.token;
    await this.props.updateProfileDetails(token, '', '', username);
    if (this.props.auth.errorMsg !== '') {
      showMessage({
        message: 'Failed',
        description: 'Failed to edit username',
        type: 'danger',
      });
    } else {
      showMessage({
        message: 'Success',
        description: 'Successfully to edit username',
        type: 'success',
      });
      this.props.navigation.goBack('UserSettings');
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
                placeholder="New Username"
                placeholderTextColor="#51545b"
                onChangeText={(username) => this.setState({username})}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => this.updateUsername()}>
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

const mapDispatchToProps = {updateProfileDetails};

export default connect(mapStateToProps, mapDispatchToProps)(EditUsername);
