import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView,
} from 'react-native';
import {Container, Header, Left} from 'native-base';
import Colors from '../styles/colors';
import PropTypes from 'prop-types';

class MenuButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Image
                style={{width: 26, height: 26, left: -110, top: 2}}
                source={require('../img/menu.png')}></Image>
            </TouchableOpacity>
          </Left>
        </Header>
      </Container>
    );
  }
}

export default MenuButton;

const styles = StyleSheet.create({});
