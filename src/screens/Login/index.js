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

import {validatePassword, validateEmail} from '../../helpers/validation';

import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import {showMessage} from 'react-native-flash-message';

import {login} from '../../redux/actions/auth';

class Login extends Component {
  state = {
    visible: true,
    email: '',
    password: '',
    messagePassword: '',
    messageEmail: '',
  };

  doLogin = async () => {
    const {email, password} = this.state;
    await this.props.login(email, password);
    if (this.props.auth.token !== null) {
      showMessage({
        message: 'Successfully Login',
        type: 'success',
      });
    } else {
      showMessage({
        message: 'Failed to login',
        description: 'Wrong email or password',
        type: 'danger',
      });
    }
  };

  handlePasswordChange = (password) => {
    const {valid, message} = validatePassword(password);
    if (valid) {
      this.setState({password: password});
    }
    this.setState({messagePassword: message});
  };

  handleEmailChange = (email) => {
    const {valid, message} = validateEmail(email);
    if (valid) {
      this.setState({email: email});
    }
    this.setState({messageEmail: message});
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
            <Text style={styles.welcomeBack}>Welcome back!</Text>
            <Text style={styles.welcomeExcited}>
              we are so excited to see you again!
            </Text>
            <View>
              <TextInput
                style={styles.form}
                keyboardType="email-address"
                placeholder="write your email"
                onChangeText={(email) => this.handleEmailChange(email)}
              />
            </View>
            <Text style={styles.validation}>{this.state.messageEmail}</Text>
            <Text>Password</Text>
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
            <TouchableOpacity>
              <Text style={styles.policy}>Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.policy}>Use a password manager?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnPrimary} onPress={this.doLogin}>
              <Text style={styles.btnText}>Login</Text>
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
  validation: {
    color: '#f54254',
  },
  welcomeBack: {
    marginTop: 25,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  welcomeExcited: {
    color: '#DADADA',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 15,
  },
  form: {
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: '#FCFDFE',
    borderColor: '#DEDEDE',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  policy: {
    marginTop: 15,
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

const mapDispatchToProps = {login};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
