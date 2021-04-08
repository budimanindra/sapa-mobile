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

import {clearChat} from '../../redux/actions/chat';

import {showMessage} from 'react-native-flash-message';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

class FloatingButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.floatingIcon}
        onPress={() => this.props.uploadPhoto()}>
        <Icon name="save" size={25} color="white" />
      </TouchableOpacity>
    );
  }
}

class MyAccount extends Component {
  state = {
    passwordVisible: true,
    visible: true,
    floatButtonVisible: false,
    modalVisible: false,
    photo: null,
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    repassword: '',
  };

  setFloatButtonVisible = (visible) => {
    this.setState({floatButtonVisible: visible});
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  openGallery = () => {
    const options = {mediaType: 'photo'};
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.fileSize > 1 * 1024 * 1024) {
        showMessage({
          message: 'Failed to update photo profile',
          description: 'File size too large, max 2MB',
          type: 'danger',
        });
      } else if (response.errorMessage) {
        showMessage({
          message: 'Failed to update photo profile',
          description: 'Please input jpeg, jpg, or png photo file',
          type: 'danger',
        });
      } else {
        showMessage({
          message: 'Successfully to select photo profile',
          description: 'Please press upload photo image',
          type: 'info',
        });
        this.setState({photo: response});
        this.setFloatButtonVisible(true);
      }
    });
  };

  uploadPhoto = async () => {
    const token = this.props.auth.token;
    const fileUpload = {
      uri: this.state.photo.uri,
      type: this.state.photo.type,
      name: this.state.photo.fileName,
    };
    const file = new FormData();
    file.append('photo', fileUpload);
    await http(token).patch('/profile/update-profile-photo', file);
    await this.props.getUser(token);
    showMessage({
      message: 'Uploading your photo...',
      type: 'warning',
    });
    setTimeout(() => {
      showMessage({
        message: 'Successfully to update photo profile',
        type: 'success',
      });
    }, 3000);
  };

  doDeleteAccount = async () => {
    const {password} = this.state;
    console.log(password);
    const token = this.props.auth.token;
    const params = new URLSearchParams();
    params.append('password', password);
    // delete tidak bisa mengirim data di body
    await http(token).post('/auth/', params);
    await this.props.clearChat();
    await this.props.logout();
  };

  async componentDidMount() {
    if (Object.keys(this.props.auth.profile).length === 0) {
      const token = this.props.auth.token;
      await this.props.getUser(token);
    }
  }

  render() {
    const {modalVisible} = this.state;
    return (
      <View>
        <ScrollView>
          <View style={styles.centeredModal}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredModal}>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitleText}>Delete Account</Text>
                  <Text style={styles.modalInfoText}>
                    Are you sure that you want to delete your account? This will
                    immedietly log you out of your account and you will not be
                    able to log in again.
                  </Text>
                  <View style={styles.form}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Password"
                      placeholderTextColor="#51545b"
                      color="#FFFFFF"
                      secureTextEntry={this.state.passwordVisible}
                      onChangeText={(password) => this.setState({password})}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          passwordVisible: !this.state.passwordVisible,
                        })
                      }>
                      <Icon name="eye" color="grey" size={25} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.buttonSelected}
                    onPress={this.doDeleteAccount}>
                    <Text style={styles.textStyle}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.userInfo}>
            <View style={styles.rowCenter}>
              <TouchableOpacity onPress={() => this.openGallery()}>
                <Image
                  style={styles.avatar}
                  source={
                    this.props.auth.profile.photo !== null
                      ? {
                          uri: `${REACT_APP_API_URL}/${this.props.auth.profile.photo}`,
                        }
                      : avatar
                  }
                />
              </TouchableOpacity>
              <Text style={styles.userName}>
                {this.props.auth.profile.username}
              </Text>
              {/* <Text style={styles.userTag}>#1998</Text> */}
            </View>
          </View>

          <View style={styles.userSettings}>
            <Text style={styles.textSettingsTitle}>ACCOUNT INFORMATION</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditUsername')}>
              <View style={styles.rowBetween}>
                <Text style={styles.key}>Username</Text>
                <Text style={styles.value}>
                  {this.props.auth.profile.username} &gt;
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditEmail')}>
              <View style={styles.rowBetween}>
                <Text style={styles.key}>Email</Text>
                <Text style={styles.value}>
                  {this.props.auth.profile.email} &gt;
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowBetween}>
                <Text style={styles.key}>Phone</Text>
                <Text style={styles.value}>&gt;</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditPassword')}>
              <View style={styles.rowBetween}>
                <Text style={styles.key}>Change Password</Text>
                <Text style={styles.value}>&gt;</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.textSettingsTitle}>
              TWO-FACTOR AUTHENTICATION
            </Text>
            <Image source={auth} style={styles.auth} />
            <Text style={styles.authText}>
              Protect your Sapa account with an extra layer of security. Once
              configured, you'll be required to enter both your password and an
              authentication code from your mobile phone in order to sign in
            </Text>
            <TouchableOpacity style={styles.authButton}>
              <Text style={styles.authButtonText}>Enable Two-Factor Auth</Text>
            </TouchableOpacity>
            <View style={styles.lineStyle2} />
            <TouchableOpacity>
              <View style={styles.rowBetween}>
                <Text style={styles.key}>Blocked User</Text>
                <Text style={styles.value}>&gt;</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.textSettingsTitle}>ACCOUNT MANAGEMENT</Text>
            <TouchableOpacity>
              <View style={styles.rowBetween}>
                <Text style={styles.key}>Disable Account</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
              <View style={styles.rowBetween}>
                <Text style={styles.keyDelete}>Delete Account</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSecondary}
              onPress={() => this.uploadPhoto()}>
              <Text style={styles.btnText}>Update Photo</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {this.state.floatButtonVisible ? (
          <FloatingButton uploadPhoto={this.uploadPhoto} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  key: {
    color: 'white',
    fontSize: 15,
  },
  keyDelete: {
    color: '#e64225',
    fontSize: 15,
  },
  value: {
    color: '#d8d9da',
    fontSize: 15,
  },
  rowSettings: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingVertical: 10,
  },
  userInfo: {
    backgroundColor: '#2f3136',
    paddingVertical: 5,
    paddingLeft: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    marginBottom: 10,
  },
  userName: {
    fontSize: 15,
    color: 'white',
    marginLeft: 10,
  },
  userTag: {
    fontSize: 15,
    color: '#a9abaf',
  },
  userSettings: {
    paddingTop: 10,
    paddingBottom: 120,
    paddingHorizontal: 20,
    backgroundColor: '#36393f',
  },
  textSettingsKey: {
    color: '#d8d9da',
    marginBottom: 10,
  },
  textSettingsTitle: {
    color: '#d8d9da',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  icon: {
    paddingRight: 10,
  },
  lineStyle2: {
    borderWidth: 0.19,
    borderColor: 'grey',
  },
  auth: {
    marginLeft: 70,
  },
  authText: {
    marginVertical: 20,
    color: '#d8d9da',
    textAlign: 'justify',
  },
  authButton: {
    backgroundColor: '#4f535c',
    height: 40,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
  },
  authButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  floatingIcon: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    padding: 15,
    backgroundColor: '#737dc9',
    borderRadius: 25,
  },
  btnSecondary: {
    height: 30,
    backgroundColor: '#4f535c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    borderRadius: 7,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centeredModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#363940',
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 5,
    // elevation: 2,
    backgroundColor: 'white',
  },
  buttonSelected: {
    borderRadius: 5,
    padding: 10,
    marginLeft: 150,
    marginTop: 50,
    backgroundColor: '#f04747',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitleText: {
    marginBottom: 15,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  modalInfoText: {
    marginBottom: 15,
    textAlign: 'justify',
    color: 'white',
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
  },
});

const mapStateToProps = (state) => ({auth: state.auth});

const mapDispatchToProps = {updateProfileDetails, getUser, logout, clearChat};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
