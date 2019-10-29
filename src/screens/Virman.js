import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Container,
  Text,
  Button,
  Header,
  Form,
  Image,
  Input,
  Item,
  Picker,
  Label,
  Icon,
} from 'native-base';
import Colors from '../styles/colors';
import HeaderWithDrawer from '../components/HeaderWithMenu';

class Virman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: '1234',
    };
    this.onValueChange2.bind(this);
  }
  onValueChange2() {}
  render() {
    return (
      <LinearGradient
        style={{flex: 1}}
        colors={[Colors.appDarkColor, Colors.grey5]}>
        <Container>
          <HeaderWithDrawer
            title="VIRMAN ISLEMLERI"
            onPress={() =>
              this.props.navigation.openDrawer()
            }></HeaderWithDrawer>
          <Form style={{marginTop: 60, marginLeft: 20, marginRight: 20}}>
            <Label>Gönderen Hesap</Label>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Gönderilecek Hesap Seç"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2}>
                <Picker.Item label="HesapNo:1" value="key0" />
                <Picker.Item label="HesapNo:2" value="key0" />
                <Picker.Item label="HesapNo:3" value="key0" />
              </Picker>
            </Item>
            <Label style={{marginTop: 40}}>Alıcı Hesap</Label>
            <Item picker>
              <Picker
                mode="dropdown"
                textStyle={{fontFamily: 'Roboto'}}
                itemTextStyle={{fontFamily: 'Roboto'}}
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Gönderilecek Hesap Seç"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2}>
                <Picker.Item label="HesapNo:1" value="key0" />
                <Picker.Item label="HesapNo:2" value="key0" />
                <Picker.Item label="HesapNo:3" value="key0" />
              </Picker>
            </Item>
            <View style={{height: 100}}>
              <Item floatingLabel>
                <Label>Gönderilecek Miktar</Label>
                <Input />
              </Item>
            </View>
          </Form>

          <Button
            large
            style={{
              justifyContent: 'center',
              marginTop: 120,
              marginLeft: 100,
              width: '50%',
              borderRadius: 10,
            }}
            onPress={() => alert('ok')}>
            <Text
              style={{
                fontSize: 30,
                color: Colors.white,
              }}>
              Aktar
            </Text>
          </Button>
        </Container>
      </LinearGradient>
    );
  }
}
export default Virman;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {width: 200, height: 60, justifyContent: 'center'},
  image: {},
});
