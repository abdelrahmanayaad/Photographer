import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
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
} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
export function ForgetPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handelPress = value => {
    let errors = 0;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(value.trim()) == false) {
      setEmailError('برجاء إدخال بريد الكترونى صحيح!');
      errors++;
    } else {
      setEmailError('');
    }
    if (errors == 0) {
      alert('Change Pass');
    }
  };

  const onChangeEmail = value => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(value.trim());
  };

  const generatCode = () => {
    let code = '';
    const numbers = '0123456789';
    for (let i = 0; i < 4; i++) {
      code += numbers[Math.floor(Math.random() * numbers.length)];
    }
    // alert(code);
    return code;
  };

  const sendCode = () => {
    const code = generatCode();
    alert(code);
  };
  const sendpress = () => {
    handelPress(email);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconStyle}>
          <AntDesign
            name="arrowright"
            color={COLORS.gray}
            size={RFValue(ICONS.xlIcon)}
          />
        </TouchableOpacity>
        <View style={styles.ViewTitle}>
          <Text style={styles.titleStyle}>هل نسيت كلمة المرور ؟</Text>
        </View>
        <View style={styles.ViewTitle}>
          <Text style={styles.messageTitleStyle}>
            من فضلك ادخل البريد الالكتروني الخاص بك لارسال تعليمات اعادة تعيين
            كلمة المرور
          </Text>
        </View>
        <View style={styles.textInputViewStyle}>
          <Input
            onChangeText={value => {
              setEmail(value);
              if (onChangeEmail(value)) {
                setEmailError('');
              }
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="البريد الالكتروني"
          />
          {emailError ? (
            <Text style={styles.textErrorStyle}>{emailError}</Text>
          ) : null}
        </View>
        <View style={styles.buttonViewStyle}>
          <GeneralButton
            title="ارسل لي الان"
            bgcolor={COLORS.primary}
            onPress={() => {
              // handelPress(email);
              // this.generatCode();
              // this.sendCode();
              navigation.navigate('OTP');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: RFValue(MARGIN.xsMargin),
  },
  iconStyle: {
    width: RFValue(IconsView.IconWidth),
    height: RFValue(IconsView.IconHeight),
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
  messageTitleStyle: {
    fontSize: RFValue(FONTS.h5),
    color: COLORS.gray,
    marginBottom: RFValue(MARGIN.xsMargin),
  },
  textInputViewStyle: {
    marginBottom: RFValue(MARGIN.xlMargin),
  },
  buttonViewStyle: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textErrorStyle: {
    color: COLORS.error,
    fontSize: FONTS.h5,
    fontWeight: 'bold',
    marginTop: RFValue(7),
  },
});
export default ForgetPassword;
