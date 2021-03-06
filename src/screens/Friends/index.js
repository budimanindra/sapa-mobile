import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavbarFriends from '../NavbarFriends/';

import avatar from '../../assets/user.png';

export class Friends extends Component {
  render() {
    return (
      // <View>

      <View style={styles.chatBody}>
        {/* <NavbarFriends /> */}
        <View>
          <View style={styles.header}>
            <Text style={styles.text}>Friends</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.iconSpace}>
                <Icon name="comment" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddFriend')}>
                <Icon name="user-plus" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.statusSection}>Online - 3</Text>

            <View style={styles.friends}>
              <Image style={styles.friendsImg} source={avatar} />
              <View style={styles.userNameAndStatus}>
                <Text style={styles.userName}>Howard</Text>
                <Text style={styles.status}>Online</Text>
              </View>
              <TouchableOpacity>
                <Icon name="phone" size={20} color="grey" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="comment"
                  size={20}
                  color="grey"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.friends}>
              <Image style={styles.friendsImg} source={avatar} />
              <View style={styles.userNameAndStatus}>
                <Text style={styles.userName}>Rooney</Text>
                <Text style={styles.status}>Online</Text>
              </View>
              <TouchableOpacity>
                <Icon name="phone" size={20} color="grey" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="comment"
                  size={20}
                  color="grey"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.friends}>
              <Image style={styles.friendsImg} source={avatar} />
              <View style={styles.userNameAndStatus}>
                <Text style={styles.userName}>Amalia</Text>
                <Text style={styles.status}>Online</Text>
              </View>
              <TouchableOpacity>
                <Icon name="phone" size={20} color="grey" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="comment"
                  size={20}
                  color="grey"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.container}>
            <Text style={styles.statusSection}>Offline - 2</Text>

            <View style={styles.friends}>
              <Image style={styles.friendsImg} source={avatar} />
              <View style={styles.userNameAndStatus}>
                <Text style={styles.userName}>Aerith</Text>
                <Text style={styles.status}>Offline </Text>
              </View>
              <TouchableOpacity>
                <Icon name="phone" size={20} color="grey" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="comment"
                  size={20}
                  color="grey"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.friends}>
              <Image style={styles.friendsImg} source={avatar} />
              <View style={styles.userNameAndStatus}>
                <Text style={styles.userName}>Milich</Text>
                <Text style={styles.status}>Offline</Text>
              </View>
              <TouchableOpacity>
                <Icon name="phone" size={20} color="grey" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="comment"
                  size={20}
                  color="grey"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  chatBody: {
    backgroundColor: '#36393f',
    flex: 1,
  },
  container: {
    padding: 10,
  },
  statusSection: {
    color: 'white',
  },
  friends: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  friendsImg: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    marginRight: 15,
  },
  userName: {
    color: '#b6b9b9',
  },
  status: {
    color: '#51555c',
  },
  userNameAndStatus: {
    flexDirection: 'column',
    marginRight: 120,
  },
  icon: {
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#2f3136',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  iconSpace: {
    marginRight: 30,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});

export default Friends;
