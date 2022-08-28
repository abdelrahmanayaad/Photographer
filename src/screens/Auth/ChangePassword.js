import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  COLORS,
  FONTS,
  ICONS,
  PADDING,
} from '../../constants';
import GeneralButton from '../../components/GeneralButton';
import Input from '../../components/Input';
import { RFValue } from 'react-native-responsive-fontsize';
import { MARGIN } from '../../constants/Constants';
import Dialog from "react-native-dialog";
import axios from 'axios'

const change_password = (oldpassword, newpassword) => {
  let data_to_send = {
    user_id: '15',
    new_pass: newpassword,
    old_pass: oldpassword
  };

  axios.post("https://generation3.000webhostapp.com/project/Training/Auth/reset_password.php", data_to_send).then((res) => {
    if (res.status == 200) {

      // res.data => Success ==> added | Error ==> error | Empty ==> data_to_send is empty
      console.log(res.data)
      if (res.data == "successful") {
        //this.setState({ color: '#0f0' })

        // alert("user added");
        alert("done")
      } else if (res.data == 'user not found') {
        //alert('data_to_send is empty')
        //this.setState({ color: '#f00' })
        alert("user not found")


      } else {
        alert(res.data)
        // this.setState({ color: '#f00' })

      }

    } else {
      alert("حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا")
    }
  }).catch((err) => {
    console.log(err)
  })
}
function ChangePassword() {
  const [check_old_pass, setcheck_old_pass] = useState("")
  const [text_check_old_pass, settext_check_old_pass] = useState("")
  const [text_check_old_pass_text_color, settext_check_old_pass_text_color] = useState("")
  const [new_password, setnew_password] = useState("")
  const [new_password_msg, setnew_password_msg] = useState("")
  const [new_password_msg_color, setnew_password_msg_color] = useState("")
  const [confirm_new_password, setconfirm_new_password] = useState("")
  const [confirm_new_password_msg, setconfirm_new_password_msg] = useState("")
  const [confirm_new_password_msg_color, setconfirm_new_password_msg_color] = useState("")
  const [dialog_visible, setdialog_visible] = useState(false)

  const validatePassword = (password) => {
    var pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return pass.test(password);
  }
  const old_pass_matches_endtyping = () => {
    //old pass user input value
    if (check_old_pass.length == 0) {

      //settext_check_old_pass(text_check_old_pass => "")
      //settext_check_old_pass_text_color(text_check_old_pass_text_color => "")
      setdialog_visible(dialog_visible => true)

    } else if (check_old_pass.length > 20) {
      //alert('خطأ في كلمه المرور القديمه');
      setdialog_visible(dialog_visible => true)
    } else {
      if (!validatePassword(check_old_pass)) {
        //alert('خطأ في كلمه المرور القديمه');

        setdialog_visible(dialog_visible => true)

      } else {
        // valid email
        // console.log(" valid")
        //settext_check_old_pass(text_check_old_pass => "")
        // settext_check_old_pass_text_color(text_check_old_pass_text_color => "")
        setdialog_visible(dialog_visible => false)
        return true;

      }
    }
  }

  const new_password_check = () => {
    if (new_password.length == 0) {
      setnew_password_msg(new_password_msg => "")
      setnew_password_msg_color(new_password_msg_color => "")
    } else if (new_password.length > 20) {

      setnew_password_msg(new_password_msg => 'كلمه المرور يجب ان لا تزيد عن 20 حرف ورقم')
      setnew_password_msg_color(new_password_msg_color => COLORS.error)
    } else {
      if (!validatePassword(new_password)) {
        // not a valid email
        // console.log("not valid")

        setnew_password_msg(new_password_msg => 'كلمه المرور يجب لا تقل عن 6ارقام و حرف كبير و حرف صغير وعلامه مميزه ')
        setnew_password_msg_color(new_password_msg_color => COLORS.error)
      } else {
        // valid email
        // console.log(" valid")
        setnew_password_msg(new_password_msg => "")
        setnew_password_msg_color(new_password_msg_color => "")
        return true;
      }
    }
  }

  const confirm_password = () => {
    if (confirm_new_password.length == 0) {

      setconfirm_new_password_msg(confirm_new_password_msg => "")
      setconfirm_new_password_msg_color(confirm_new_password_msg_color => "")
    } else {
      if (new_password == confirm_new_password) {
        // valid email
        // console.log(" valid")

        setconfirm_new_password_msg(confirm_new_password_msg => "")
        setconfirm_new_password_msg_color(confirm_new_password_msg_color => "")
        return true;
      } else {

        setconfirm_new_password_msg(confirm_new_password_msg => 'كلمه المرور غير متطابقه')
        setconfirm_new_password_msg_color(confirm_new_password_msg_color => COLORS.error)
      }
    }
  }

  const changeButtomPress = () => {
    let new_pass = new_password

    if (new_pass == "") {

      setnew_password_msg(new_password_msg => "يجب ادخال كلمة المرور الجديدة")
      setnew_password_msg_color(new_password_msg_color => COLORS.error)

    } if (confirm_new_password == "") {

      setconfirm_new_password_msg(confirm_new_password_msg => "يجب ادخال تاكيد كلمة المرور الجديدة")
      setconfirm_new_password_msg_color(confirm_new_password_msg_color => COLORS.error)

    }
  }
  const submit = () => {

    if (old_pass_matches_endtyping() == true && new_password_check() == true && confirm_password() == true) {
      change_password(check_old_pass, new_password)
      //navigation
      //console.log("ok")
    }
  }

  const multipleFunctionOnpress = () => {
    submit();
    changeButtomPress();
    old_pass_matches_endtyping();
  }
  return (


    <View style={styles.main_view_style}>
      <ScrollView>
        <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />
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
              placeholder="كلمة المرور القديمة "
              check_old_pass={check_old_pass}
              onChangeText={value => { setcheck_old_pass(check_old_pass => value) }}
            />
            <Text></Text>
          </View>
          <View style={styles.each_textinput_viewstyle}>
            <Input
              placeholder="كلمة المرور الجديدة"
              new_password={new_password}
              onChangeText={value => {
                setnew_password(new_password => value)
              }}
              onBlur={
                new_password_check}
            />
            <Text style={{ color: new_password_msg_color }}>
              {new_password_msg}
            </Text>
          </View>
          <View
            style={[
              styles.each_textinput_viewstyle,
              { marginBottom: RFValue(MARGIN.xlMargin) },
            ]}>
            <Input
              placeholder="تاكيد كلمة المرور الجديدة"
              confirm_new_password={confirm_new_password}
              onChangeText={value => {
                setconfirm_new_password(confirm_new_password => value)
              }}
              onBlur={
                confirm_password
              }
            />
            <Text style={{ color: confirm_new_password_msg_color }}>
              {confirm_new_password_msg}
            </Text>
          </View>
          <View style={styles.view_button_style}>
            <GeneralButton
              title={'تغيير كلمة المرور'}
              bgcolor={COLORS.primary}
              onPress={
                multipleFunctionOnpress
              }
            />
          </View>
        </View>
      </ScrollView>
      <Dialog.Container visible={dialog_visible}>
        <Dialog.Description>
          خطأ في كلمة المرور القديمة
        </Dialog.Description>
        <Dialog.Button label="انهاء" style={{ color: COLORS.primary }} onPress={() => setdialog_visible(dialog_visible => false)} />
      </Dialog.Container>
    </View>

  );

}

//3
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
export default ChangePassword;