import React, {Component} from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoggedOut from './src/screens/LoggedOut';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

const AppNavigator = createStackNavigator(
  {
    LoggedOut: {
      screen: LoggedOut,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'LoggedOut',
  },
  {headerMode: 'none'},
);

export default createAppContainer(AppNavigator);
