import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Easing,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../styles/colors';

export default class BottomNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionValue: new Animated.Value(-60),
    };
    this.closeNotification = this.closeNotification.bind(this);
    this.animateNotification = this.animateNotification.bind(this);
  }

  animateNotification(value) {
    const {positionValue} = this.state;
    Animated.timing(positionValue, {
      toValue: value,
      duration: 300,
      velocity: 3,
      tension: 2,
      friction: 8,
      easing: Easing.easeOutBack,
    }).start();
  }

  closeNotification() {
    this.props.handleCloseNotification();
  }

  render() {
    const {
      notificationType,
      firstLine,
      secondLine,
      handleCloseNotification,
      showNotification,
    } = this.props;
    showNotification
      ? this.animateNotification(0)
      : this.animateNotification(-60);
    const {positionValue} = this.state;
    return (
      <Animated.View style={[{marginBottom: positionValue}, styles.wrapper]}>
        <View style={styles.notificationContent}>
          <Text
            style={
              notificationType === 'Hata'
                ? styles.errorText
                : styles.successText
            }>
            {notificationType}
          </Text>
          <Text style={styles.errorMessage}>{firstLine}</Text>
          <Text style={styles.errorMessage}>{secondLine}</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButtonStyle}
          onPress={this.closeNotification}>
          <Image
            source={require('../img/close-icon.png')}
            style={styles.imageStyle}
            color={'#d8d8d8'}></Image>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

BottomNotification.propTypes = {
  notificationType: PropTypes.string,
  firstLine: PropTypes.string,
  secondLine: PropTypes.string,
  handleCloseNotification: PropTypes.func,
  showNotification: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    height: 40,
    width: '100%',
    padding: 20,
  },
  imageStyle: {
    flex: 1,
    alignSelf: 'stretch',
    width: 20,
    height: 20,
  },
  notificationContent: {
    bottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  closeButtonStyle: {
    position: 'absolute',
    flex: 1,
    width: 50,
    height: 20,
    right: 0,
    bottom: 10,
  },
  errorText: {
    color: '#d93900',
    marginRight: 5,
    fontSize: 14,
    marginBottom: 2,
  },
  successText: {
    color: '#7CFC00',
    marginRight: 5,
    fontSize: 14,
    marginBottom: 2,
  },
  errorMessage: {
    marginBottom: 2,
    fontSize: 14,
  },
});
