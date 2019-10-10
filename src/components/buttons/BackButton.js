import React, {Component} from 'react';
import {Text, View, TouchableHighlight, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';

export default class NextArrowButton extends Component {
  render() {
    const {disabled, handleNextButton} = this.props;
    const opacityStyle = disabled ? 0.2 : 0.8;
    return (
      <TouchableHighlight style={styles.buttonStyle} onPress={handleNextButton}>
        <Image
          source={require('../../img/back-icon.png')}
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
    width: 75,
    height: 75,
    top:10,
    left:10,
  },

  iconStyle: {
    padding: 30,
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});
