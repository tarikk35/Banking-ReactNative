import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import colors from '../styles/colors/index';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../components/forms/input';
import NextArrowButton from '../components/buttons/NextArrowButton';
import BottomNotification from '../components/BottomNotification';
import Loader from '../components/Loader';
import BackButton from '../components/buttons/BackButton';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

export default class Register extends Component {
  // TODO: formState 1,2,3 3 aşamalı kayıt için. 3.state olunca register olmaya çalış .
  constructor(props) {
    super(props);
    this.state = {
      loadingVisible: false,
      formValid: true,
      validID: false,
      IDNumber: '',
      genderValue: 0,
      radioButton: 'value1',
      validPass: false,
    };

    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleIDChange = this.handleIDChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
    this.handleGenderState = this.handleGenderState.bind(this);
  }

  handleNextButton() {
    // TODO: go to next register page.
    this.setState({loadingVisible: true});
    setTimeout(() => {
      if (this.state.IDNumber === '12345678900' && this.state.validPass) {
        this.setState({formValid: true, loadingVisible: false});
      } else {
        this.setState({formValid: false, loadingVisible: false});
      }
    }, 2000);
  }

  handleIDChange(ID) {
    const IDCheckReg = /[0-9]{11}/;
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
        this.setState({validPass: true});
      }
    } else if (password.length <= 4) {
      this.setState({validPass: false});
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

  handleGenderState(value) {
    this.setState({
      genderValue: value,
    });
  }

  render() {
    var radio_props = [
      {label: 'Male', value: 0},
      {label: 'Female', value: 1},
      {label: 'Other', value: 2},
    ];
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
              <Text style={styles.loginHeader}>Sign Up</Text>
            </View>
            <ScrollView style={styles.scrollViewStyle}>
              <View style={styles.inputViewStyle}>
                <InputField
                  labelText="TCID"
                  inputType={'text'}
                  labelTextSize={14}
                  labelColor={colors.white}
                  textColor={colors.white}
                  borderBottomColor={colors.white}
                  inputType="email"
                  onChangeText={this.handleIDChange}></InputField>
              </View>
              <View style={styles.passViewStyle}>
                <View style={styles.halfTextInput}>
                  <InputField
                    labelText="Password"
                    inputType={'password'}
                    labelTextSize={14}
                    labelColor={colors.white}
                    textColor={colors.white}
                    borderBottomColor={colors.white}
                    inputType="password"
                    customStyle={{marginBottom: 24}}
                    onChangeText={this.handlePasswordChange}></InputField>
                </View>
                <View style={styles.halfTextInput}>
                  <InputField
                    labelText="Confirm"
                    inputType={'password'}
                    labelTextSize={14}
                    labelColor={colors.white}
                    textColor={colors.white}
                    borderBottomColor={colors.white}
                    inputType="password"
                    customStyle={{marginBottom: 24}}
                    onChangeText={this.handlePasswordChange}></InputField>
                </View>
              </View>
              <InputField
                labelText="Name"
                inputType={'text'}
                labelTextSize={14}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                customStyle={{marginBottom: 24}}
                onChangeText={this.handlePasswordChange}></InputField>
              <InputField
                labelText="Surname"
                inputType={'text'}
                labelTextSize={14}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                customStyle={{marginBottom: 24}}
                onChangeText={this.handlePasswordChange}></InputField>
              <RadioForm
                initial={0}
                radio_props={radio_props}
                formHorizontal={true}
                buttonColor={colors.appLightColor}
                selectedButtonColor={colors.white}
                selectedLabelColor={colors.white}
                buttonStyle={styles.radioStyle}
                buttonSize={15}
                onPress={value => {
                  this.setState({value: value});
                }}></RadioForm>
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
                notificationType={'Error'}
                firstLine={'Credentials seems wrong.'}
                secondLine={'Please try again.'}></BottomNotification>
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
    right: 30,
    bottom: 20,
    marginTop: 40,
    flexDirection: 'row-reverse',
    width: '100%',
  },

  radioStyle: {
    color:'#2ecc71'
  },
  passViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfTextInput: {
    width: '44%',
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
    flexGrow: 1,

    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 10,
    flex: 1,
  },
});
