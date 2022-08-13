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
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
    };
  }

  handelPress = value => {
    let errors = 0;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(value.trim()) == false) {
      this.setState({emailError: 'برجاء إدخال بريد الكترونى صحيح!'});
      errors++;
    } else {
      this.setState({emailError: ''});
    }
    if (errors == 0) {
      alert('Change Pass');
    }
  };

  onChangeEmail = value => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(value.trim());
  };

  generatCode = () => {
    let code = '';
    const numbers = '0123456789';
    for (let i = 0; i < 4; i++) {
      code += numbers[Math.floor(Math.random() * numbers.length)];
    }
    // alert(code);
    return code;
  };

  sendCode = () => {
    const code = this.generatCode();
    alert(code);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity style={styles.iconStyle}>
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
                this.setState({email: value});
                if (this.onChangeEmail(value)) {
                  this.setState({emailError: ''});
                }
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="البريد الالكتروني"
            />
            {this.state.emailError ? (
              <Text style={styles.textErrorStyle}>{this.state.emailError}</Text>
            ) : null}
          </View>
          <View style={styles.buttonViewStyle}>
            <GeneralButton
              title="ارسل لي الان"
              bgcolor={COLORS.primary}
              onPress={() => {
                this.handelPress(this.state.email);
                // this.generatCode();
                // this.sendCode();
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
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
