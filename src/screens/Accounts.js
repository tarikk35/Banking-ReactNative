import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../styles/colors';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountList: [],
    };
  }
  async fetchAccounts() {
    try {
      const response = await fetch('http://172.20.10.3/api/Account/List', {
        method: 'POST',
        headers: {
          customNum: '100000000',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).catch(error => console.error(error));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  componentWillMount() {
      this.fetchAccounts();
  }
  render() {
    return (
      <LinearGradient
        colors={[Colors.appLightColor, Colors.appDarkColor]}
        style={{flex: 1}}>
        <View style={{flex: 1}}></View>
      </LinearGradient> 
    );
  }
}
export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
