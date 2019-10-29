import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Container,
  Input,
  Item,
  Header,
  Content,
  Form,
  Picker,
  Label,
  Button,
  Icon,
} from 'native-base';
import Colors from '../styles/colors';
import HeaderWithDrawer from '../components/HeaderWithMenu';

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: '1234',
    };
    this.onPickerValueChange.bind(this);
  }
  onPickerValueChange() {}

  render() {
    const uri =
      'https://facebook.github.io/react-native/docs/assets/favicon.png';
    return (
      <LinearGradient
        style={{flex: 1}}
        colors={[Colors.appDarkColor, Colors.grey5]}>
        <Container>
          <HeaderWithDrawer
            title="HAVALE ISLEMLERI"
            onPress={() =>
              this.props.navigation.openDrawer()
            }></HeaderWithDrawer>
          <Form style={{marginLeft: 20, marginRight: 20, marginTop: 70}}>
            <Label>Seçilen Hesap</Label>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Gönderilecek Hesap Seç"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onPickerValueChange}>
                <Picker.Item label="1000 00000 5001" value="key0" />
              </Picker>
            </Item>
          </Form>
          <Form>
            <Item floatingLabel>
              <Label>Alıcı Hesap</Label>
              <TextInput></TextInput>
            </Item>
            <Item floatingLabel>
              <Label>Miktar</Label>
              <TextInput></TextInput>
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
              GÖNDER
            </Text>
          </Button>
        </Container>
      </LinearGradient>
    );
  }
}
export default Transfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
