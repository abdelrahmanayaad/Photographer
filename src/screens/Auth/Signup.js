import React, { Component } from 'react';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
  Button,
  TextInput,
  StatusBar
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
} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Entypo from 'react-native-vector-icons/Entypo';
// import messaging from '@react-native-firebase/messaging';
// import axios from 'axios';

const { width, height } = Dimensions.get('window');

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameerorr: '',
      Email: '',
      Emailerorr: '',
      phone: '',
      phoneerorr: '',
      password: '',
      passworderorr: '',
      passwordconfirm: '',
      passwordconfirmerorr: '',
      secured_pass: true,
      secured_pass1: true,
      ShowComment: false,
      animateModal: false,
      arr: [
        { name: "مستخدم", }
        ,
        { name: " مصور" }
        ,
        { name: "ميكب ارتست" }
      ],
      token: ""
    };
  }

  //   SendUser() {
  //     let data_to_send = {
  //       name: this.state.name,
  //       email: this.state.Email,
  //       pass: this.state.password,
  //       type: this.state.arr,
  //       token: this.state.token
  //     }
  //     axios.post("https://generation3.000webhostapp.com/project/Training/Auth/sign_up.php", data_to_send)
  //       .then((res) => {
  //         if (res.status == 200) {
  //           if ( (res.data) == "successful") {
  //             alert("done")
  //           } else if (res.data == "Not Valid Values" || res.data == "error happen") {
  //             alert("من فضلك تأكد من صحة البيانات")
  //           } else if (res.data == "email is already exist") {
  //             alert("هذا البريد موجود بالفعل")
  //           }
  //         } else {
  //           alert("حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا")
  //         }
  //         this.setState({ name: "" })
  //         this.setState({ password: "" })
  //         this.setState({ phoneerorr: "" })
  //         this.setState({ Email: "" })
  //         this.setState({ passwordconfirm: "" })
  //       })
  //   }


  // componentDidMount(){
  //   messaging()
  //   .getToken()
  //   .then(token => {
  //       // alert(token)
  //       setToken(token)

  //   });


  // return messaging().onTokenRefresh(token => {
  //   setToken(token)

  // });

  // }

  validateEmail = email => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      return false;
    } else {
      return true;
    }
  };
  validatePhone = phone => {
    var pho = /^01[0125][0-9]{8}$/gm;
    return pho.test(phone);

  };
  validatePassword = password => {
    var pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
    return pass.test(password);

  }
  validateName = name => {
    const re = /^([a-zA-Z0-9\s_\u0600-\u06FF]).{5,30}$/
    return re.test(String(name).toLowerCase());
  }

  signup() {
    let error = 0;
    //name

    if (this.state.name.trim() == '') {
      error++;
      this.setState({ nameerorr: 'لايجب ان يكون هذا الحقل فارغ' });
    }

    else if (!this.validateName(this.state.name)) {
      error++;
      this.setState({ nameerorr: 'أدخل اسم صالح ' });
    } else {
      this.setState({ nameerorr: '' });
    }

    //email
    if (this.state.Email == '') {
      error++;
      this.setState({ Emailerorr: 'لايجب ان يكون هذا الحقل فارغ' });
    } else if (!this.validateEmail(this.state.Email)) {
      error++;
      this.setState({ Emailerorr: 'تأكد من كتابة البريد الالكترونى بشكل صحيح ' });
    } else {
      this.setState({ Emailerorr: '' });
    }

    //phone
    if (this.state.phone == '') {
      error++;
      this.setState({ phoneerorr: 'لايجب ان يكون هذا الحقل فارغ' });
    } else if (!this.validatePhone(this.state.phone)) {
      error++;
      this.setState({ phoneerorr: 'أدخل رقم هاتف صالح ' });
    } else {
      this.setState({ phoneerorr: '' });
    }

    //password
    if (this.state.password.trim() == '') {
      error++;
      this.setState({ passworderorr: 'لايجب ان يكون هذا الحقل فارغ' });
    } else if (this.state.password.length > 20) {
      error++;
      this.setState({ passworderorr: 'كلمه المرور يجب ألا تزيد عن 20 حرف و رقم' });

    } else if (!this.validatePassword(this.state.password)) {
      error++;
      this.setState({ passworderorr: 'كلمه المرور يجب لا تقل عن 6 ارقام و حرف كبير و حرف صغير وعلامه مميزه' });
    } else {
      this.setState({ passworderorr: '' });
    }
    //passwordconfirm
    if (this.state.passwordconfirm.trim() == '') {
      error++;
      this.setState({
        passwordconfirmerorr: 'لايجب ان يكون هذا الحقل فارغ',
      });
    }
    if (this.state.passwordconfirm != this.state.password) {
      error++;
      this.setState({
        passwordconfirmerorr: 'كلمة المرور غير متطابقة',
      });
    } else if (this.state.passwordconfirm.trim().length < 6) {
      error++;
      this.setState({
        passwordconfirmerorr: 'ادخل اكثر من 6 احرف',
      });
    }
    else {
      this.setState({
        passwordconfirmerorr: '',
      });
    }


    if (error == 0) {
      alert("WELCOME")
    }

  }
  onChangeEmail = value => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(value.trim());
  };
  onChangePassword = value => {
    var pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    return pass.test(value.trim());
  };
  onChangephone = value => {
    var pho = /^01[0125][0-9]{8}$/gm;
    return pho.test(value.trim());
  }

  onChangename = value => {
    const re = /^([a-zA-Z0-9\s_\u0600-\u06FF]).{4,30}$/
    return re.test(value.trim());
  }
  secured_pass() {
    let securedPass = this.state.secured_pass;
    securedPass = !securedPass;
    this.setState({ secured_pass: securedPass });
  }
  secured_pass1() {
    let securedPass = this.state.secured_pass1;
    securedPass = !securedPass;
    this.setState({ secured_pass1: securedPass });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.iconStyle}>
            <AntDesign
              name="arrowright"
              color={COLORS.gray}
              size={ICONS.xlIcon}
            />
          </TouchableOpacity>
          <View style={styles.ViewTitle}>
            <Text style={styles.titleStyle}>انشاء حساب</Text>
          </View>
          <View style={styles.textInputViewStyle}>
            <Input
              autoCapitalize="none"
              keyboardType="default"
              placeholder="الاسم"
              value={this.state.name}
              onChangeText={value => {
                this.setState({ name: value });
                if (this.onChangename(value)) {
                  this.setState({ nameerorr: '' });
                }

              }}
            />
            <View style={styles.ErrorView}>
              <Text style={styles.ErrorText}>{this.state.nameerorr}</Text>
            </View>
          </View>
          <View style={styles.textInputViewStyle}>
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="البريد الالكتروني"
              value={this.state.Email}
              onChangeText={value => {
                this.setState({ Email: value });
                if (this.onChangeEmail(value)) {
                  this.setState({ Emailerorr: '' });
                }
              }
              }




            />
            <View style={styles.ErrorView}>
              <Text style={styles.ErrorText}>{this.state.Emailerorr}</Text>
            </View>
          </View>
          <View style={styles.textInputpassword}>
            <TextInput
              style={styles.inputPass}
              placeholder="كلمة المرور"
              secureTextEntry={this.state.secured_pass}
              maxLength={10}
              value={this.state.password}
              onChangeText={value => {
                this.setState({ password: value });
                if (this.onChangePassword(value)) {
                  this.setState({ passworderorr: '' });
                }

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
          <Text style={styles.ErrorText}>{this.state.passworderorr}</Text>

          <View style={styles.textInputpassword}>
            <TextInput
              style={styles.inputPass}
              placeholder="تأكيد كلمة المرور"
              secureTextEntry={this.state.secured_pass1}
              maxLength={10}
              value={this.state.passwordconfirm}
              onChangeText={value => {
                this.setState({ passwordconfirm: value });
                if (this.onChangePassword(value)) {
                  this.setState({ passwordconfirmerorr: '' });
                }

              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.secured_pass1();
              }}>
              <Entypo
                name={this.state.secured_pass1 ? 'eye-with-line' : 'eye'}
                size={ICONS.mIcon}
                color={'#aaa'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.ErrorText}>{this.state.passwordconfirmerorr}</Text>

          <View style={styles.textInputViewStyle}>
            <Input
              autoCapitalize="none"
              keyboardType="number-pad"
              placeholder="رقم الهاتف"
              value={this.state.phone}
              onChangeText={value => {
                this.setState({ phone: value });
                if (this.onChangephone(value)) {
                  this.setState({ phoneerorr: '' });
                }

              }}
            />
            <View style={styles.ErrorView}>
              <Text style={styles.ErrorText}>{this.state.phoneerorr}</Text>
            </View>
          </View>
          <View style={styles.buttonViewStyle}>
            <GeneralButton
              onPress={() => {
                this.signup();
              }}
              title="انشاء حساب"
              bgcolor={COLORS.primary}
            />
          </View>
          <View style={styles.buttonViewStyle}>
            <GeneralButton
              onPress={() => this.setState({ ShowComment: true, animateModal: true })}
              title="تحديد النوع"
              bgcolor={COLORS.primary}
            />
          </View>
          <SwipeUpDownModal
            modalVisible={this.state.ShowComment}
            PressToanimate={this.state.animateModal}
            ContentModal={
              <View style={styles.containerContent}>
                <Text style={[styles.fontModal, { marginBottom: MARGIN.xsMargin }]}>حدد نوع المستخدم</Text>

                <FlatList
                  data={this.state.arr}
                  renderItem={({ item, index }) => (
                    <>

                      <TouchableOpacity
                        style={styles.buttonmodal}
                        onPress={() => {
                          this.setState({ ShowComment: false })
                        }}>
                        <Text style={styles.fontModal}>{item.name}</Text>

                        <AntDesign
                          name="arrowleft"
                          color={COLORS.gray}
                          size={ICONS.xlIcon}
                        />

                      </TouchableOpacity>
                    </>
                  )}

                />
              </View>
            }
            HeaderStyle={styles.headerContent}
            ContentModalStyle={styles.Modal}

            onClose={() => {
              this.setState({ animateModal: true, ShowComment: false })
            }}
          />

          <View style={styles.ViewTitle1}>
            <Text style={styles.messageTitleStyle}>هل لديك حساب؟ </Text>
            <TouchableOpacity>
              <Text style={styles.messageTitleStyle1}>تسجيل دخول</Text>
            </TouchableOpacity>
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
  ViewTitle1: {
    marginBottom: RFValue(MARGIN.xsMargin),
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: RFValue(MARGIN.mdMargin),
  },
  messageTitleStyle: {
    fontSize: RFValue(FONTS.h5),
    color: COLORS.gray,
    marginTop: RFValue(MARGIN.xsMargin),
  },
  messageTitleStyle1: {
    fontSize: RFValue(FONTS.h5),
    color: COLORS.primary,
    marginTop: RFValue(MARGIN.xsMargin),
    textDecorationLine: 'underline',
  },
  textInputViewStyle: {
  },
  textInputpassword: {
    borderBottomWidth: RFValue(0.7),
    borderBottomColor: COLORS.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputPass: {
    width: RFValue(width / 1.3),
    color: COLORS.black,
    fontSize: RFValue(FONTS.h5),
  },


  ErrorView: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
  },
  ErrorText: {
    fontSize: RFValue(FONTS.h6),
    color: COLORS.error,
  },
  buttonViewStyle: {
    width: RFValue(width),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFValue(MARGIN.mdMargin),
  },

  fontModal: {
    fontSize: RFValue(FONTS.h5),
    alignSelf: "center",
    color: COLORS.black,
  },
  buttonmodal: {
    height: RFValue(height / 19),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: RFValue(width / 1.5),
    padding: PADDING.xsPadding,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.gray,
    marginBottom: MARGIN.xsMargin
  },
  containerContent: {
    height: RFValue(height),
    marginTop: 30
  },
  headerContent: {
    height: 50
  },
  Modal: {
    backgroundColor: '#fff',
    height: RFValue(height / 2.5),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: PADDING.mdPadding

  }
});
export default Signup;
