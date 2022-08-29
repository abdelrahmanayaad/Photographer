import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import components from '../../components';
import {Input, GeneralButton} from '../../components';
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
} from '../../constants';

export default class Otp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '1111',
      otp: '1111',
    };
  }

  // handleOTPChange = otp => {
  //   this.setState({otp: otp});
  // };

  handleOTPChange = otp => {
    otp = !otp;
    this.setState({otp});
  };
  clearOTP = () => {
    this.setState({otp: undefined});
  };
  autoFill = () => {
    this.setState({otp: '221198'});
  };

  // componentDidMount() {
  //   alert(JSON.stringify(this.props.route.params.otpNumber));
  // }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={[styles.iconStyle, {alignSelf: 'flex-end'}]}>
            <AntDesign
              name="arrowleft"
              color={COLORS.gray}
              size={ICONS.xlIcon}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/Images/secur.png')}
            style={{
              width: '100%',
              height: RFValue(180),
              marginVertical: 10,
            }}
            resizeMode="contain"
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[styles.titleStyle]}>
              الرجاء إدخال الرمز المرسل إلي رقم الهاتف
            </Text>
            <OTPInput
              isRTL={true}
              value={this.state.otp}
              // onChange={this.handleOTPChange}
              tintColor="#FB6C6A"
              offTintColor="#BBBCBE"
              otpLength={4}
              borderWidth={1}
              borderRadius={35}
              borderColor={COLORS.primary}
              width={RFValue(45)}
              height={RFValue(45)}
              padding="1%"
              textAlign={'center'}
              fontSize={25}
              marginTop={MARGIN.lgMargin}
              inputContainerStyles={{
                paddingHorizontal: 10,
              }}
            />
          </View>
          <View style={styles.view}>
            <Text style={[styles.messageTitleStyle]}>ألم تستلم الرمز؟ </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.messageTitleStyle,
                  {
                    color: COLORS.primary,
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                  },
                ]}>
                أعد إرسال الرمز
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.buttonViewStyle,
              {
                marginTop: MARGIN.smMargin,
                alignSelf: 'center',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <GeneralButton
              onPress={() => {
                if (this.state.otp == this.state.code)
                  this.props.navigation.navigate('NewPassword');
                // alert(this.state.otp);
                else alert('Wrong Code');
              }}
              title="ارسل لي الان"
              bgcolor={COLORS.primary}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    textAlign: 'center',
  },
  Touchable: {
    width: 350,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: COLORS.primary,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: MARGIN.lgMargin,
  },
  messageTitleStyle: {
    fontSize: RFValue(FONTS.h5),
    color: COLORS.gray,
    marginBottom: RFValue(MARGIN.smMargin),
  },
  titleStyle: {
    fontSize: RFValue(FONTS.h5),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  container: {
    margin: RFValue(MARGIN.xsMargin),
  },
});
