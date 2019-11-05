import React, {Component} from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';

import {Divider} from 'react-native-elements';

import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableHighlight,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  Image,
} from 'react-native';

import LoggedOut from './src/screens/LoggedOut';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Test from './src/screens/Test';
import Home from './src/screens/Home';
import colors from './src/styles/colors';
import Homepage from './src/screens/Homepage';
import Transfer from './src/screens/Transfer';
import PutMoney from './src/screens/PutMoney';
import PullMoney from './src/screens/PullMoney';
import Virman from './src/screens/Virman';
import Account from './src/screens/Accounts';
import Profile from './src/screens/Profile';
import Transactions from './src/screens/Transactions';
import Payment from './src/screens/Payment';
import Store from './src/Store';

const ripple = TouchableNativeFeedback.Ripple('#adacac', false);

class CustomDrawerComponent extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <SafeAreaView
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View
              style={[
                styles.containHeader,
                {backgroundColor: colors.appDarkColor},
              ]}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={this.props.navigation.closeDrawer}>
                  <Image
                    source={require('./src/img/close-icon.png')}
                    style={styles.backIcon}></Image>
                </TouchableOpacity>
                <Image
                  source={require('./src/img/avatar.png')}
                  style={styles.customerIcon}></Image>

                <Text
                  style={{
                    color: colors.white,
                    marginTop: '3%',
                  }}>{`Selam Müsteri`}</Text>
                <Text style={{color: colors.white}}>{`123456`}</Text>
              </View>
            </View>

            <DrawerNavigatorItems
              labelStyle={{fontFamily: 'Timeless'}}
              {...this.props}
            />

            <View>
              <View style={{marginTop: '2%'}}>
                <Divider style={{backgroundColor: '#777f7c90'}} />
              </View>
              <View style={{marginTop: '3%'}}></View>
              <View style={{marginTop: '5%'}}>
                <Divider style={{backgroundColor: '#777f7c90'}} />
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>

        <View elevation={6} style={{backgroundColor: '#b80f0a'}}>
          <TouchableNativeFeedback
            background={ripple}
            onPress={() => {
              Store.getInstance().setUserID('');
              this.props.navigation.navigate('LoggedOutStack');
            }}>
            <View style={styles.logoutView}>
              <Image
                source={require('./src/img/back-icon.png')}
                tintColor={colors.white}
                style={styles.logoutIcon}></Image>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 24,
                  fontFamily: 'Timeless',
                }}>
                Çıkış Yap
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const LoggedInDrawer = createDrawerNavigator(
  {
    'Ana Sayfa': {
      screen: Homepage,
      navigationOptions: {header: null},
    },
    Havale: {
      screen: Transfer,
      navigationOptions: {header: null},
    },
    'Para Yatır': {
      screen: PutMoney,
      navigationOptions: {header: null},
    },
    'Para Çek': {
      screen: PullMoney,
      navigationOptions: {header: null},
    },
    Virman: {
      screen: Virman,
      navigationOptions: {header: null},
    },
    'Geçmiş İşlemlerim': {
      screen: Transactions,
      navigationOptions: {header: null},
    },
    'Fatura Ödeme': {
      screen: Payment,
      navigationOptions: {header: null},
    },
    'Profil Ayarları': {
      screen: Profile,
      navigationOptions: {header: null},
    },
  },
  {
    drawerLockMode: 'locked-open',
    drawerType: 'slide',
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeBackgroundColor: colors.appDarkColor,
      activeTintColor: colors.white,
    },
    drawerBackgroundColor: colors.white,
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const LoggedInStack = createStackNavigator(
  {
    Drawer: {screen: LoggedInDrawer},
    Account: {screen: Account},
  },
  {
    mode: 'modal',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const LoggedOutStack = createStackNavigator(
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
    Test: {
      screen: Test,
      navigationOptions: {header: null},
    },
    Homepage: {
      screen: Homepage,
      navigationOptions: {header: null},
    },
    Home: {screen: Home, navigationOptions: {header: null}},
  },

  {
    initialRouteName: 'LoggedOut',
  },
  {headerMode: 'none'},
);

const AppNavigator = createSwitchNavigator(
  {
    LoggedInStack: {screen: LoggedInStack},
    LoggedOutStack: {screen: LoggedOutStack},
  },
  {
    initialRouteName: 'LoggedOutStack',
  },
  {headerMode: 'none'},
);

const styles = StyleSheet.create({
  backButton: {
    top: 20,
    left: 100,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 30,
    tintColor: colors.white,
    height: 30,
  },
  logoutIcon: {
    width: 60,
    left: -50,
    height: 60,
  },
  customerIcon: {
    width: 80,
    height: 80,
    tintColor: colors.white,
  },
  blackText: {
    color: colors.black,
  },
  logoutView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    left: 40,
  },
});

export default createAppContainer(AppNavigator);
