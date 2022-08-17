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
import {HomeStack} from '../../navigation/HomeStack';
import {HomeScreen} from '../HomeScreen';
import {StackActions} from '@react-navigation/native';

function Login({navigation, route}) {
  const [secured_pass, set_secured_pass] = useState(false);
  const [user_email, set_email] = useState('');
  const [user_password, set_password] = useState('');
  const [error_email, set_emailErr] = useState('');
  const [error_password, set_passErr] = useState('');

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

  const SIGN_IN = () => {
    let email = user_email.trim();
    let Password = user_password;
    let email_error = '';
    let password_error = '';
    if (email == '') {
      email_error = 'يرجى ادخال البريد الالكتروني';
    } else if (validateEmail(email) == false) {
      email_error = 'تأكد من كتابة البريد الالكترونى بشكل صحيح';
    } else if (email.length > 70) {
      email_error = 'البريد الالكترونى يجب ألا يزيد عن 70 حرف ورقم';
    } else if (email != 'marwa@gmail.com' && email != '') {
      email_error = 'البريد الذي ادخلته غير موجود';
    } else {
      set_emailErr(error_email => '');
    }
    if (Password == '') {
      password_error = 'يجب ادخال كلمه مرور';
    } else if (Password.length > 20) {
      password_error = 'كلمه المرور يجب ألا تزيد عن 20 حرف و رقم';
    } else if (!validatePassword(Password)) {
      password_error =
        'كلمه المرور يجب لا تقل عن 6 ارقام و حرف كبير و حرف صغير وعلامه مميزه ';
    } else if (Password != 'Mm!123456') {
      password_error = 'كلمة المرور التي ادخلتها غير صحيحة';
    } else {
      set_passErr(error_password => '');
    }
    if (email == 'marwa@gmail.com' && Password == 'Mm!123456') {
      alert('تم التحقق من الايميل وكلمة المرور بنجاح .. مرحبا بك');
    } else {
      alert('يرجى التحقق من ادخال بياناتك بشكل صحيح');
    }
    set_emailErr(error_email => email_error);
    set_passErr(error_password => password_error);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={styles.iconStyle}>
              <AntDesign
                name="arrowright"
                color={COLORS.gray}
                size={RFValue(ICONS.xlIcon)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Home')}>
              <Text>تخطي</Text>
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
            />
          </View>
          <Text style={styles.erorMsg}>{error_email}</Text>
          <View style={styles.textInputViewStyle}>
            <TextInput
              style={styles.inputPass}
              placeholder="كلمة المرور"
              secureTextEntry={secured_pass}
              maxLength={10}
              value={user_password}
              onChangeText={value => {
                set_password(user_password => value);
              }}
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
                SIGN_IN();
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
