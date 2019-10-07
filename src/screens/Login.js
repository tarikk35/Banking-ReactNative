import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import colors from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../components/forms/input';
import NextArrowButton from '../components/buttons/NextArrowButton';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

export default class Login extends Component {
  handleNextButton() {
    alert(' handle button click event ');
  }



  render() {
    return (
      <LinearGradient
        style={styles.gradientContainer}
        colors={[colors.appLightColor, colors.appDarkColor]}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingStyle}>
          <View style={styles.viewStyle}>
            <ScrollView style={styles.scrollViewStyle}>
              <Text style={styles.loginHeader}>Log In</Text>
              <View style={styles.inputViewStyle}>
                <InputField
                  labelText="E Mail"
                  inputType={'text'}
                  labelTextSize={14}
                  labelColor={colors.white}
                  textColor={colors.white}
                  borderBottomColor={colors.white}
                  inputType="email"
                  customStyle={{marginBottom: 30}}
                />
              </View>
              <InputField
                labelText="Password"
                inputType={'password'}
                labelTextSize={14}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType="password"
                customStyle={{marginBottom: 30}}
              />
            </ScrollView>
            <View style={styles.nextButtonStyle}>
              <NextArrowButton handleNextButton={this.handleNextButton} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  nextButtonStyle: {
    position: 'absolute',
    alignItems: 'flex-end',
    bottom: 6,
    right: 10,
  },

  inputViewStyle: {
    marginTop: 30,
    marginBottom: 20,
  },

  viewStyle: {
    marginTop: 70,
    flex: 1,
  },

  loginHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.white,
    marginStart: 10,
    marginBottom: 50,
    fontFamily: 'Montserrat-Regular',
  },

  gradientContainer: {
    flex: 1,
  },

  keyboardAvoidingStyle: {
    flex: 1,
    display: 'flex',
  },
  scrollViewStyle: {
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 10,
    flex: 1,
  },
});
