import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import colors from '../../styles/colors';

import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class InputField extends Component {
    render() {

        const {labelText, labelTextSize, labelColor, textColor, borderBottomColor, inputType, customStyle } = this.props;
        const fontSize = labelTextSize || 14;
        const color = labelColor || colors.white;
        const inputColor = textColor || colors.white;
        const borderColor = borderBottomColor || 'transparent';

        return (
            <View style = {[customStyle, styles.viewStyle]}>
            <Text style = {[{ color, fontSize }, styles.textStyle]}>{labelText}</Text>
            <TextInput 
                style = {[ {color: inputColor, borderBottomColor: borderColor}, styles.inputField]}
                    autoCorrect = {false}
                    secureTextEntry = {inputType === 'password' ? true: false} />
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
    customStyle: PropTypes.object
    

};
const styles = StyleSheet.create ({

    inputField: {
        borderBottomWidth: 1,
        paddingTop: 1,
        paddingBottom: 1,
    },

    viewStyle: {
        display: 'flex'
    },

    textStyle: {
        fontWeight: 'bold',
        marginBottom: 10
    }

});