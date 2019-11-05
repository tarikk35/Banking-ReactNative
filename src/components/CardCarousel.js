import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import Colors from '../styles/colors';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import Store from '../Store';

class CardCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _carousel: {},
      onDelete: null,
    };
  }

  render() {
    const {accountList, onSnap, onAccountDel} = this.props;

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
            renderItem={({item, index}) => {
              const dateParts = item['closingDate'].split('-');
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onLongPress={() => {
                    Alert.alert(
                      'Hesabınızı silmek üzeresiniz',
                      'Bu işlemi gerçekleştirmek istiyor musunuz?',
                      [
                        {
                          text: 'Hayır',
                          onPress: () => {
                            console.log(item['IBAN']);
                          },
                        },
                        {
                          text: 'Evet',
                          onPress: async () => {
                            await fetch(
                              `${Store.getInstance().IP}api/AccountDel/Delete`,
                              {
                                method: 'GET',
                                headers: {
                                  Accept: 'application/json',
                                  'Content-Type': 'application/json',
                                  customNum: `${Store.getInstance().getUserID()}`,
                                  iban: `${item['IBAN']}`,
                                },
                              },
                            )
                              .then(response => {
                                if (response['status'] == 200) {
                                  onAccountDel(true);
                                } else if (response['status'] == 409) {
                                  onAccountDel(false);
                                }
                              })
                              .then(response => {
                                // console.log(response);
                              })
                              .catch(e => console.error(e));
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
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
                      <Text style={{fontFamily: 'Timeless'}}>
                        TARIK KÖPRÜLÜ
                      </Text>
                      <Text style={{fontFamily: 'Timeless', right: -60}}>
                        {`${dateParts[1]} / ${dateParts[0].substring(2, 4)}`}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
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
  onAccountDel: PropTypes.func,
};

export default CardCarousel;

const styles = StyleSheet.create({});
