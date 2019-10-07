import React, {Component} from 'react';
import {Text, View, TouchableHighlight, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';

export default class NextArrowButton extends Component {
  render() {
    const { disabled,handleNextButton } = this.props;
    const opacityStyle = disabled ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : { backgroundColor: 'rgba(255, 255, 255, 0.6)'}
    return (
      <TouchableHighlight style = {styles.buttonStyle} onPress={handleNextButton}>
        <Image 
            source = {require('../../img/next-button2.png')} 
            name = "back-login"
            size = {32}
            style = {styles.iconStyle}/>
      </TouchableHighlight>
    );
  }
}

NextArrowButton.PropTypes={
  disabled:PropTypes.bool,
  handleNextButton:PropTypes.func,
};


const styles = StyleSheet.create({
  
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 75,
        height: 75,
    }, 

    iconStyle: {
        padding: 30,
        width: 40,
        height: 40,        
      
    }

});
