import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import NavbarUserSettings from '../NavbarUserSettings';

import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

import {REACT_APP_API_URL} from '@env';

import http from '../../helpers/http';

import {getUser} from '../../redux/actions/auth';

import avatar from '../../assets/user.png';

class UserSettings extends Component {
  async componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      const token = this.props.auth.token;
      await this.props.getUser(token);
    });
  }

  render() {
    return (
      <View>
        <NavbarUserSettings />
        <ScrollView>
          <View style={styles.userInfo}>
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
            <View style={styles.row}>
              <Text style={styles.userName}>
                {this.props.auth.profile.username}
              </Text>
              {/* <Text style={styles.userTag}>#1998</Text> */}
            </View>
          </View>

          <View style={styles.userSettings}>
            <Text style={styles.textSettingsTitle}>USER SETTINGS</Text>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon
                  name="user-circle"
                  size={25}
                  color="grey"
                  style={styles.icon}
                />
                <View>
                  <Text style={styles.textSettingsKey}>Set Status</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MyAccount')}>
              <View style={styles.rowSettings}>
                <Icon name="user" size={25} color="grey" style={styles.icon} />
                <Text style={styles.textSettingsKey}>My Account</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon name="user" size={25} color="grey" style={styles.icon} />
                <Text style={styles.textSettingsKey}>Privacy & Safety</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon name="key" size={25} color="grey" style={styles.icon} />
                <Text style={styles.textSettingsKey}>Authorized Apps</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon
                  name="laptop"
                  size={25}
                  color="grey"
                  style={styles.icon}
                />
                <Text style={styles.textSettingsKey}>Connections</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon
                  name="qrcode"
                  size={25}
                  color="grey"
                  style={styles.icon}
                />
                <Text style={styles.textSettingsKey}>Scan QR Code</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.lineStyle2} />

          <View style={styles.userSettings}>
            <Text style={styles.textSettingsTitle}>NITRO SETTINGS</Text>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon
                  name="user-circle"
                  size={25}
                  color="purple"
                  style={styles.icon}
                />
                <View>
                  <Text style={styles.textSettingsKey}>Subscribe Today</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon name="user" size={25} color="grey" style={styles.icon} />
                <Text style={styles.textSettingsKey}>Boost</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon name="gift" size={25} color="grey" style={styles.icon} />
                <Text style={styles.textSettingsKey}>Nitro Gifting</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.lineStyle2} />

          <View style={styles.userSettings}>
            <Text style={styles.textSettingsTitle}>APP SETTINGS</Text>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon
                  name="microphone"
                  size={25}
                  color="grey"
                  style={styles.icon}
                />
                <View>
                  <Text style={styles.textSettingsKey}>Voice & Video</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon name="bell" size={25} color="grey" style={styles.icon} />
                <Text style={styles.textSettingsKey}>Notifications</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon
                  name="gamepad"
                  size={25}
                  color="grey"
                  style={styles.icon}
                />
                <Text style={styles.textSettingsKey}>Game Activity</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon name="user" size={25} color="grey" style={styles.icon} />
                <Text style={styles.textSettingsKey}>Text & Images</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon name="user" size={25} color="grey" style={styles.icon} />
                <Text style={styles.textSettingsKey}>Appereancesz</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon name="cogs" size={25} color="grey" style={styles.icon} />
                <Text style={styles.textSettingsKey}>Behavior</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon
                  name="language"
                  size={25}
                  color="grey"
                  style={styles.icon}
                />
                <Text style={styles.textSettingsKey}>Language</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.lineStyle2} />
          <View style={styles.lineStyle2} />

          <View style={styles.userSettings}>
            <Text style={styles.textSettingsTitle}>APP INFORMATION</Text>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon
                  name="info-circle"
                  size={25}
                  color="grey"
                  style={styles.icon}
                />
                <View>
                  <Text style={styles.textSettingsKey}>Change Log</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon
                  name="question-circle"
                  size={25}
                  color="grey"
                  style={styles.icon}
                />
                <Text style={styles.textSettingsKey}>Support</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon
                  name="info-circle"
                  size={25}
                  color="grey"
                  style={styles.icon}
                />
                <View>
                  <Text style={styles.textSettingsKey}>Upload debug logs</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.rowSettings}>
                <Icon
                  name="info-circle"
                  size={25}
                  color="grey"
                  style={styles.icon}
                />
                <View>
                  <Text style={styles.textSettingsKey}>Acknowledgements</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rowSettings: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingVertical: 10,
  },
  userInfo: {
    backgroundColor: '#2f3136',
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    marginBottom: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 23,
    color: 'white',
  },
  userTag: {
    marginTop: 8,
    fontSize: 15,
    color: '#a9abaf',
  },
  userSettings: {
    padding: 20,
    backgroundColor: '#36393f',
  },
  textSettingsKey: {
    color: '#d8d9da',
    marginBottom: 10,
  },
  textSettingsTitle: {
    color: '#d8d9da',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  icon: {
    paddingRight: 10,
  },
  lineStyle2: {
    borderWidth: 0.19,
    borderColor: 'grey',
  },
});

const mapStateToProps = (state) => ({auth: state.auth});

const mapDispatchToProps = {getUser};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
