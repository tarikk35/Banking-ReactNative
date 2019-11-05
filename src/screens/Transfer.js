import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Container,
  Input,
  Item,
  Form,
  Picker,
  Label,
  Button,
  Icon,
} from 'native-base';
import Colors from '../styles/colors';
import HeaderWithDrawer from '../components/HeaderWithMenu';
import Store from '../Store';
import Loader from '../components/Loader';
import BottomNotification from '../components/BottomNotification';
import LinearGradient from 'react-native-linear-gradient';

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemVal: '',
      showNotification: false,
      accounts: [],
      isLoading: true,
      accountValid: false,
      amountValid: false,
      formValid: true,
      accountNumber: '',
      amount: 0.0,
    };
    this.onPickerValueChange = this.onPickerValueChange.bind(this);
    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.accountPickers = this.accountPickers.bind(this);
    this.handleOnPress = this.handleOnPress.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.fetchAccounts = this.fetchAccounts.bind(this);
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.fetchAccounts();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  async fetchAccounts() {
    await fetch(`${Store.getInstance().IP}api/Account/List`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        customNum: Store.getInstance().getUserID(),
      },
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          isLoading: false,
          accounts: response,
          selectedItemVal: response[0]['IBAN'],
        });
      });
  }

  onPickerValueChange(value, index) {
    this.setState({selectedItemVal: value});
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

  handleAccountChange(IBAN) {
    const accRegex = /^((?!(0))[0-9]{13})$/g;
    if (accRegex.test(IBAN)) {
      this.setState({accountValid: true, accountNumber: IBAN});
    } else {
      this.setState({accountValid: false, accountNumber: ''});
    }
  }

  handleCloseNotification() {
    this.setState({formValid: true, showNotification: false});
  }

  async handleOnPress() {
    this.setState({isLoading: true});
    const response = await fetch(`${Store.getInstance().IP}api/Trans/Post`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: this.state.selectedItemVal,
        receiver: this.state.accountNumber,
        amount: parseFloat(this.state.amount.toString()),
      }),
    }).catch(error => console.error(error));
    if (response['status'] > 200) {
      this.setState({formValid: false});
    }
    this.setState({isLoading: false, showNotification: true});
  }

  handleAmountChange(amount) {
    const amountRegex = /^([0-9]{1,9}(\,[0-9]{1,2})?)$/g;
    if (
      amountRegex.test(amount) &&
      parseFloat(amount.replace(',', '.')) !== 0.0
    ) {
      this.setState({
        amountValid: true,
        amount: parseFloat(amount.replace(',', '.')),
      });
    } else {
      this.setState({amountValid: false, amount: 0.0});
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
          colors={
            this.state.formValid
              ? [Colors.appLightColor, Colors.appDarkColor]
              : [Colors.errorLightColor, Colors.errorDarkColor]
          }
          style={{flex: 1}}>
          <KeyboardAvoidingView style={{flex: 1, display: 'flex'}}>
            <View style={{flex: 1}}>
              <HeaderWithDrawer
                title="HAVALE ISLEMLERI"
                onPress={() =>
                  this.props.navigation.openDrawer()
                }></HeaderWithDrawer>
              <ScrollView style={{flexGrow: 1, flex: 1}}>
                <View style={{marginLeft: 20, marginRight: 20, marginTop: 70}}>
                  <Label style={{color: Colors.white}}>Seçilen Hesap</Label>
                  <Item picker>
                    <Picker
                    style={{color:Colors.white}}
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      placeholder="Gönderilecek Hesap Seç"
                      placeholderStyle={{color: '#bfc6ea'}}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.selectedItemVal}
                      onValueChange={this.onPickerValueChange}>
                      {this.accountPickers()}
                    </Picker>
                  </Item>
                </View>
                <View style={{marginRight: 40, marginLeft: 20}}>
                  <Item style={{marginTop: 20}} floatingLabel>
                    <Label style={{color: Colors.white}}>Alıcı Hesap</Label>
                    <Input
                      onChangeText={this.handleAccountChange}
                      style={{color: Colors.white}}
                      keyboardType={'numeric'}></Input>
                  </Item>
                  {
                    //Item stacks everything inside of it.
                  }
                  <Item style={{marginTop: 20}} floatingLabel>
                    <Label style={{color: Colors.white}}>Miktar</Label>
                    <Input
                      onChangeText={this.handleAmountChange}
                      style={{color: Colors.white}}
                      keyboardType={'numeric'}></Input>
                  </Item>
                </View>
                <Button
                  large
                  style={{
                    justifyContent: 'center',
                    marginTop: 120,
                    marginLeft: 100,
                    width: '50%',
                    borderRadius: 10,
                  }}
                  disabled={
                    !(this.state.accountValid && this.state.amountValid)
                  }
                  onPress={this.handleOnPress}>
                  <Text
                    style={{
                      fontSize: 30,
                      color: Colors.white,
                    }}>
                    GÖNDER
                  </Text>
                </Button>
              </ScrollView>
              <BottomNotification
                showNotification={showNotification}
                handleCloseNotification={this.handleCloseNotification}
                notificationType={formValid ? 'Başarılı' : 'Hata'}
                firstLine={
                  formValid
                    ? 'İşleminiz gerçekleşti.'
                    : 'Lütfen bilgileri kontrol ediniz.'
                }></BottomNotification>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      );
    }
  }
}
export default Transfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
