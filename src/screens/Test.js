import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import Colors from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import HeaderWithDrawer from '../components/HeaderWithMenu';
import TransactionCard from '../components/TransactionCard';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(val) {
    this.setState({value: val});
  }

  render() {
    return (
      <LinearGradient
        style={{flex: 1}}
        colors={[Colors.appLightColor, Colors.appDarkColor]}>
        <View style={{flex: 1}}>
          <HeaderWithDrawer
            title="HAVALE ISLEMLERI"
            onPress={() =>
              this.props.navigation.openDrawer()
            }></HeaderWithDrawer>
          <ScrollView style={{flex: 1, marginTop: 30}}>
            <TransactionCard
              transaction={{
                sender: '1000000005001',
                transactionDate:'11/11/2019',
                receiver: '1000000005003',
                type: 'Havale',
                amount: 50.5,
              }}></TransactionCard>
            {/* <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard> */}
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}
export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});
