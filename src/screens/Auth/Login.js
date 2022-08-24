import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import {Input, GeneralButton} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  PADDING,
  IconsView,
  COLORS,
  MARGIN,
  ICONS,
  FONTS,
  RADIUS,
} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LoginWithG from './LoginWithG';
import axios from 'axios';
import {HomeStack} from '../../navigation/HomeStack';
import {HomeScreen} from '../HomeScreen';
import {StackActions} from '@react-navigation/native';

function Login({navigation, route}) {
  const [secured_pass, set_secured_pass] = useState(false);
  const [user_email, set_email] = useState('');
  const [user_password, set_password] = useState('');
  const [error_email, set_emailErr] = useState('');
  const [error_password, set_passErr] = useState('');

  const check_emailANDpass = () => {
    let data_to_send = {
      email: user_email,
      pass: user_password,
      token: '',
    };
    axios
      .post(
        'https://generation3.000webhostapp.com/project/Training/Auth/user.php',
        data_to_send,
      )
      .then(res => {
        if (res.status == 200) {
          console.log(res.data);
        } else {
          alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const pass_secured = () => {
    let securedPass = secured_pass;
    securedPass = !securedPass;
    set_secured_pass(secured_pass => securedPass);
  };

  const validateEmail = email => {
    var em =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return em.test(email);
  };

  const validatePassword = password => {
    var pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return pass.test(password);
  };
  const check_email = () => {
    let email = user_email.trim();
    if (email == '') {
      set_emailErr(error_email => 'يرجى ادخال البريد الالكتروني');
    } else if (validateEmail(email) == false || email.length > 70) {
      set_emailErr(error_email => 'البريد الالكترونى الذى ادخلته غير صحيح');
    } else {
      set_emailErr(error_email => '');
    }
  };
  const check_pass = () => {
    let password = user_password;
    if (password == '') {
      set_passErr(error_password => 'يجب ادخال كلمه مرور');
    } else if (password.length > 20 || !validatePassword(password)) {
      set_passErr(error_password => 'كلمة المرور غير صحيحة');
    } else {
      set_passErr(error_password => '');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={styles.iconStyle}>
              <AntDesign
                name="arrowright"
                color={COLORS.gray}
                size={RFValue(ICONS.xlIcon)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomeStack');
              }}>
              <Text
                style={{fontSize: FONTS.h4, fontWeight: 'bold', padding: 5}}>
                تخطي
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ViewTitle}>
            <Text style={styles.titleStyle}>تسجيل الدخول</Text>
          </View>
          <View>
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="البريد الالكتروني"
              value={user_email}
              onChangeText={value => {
                set_email(user_email => value);
              }}
              onEndEditing={() => check_email()}
            />
          </View>
          <Text style={styles.erorMsg}>{error_email}</Text>
          <View style={styles.textInputViewStyle}>
            <TextInput
              style={styles.inputPass}
              placeholder="كلمة المرور"
              secureTextEntry={secured_pass}
              // maxLength={10}
              value={user_password}
              onChangeText={value => {
                set_password(user_password => value);
              }}
              onEndEditing={() => check_pass()}
            />
            <TouchableOpacity
              onPress={() => {
                pass_secured();
              }}>
              <Entypo
                name={secured_pass ? 'eye-with-line' : 'eye'}
                size={ICONS.mIcon}
                color={'#aaa'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.erorMsg}>{error_password}</Text>
          <TouchableOpacity
            style={styles.forgetPassMsg}
            onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.forgetPassTxt}>هل نسيت كلمةالمرور؟</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonViewStyle}>
            <GeneralButton
              title="تسجيل الدخول"
              bgcolor={COLORS.primary}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('HomeStack');
                error_email == '' && error_password == ''
                  ? check_emailANDpass()
                  : null;
              }}
            />
          </TouchableOpacity>
          <Text style={styles.socialHeader}>او عن طريق</Text>
          <View style={styles.socialButtonsView}>
            <LoginWithG />
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: RFValue(MARGIN.mdMargin),
        }}>
        <Text>ليس لديك حساب ؟ </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text
            style={{textDecorationLine: 'underline', color: COLORS.primary}}>
            انشاء حساب
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: RFValue(MARGIN.xsMargin),
    justifyContent: 'space-around',
  },
  iconStyle: {
    // width: RFValue(IconsView.IconWidth),
    // height: RFValue(IconsView.IconHeight),
    // padding: RFValue(PADDING.xsPadding),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: RFValue(MARGIN.xsMargin),
  },
  titleStyle: {
    fontSize: RFValue(FONTS.h3),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  ViewTitle: {
    marginBottom: RFValue(MARGIN.xsMargin),
  },
  textInputViewStyle: {
    // marginTop: RFValue(MARGIN.smMargin),
    height: RFValue(60),
    borderBottomWidth: RFValue(0.7),
    borderBottomColor: COLORS.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputPass: {
    width: '80%',
    height: RFValue(60),
    color: COLORS.black,
    fontSize: RFValue(FONTS.h5),
  },
  buttonViewStyle: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgetPassMsg: {
    alignSelf: 'flex-end',
  },
  forgetPassTxt: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
    marginBottom: RFValue(MARGIN.xlMargin),
    fontSize: RFValue(FONTS.h6),
  },
  socialHeader: {
    alignSelf: 'center',
    paddingVertical: RFValue(MARGIN.mdMargin),
    color: '#aaa',
    fontSize: RFValue(FONTS.h5),
  },
  socialButtonsView: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: '70%',
    // paddingVertical: RFValue(PADDING.xsPadding),
    alignItems: 'center',
  },
  socialButton: {
    borderWidth: 1,
    borderColor: COLORS.black,
    width: '48%',
    height: RFValue(40),
    borderRadius: RFValue(RADIUS.xsRadius),
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialTxt: {
    color: COLORS.black,
    fontSize: RFValue(FONTS.h5),
  },
  erorMsg: {
    // alignSelf: 'center',
    color: COLORS.error,
  },
});
export default Login;
