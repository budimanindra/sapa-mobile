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

import Icon from 'react-native-vector-icons/FontAwesome';

import {showMessage} from 'react-native-flash-message';

import {login} from '../../redux/actions/auth';

class Login extends Component {
  state = {
    visible: true,
    email: '',
    password: '',
  };

  doLogin = async () => {
    const {email, password} = this.state;
    await this.props.login(email, password);
    if (this.props.auth.token !== null) {
      showMessage({
        message: 'Success',
        description: 'Login succesfully',
        type: 'success',
      });
    } else {
      showMessage({
        message: 'Failed',
        description: 'Login failed',
        type: 'danger',
      });
    }
  };

  render() {
    return (
      <ImageBackground source={imgBg} style={styles.bgImg}>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity>
              <Icon name="arrow-left" color="grey" size={25} />
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
                onChangeText={(email) => this.setState({email})}
              />
            </View>
            <Text>Password</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.textInput}
                placeholder="write your password"
                secureTextEntry={this.state.visible}
                onChangeText={(password) => this.setState({password})}
              />
              <TouchableOpacity
                onPress={() => this.setState({visible: !this.state.visible})}>
                <Icon name="eye" color="grey" size={25} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.policy}>Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.policy}>Use a password manager?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => this.props.navigation.navigate('Home')}>
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
    marginTop: 12,
    marginBottom: 25,
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

export default Login;

// const mapStateToProps = (state) => ({auth: state.auth});

// const mapDispatchToProps = {register};

// export default connect(mapStateToProps, mapDispatchToProps)(Register);
