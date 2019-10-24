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
import {Button} from 'native-base';
import Colors from '../styles/colors';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

class CardCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _carousel: {},
    };
  }

  _carouselItem({item, index}) {
    return (
      <View>
        <View style={{height: 160, width: 240, borderRadius: 10}}>
          <View style={{flex: 1, borderRadius: 10}}>
            <Image
              source={require('../img/card.png')}
              style={{
                flex: 1,
                borderRadius: 10,
                width: null,
                height: null,
                resizeMode: 'cover',
              }}></Image>
          </View>
        </View>
        <View style={{top: -75, left: 20}}>
          <Text
            style={{
              fontFamily: 'Timeless-Bold',
              color: Colors.grey4,
              fontSize: 18,
            }}>
            {'1000000005001'
              .substring(0, 13 - 4)
              .split('')
              .join(' ') +
              '  ' +
              '1000000005001'
                .substring(13 - 4, 13)
                .split('')
                .join(' ')}
          </Text>
        </View>
        <View style={{top: -52, left: 15}}>
          <Text style={{fontFamily: 'Timeless'}}>TARIK KÖPRÜLÜ</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View
        style={{flex: 1, backgroundColor: Colors.grey1, flexDirection: 'row'}}>
        <View
          style={{
            height: 200,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Carousel
            sliderWidth={400}
            itemWidth={240}
            data={[{title: 'Item1'}, {title: 'Item1'}, {title: 'Item1'}]}
            renderItem={this._carouselItem}
            ref={c => {
              this._carousel = c;
            }}></Carousel>
        </View>
      </View>
    );
  }
}

CardCarousel.propTypes = {
  accountList: PropTypes.array,
};

export default CardCarousel;

const styles = StyleSheet.create({});