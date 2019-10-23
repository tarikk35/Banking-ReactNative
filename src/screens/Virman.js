import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Alert
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Container, Text, Button, Header, Form, Image, Input, Item, Picker, Label, Icon } from 'native-base';
import Colors from '../styles/colors';

class Virman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected2: '1234',
        };
        this.onValueChange2.bind(this);
    }
    onValueChange2() { }
    render() {
        return (
            <LinearGradient style={{ flex: 1 }} colors={[Colors.appDarkColor, Colors.grey5]}>
                <Container>
                    <Header />
                    <Form style={{ height: 100 }}>
                        <Item picker>
                            <Label>Gönderici Hesap Seçiniz</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder="Gönderilecek Hesap Seç"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2}
                            >
                                <Picker.Item label="HesapNo:1" value="key0" />
                                <Picker.Item label="HesapNo:2" value="key0" />
                                <Picker.Item label="HesapNo:3" value="key0" />
                            </Picker>
                        </Item>
                    </Form>
                    <Form style={{ height: 100 }}>
                        <Item picker>
                            <Label>Alıcı Hesap Seçiniz</Label>
                            <Picker
                                mode="dropdown"
                                textStyle={{ fontFamily: 'Roboto' }}
                                itemTextStyle={{ fontFamily: 'Roboto' }}
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder="Gönderilecek Hesap Seç"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2}
                            >
                                <Picker.Item label="HesapNo:1" value="key0" />
                                <Picker.Item label="HesapNo:2" value="key0" />
                                <Picker.Item label="HesapNo:3" value="key0" />
                            </Picker>
                        </Item>
                    </Form>
                    <View style={{ height: 100 }}>
                        <Item floatingLabel>
                            <Label>Gönderilecek Miktar</Label>
                            <Input />
                        </Item>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 100, width: '100%', backgroundColor: Colors.appDarkColor }}>
                        <Button primary style={styles.button} onPress={() => alert("ok")}>
                            <Text>OKEY</Text>
                        </Button>
                    </View>
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
        justifyContent: 'center'
    },
    button: { width: 200, height: 60, justifyContent: 'center' },
    image: {}
});