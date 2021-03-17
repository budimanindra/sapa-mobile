import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import auth from '../../assets/auth.png';
// import {REACT_APP_API_URL} from '@env';
import avatar from '../../assets/user.png';

import Icon from 'react-native-vector-icons/FontAwesome';

import {REACT_APP_API_URL} from '@env';

import {connect} from 'react-redux';

import http from '../../helpers/http';

import {updateProfileDetails, getUser} from '../../redux/actions/auth';

import {showMessage} from 'react-native-flash-message';

import {launchImageLibrary} from 'react-native-image-picker';

class FloatingButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.uploadPhoto()}>
        <Icon name="save" size={25} color="white" style={styles.floatingIcon} />
      </TouchableOpacity>
    );
  }
}

class MyAccount extends Component {
  state = {
    visible: true,
    floatButtonVisible: false,
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
    console.log('bisa mas');
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

  async componentDidMount() {
    if (Object.keys(this.props.auth.profile).length === 0) {
      const token = this.props.auth.token;
      await this.props.getUser(token);
    }
  }

  render() {
    return (
      <View>
        <ScrollView>
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
              <Text style={styles.userName}>Indra Budiman</Text>
              <Text style={styles.userTag}>#1998</Text>
            </View>
          </View>

          <View style={styles.userSettings}>
            <Text style={styles.textSettingsTitle}>ACCOUNT INFORMATION</Text>
            <TouchableOpacity>
              <View style={styles.rowBetween}>
                <Text style={styles.key}>Username</Text>
                <Text style={styles.value}>Indra &gt;</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowBetween}>
                <Text style={styles.key}>Email</Text>
                <Text style={styles.value}>budimanindra@gmail.com &gt;</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowBetween}>
                <Text style={styles.key}>Phone</Text>
                <Text style={styles.value}>&gt;</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
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
            <TouchableOpacity>
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
});

const mapStateToProps = (state) => ({auth: state.auth});

const mapDispatchToProps = {updateProfileDetails, getUser};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
