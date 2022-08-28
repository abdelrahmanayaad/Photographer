import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, ICONS, PADDING} from '../../constants';
import GeneralButton from '../../components/GeneralButton';
import Input from '../../components/Input';
import {RFValue} from 'react-native-responsive-fontsize';
import {MARGIN} from '../../constants/Constants';
import axios from 'axios';
import Navigation from '../../navigation/Navigation';

function NewPassword({navigation}) {
  const [newpassword, setnewpassword] = useState('');
  const [confirm_new_password, setconfirm_new_password] = useState('');
  const [new_password_msg, setnew_password_msg] = useState('');
  const [confirm_new_password_msg, setconfirm_new_password_msg] = useState('');
  const [new_password_msg_color, setnew_password_msg_color] = useState('');
  const [confirm_new_password_msg_color, setconfirm_new_password_msg_color] =
    useState('');

  const send_new_password = password => {
    let data_to_send = {
      user_email: 'maa@gmail.com',
      user_type: 'مصور',
      new_password: password,
    };

    axios
      .post(
        'https://generation3.000webhostapp.com/project/Training/Auth/ForgetPass/new_pass.php',
        data_to_send,
      )
      .then(res => {
        if (res.status == 200) {
          // res.data => Success ==> added | Error ==> error | Empty ==> data_to_send is empty
          console.log(res.data);
          if (res.data == 'successful') {
            //this.setState({ color: '#0f0' })

            // alert("user added");
            alert('done');
          } else if (res.data == 'user not found') {
            //alert('data_to_send is empty')
            //this.setState({ color: '#f00' })
            alert('user not found');
          } else {
            alert(res.data);
            // this.setState({ color: '#f00' })
          }
        } else {
          alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const validatePassword = password => {
    var pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return pass.test(password);
  };
  const new_password_check = () => {
    let new_password = newpassword;
    if (new_password.length == 0) {
      setnew_password_msg(new_password_msg => '');
      setnew_password_msg_color(new_password_msg_color => '');
    } else if (new_password.length > 20) {
      setnew_password_msg(
        new_password_msg => ' كلمه المرور يجب ان لا تزيد عن 20 حرف ورقم ',
      );
      setnew_password_msg_color(new_password_msg_color => COLORS.error);
    } else {
      if (!validatePassword(new_password)) {
        // not a valid email
        // console.log("not valid")
        setnew_password_msg(
          new_password_msg =>
            ' كلمه المرور يجب لا تقل عن 6ارقام و حرف كبير و حرف صغير وعلامه مميزه ',
        );
        setnew_password_msg_color(new_password_msg_color => COLORS.error);
      } else {
        // valid email
        // console.log(" valid")
        setnew_password_msg(new_password_msg => '');
        setnew_password_msg_color(new_password_msg_color => '');
        return true;
      }
    }
  };
  const confirm_password = () => {
    if (confirm_new_password.length == 0) {
      setconfirm_new_password_msg(confirm_new_password_msg => '');
      setconfirm_new_password_msg_color(confirm_new_password_msg_color => '');
    } else {
      if (newpassword == confirm_new_password) {
        // valid email
        // console.log(" valid")

        setconfirm_new_password_msg(confirm_new_password_msg => '');
        setconfirm_new_password_msg_color(confirm_new_password_msg_color => '');
        return true;
      } else {
        setconfirm_new_password_msg(
          confirm_new_password_msg => 'كلمة المرور غير متطابقه',
        );
        setconfirm_new_password_msg_color(
          confirm_new_password_msg_color => COLORS.error,
        );
      }
    }
  };

  const changeButtomPress = () => {
    let new_pass = newpassword;
    let confirm_new_pass = confirm_new_password;
    if (new_pass == '') {
      setnew_password_msg(new_password_msg => 'يجب ادخال كلمة المرور الجديدة');
      setnew_password_msg_color(new_password_msg_color => COLORS.error);
    }
    if (confirm_new_pass == '') {
      setconfirm_new_password_msg(
        confirm_new_password_msg => 'يجب ادخال تاكيد كلمة المرور الجديدة',
      );
      setconfirm_new_password_msg_color(
        confirm_new_password_msg_color => COLORS.error,
      );
    }
    if (new_pass != '' && confirm_new_pass != '') {
      setnew_password_msg(new_password_msg => '');
      setnew_password_msg_color(new_password_msg_color => '');
      setconfirm_new_password_msg(confirm_new_password_msg => '');
      setconfirm_new_password_msg_color(confirm_new_password_msg_color => '');
    }
  };
  const confirm = () => {
    if (new_password_check() == true && confirm_password() == true) {
      //console.log("ok")
      send_new_password(newpassword);
    }
  };
  const multifunonpress = () => {
    confirm();
    changeButtomPress();
    navigation.navigate('HomeStack');
  };
  return (
    <View style={styles.main_view_style}>
      <ScrollView>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={COLORS.primary}
        />
        <TouchableOpacity style={styles.iconStyle}>
          <AntDesign
            name="arrowright"
            color={COLORS.gray}
            size={RFValue(ICONS.xlIcon)}
          />
        </TouchableOpacity>
        <View style={styles.ViewTitle}>
          <Text style={styles.titleStyle}>تغيير كلمة المرور</Text>
        </View>
        <View style={styles.view_after_header_style}>
          <View style={styles.each_textinput_viewstyle}>
            <Input
              placeholder="كلمة المرور الجديدة"
              newpassword={newpassword}
              onChangeText={value => {
                setnewpassword(newpassword => value);
              }}
              onBlur={new_password_check}
            />
            <Text style={{color: new_password_msg_color}}>
              {new_password_msg}
            </Text>
          </View>
          <View
            style={[
              styles.each_textinput_viewstyle,
              {marginBottom: RFValue(MARGIN.xlMargin)},
            ]}>
            <Input
              placeholder="تاكيد كلمة المرور الجديدة"
              confirm_new_password={confirm_new_password}
              onChangeText={value => {
                setconfirm_new_password(confirm_new_password => value);
              }}
              onBlur={confirm_password}
            />
            <Text style={{color: confirm_new_password_msg_color}}>
              {confirm_new_password_msg}
            </Text>
          </View>
          <View style={styles.view_button_style}>
            <GeneralButton
              title={'تغيير كلمة المرور'}
              bgcolor={COLORS.primary}
              onPress={multifunonpress}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main_view_style: {
    flex: 1,
    padding: RFValue(PADDING.xsPadding),
  },

  each_textinput_viewstyle: {
    //marginBottom:height*.02
    //marginBottom: RFValue(MARGIN.mdMargin),
    width: '100%',
  },
  text_style: {
    color: COLORS.gray,
    fontSize: RFValue(FONTS.h3),
  },
  view_after_header_style: {
    //backgroundColor:"#ff0",
    alignItems: 'center',
    width: '100%',
    // marginBottom: RFValue(MARGIN.xsMargin),
    alignSelf: 'center',
  },
  view_button_style: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  iconStyle: {
    // padding: RFValue(PADDING.smPadding),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: RFValue(MARGIN.lgMargin),
  },
  titleStyle: {
    fontSize: RFValue(FONTS.h3),
    color: COLORS.black,
    fontWeight: 'bold',
    // margin: RFValue(MARGIN.smMargin),
  },
  ViewTitle: {
    marginBottom: RFValue(MARGIN.xsMargin),
  },
});
export default NewPassword;
