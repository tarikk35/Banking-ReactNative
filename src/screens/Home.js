import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView,
  TextInput,
} from 'react-native';
import {Container, Header, Left, Body, Right, Title} from 'native-base';
import Colors from '../styles/colors';
import PropTypes from 'prop-types';

class HeaderWithDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <View>
        <TextInput
          value={this.state.text}
          onChangeText={text => console.log(text)}></TextInput>
      </View>
    );
  }
}

HeaderWithDrawer.PropTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderWithDrawer;

const styles = StyleSheet.create({});
