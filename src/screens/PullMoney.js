import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Container,
  Text,
  Picker,
  Input,
  Item,
  Label,
  Form,
  Icon,
  Button,
} from 'native-base';
import Colors from '../styles/colors';
import HeaderWithDrawer from '../components/HeaderWithMenu';

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: '1234',
    };
    this.onValueChange2.bind(this);
  }
  onValueChange2() {}
  render() {
    const uri =
      'https://facebook.github.io/react-native/docs/assets/favicon.png';
    return (
      <LinearGradient
        style={{flex: 1}}
        colors={[Colors.appDarkColor, Colors.grey5]}>
        <Container>
          <HeaderWithDrawer
            title="PARA CEK"
            onPress={() =>
              this.props.navigation.openDrawer()
            }></HeaderWithDrawer>
          <Form style={{marginTop: 100, marginLeft: 20, marginRight: 20}}>
            <Label>Seçilen Hesap</Label>
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
              </Picker>
            </Item>
            <Item floatingLabel>
              <Label>Çekilen Miktar</Label>
              <Input />
            </Item>
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
              Çek
            </Text>
          </Button>
        </Container>
      </LinearGradient>
    );
  }
}
export default componentName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {width: 200, height: 60, justifyContent: 'center'},
});
