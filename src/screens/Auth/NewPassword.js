import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  COLORS,
  FONTS,
  ICONS,
  PADDING,
  RADIUS,
  IconsView,
} from '../../constants';
import GeneralButton from '../../components/GeneralButton';
import Input from '../../components/Input';
import { RFValue } from 'react-native-responsive-fontsize';
import { MARGIN } from '../../constants/Constants';
import Dialog from "react-native-dialog";
import axios from 'axios'


export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      
      new_password: '',
      new_password_msg: '',
      new_password_msg_color: '',
      confirm_new_password: '',
      confirm_new_password_msg: '',
      confirm_new_password_msg_color: '',
    };
  }
  validatePassword(password) {
    var pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return pass.test(password);
  }
 
  new_password_check() {
    let new_password = this.state.new_password;
    if (this.state.new_password.length == 0) {
      this.setState({ new_password_msg: '', new_password_msg_color: '' });
    } else if (this.state.new_password.length > 20) {
      this.setState({
        new_password_msg: 'كلمه المرور يجب ان لا تزيد عن 20 حرف ورقم ',
        new_password_msg_color: COLORS.error,
      });
    } else {
      if (!this.validatePassword(new_password)) {
        // not a valid email
        // console.log("not valid")
        this.setState({
          new_password_msg:
            'كلمه المرور يجب لا تقل عن 6ارقام و حرف كبير و حرف صغير وعلامه مميزه ',
          new_password_msg_color: COLORS.error,
        });
      } else {
        // valid email
        // console.log(" valid")
        this.setState({ new_password_msg: '', new_password_msg_color: '' });
      }
    }
  }
  confirm_password() {
    if (this.state.confirm_new_password.length == 0) {
      this.setState({
        confirm_new_password_msg: '',
        confirm_new_password_msg_color: '',
      });
    } else {
      if (this.state.new_password == this.state.confirm_new_password) {
        // valid email
        // console.log(" valid")
        this.setState({
          confirm_new_password_msg: '',
          confirm_new_password_msg_color: '',
        });
      } else {
        this.setState({
          confirm_new_password_msg: 'كلمه المرور غير متطابقه',
          confirm_new_password_msg_color: COLORS.error,
        });
      }
    }
  }
  changeButtomPress() {
    let new_pass = this.state.new_password
    let confirm_new_password = this.state.confirm_new_password
    if (new_pass == "") {
      this.setState({ new_password_msg: "يجب ادخال كلمة المرور الجديدة", new_password_msg_color: COLORS.error })

    } if (confirm_new_password == "") {
      this.setState({ confirm_new_password_msg: "يجب ادخال تاكيد كلمة المرور الجديدة", confirm_new_password_msg_color: COLORS.error })

    } if ( new_pass != "" && confirm_new_password != "") {
      this.setState({
        new_password_msg: "", new_password_msg_color: "",
        confirm_new_password_msg: "", confirm_new_password_msg_color: ""
      })

    }
  }
  render() {
    /*axios
      .get(
        'https://generation3.000webhostapp.com/project/Training/Auth/reset_password.php'
      )
      .then(res=>{
        if(res.status==200){
          console.log(res.data)
        }
      });*/
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
                placeholder="كلمة المرور الجديدة"
                new_password={this.state.new_password}
                onChangeText={(value) => {
                  this.setState({ new_password: value });
                }}
                onBlur={() => {
                  this.new_password_check();
                }}
              />
              <Text style={{ color: this.state.new_password_msg_color }}>
                {this.state.new_password_msg}
              </Text>
            </View>
            <View
              style={[
                styles.each_textinput_viewstyle,
                { marginBottom: RFValue(MARGIN.xlMargin) },
              ]}>
              <Input
                placeholder="تاكيد كلمة المرور الجديدة"
                confirm_new_password={this.state.confirm_new_password}
                onChangeText={(value) => {
                  this.setState({ confirm_new_password: value });
                }}
                onBlur={() => {
                  this.confirm_password();
                }}
              />
              <Text style={{ color: this.state.confirm_new_password_msg_color }}>
                {this.state.confirm_new_password_msg}
              </Text>
            </View>
            <View style={styles.view_button_style}>
              <GeneralButton
                title={'تغيير كلمة المرور'}
                bgcolor={COLORS.primary}
                onPress={() => {
                  this.changeButtomPress()
                }}
              />
            </View>
          </View>
        </ScrollView>
        
      </View>

    );
  }
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
