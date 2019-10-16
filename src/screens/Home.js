import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {Button} from 'native-base';
import colors from '../styles/colors';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.props.navigation.openDrawer}>
          <Text>HI</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: 100,
    backgroundColor: colors.appDarkColor,
  },
});
