import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Logo from '../../assets/splash.png';

function SplashScreen({navigation}) {
  setTimeout(() => {
    navigation.replace('Welcome');
  }, 2000);
  return (
    <View style={style.center}>
      <Image source={Logo} style={style.logo} />
    </View>
  );
}

const style = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#36393f',
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default SplashScreen;
