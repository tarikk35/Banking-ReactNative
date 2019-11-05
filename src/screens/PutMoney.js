import React, {Component} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {
  Container,
  Text,
  Picker,
  Icon,
  Item,
  Label,
  Input,
  Button,
} from 'native-base';
import Colors from '../styles/colors';
import HeaderWithDrawer from '../components/HeaderWithMenu';
import Store from '../Store';
import Loader from '../components/Loader';
import BottomNotification from '../components/BottomNotification';
import LinearGradient from 'react-native-linear-gradient';

class PutMoney extends Component {
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

  async handleOnPress() {
    this.setState({isLoading: true});
    const response = await fetch(`${Store.getInstance().IP}api/Trans2/Push`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        customNum:Store.getInstance().getUserID(),
        iban:this.state.selectedItemVal,
        balance:this.state.amount.toString().replace('.',',')
      },
      
    }).catch(error => console.error(error));
    if (response['status'] > 200) {
      this.setState({formValid: false});
    }
    this.setState({isLoading: false, showNotification: true});
  }

  handleCloseNotification() {
    this.setState({formValid: true, showNotification: false});
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
          <View style={{flex:1}}>
            <HeaderWithDrawer
              title="PARA YATIR"
              onPress={() =>
                this.props.navigation.openDrawer()
              }></HeaderWithDrawer>
            <ScrollView>
              <View
                style={{marginTop: 100, marginLeft: 20, marginRight: 20}}
                colors={Colors.grey5}>
                <Label style={{color: Colors.white}}>Seçilen Hesap</Label>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    style={{color:Colors.white}}
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
              <View style={{marginTop: 40, marginLeft: 20, marginRight: 20}}>
                <Item floatingLabel>
                  <Label style={{color: Colors.white}}>Yatırılan Tutar</Label>
                  <Input
                    onChangeText={this.handleAmountChange}
                    style={{color: Colors.white}}
                    keyboardType={'numeric'}
                  />
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
                disabled={!(this.state.amountValid)}
                onPress={this.handleOnPress}>
                <Text
                  style={{
                    fontSize: 24,
                    color: Colors.white,
                  }}>
                  Yatır
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
        </LinearGradient>
      );
    }
  }
}
export default PutMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 60,
    justifyContent: 'center',
  },
  image: {
    width: 40,
    height: 40,
  },
});
