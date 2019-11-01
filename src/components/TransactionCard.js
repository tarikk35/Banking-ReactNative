import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../styles/colors';

class TransactionCard extends Component {
  render() {
    const {transaction} = this.props;
    return (
      <View
        style={{
          marginBottom: 12,
          height: 110,
          backgroundColor: Colors.grey7,
          borderRadius: 12,
          width:'94%',
          marginLeft:'3%',
        }}>
        <Text
          style={{
            color: Colors.white,
            marginTop: 15,
            marginLeft:20,
            fontFamily: 'Timeless',
          }}>
          {transaction['transactionDate'].split('T')[0]}
        </Text>
        <Text
          style={{
            color: Colors.white,
            fontSize: 18,
            marginTop: 10,
            left: 30,
            fontFamily: 'Timeless',
          }}>
          {`${transaction['sender']} > ${transaction['receiver']}`}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexGrow: 1,
            marginTop: 20,
            marginHorizontal: 20,
          }}>
          <Text style={{color: Colors.white, fontFamily: 'Timeless'}}>
            {transaction['type']}
          </Text>
          <Text style={{color: Colors.white, fontFamily: 'Timeless'}}>
            {`\$ ${transaction['amount']}`}
          </Text>
        </View>
      </View>
    );
  }
}
export default TransactionCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
