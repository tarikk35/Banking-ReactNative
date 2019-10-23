import React, { Component } from "react";
import { 
    View,
    StyleSheet
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Container, Text,Header,Picker,Input,Item,Label,Form } from 'native-base';
import Colors from '../styles/colors';

class componentName extends Component {
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
            <Form style={{height:100}}>
                 <Item picker>
                <Label>Hesap Seçiniz.</Label>
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
        <View style={{height:100}}>
             <Item floatingLabel>
            <Label>ÇEKİLECEK MİKTAR</Label>
            <Input />
        </Item>
        </View>
        <View style={{justifyContent:'space-around'}}> 
            <Button primary style={styles.button } onPress={() => Alert("ok")}>
                     <Text>OKEY</Text>
            </Button>
        </View>

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
        justifyContent: 'center'
    },
    button: { width: 200, height: 60, justifyContent: 'center' },
});