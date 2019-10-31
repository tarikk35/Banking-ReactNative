import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Animated} from 'react-native';
import Colors from '../../styles/colors';

class FloatingLabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _animatedIsFocused: new Animated.Value(this.props.value === '' ? 0 : 1),
      isFocused: false,
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});

  componentDidUpdate() {
    Animated.timing(this.state._animatedIsFocused, {
      toValue:( this.state.isFocused||this.props.value!=='') ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const {label, ...props} = this.props;
    const {isFocused} = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this.state._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, -10],
      }),
      fontSize: this.state._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: !isFocused ? Colors.grey1 : Colors.black,
      marginLeft: this.state._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [12, 0],
      }),
    };

    return (
      <View>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          keyboardType={'numeric'}
          style={{
            fontSize: 21,
            borderBottomWidth: 1,
            borderBottomColor: Colors.grey2,
          }}></TextInput>
      </View>
    );
  }
}
export default FloatingLabelInput;

const styles = StyleSheet.create({});
