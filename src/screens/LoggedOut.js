import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import LinearGradient from 'react-native-linear-gradient';

export default class LoggedOut extends React.Component {
  onLoginPress() {
    this.props.navigate('Login');
  }

  onSignupPress() {}
  render() {
    const {navigate} = this.props.navigation;
    return (
      <LinearGradient
        style={styles.gradientContainer}
        colors={[colors.appLightColor, colors.appDarkColor]}>
        <View style={styles.wrapper}>
          <View style={styles.welcomeWrapper}>
            <Image
              source={require('../img/bank-icon.png')}
              style={styles.logo}></Image>
            <Text style={styles.welcomeText}>High Five Bankacılık</Text>
            <RoundedButton
              text="Giriş Yap"
              imagePath={require('../img/login-icon.png')}
              color={colors.appDarkColor}
              backgroundColor={colors.white}
              handleOnPress={() => navigate('Login')}></RoundedButton>
            <RoundedButton
              text="Kayıt Ol"
              color={colors.white}
              imagePath={require('../img/signup-icon.png')}
              backgroundColor={colors.appDarkColor}
              handleOnPress={() => navigate('Register')}></RoundedButton>
            <RoundedButton
              text="TEST"
              color={colors.white}
              imagePath={require('../img/signup-icon.png')}
              backgroundColor={colors.appDarkColor}
              handleOnPress={() => navigate('Test')}></RoundedButton>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    color: colors.white,
    justifyContent: 'center',
    fontWeight: '300',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 100,
    marginTop: 30,
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
