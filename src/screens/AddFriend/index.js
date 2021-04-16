import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import {notification} from '../../components/Notification';

import http from '../../helpers/http';

import {connect} from 'react-redux';

import addfriend from '../../assets/auth.png';

import {showMessage} from 'react-native-flash-message';

import {login} from '../../redux/actions/auth';

class Login extends Component {
  state = {
    username: '',
  };

  doAddFriend = async () => {
    const {username} = this.state;
    const token = this.props.auth.token;
    const params = new URLSearchParams();
    params.append('username', username);
    try {
      const results = await http(token).post('/friends/', params);
      console.log(results.data.message);
      if (results.data.message === 'Add friend success') {
        showMessage({
          message: 'Success',
          description: 'Add friend success',
          type: 'success',
        });
        notification.configure();
        notification.makeChannel('1');
        notification.sendNotification(
          '1',
          'Add friend success !',
          `Say hi to ${username}`,
        );
        this.setState({
          username: '',
        });
      } else if (results.data.message === 'You already add this user') {
        showMessage({
          message: 'Info',
          description: 'You already add this user',
          type: 'info',
        });
      }
    } catch (err) {
      showMessage({
        message: 'Failed',
        description: 'Wrong username',
        type: 'danger',
      });
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.addFriend}>Add Friend</Text>
        </View>
        <Image source={addfriend} style={styles.auth} />
        <Text style={styles.welcomeBack}>Add your friend on Sapa!</Text>
        <Text style={styles.welcomeExcited}>
          you will need their username. Keep in mind that username is not case
          sensitive :)
        </Text>
        <View>
          <TextInput
            style={styles.form}
            placeholder="Username"
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            clearButtonMode="always"
          />
        </View>
        <TouchableOpacity style={styles.btnPrimary} onPress={this.doAddFriend}>
          <Text style={styles.btnText}>Send Friend Request</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#36393f',
    flex: 1,
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
    marginBottom: 5,
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
    marginBottom: 5,
  },
  auth: {
    marginLeft: 70,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  addFriend: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 90,
  },
});

const mapStateToProps = (state) => ({auth: state.auth});

const mapDispatchToProps = {login};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
