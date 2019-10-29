import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
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
    const dateParts = item['closingDate'].split('-');
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
            {item['IBAN']
              .substring(0, 13 - 4)
              .split('')
              .join(' ') +
              '  ' +
              item['IBAN']
                .substring(13 - 4, 13)
                .split('')
                .join(' ')}
          </Text>
        </View>
        <View
          style={{
            top: -52,
            left: 15,
            flexDirection: 'row',
          }}>
          <Text style={{fontFamily: 'Timeless'}}>TARIK KÖPRÜLÜ</Text>
          <Text style={{fontFamily: 'Timeless', right: -60}}>
            {`${dateParts[1]} / ${dateParts[0].substring(2, 4)}`}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const {accountList, onSnap} = this.props;
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
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
            onSnapToItem={onSnap.bind(this)}
            data={accountList}
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
  onSnap: PropTypes.func,
};

export default CardCarousel;

const styles = StyleSheet.create({});
