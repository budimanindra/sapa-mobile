import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import imgBg from '../../assets/tes3.png';
import sapa from '../../assets/welcome.png';

class Welcome extends Component {
  render() {
    return (
      <ImageBackground source={imgBg} style={styles.bgImg}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.sapaLogo}>
              <Image source={sapa} />
            </View>
            <View style={styles.welcomeText}>
              <Text style={styles.welcomeTextSapa}>Welcome to Sapa</Text>
              <Text style={styles.welcomeTextInfo}>
                Join over 100 million people who use Sapa to
              </Text>
              <Text style={styles.welcomeTextInfo}>
                talk with communities and friends.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSecondary}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default Welcome;

const styles = StyleSheet.create({
  bgImg: {
    height: '100%',
    width: '100%',
  },
  sapaLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 110,
  },
  container: {
    padding: 20,
  },
  welcomeText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeTextSapa: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  welcomeTextInfo: {
    color: '#DADADA',
    fontSize: 15,
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
