import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import colors from '../styles/colors/index';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../components/forms/input';
import NextArrowButton from '../components/buttons/NextArrowButton';
import BottomNotification from '../components/BottomNotification';
import Loader from '../components/Loader';
import BackButton from '../components/buttons/BackButton';
import RadioForm from 'react-native-simple-radio-button';
import Store from '../Store';

import {
  View,
  ScrollView,
  StyleSheet,
  Text,
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
      pass: '',
      matchingPass: false,
      name: '',
      surname: '',
      genderValue: 0,
      radioButton: 'value1',
      showNotification: false,
      validPass: false,
    };

    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleIDChange = this.handleIDChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
    this.handleGenderState = this.handleGenderState.bind(this);
    this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.test = this.test.bind(this);
  }

  async handleNextButton() {
    // TODO: go to next register page.
    const genders = ['Erkek', 'Kadın', 'Diğer'];
    this.setState({loadingVisible: true});
    const response = await fetch(
      `${Store.getInstance().IP}api/Login/Register`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TCKN: this.state.IDNumber,
          password: this.state.pass,
          firstName: this.state.name,
          surname: this.state.surname,
          gender: genders[this.state.genderValue],
        }),
      },
    )
      // .then(data => (data['status'] == 200 ? data.json() : null))
      .catch(error => console.error(error));
    this.setState({showNotification: true});
    if (response['status'] > 200) {
      this.setState({formValid: false});
    }
    console.log(response);
    this.setState({loadingVisible: false});
  }

  test() {
    console.log(
      this.state.IDNumber,
      this.state.name,
      this.state.surname,
      this.state.matchingPass,
      this.state.pass,
      this.state.genderValue,
    );
    this.setState({showNotification: true, formValid: true});
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
        this.setState({validPass: true, pass: password});
      }
    } else if (password.length <= 4) {
      this.setState({validPass: false, pass: ''});
    }
  }

  handleConfirmPassChange(password) {
    if (!this.state.matchingPass) {
      if (password.length > 4 && password === this.state.pass) {
        this.setState({matchingPass: true});
      }
    } else if (password.length <= 4) {
      this.setState({matchingPass: false});
    }
  }

  handleNameChange(name) {
    const nameReg = /[a-zA-ZöÖüÜçÇşŞİığĞ]{3}/;
    if (nameReg.test(name)) {
      this.setState({name: name});
    } else {
      this.setState({name: ''});
    }
  }
  handleSurnameChange(surname) {
    const surnameReg = /[a-zA-ZöÖüÜçÇşŞİığĞ]{2}/;
    if (surnameReg.test(surname)) {
      this.setState({surname: surname});
    } else {
      this.setState({surname: ''});
    }
  }

  toggleNextButtonState() {
    const {validID, validPass, matchingPass, name, surname} = this.state;
    if (
      validID &&
      validPass &&
      matchingPass &&
      name.length !== 0 &&
      surname.length !== 0
    ) {
      return false;
    }
    return true;
  }

  handleCloseNotification() {
    this.setState({formValid: true, showNotification: false});
  }

  handleGenderState(value) {
    this.setState({
      genderValue: value,
    });
  }

  render() {
    var radio_props = [
      {label: 'Erkek', value: 0},
      {label: 'Kadın', value: 1},
      {label: 'Diğer', value: 2},
    ];
    const {goBack} = this.props.navigation;
    const {formValid} = this.state;
    const {showNotification} = this.state;
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
              <Text style={styles.loginHeader}>Kayıt Ol</Text>
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
                  onChangeText={this.handleIDChange}></InputField>
              </View>
              <View style={styles.passViewStyle}>
                <View style={styles.halfTextInput}>
                  <InputField
                    labelText="Şifre"
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
                    labelText="Şifre(Tekrar)"
                    inputType={'password'}
                    labelTextSize={14}
                    labelColor={colors.white}
                    textColor={colors.white}
                    borderBottomColor={colors.white}
                    inputType="password"
                    customStyle={{marginBottom: 24}}
                    onChangeText={this.handleConfirmPassChange}></InputField>
                </View>
              </View>
              <View style={styles.fullNameView}>
                <View style={styles.halfTextInput}>
                  <InputField
                    labelText="Ad"
                    inputType={'text'}
                    labelTextSize={14}
                    labelColor={colors.white}
                    textColor={colors.white}
                    borderBottomColor={colors.white}
                    customStyle={{marginBottom: 24}}
                    onChangeText={this.handleNameChange}></InputField>
                </View>
                <View style={styles.halfTextInput}>
                  <InputField
                    labelText="Soyad"
                    inputType={'text'}
                    labelTextSize={14}
                    labelColor={colors.white}
                    textColor={colors.white}
                    borderBottomColor={colors.white}
                    customStyle={{marginBottom: 24}}
                    onChangeText={this.handleSurnameChange}></InputField>
                </View>
              </View>
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
                  this.setState({genderValue: value});
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
                notificationType={formValid ? 'Başarılı' : 'Hata'}
                firstLine={
                  formValid
                    ? 'Kayıt oluşturdunuz.'
                    : 'Böyle bir kullanıcı zaten mevcut.'
                }
                secondLine={
                  formValid ? 'Lütfen giriş yapınız.' : ' '
                }></BottomNotification>
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
    color: '#2ecc71',
  },
  passViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfTextInput: {
    width: '44%',
  },

  fullNameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
