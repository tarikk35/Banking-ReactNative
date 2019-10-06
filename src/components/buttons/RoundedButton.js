import React, {Component} from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';

export default class RoundedButton extends Component {
  render() {
    const {text, textColor, backgroundColor, handleOnPress} = this.props;
    return (
      <TouchableHighlight
        style={[{backgroundColor}, styles.wrapper]}
        onPress={handleOnPress}>
        <Text style={[{textColor}, styles.buttonText]}>{text}</Text>
      </TouchableHighlight>
    );
  }
}

RoundedButton.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  icon: PropTypes.object,
  handleOnPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    padding: 15,
    marginLeft: 50,
    marginRight: 50,
    marginBottom:50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.white,
  },
  buttonText: {
    fontSize: 17,
    width: '100%',
    textAlign: 'center',
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
