import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {REACT_APP_API_URL} from '@env';
import avatar from '../../assets/user.png';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavbarChat from '../NavbarChat';

import {connect} from 'react-redux';

import http from '../../helpers/http';
import io from '../../helpers/socket';

class ChatRoom extends Component {
  state = {
    receiverId: 0,
    receiverName: '',
    receiverPhoto: '',
    message: '',
    chatList: [{}],
  };

  doSend = async () => {
    const token = this.props.auth.token;
    const {message} = this.state;
    const params = new URLSearchParams();
    params.append('receiver', this.state.receiverId);
    params.append('message', message);
    await http(token).post('/chat/', params);
    this.setState({
      message: '',
    });
  };

  componentDidMount() {
    const {receiverId, receiverName, receiverPhoto} = this.props.route.params;
    this.setState({
      receiverId: receiverId,
      receiverName: receiverName,
      receiverPhoto: receiverPhoto,
    });
    this.chatList(receiverId);

    io.on(`${this.props.auth.profile.id}-${receiverId}`, (chat) => {
      const chatNew = [];
      chatNew.push(chat);
      const newChatList = this.state.chatList;
      this.setState({chatList: [...chatNew, ...newChatList]});
    });

    io.on(`${receiverId}-${this.props.auth.profile.id}`, (chat) => {
      const chatNew = [];
      chatNew.push(chat);
      const newChatList = this.state.chatList;
      this.setState({chatList: [...chatNew, ...newChatList]});
    });
  }

  chatList = async (receiverId) => {
    try {
      const token = this.props.auth.token;
      const result = await http(token).get(`/chat/${receiverId}`);
      this.setState({
        errorMsg: '',
        chatList: result.data.results,
      });
    } catch (err) {
      this.setState({
        errorMsg: err.response.message,
        chatList: [],
      });
    }
  };

  renderItem = ({item}) => {
    return (
      <View style={styles.user}>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={
              item.sender_id === this.props.auth.profile.id
                ? this.props.auth.profile.photo !== null
                  ? {
                      uri: `${REACT_APP_API_URL}/${this.props.auth.profile.photo}`,
                    }
                  : avatar
                : this.state.receiverPhoto !== null
                ? {
                    uri: `${REACT_APP_API_URL}/${this.state.receiverPhoto}`,
                  }
                : avatar
            }
          />
        </TouchableOpacity>
        <View style={styles.col}>
          <Text style={styles.userName}>
            {item.sender_id === this.props.auth.profile.id
              ? this.props.auth.profile.username
              : this.state.receiverName}
          </Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.chatBody}>
        <NavbarChat receiverName={this.state.receiverName} />
        <FlatList
          inverted
          showsVerticalScrollIndicator={false}
          data={this.state.chatList}
          // dari bang zaqi
          keyExtractor={(item, index) => String(item.id)}
          renderItem={this.renderItem}
          onEndReached={this.props.onLoadMore}
        />
        <View style={styles.row}>
          <TouchableOpacity>
            <Icon name="image" style={styles.iconForm} color="grey" size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="gift" style={styles.iconForm} color="grey" size={20} />
          </TouchableOpacity>
          <TextInput
            style={styles.form}
            keyboardType="default"
            placeholder="Message"
            onChangeText={(message) => this.setState({message})}
            value={this.state.message}
            clearButtonMode="always"
          />
          <TouchableOpacity onPress={this.doSend}>
            <Icon
              name="arrow-right"
              style={styles.send}
              color="grey"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatBody: {
    backgroundColor: '#36393f',
    flex: 1,
  },
  col: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  user: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  message: {
    color: 'white',
    width: 250,
  },
  form: {
    borderRadius: 20,
    backgroundColor: '#FCFDFE',
    borderColor: '#DEDEDE',
    height: 40,
    paddingHorizontal: 20,
    width: 160,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconForm: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    marginRight: 15,
    marginBottom: 10,
  },
  send: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    marginLeft: 10,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => ({auth: state.auth});

// const mapDispatchToProps = {updateProfileDetails, getUser};

export default connect(mapStateToProps, null)(ChatRoom);
