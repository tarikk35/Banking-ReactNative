import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import colors from '../../styles/colors';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureInput:
        props.inputType === 'text' || props.inputType === 'email'
          ? false
          : true,
    };
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
  }

  toggleShowPassword() {
    this.setState({secureInput: !this.state.secureInput});
  }

  render() {
    const {
      labelText,
      labelTextSize,
      labelColor,
      textColor,
      borderBottomColor,
      inputType,
      customStyle,
      onChangeText,
    } = this.props;
    const fontSize = labelTextSize || 16;
    const color = labelColor || colors.white;
    const inputColor = textColor || colors.white;
    const borderColor = borderBottomColor || 'transparent';
    const {secureInput} = this.state;
    return (
      <View style={[customStyle, styles.viewStyle]}>
        <Text style={[{color, fontSize}, styles.textStyle]}>{labelText}</Text>
        {inputType === 'password' ? (
          <TouchableOpacity
            style={styles.showButtonStyle}
            onPress={this.toggleShowPassword}>
            <Text style={styles.showPasswordTextStyle}>
              {secureInput ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        ) : null}
        <TextInput
          style={[
            {color: inputColor, borderBottomColor: borderColor},
            styles.inputField,
          ]}
          underlineColorAndroid='transparent'
          keyboardType={inputType === 'email' ? 'numeric' : 'twitter'}
          autoCorrect={false}
          secureTextEntry={secureInput}
          onChangeText={onChangeText}
        />
      </View>
    );
  }
}
InputField.propTypes = {
  labelText: PropTypes.string.isRequired,
  labelTextSize: PropTypes.number,
  labelColor: PropTypes.string,
  textColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  customStyle: PropTypes.object,
  onChangeText: PropTypes.func,
};
const styles = StyleSheet.create({
  inputField: {
    borderBottomWidth: 1,
    paddingTop: 1,
    paddingBottom: 1,
  },

  viewStyle: {
    display: 'flex',
  },

  textStyle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  showButtonStyle: {
    position: 'absolute',
    backgroundColor: colors.white,
    opacity: 0.7,
    borderRadius: 20,
    padding: 4,
    right: 0,
  },
  showPasswordTextStyle: {
    color: colors.black,
    fontWeight: '700',
  },
});
