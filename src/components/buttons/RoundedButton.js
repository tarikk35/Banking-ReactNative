import React, {Component} from 'react';
import {Text, View, TouchableHighlight, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';

export default class RoundedButton extends Component {
  render() {
    const {text, color, backgroundColor, handleOnPress, image} = this.props;
    return (
      <TouchableHighlight
        style={[{backgroundColor}, styles.wrapper]}
        onPress={handleOnPress}>
        <View style={styles.viewWrapper}>
          <Image
            style={styles.icon}
            source={require({image})}></Image>
          <Text style={[{color}, styles.buttonText]}>{text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

RoundedButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  image: PropTypes.string,
  backgroundColor: PropTypes.string,
  icon: PropTypes.string,
  handleOnPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.white,
  },
  icon: {
    width: 40,
    height: 40,
  },
  viewWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  buttonText: {
    fontSize: 19,
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
