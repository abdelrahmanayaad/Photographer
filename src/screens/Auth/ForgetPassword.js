import React, {Component} from 'react';
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
export class ForgetPassword extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity style={styles.iconStyle}>
            <AntDesign name="arrowright" color={'#aaa'} size={ICONS.xlIcon} />
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
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="البريد الالكتروني"
            />
          </View>
          <View style={styles.buttonViewStyle}>
            <GeneralButton title="ارسل لي الان" bgcolor={COLORS.primary} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: RFValue(MARGIN.smMargin),
  },
  iconStyle: {
    width: RFValue(IconsView.IconWidth),
    height: RFValue(IconsView.IconHeight),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: RFValue(MARGIN.lgMargin),
  },
  titleStyle: {
    fontSize: RFValue(FONTS.h2),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  ViewTitle: {
    marginBottom: RFValue(MARGIN.xsMargin),
  },
  messageTitleStyle: {
    fontSize: RFValue(FONTS.h5),
    color: COLORS.gray,
    marginBottom: RFValue(MARGIN.smMargin),
  },
  textInputViewStyle: {
    marginBottom: RFValue(MARGIN.xlMargin),
  },
  buttonViewStyle: {
    alignSelf: 'center',
    width:"100%",
    alignItems:"center",
    justifyContent:"center"
  },
});
export default ForgetPassword;
