import React, { Component } from "react";
import {
    View,
    StyleSheet
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Container, Text, Input, Item, Header, Content, Form, Picker, Label, Icon } from 'native-base';
import Colors from '../styles/colors';

class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected2: '1234',
        };
        this.onValueChange2.bind(this);
    }
    onValueChange2() { }

    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        return (
            <LinearGradient style={{ flex: 1 }} colors={[Colors.appDarkColor, Colors.grey5]}>
                <Container>
                    <Header />
                    <Form>
                        <Item picker>
                            <Label>GÖNDERİCİ HESAP</Label>
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
                            </Picker>
                        </Item>
                    </Form>
                    <Form>
                        <Item floatingLabel>
                            <Label>ALICI HESAP</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label>GÖNDERİLECEK MİKTAR</Label>
                            <Input />
                        </Item>

                    </Form>
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
        justifyContent: 'center'
    }
});