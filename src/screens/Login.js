import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import colors from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../components/forms/input';
import NextArrowButton from '../components/buttons/NextArrowButton';
import BottomNotification from '../components/BottomNotification';
import Loader from '../components/Loader';
import BackButton from '../components/buttons/BackButton';

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
      loadingVisible: false,
      formValid: true,
      validID: false,
      IDNumber: '',
      pass: '',
      validPass: false,
    };

    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleIDChange = this.handleIDChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
  }

  async handleNextButton() {
    this.setState({loadingVisible: true});
    try {
      const response = await fetch(
        'http://10.0.2.2:3000/users?TCID=' +
          this.state.IDNumber +
          '&&pass=' +
          this.state.pass,
      );
      const responseJson = await response.json();
      console.log(responseJson[0]);
    } catch (error) {
      console.error(error);
    }
    this.setState({loadingVisible: false});
  }

  handleIDChange(ID) {
    const IDCheckReg = /^((?!(0))[0-9]{11})$/g; // dont start with 0, only numeric and only 11 characters allowed.
    this.setState({
      IDNumber: ID,
    });
    if (!this.state.validID) {
      if (IDCheckReg.test(ID)) {
        this.setState({validID: true});
      }
    } else {
      if (!IDCheckReg.test(ID)) {
        this.setState({validID: false});
      }
    }
  }

  handlePasswordChange(password) {
    if (!this.state.validPass) {
      if (password.length > 4) {
        this.setState({validPass: true, pass: password});
      }
    } else if (password.length <= 4) {
      this.setState({validPass: false, pass: null});
    }
  }

  toggleNextButtonState() {
    const {validID, validPass} = this.state;
    if (validID && validPass) {
      return false;
    }
    return true;
  }

  handleCloseNotification() {
    this.setState({formValid: true});
  }

  render() {
    const {goBack} = this.props.navigation;
    const {formValid} = this.state;
    const showNotification = formValid ? false : true;
    const backgroundColors = formValid
      ? [colors.appLightColor, colors.appDarkColor]
      : [colors.errorLightColor, colors.errorDarkColor];
    const notificationMarginTop = showNotification ? 10 : 0;
    return (
      <LinearGradient
        style={styles.gradientContainer}
        colors={backgroundColors}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingStyle}>
          <View style={styles.viewStyle}>
            <View style={styles.topContent}>
              <BackButton handleNextButton={() => goBack()}></BackButton>
              <Text style={styles.loginHeader}>Giriş Yap</Text>
            </View>
            <ScrollView style={styles.scrollViewStyle}>
              <View style={styles.inputViewStyle}>
                <InputField
                  labelText="TCKN"
                  inputType={'text'}
                  labelTextSize={14}
                  labelColor={colors.white}
                  textColor={colors.white}
                  borderBottomColor={colors.white}
                  inputType="email"
                  customStyle={{marginBottom: 30}}
                  onChangeText={this.handleIDChange}></InputField>
              </View>
              <InputField
                labelText="Şifre"
                inputType={'password'}
                labelTextSize={14}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType="password"
                customStyle={{marginBottom: 30}}
                onChangeText={this.handlePasswordChange}></InputField>
            </ScrollView>
            <View style={styles.nextButtonStyle}>
              <NextArrowButton
                disabled={this.toggleNextButtonState()}
                handleNextButton={this.handleNextButton}></NextArrowButton>
            </View>
            <View
              style={[
                styles.notificationWrapper,
                {marginTop: notificationMarginTop},
              ]}>
              <BottomNotification
                showNotification={showNotification}
                handleCloseNotification={this.handleCloseNotification}
                notificationType={'Hata'}
                firstLine={'Kimlik bilgileriniz yanlış'}
                secondLine={' lütfen tekrar deneyiniz.'}></BottomNotification>
            </View>
          </View>
          <Loader
            animationType="fade"
            modalVisible={this.state.loadingVisible}></Loader>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  nextButtonStyle: {
    position: 'absolute',
    alignItems: 'flex-end',
    bottom: 10,
    right: 30,
  },

  topContent: {
    flexDirection: 'row',
    width: '100%',
  },

  notificationWrapper: {
    bottom: 0,
    zIndex: 9,
  },

  inputViewStyle: {
    marginTop: 30,
    marginBottom: 20,
  },

  viewStyle: {
    flex: 1,
  },

  loginHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.white,
    left: '50%',
    marginTop: 40,
    marginBottom: 10,
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
