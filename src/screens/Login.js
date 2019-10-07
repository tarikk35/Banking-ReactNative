import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import colors from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../components/forms/input';
import NextArrowButton from '../components/buttons/NextArrowButton';
import BottomNotification from '../components/BottomNotification';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: true,
    };
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
  }

  handleNextButton() {
    alert('button click event ');
  }

  handleCloseNotification() {
    this.setState({formValid: true});
  }

  render() {
    const {formValid} = this.state;
    const showNotification = formValid ? false : true;
    const backgroundColors = formValid
      ? [colors.appLightColor, colors.appDarkColor]
      : [colors.errorLightColor, colors.errorDarkColor];
    return (
      <LinearGradient
        style={styles.gradientContainer}
        colors={backgroundColors}>
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
                  customStyle={{marginBottom: 30}}></InputField>
              </View>
              <InputField
                labelText="Password"
                inputType={'password'}
                labelTextSize={14}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType="password"
                customStyle={{marginBottom: 30}}></InputField>
            </ScrollView>
            <View style={styles.nextButtonStyle}>
              <NextArrowButton
                handleNextButton={this.handleNextButton}></NextArrowButton>
            </View>
            <View style={showNotification ? {marginTop: 10} : {}}>
              <BottomNotification
                showNotification={showNotification}
                handleCloseNotification={this.handleCloseNotification}
                notificationType={'Error'}
                firstLine={'Credentials seems wrong.'}
                secondLine={'Please try again.'}></BottomNotification>
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
    bottom: 40,
    right: 30,
  },

  inputViewStyle: {
    marginTop: 30,
    marginBottom: 20,
  },

  viewStyle: {
    marginTop: 40,
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
