import React, {Component} from 'react';
import {Text, View, StyleSheet, CheckBox} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';

export default class RadioBtn extends Component {
  render() {
    const {title, isChecked, onPressed, val} = this.props;
    return (
      <View style={styles.checkboxView}>
        <CheckBox

          checked={isChecked}
          onPress={() => onPressed(val)}></CheckBox>
        <Text>{title}</Text>
      </View>
    );
  }
}

RadioBtn.PropTypes = {
  isChecked: PropTypes.bool,
  title: PropTypes.string,
  val: PropTypes.string,
  onPressed: PropTypes.func,
};

const styles = StyleSheet.create({
  checkboxView:{
    flexDirection:'row',
    alignItems:'center'
  }
});
