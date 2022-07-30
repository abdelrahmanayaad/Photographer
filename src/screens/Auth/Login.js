import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import { Input, GeneralButton } from '../../components';
import { RFValue } from 'react-native-responsive-fontsize';
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
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      secured_pass: false,
      user_email: '',
      user_password: '',
      error_email: '',
      error_password: '',
    };
  }

  secured_pass() {
    let securedPass = this.state.secured_pass;
    securedPass = !securedPass;
    this.setState({ secured_pass: securedPass });
  }

  validateEmail(email) {
    var em =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return em.test(email);
  }

  validatePassword(password) {
    var pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return pass.test(password);
  }

  SIGN_IN() {
    let email = this.state.user_email.trim();
    let Password = this.state.user_password;
    let email_error = '';
    let password_error = '';
    if (email == '') {
      email_error = 'يرجى ادخال البريد الالكتروني';
    } else if (this.validateEmail(email) == false) {
      email_error = 'تأكد من كتابة البريد الالكترونى بشكل صحيح';
    } else if (email.length > 70) {
      email_error = 'البريد الالكترونى يجب ألا يزيد عن 70 حرف ورقم';
    } else if (email != 'marwa@gmail.com' && email != '') {
      email_error = 'البريد الذي ادخلته غير موجود';
    } else {
      this.setState({ error_email: '' });
    }
    if (Password == '') {
      password_error = 'يجب ادخال كلمه مرور';
    } else if (Password.length > 20) {
      password_error = 'كلمه المرور يجب ألا تزيد عن 20 حرف و رقم';
    } else if (!this.validatePassword(Password)) {
      password_error =
        'كلمه المرور يجب لا تقل عن 6 ارقام و حرف كبير و حرف صغير وعلامه مميزه ';
    } else if (Password != 'Mm!123456') {
      password_error = 'كلمة المرور التي ادخلتها غير صحيحة';
    } else {
      this.setState({ error_password: '' });
    }
    if (email == 'marwa@gmail.com' && Password == 'Mm!123456') {
      alert('تم التحقق من الايميل وكلمة المرور بنجاح .. مرحبا بك');
    } else {
      alert('يرجى التحقق من ادخال بياناتك بشكل صحيح');
    }
    this.setState({ error_email: email_error, error_password: password_error });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.iconStyle}>
              <AntDesign
                name="arrowright"
                color={'#aaa'}
                size={RFValue(ICONS.xlIcon)}
              />
            </TouchableOpacity>
            <View style={styles.ViewTitle}>
              <Text style={styles.titleStyle}>تسجيل الدخول</Text>
            </View>
            <View>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="البريد الالكتروني"
                value={this.state.user_email}
                onChangeText={value => {
                  this.setState({ user_email: value });
                }}
              />
            </View>
            <Text style={styles.erorMsg}>{this.state.error_email}</Text>
            <View style={styles.textInputViewStyle}>
              <TextInput
                style={styles.inputPass}
                placeholder="كلمة المرور"
                secureTextEntry={this.state.secured_pass}
                maxLength={10}
                value={this.state.user_password}
                onChangeText={value => {
                  this.setState({ user_password: value });
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.secured_pass();
                }}>
                <Entypo
                  name={this.state.secured_pass ? 'eye-with-line' : 'eye'}
                  size={ICONS.mIcon}
                  color={'#aaa'}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.erorMsg}>{this.state.error_password}</Text>
            <View style={styles.forgetPassMsg}>
              <Text style={styles.forgetPassTxt}>هل نسيت كلمةالمرور؟</Text>
            </View>
            <TouchableOpacity style={styles.buttonViewStyle}>
              <GeneralButton
                title="تسجيل الدخول"
                bgcolor={COLORS.primary}
                activeOpacity={0.7}
                onPress={() => {
                  this.SIGN_IN();
                }}
              />
            </TouchableOpacity>
            <Text style={styles.socialHeader}>او عن طريق</Text>
            <View style={styles.socialButtonsView}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialTxt}>فيسبوك</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialTxt}>انستجرام</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // marginTop: '35%',
            // marginBottom: '40%'
            marginTop:RFValue(MARGIN.xlMargin)
          }}>
          <Text>ليس لديك حساب ؟ </Text>
          <TouchableOpacity onPress={() => { }}>
            <Text style={{ textDecorationLine: 'underline', color: COLORS.black }}>انشاء حساب</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: RFValue(MARGIN.smMargin),
    justifyContent:'space-around'
  },
  iconStyle: {
    // width: RFValue(IconsView.IconWidth),
    // height: RFValue(IconsView.IconHeight),
    padding:RFValue(PADDING.xsPadding),
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    paddingVertical: RFValue(PADDING.xsPadding),
    alignSelf: 'center',
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
    alignSelf: 'center',
    color: COLORS.error,
  },
});
