// import { Button } from "native-base";
import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Modal,
  ImageBackground,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Component} from 'react';
import {Input, GeneralButton} from '../components';
import {RFValue} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OTPInput from 'react-native-otp-inputs';

import {
  PADDING,
  IconsView,
  COLORS,
  MARGIN,
  ICONS,
  FONTS,
  RADIUS,
} from '../constants';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',

      photoghrapher: [
        {
          name: 'الشاذلى',
          image: require('../assets/Images/secur.png'),
        },
        {
          name: 'عياد',
          image: require('../assets/Images/images.png'),
        },
        {
          name: 'مروه',
          image: require('../assets/Images/secur.png'),
        },
        {
          name: 'مطحنه',
          image: require('../assets/Images/images.png'),
        },
        {
          name: 'اسراء',
          image: require('../assets/Images/images.png'),
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* View Header */}
          <View style={styles.view}>
            <TouchableOpacity style={{}}>
              <AntDesign
                name="arrowright"
                color={COLORS.gray}
                size={ICONS.xlIcon}
              />
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                // alignItems: "center",
                alignSelf: 'center',

                width: '100%',
              }}>
              <Text style={styles.titleStyle}>البحث</Text>
            </View>
            {/* <TouchableOpacity>
              <FontAwesome5 name="ellipsis-h" color={COLORS.gray} size={ICONS.lIcon} />
            </TouchableOpacity> */}
          </View>

          {/* View search */}
          <View style={styles.view_search}>
            <View style={styles.view}>
              <TouchableOpacity style={{paddingRight: PADDING.xsPadding}}>
                <FontAwesome5
                  name="search"
                  color={COLORS.gray}
                  size={ICONS.mIcon}
                />
              </TouchableOpacity>

              <Input
                style={{
                  borderBottomWidth: 0,
                  fontSize: RFValue(FONTS.h5),
                  width: RFValue(200),
                  height: RFValue(60),
                }}
                textAlign="right"
                autoCapitalize="none"
                placeholder="ابحث"
                value={this.state.search}
                onChangeText={value => {
                  this.setState({search: value});
                }}
              />
            </View>

            <TouchableOpacity>
              <FontAwesome5
                name="microphone"
                color={COLORS.gray}
                size={ICONS.mIcon}
              />
            </TouchableOpacity>
          </View>

          {/* map */}
          {this.state.photoghrapher.map((photoghrapher, index) =>
            photoghrapher.name
              .toLowerCase()
              .includes(this.state.search.toLowerCase()) ? (
              <TouchableOpacity style={styles.container_profile}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={photoghrapher.image}
                    style={{
                      width: RFValue(50),
                      height: RFValue(50),
                      backgroundColor: '#ccc',
                    }}
                    resizeMode="contain"
                    borderRadius={35}
                  />
                </View>
                <View
                  style={{
                    paddingHorizontal: PADDING.mdPadding,
                    alignItems: 'center',
                  }}>
                  <Text style={styles.titleStyle}>{photoghrapher.name}</Text>
                </View>
              </TouchableOpacity>
            ) : null,
          )}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleStyle: {
    fontSize: RFValue(FONTS.h5),
    color: COLORS.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    margin: RFValue(MARGIN.xsMargin),
  },
  view_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: MARGIN.mdMargin,
    backgroundColor: '#ccc',
    borderRadius: RADIUS.mdRadius,
    paddingHorizontal: PADDING.mdPadding,
    height: RFValue(30),
    width: '100%',
  },
  container_profile: {
    flexDirection: 'row',
    width: '100%',
    height: RFValue(80),
    alignItems: 'center',
    borderBottomWidth: RFValue(0.7),
    borderBottomColor: COLORS.gray,
  },
});
