import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import colors from '../styles/colors';
import {View, Image, Modal, StyleSheet, Text} from 'react-native';

export default class Loader extends Component {
  render() {
    const {animationType, modalVisible} = this.props;
    return (
      <Modal
        visible={modalVisible}
        animationType={animationType}
        transparent={true}>
        <View style={styles.wrapper}>
          <View style={styles.loaderContainer}>
            <Image
              style={styles.loaderImage}
              source={require('../img/loading.gif')}></Image>
          </View>
        </View>
      </Modal>
    );
  }
}

Loader.PropTypes = {
  animationType: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool,
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 9,
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },

  loaderContainer: {
    width: 60,
    height: 60,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -30,
    marginRight: -30,
  },

  loaderImage: {
    width: 90,
    borderRadius: 50,
    height: 90,
  },
});
