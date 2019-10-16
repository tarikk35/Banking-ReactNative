import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class Home2 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.navigation.openDrawer}>
              <Text>HI AGAIN</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
export default Home2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
