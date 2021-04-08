import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';

import avatar from '../../assets/user.png';

import {connect} from 'react-redux';

import {getChat, pagingGetChat} from '../../redux/actions/chat';

import {REACT_APP_API_URL} from '@env';

import NavbarDM from '../NavbarDM';

import Icon from 'react-native-vector-icons/FontAwesome';

class DM extends Component {
  state = {
    errorMsg: '',
    chat: [{}],
    visible: true,
    chatLoaded: false,
    search: '',
    sort: 'ASC',
    by: 'username',
    message: '',
    loading: '',
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  sort = async (value) => {
    this.setState({loading: true, sort: value});
    await this.props.getChat(this.props.auth.token, '', 1, 'username', value);
    if (this.props.chat.FriendList.length > 0) {
      this.setState({
        message: '',
        loading: false,
      });
      this.setModalVisible(false);
    } else {
      this.setState({
        message: `${value} Not Found`,
        loading: false,
      });
    }
  };

  search = async (value) => {
    this.setState({loading: true, search: value});
    await this.props.getChat(this.props.auth.token, value);
    if (this.props.chat.FriendList.length > 0) {
      this.setState({
        message: '',
        loading: false,
      });
    } else {
      this.setState({
        message: `${value} Not Found`,
        loading: false,
      });
    }
  };

  next = async () => {
    if (
      this.props.chat.pageInfoDM &&
      this.props.chat.pageInfoDM.currentPage <
        this.props.chat.pageInfoDM.totalPage
    ) {
      const {search, sort, by} = this.state;
      await this.props.pagingGetChat(
        this.props.auth.token,
        search,
        this.props.chat.pageInfoDM.currentPage + 1,
        by,
        sort,
      );
    }
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      await this.props.getChat(this.props.auth.token);
    });
  }

  render() {
    const {FriendList, chatLoaded} = this.props.chat;
    const {modalVisible} = this.state;
    return (
      <View style={styles.DM}>
        <NavbarDM />
        <View>
          <View style={styles.form}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#83858a"
              color="#83858a"
              placeholder="Find or start a conversation"
              onChangeText={(value) => this.search(value)}
            />
            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
              <Icon name="bars" color="#83858a" size={25} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={FriendList}
          keyExtractor={(item) => item.idUser2}
          renderItem={({item}) => {
            return (
              chatLoaded && (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ChatRoom', {
                      receiverPhoto: item.photo,
                      receiverName: item.username,
                      receiverId: item.idUser2,
                    })
                  }
                  key={item.username}>
                  <View style={styles.user}>
                    <Image
                      style={styles.avatar}
                      source={
                        item.photo !== null
                          ? {
                              uri: `${REACT_APP_API_URL}/${item.photo}`,
                            }
                          : avatar
                      }
                    />
                    <Text style={styles.userName}>{item.username}</Text>
                  </View>
                </TouchableOpacity>
              )
            );
          }}
          onEndReached={this.next}
          onEndReachedThreshold={0.1}
        />
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
                <Text style={styles.modalText}>Filter Options</Text>
                <TouchableOpacity onPress={() => this.sort('ASC')}>
                  <Text style={styles.textStyle}>ASC</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.sort('DESC')}>
                  <Text style={styles.textStyle}>DESC</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
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
    marginVertical: 10,
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
  form: {
    // flex: 1,
    backgroundColor: '#212226',
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    borderRadius: 7,
    paddingLeft: 20,
  },
  textInput: {
    flex: 1,
  },
  centeredModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#363940',
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2,
    shadowRadius: 1,
    elevation: 5,
  },
  textStyle: {
    color: '#d2d4d6',
    // fontWeight: 'bold',
    marginVertical: 15,
    fontSize: 15,
  },
  modalText: {
    marginBottom: 25,
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({auth: state.auth, chat: state.chat});

const mapDispatchToProps = {getChat, pagingGetChat};

export default connect(mapStateToProps, mapDispatchToProps)(DM);
