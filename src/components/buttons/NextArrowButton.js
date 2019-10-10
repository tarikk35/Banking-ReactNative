import React, {Component} from 'react';
import {Text, View, TouchableHighlight, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';

export default class NextArrowButton extends Component {
  render() {
    const {disabled, handleNextButton} = this.props;
    const opacityStyle = disabled ? 0.2 : 0.8;
    return (
      <TouchableHighlight
        disabled={disabled ? true : false}
        style={styles.buttonStyle}
        onPress={handleNextButton}>
        <Image
          source={require('../../img/next-button2.png')}
          name="back-login"
          size={32}
          style={[{opacity: opacityStyle}, styles.iconStyle]}
        />
      </TouchableHighlight>
    );
  }
}

NextArrowButton.PropTypes = {
  disabled: PropTypes.bool,
  handleNextButton: PropTypes.func,
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    bottom: 0,
  },

  iconStyle: {
    padding: 12,
    width: 40,
    height: 40,
    bottom: 0,
  },
});
