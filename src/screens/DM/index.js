import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';

import avatar from '../../assets/user.png';

import {connect} from 'react-redux';

import {getUser} from '../../redux/actions/auth';

import http from '../../helpers/http';
import {REACT_APP_API_URL} from '@env';

import NavbarDM from '../NavbarDM';

import Icon from 'react-native-vector-icons/FontAwesome';

class DM extends Component {
  state = {
    errorMsg: '',
    chat: [{}],
    chatLoaded: false,
  };

  getChat = async () => {
    try {
      const token = this.props.auth.token;
      const result = await http(token).get('/friends/');
      this.setState({
        errorMsg: '',
        chat: result.data.results,
        chatLoaded: true,
      });
      console.log(this.state.chat);
    } catch (err) {
      this.setState({
        errorMsg: err.response.message,
        chat: {},
      });
    }
  };

  componentDidMount() {
    this.getChat();
    this.props.getUser(this.props.auth.token);
  }

  render() {
    return (
      <View style={styles.DM}>
        <NavbarDM />
        <View>
          <TextInput
            style={styles.search}
            placeholder="Find or start a conversation"
            placeholderTextColor="#83858a"
            onChangeText={(user) => this.setState({user})}
          />
        </View>
        <ScrollView>
          {this.state.chatLoaded &&
            this.state.chat.map((chat) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ChatRoom', {
                    receiverPhoto: chat.photo,
                    receiverName: chat.username,
                    receiverId: chat.idUser2,
                  })
                }
                key={chat.username}>
                <View style={styles.user}>
                  <Image
                    style={styles.avatar}
                    source={
                      chat.photo !== null
                        ? {
                            uri: `${REACT_APP_API_URL}/${chat.photo}`,
                          }
                        : avatar
                    }
                  />
                  <Text style={styles.userName}>{chat.username}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'center',
  },
  search: {
    backgroundColor: '#212226',
    margin: 20,
    borderRadius: 7,
    paddingLeft: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 20,
  },
  DM: {
    flex: 1,
    backgroundColor: '#36393f',
  },
  userName: {
    color: '#e5e7e8',
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({auth: state.auth});

const mapDispatchToProps = {getUser};

export default connect(mapStateToProps, mapDispatchToProps)(DM);
