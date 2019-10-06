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
            textColor={colors.green01}
            backgroundColor={colors.white}
            handleOnPress={this.onLoginPress}></RoundedButton>
          <RoundedButton
            text="Sign Up"
            textColor={colors.green01}
            backgroundColor={colors.white}
            handleOnPress={this.onSignupPress}></RoundedButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.green01,
  },
  welcomeText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
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
