import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  ColorPropType,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Container, Header, Footer, FooterTab, Button, Text, Content, Card, CardItem, Body, Icon, Left, Thumbnail } from 'native-base';
import Colors from '../styles/colors';
import BackButton from '../components/buttons/BackButton';
//import { Icon } from "react-native-vector-icons/Icon";
class Homepage extends Component {

  render() {
    const { navigate } = this.props.navigation;
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    return (
      // renkler arası geçiş yapıyor. flex:1 alabildiği tüm alanı almaya çalışıyor
      <LinearGradient style={{ flex: 1 }} colors={[Colors.appDarkColor, Colors.grey5]}>
        <View style={{ flex: 1 }}>
          <Header>
            <Left style={{ left: -100 }} >
              <BackButton handleNextButton={() => this.props.navigation.goBack()}></BackButton>
            </Left>
          </Header>
          <Content>
            <Card style={{ width: 210, height: 100, borderRadius: 10, marginTop:40,marginLeft:40}}>
              {/* card ve card item'a  style={{borderRadius:50}} ekleyebilirsin, bu sayede yuvarlak kenar olur*/}
              <CardItem style={{ borderRadius: 10 ,}}>
                <Left style={{alignItems:'center',top:20}}>

                  <Body style={{flexDirection:'row'}}>
                    <Image style={{width:40,height:40}} source={require('../img/currency.png')}></Image>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: 'grey' }}>
                      BAKİYE
                </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <Card transparent style={{ width: 150, height: 50, backgroundColor: Colors.grey4 }} >
              <CardItem>
                <Body>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'grey' }}>
                    HESAPLAR
                </Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
          <Card style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <CardItem>
              <Button primary style={styles.button}>
                <Text>Para Çekme</Text>
              </Button>
            </CardItem>
            <CardItem>
              <Button primary style={styles.button}>
                <Text>Para Yatırma</Text>
              </Button>
            </CardItem>
          </Card>
          <Card style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <CardItem>
              <Button primary style={styles.button} onPress={() => navigate('Transfer')}>
                <Text>Havale</Text>
              </Button>
            </CardItem>
            <CardItem style={{ flexDirection: 'row' }}>
              <Button primary style={styles.button}>
                <Text>Virman</Text>
              </Button>
            </CardItem>
          </Card>

        </View>
      </LinearGradient>
    );
  }
}
export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: Colors.grey4,

  },
  CardItem: {
    flexDirection: 'row',
    color: Colors.grey4,

  },
  button: { width: 200, height: 60, justifyContent: 'center' },



});