import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';

export default class LoggedOut extends Component {
  onLoginPress() {
    alert('Login button pressed');
  }

  onSignupPress() {
    alert('Signup button pressed');
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          <Image
            source={require('../img/logo.png')}
            style={styles.logo}></Image>
          <Text style={styles.welcomeText}>High Five Banking</Text>
          <RoundedButton
            text="Log In"
            imagePath= {require('../img/login-icon.png')}
            color={colors.green01}
            backgroundColor={colors.white}
            handleOnPress={this.onLoginPress}></RoundedButton>
          <RoundedButton
            text="Sign Up"
            color={colors.white}
            imagePath= {require('../img/logo.png')}
            backgroundColor={colors.green01}
            handleOnPress={this.onSignupPress}></RoundedButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: colors.green01,
  },
  welcomeText: {
    fontSize: 30,
    color: colors.white,
    justifyContent:'center',
    fontWeight: '300',
    fontFamily:'Montserrat-Regular',
    marginBottom: 120
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop: 30,
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
