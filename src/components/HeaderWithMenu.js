import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Container, Header, Left, Body, Right, Title} from 'native-base';
import Colors from '../styles/colors';
import PropTypes from 'prop-types';

class HeaderWithDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {title,onPress} = this.props;
    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={onPress}>
            <Image
              style={{width: 26, height: 26, marginLeft: 10, marginTop: 5}}
              tintColor={Colors.white}
              source={require('../img/menu.png')}></Image>
          </TouchableOpacity>
        </Left>
        <Body>
          <Text
            style={{fontSize: 24, fontFamily: 'Timeless', color: Colors.white}}>
            {title}
          </Text>
        </Body>
      </Header>
    );
  }
}

HeaderWithDrawer.PropTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderWithDrawer;

const styles = StyleSheet.create({});
