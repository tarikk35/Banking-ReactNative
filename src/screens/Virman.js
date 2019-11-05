import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, Button, Input, Item, Picker, Label, Icon} from 'native-base';
import Colors from '../styles/colors';
import HeaderWithDrawer from '../components/HeaderWithMenu';
import Store from '../Store';
import Loader from '../components/Loader';
import BottomNotification from '../components/BottomNotification';
import LinearGradient from 'react-native-linear-gradient';

class Virman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderVal: '',
      receiverVal: '',
      showNotification: false,
      accounts: [],
      isLoading: true,
      amountValid: false,
      accountsValid: false,
      formValid: true,
      amount: 0.0,
    };
    this.onSenderPickerValueChange = this.onSenderPickerValueChange.bind(this);
    this.onReceiverPickerValueChange = this.onReceiverPickerValueChange.bind(
      this,
    );
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.accountPickers = this.accountPickers.bind(this);
    this.handleOnPress = this.handleOnPress.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.fetchData();
    });
  }

  async fetchData() {
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
          senderVal: response[0]['IBAN'],
          receiverVal: response[0]['IBAN'],
          activeAccountCount: response.length,
        });
        let tempBalance = 0.0;
        response.map(i => {
          tempBalance = tempBalance + i['balance'];
        });
        this.setState({balance: tempBalance});
      })
      .catch(e => console.error(e));
  }

  onSenderPickerValueChange(value, index) {
    const isValid = this.state.receiverVal !== value;
    this.setState({senderVal: value, accountsValid: isValid});
  }

  onReceiverPickerValueChange(value, index) {
    const isValid = this.state.senderVal !== value;
    this.setState({receiverVal: value, accountsValid: isValid});
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
        sender: this.state.senderVal,
        receiver: this.state.receiverVal,
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

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
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
          <View style={{flex: 1}}>
            <HeaderWithDrawer
              title="VIRMAN ISLEMLERI"
              onPress={() =>
                this.props.navigation.openDrawer()
              }></HeaderWithDrawer>
            <ScrollView style={{flexGrow: 1, flex: 1}}>
              <View style={{marginTop: 60, marginLeft: 20, marginRight: 20}}>
                <Label style={{color: Colors.white}}>Gönderici Hesap</Label>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    style={{color:Colors.white}}
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Gönderilecek Hesap Seç"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.senderVal}
                    onValueChange={this.onSenderPickerValueChange}>
                    {this.accountPickers()}
                  </Picker>
                </Item>
                <Label style={{color: Colors.white, marginTop: 40}}>
                  Alıcı Hesap
                </Label>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    style={{color:Colors.white}}
                    textStyle={{fontFamily: 'Roboto'}}
                    itemTextStyle={{fontFamily: 'Roboto'}}
                    iosIcon={<Icon style={{color: Colors.white}} name="arrow-down" />}
                    placeholder="Gönderilecek Hesap Seç"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.receiverVal}
                    onValueChange={this.onReceiverPickerValueChange}>
                    {this.accountPickers()}
                  </Picker>
                </Item>
                <View style={{height: 100,marginTop:40}}>
                  <Item floatingLabel>
                    <Label style={{color: Colors.white}}>
                      Gönderilecek Miktar
                    </Label>
                    <Input
                      onChangeText={this.handleAmountChange}
                      style={{color: Colors.white}}
                      keyboardType={'numeric'}></Input>
                  </Item>
                </View>
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
                disabled={!(this.state.accountsValid && this.state.amountValid)}
                onPress={this.handleOnPress}>
                <Text
                  style={{
                    fontSize: 30,
                    color: Colors.white,
                  }}>
                  Aktar
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
export default Virman;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {width: 200, height: 60, justifyContent: 'center'},
  image: {},
});