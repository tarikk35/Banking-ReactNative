import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import Colors from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import HeaderWithDrawer from '../components/HeaderWithMenu';
import TransactionCard from '../components/TransactionCard';
import Store from '../Store';
import Loader from '../components/Loader';
import {Picker, Item, Icon} from 'native-base';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      isLoading: true,
    };
    this.fetchTransactions = this.fetchTransactions.bind(this);
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.fetchTransactions();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  async fetchTransactions() {
    await fetch(`${Store.getInstance().IP}api/Trans2/List`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        customNum: `${Store.getInstance().getUserID()}`,
      },
    })
      .then(response => (response['status'] == 200 ? response.json() : null))
      .then(response => {
        this.setState({
          isLoading: false,
          transactions: response,
        });
      })
      .catch(e => console.error(e));
  }

  async fetchAccounts() {
      // TODO
    await fetch();
  }

  transactionCards() {
    return this.state.transactions.map((item, index) => {
      return <TransactionCard transaction={item}></TransactionCard>;
    });
  }

  accountPickers() {
    return null;
  }

  render() {
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
          colors={[Colors.appLightColor, Colors.appDarkColor]}>
          <View style={{flex: 1}}>
            <HeaderWithDrawer
              title="GECMIS ISLEMLER"
              onPress={() =>
                this.props.navigation.openDrawer()
              }></HeaderWithDrawer>
            <ScrollView style={{flex: 1, marginTop: 16}}>
              <Item
                picker
                style={{marginBottom: 12, marginLeft: 16, marginRight: 16}}>
                <Picker
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
              <View style={{flexDirection: 'column', flex: 1}}>
                {this.transactionCards()}
              </View>
            </ScrollView>
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
