import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import HeaderWithDrawer from '../components/HeaderWithMenu';
import Store from '../Store';
import Loader from '../components/Loader';
import {Picker, Item, Label, Input, Button, Icon} from 'native-base';
import BottomNotification from '../components/BottomNotification';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      phoneInfo: {},
      isLoading: false,
      isDebtLoading: false,
      isPhoneChecked: false,
      selectedAccount: '',
      phoneText: '', // Input text
      phoneNumber: '', // Checked phone number
      phoneValid: false,
      formValid: true,
      checkMessage: '',
      checkValid: true,
      showNotification: false,
    };
    // this.fetchAccounts = this.fetchAccounts.bind(this);
    this.onPickerValueChange = this.onPickerValueChange.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleOnCheckPress = this.handleOnCheckPress.bind(this);
    this.handleOnPaymentPress = this.handleOnPaymentPress.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }

  // componentDidMount() {
  //   this.focusListener = this.props.navigation.addListener('didFocus', () => {
  //     this.fetchTransactions();
  //   });
  // }

  // componentWillUnmount() {
  //   // Remove the event listener
  //   this.focusListener.remove();
  // }

  // async fetchAccounts() {
  //   await fetch(`${Store.getInstance().IP}api/Account`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       customNum: Store.getInstance().getUserID(),
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       this.setState({
  //         isLoading: false,
  //         accounts: response,
  //         selectedItemVal: response[0]['IBAN'],
  //       });
  //     });
  // }

  onPickerValueChange(value, index) {
    console.log(value);
    this.setState({selectedAccount: value});
  }

  accountPickers() {
    return this.state.accounts.map((item, index) => {
      return (
        <Picker.Item
          key={index}
          value={item['IBAN']}
          label={`${item['IBAN'].substring(0, 9)}  ${item['IBAN'].substring(
            9,
            13,
          )}     |    \$ ${item['balance']}`}></Picker.Item>
      );
    });
  }

  handleCloseNotification() {
    this.setState({formValid: true, showNotification: false});
  }

  async handleOnCheckPress() {
    this.setState({isDebtLoading: true, phoneNumber: this.state.phoneText});
    const response = await fetch(`${Store.getInstance().IP}api/Debt`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        customNum: Store.getInstance()._userID,
        phoneNumber: this.state.phoneText.toString(),
      },
    })
      .then(response => {
        if (response['status'] == 200) {
          response.json().then(res => this.setState({phoneInfo: res}));
          this.setState({checkValid: true});
        } else if (response['status'] == 409) {
          this.setState({
            checkMessage: 'Bu ayki faturanız ödenmiş.',
            checkValid: false,
          });
        } else if (response['status'] == 401) {
          this.setState({
            checkMessage: 'Telefon numarası bulunamadı.',
            checkValid: false,
          });
        }
      })
      .then(() => this.fetchAccounts())
      .catch(error => console.error(error));

    this.setState({
      isDebtLoading: false,
      isPhoneChecked: true,
    });
  }

  async handleOnPaymentPress() {
    this.setState({isLoading: true});
    const response = await fetch(`${Store.getInstance().IP}api/Debt/pay`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        customNum: Store.getInstance()._userID,
        phoneNumber: this.state.phoneText.toString(),
        iban: this.state.selectedAccount,
      },
    })
      .then(response => {
        if (response['status'] == 200) {
          this.setState({formValid: true});
        } else {
          this.setState({formValid: false});
        }
        console.log(response);
      })
      .catch(error => console.error(error));

    this.setState({
      isLoading: false,
      showNotification: true,
      isPhoneChecked: false,
    });
  }

  accountPickers() {
    return this.state.accounts.map((item, index) => {
      return (
        <Picker.Item
          key={index}
          value={item['IBAN']}
          label={`${item['IBAN'].substring(0, 9)}  ${item['IBAN'].substring(
            9,
            13,
          )}     |    ₺ ${item['balance']}`}></Picker.Item>
      );
    });
  }

  async fetchAccounts() {
    await fetch(`${Store.getInstance().IP}api/Account/List`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        customNum: Store.getInstance()._userID,
      },
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          isLoading: false,
          accounts: response,
          selectedAccount: response[0]['IBAN'],
        });
      });
  }

  handlePhoneChange(phone) {
    const phoneCheckReg = /^((?!(0))[0-9]{10})$/g; // dont start with 0, only numeric and only 11 characters allowed.
    this.setState({
      phoneText: phone,
    });
    if (phoneCheckReg.test(phone)) {
      this.setState({phoneValid: true});
    } else {
      this.setState({phoneValid: false});
    }
  }

  paymentPage() {
    if (this.state.checkValid) {
      const date = new Date(this.state.phoneInfo['dueDate']);
      var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return (
        <View style={{marginLeft: '8%'}}>
          <Text
            style={{
              color: Colors.white,
              fontSize: 21,
              marginBottom: 12,
            }}>{`Telefon Numarası : ${
            this.state.phoneInfo['phoneNumber']
          }`}</Text>
          <Text
            style={{
              color: Colors.white,
              fontSize: 21,
              marginBottom: 12,
            }}>{`Borç : ₺ ${this.state.phoneInfo['debt1']}`}</Text>
          <Text
            style={{
              color: Colors.white,
              fontSize: 17,
            }}>{`Son Ödeme Tarihi : ${date.toLocaleDateString(
            'tr-TR',
            options,
          )}`}</Text>
          <View style={{marginRight: 20, marginTop: 50}}>
            <Label style={{color: Colors.white}}>Seçilen Hesap</Label>
            <Item picker>
              <Picker
                style={{color: Colors.white}}
                mode="dropdown"
                iosIcon={
                  <Icon style={{color: Colors.white}} name="arrow-down" />
                }
                placeholder="Gönderilecek Hesap Seç"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selectedAccount}
                onValueChange={this.onPickerValueChange}>
                {this.accountPickers()}
              </Picker>
            </Item>
            <Button
              large
              style={{
                justifyContent: 'center',
                height: 50,
                width: '50%',
                marginLeft: '25%',
                marginTop: 32,
                borderRadius: 10,
              }}
              onPress={this.handleOnPaymentPress}
              disabled={!this.state.phoneValid}>
              <Text
                style={{
                  fontSize: 24,
                  color: Colors.white,
                }}>
                Öde
              </Text>
            </Button>
          </View>
        </View>
      );
    } else {
      return (
        <Text style={{color: Colors.white, fontSize: 22, marginLeft: '6%'}}>
          {this.state.checkMessage}
        </Text>
      );
    }
  }

  render() {
    const {showNotification, formValid} = this.state;
    if (this.state.isLoading) {
      return (
        <Loader
          animationType="fade"
          modalVisible={this.state.isLoading}></Loader>
      );
    } else {
      return (
        <LinearGradient
          style={{flex: 1}}
          colors={
            this.state.formValid
              ? [Colors.appLightColor, Colors.appDarkColor]
              : [Colors.errorLightColor, Colors.errorDarkColor]
          }>
          <View style={{flex: 1}}>
            <HeaderWithDrawer
              title="ODEME ISLEMLERI"
              onPress={() =>
                this.props.navigation.openDrawer()
              }></HeaderWithDrawer>
            <ScrollView style={{flex: 1}}>
              <View>
                <Text
                  style={{
                    color: Colors.white,
                    marginLeft: '7%',
                    marginTop: 48,
                  }}>
                  Telefon Numarası
                </Text>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    style={{
                      borderBottomColor: Colors.black,
                      color: Colors.white,
                      width: '50%',
                      marginLeft: '5%',
                      fontSize: 22,
                      borderBottomWidth: 1,
                    }}
                    onChangeText={this.handlePhoneChange}></TextInput>
                  <Button
                    large
                    style={{
                      justifyContent: 'center',
                      height: 50,
                      width: '25%',
                      marginRight: '9%',
                      borderRadius: 10,
                    }}
                    onPress={this.handleOnCheckPress}
                    disabled={!this.state.phoneValid}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Colors.white,
                      }}>
                      Sorgula
                    </Text>
                  </Button>
                </View>
              </View>
              {!this.state.isDebtLoading && this.state.isPhoneChecked ? (
                <View
                  style={{
                    width: '88%',
                    marginLeft: '6%',
                    marginTop: 60,
                    height: 400,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: Colors.grey7,
                  }}>
                  {this.paymentPage()}
                </View>
              ) : (
                <Loader
                  animationType="fade"
                  modalVisible={this.state.isDebtLoading}></Loader>
              )}
            </ScrollView>
            <BottomNotification
              showNotification={showNotification}
              handleCloseNotification={this.handleCloseNotification}
              notificationType={formValid ? 'Başarılı' : 'Hata'}
              firstLine={
                formValid
                  ? 'Ödemeniz başarıyla gerçekleşti.'
                  : 'Lütfen bakiyenizi kontrol ediniz.'
              }></BottomNotification>
          </View>
        </LinearGradient>
      );
    }
  }
}
export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
