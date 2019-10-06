import React, {Component} from 'react';
import {Text, View, TouchableHighlight, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';

export default class RoundedButton extends Component {
  render() {
    const { disabled } = this.props;
    const opacityStyle = disabled ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : { backgroundColor: 'rgba(255, 255, 255, 0.6)'}
    return (
      <TouchableHighlight style = {styles.buttonStyle}>
        <Image 
            source = {require('../../img/next-button2.png')} 
            name = "back-login"
            size = {32}
            style = {styles.iconStyle}/>
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 75,
        height: 75,
    }, 

    iconStyle: {
        padding: 40,
        width: 20,
        height: 10,        
      
    }

});
