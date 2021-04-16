import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import imgBg from '../../assets/tes3.png';

import {connect} from 'react-redux';

import {
  validatePassword,
  validateEmail,
  validateUsername,
} from '../../helpers/validation';

import Icon from 'react-native-vector-icons/FontAwesome';

import {showMessage} from 'react-native-flash-message';

import {register} from '../../redux/actions/auth';

class Register extends Component {
  state = {
    visible: true,
    email: '',
    username: '',
    password: '',
    messagePassword: '',
    messageEmail: '',
    messageUsername: '',
  };

  doRegister = async () => {
    const {email, username, password} = this.state;
    await this.props.register(email, username, password);
    console.log(this.props.auth.errorMsg);
    if (this.props.auth.token !== null) {
      showMessage({
        message: 'Success',
        description: 'Succesfully to register an account',
        type: 'success',
      });
    } else {
      showMessage({
        message: 'Failed to register',
        description: `${this.props.auth.errorMsg}`,
        type: 'danger',
      });
    }
  };

  handlePasswordChange = (password) => {
    const {valid, message} = validatePassword(password);
    if (valid) {
      this.setState({password: password});
    }
    this.setState({password: password});
    this.setState({messagePassword: message});
  };

  handleEmailChange = (email) => {
    const {valid, message} = validateEmail(email);
    if (valid) {
      this.setState({email: email});
    }
    this.setState({email: email});
    this.setState({messageEmail: message});
  };

  handleUsernameChange = (username) => {
    const {valid, message} = validateUsername(username);
    if (valid) {
      this.setState({username: username});
    }
    this.setState({username: username});
    this.setState({messageUsername: message});
  };

  render() {
    return (
      <ImageBackground source={imgBg} style={styles.bgImg}>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity>
              <Icon
                name="arrow-left"
                color="grey"
                size={25}
                onPress={() => this.props.navigation.goBack()}
              />
            </TouchableOpacity>
            <Text style={styles.enterEmail}>Enter your email</Text>
            <View>
              <TextInput
                style={styles.form}
                keyboardType="email-address"
                placeholder="write your email"
                onChangeText={(email) => this.handleEmailChange(email)}
              />
            </View>
            <Text style={styles.validation}>{this.state.messageEmail}</Text>
            <View>
              <TextInput
                style={styles.form}
                keyboardType="email-address"
                placeholder="write your username"
                onChangeText={(username) => this.handleUsernameChange(username)}
              />
            </View>
            <Text style={styles.validation}>{this.state.messageUsername}</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.textInput}
                placeholder="write your password"
                secureTextEntry={this.state.visible}
                onChangeText={(password) => this.handlePasswordChange(password)}
              />
              <TouchableOpacity
                onPress={() => this.setState({visible: !this.state.visible})}>
                <Icon name="eye" color="grey" size={25} />
              </TouchableOpacity>
            </View>
            <Text style={styles.validation}>{this.state.messagePassword}</Text>
            <Text style={styles.policy}>View our Privacy Policy</Text>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={this.doRegister}>
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 88,
  },
  textInput: {
    flex: 1,
  },
  enterEmail: {
    marginTop: 25,
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  validation: {
    color: '#f54254',
  },
  form: {
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: '#FCFDFE',
    borderColor: '#DEDEDE',
    paddingHorizontal: 20,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  policy: {
    color: '#3C77AB',
  },
  bgImg: {
    height: '100%',
    width: '100%',
  },
  btnPrimary: {
    height: 30,
    backgroundColor: '#7288d9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    borderRadius: 7,
    marginTop: 30,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => ({auth: state.auth});

const mapDispatchToProps = {register};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
