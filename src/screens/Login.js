import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import {
  View,
  Text,
  ScrollView,
  StyleShet,
  KeyboardAvoidingView,
} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView>
        <View>
          <ScrollView>
            <Text>Log In</Text>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
