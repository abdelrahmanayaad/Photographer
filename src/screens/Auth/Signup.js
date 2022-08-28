import React, {useState, useEffect} from 'react';
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
} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

const {width, height} = Dimensions.get('window');
export default function Signup({navigation}) {
  const [name, setName] = useState('');
  const [nameerorr, setNameerorr] = useState('');
  const [Email, setEmail] = useState('');
  const [Emailerorr, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneerorr, setPhoneError] = useState('');
  const [password, setPassword] = useState('');
  const [passworderorr, setPassError] = useState('');
  const [passwordconfirm, setConPass] = useState('');
  const [passwordconfirmerorr, setConPassError] = useState('');
  const [secured_pass, setSecured_pass] = useState(true);
  const [secured_pass1, setSecured_pass1] = useState(true);
  const [ShowComment, setShowComment] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [arr, setArr] = useState([
    {name: 'مستخدم'},
    {name: ' مصور'},
    {name: 'ميكب ارتست'},
  ]);
  const [token, setToken] = useState('');

  const SendUser = () => {
    let data_to_send = {
      // name: name,
      // email: Email,
      // pass: password,
      // type: arr,
      // token: token,
      name: 'Ayad',
      email: 'ayad74@gmail.com',
      pass: 'A10105655#',
      type: 'مستخدم',
      token: token,
    };
    axios
      .post(
        'https://generation3.000webhostapp.com/project/Training/Auth/sign_up.php',
        data_to_send,
      )
      .then(res => {
        if (res.status == 200) {
          alert(res.data);
          if (res.data == 'successful') {
            alert('done');
          } else if (
            res.data == 'Not Valid Values' ||
            res.data == 'error happen'
          ) {
            alert('من فضلك تأكد من صحة البيانات');
          } else if (res.data == 'email is already exist') {
            alert('هذا البريد موجود بالفعل');
          }
        } else {
          alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
        }
        setName('');
        setPassword('');
        setPhoneError('');
        setEmail('');
        setConPass('');
      });
  };

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
  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        alert(token);
        // setToken(token)
      });

    return messaging().onTokenRefresh(token => {
      // setToken(token)
      alert(token);
    });

    // const getToken = async () => {
    //   try {
    //     const token = await messaging().getToken();
    //     if (token) return console.log(token);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getToken()
  }, []);

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
    var pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return pass.test(password);
  };
  validateName = name => {
    const re = /^([a-zA-Z0-9\s_\u0600-\u06FF]).{5,30}$/;
    return re.test(String(name).toLowerCase());
  };

  signup = value => {
    let error = 0;
    //name

    if (name.trim() == '') {
      error++;
      setNameerorr('لايجب ان يكون هذا الحقل فارغ');
    } else if (!validateName(name)) {
      error++;
      setNameerorr('أدخل اسم صالح ');
    } else {
      setNameerorr('');
    }

    //email
    if (Email == '') {
      error++;
      setEmailError('لايجب ان يكون هذا الحقل فارغ');
    } else if (!validateEmail(Email)) {
      error++;
      setEmailError('تأكد من كتابة البريد الالكترونى بشكل صحيح ');
    } else {
      setEmailError('');
    }

    //phone
    if (phone == '') {
      error++;
      setPhoneError('لايجب ان يكون هذا الحقل فارغ');
    } else if (!validatePhone(phone)) {
      error++;
      setPhoneError('أدخل رقم هاتف صالح ');
    } else {
      setPhoneError('');
    }

    //password
    if (password.trim() == '') {
      error++;
      setPassError('لايجب ان يكون هذا الحقل فارغ');
    } else if (password.length < 20) {
      error++;
      setPassError('كلمه المرور يجب ألا تزيد عن 20 حرف و رقم');
    } else if (!validatePassword(password)) {
      error++;
      setPassError(
        'كلمه المرور يجب لا تقل عن 6 ارقام و حرف كبير و حرف صغير وعلامه مميزه',
      );
    } else {
      setPassError('');
    }
    //passwordconfirm
    if (passwordconfirm.trim() == '') {
      error++;
      setConPassError('لايجب ان يكون هذا الحقل فارغ');
    }
    if (passwordconfirm != password) {
      error++;
      setConPassError('كلمة المرور غير متطابقة');
    } else if (passwordconfirm.trim().length < 6) {
      error++;
      setConPassError('ادخل اكثر من 6 احرف');
    } else {
      setConPassError('');
    }

    if (error == 0) {
      // SendUser();
    }
  };
  onChangeEmail = value => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(value.trim());
  };
  onChangePassword = value => {
    var pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return pass.test(value.trim());
  };
  onChangephone = value => {
    var pho = /^01[0125][0-9]{8}$/gm;
    return pho.test(value.trim());
  };

  onChangename = value => {
    const re = /^([a-zA-Z0-9\s_\u0600-\u06FF]).{4,30}$/;
    return re.test(value.trim());
  };
  const secured_password = e => {
    let securedPass = secured_pass;
    securedPass = !securedPass;
    setSecured_pass(securedPass);
  };
  const secured_Con_password = e => {
    let securedPass = secured_pass1;
    securedPass = !securedPass;
    setSecured_pass1(securedPass);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconStyle}>
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
            value={name}
            onChangeText={value => {
              setName(value);
              if (onChangename(value)) {
                setNameerorr('');
              }
            }}
          />
          <View style={styles.ErrorView}>
            <Text style={styles.ErrorText}>{nameerorr}</Text>
          </View>
        </View>
        <View style={styles.textInputViewStyle}>
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="البريد الالكتروني"
            value={Email}
            onChangeText={value => {
              setEmail(value);
              if (onChangeEmail(value)) {
                setEmailError('');
              }
            }}
          />
          <View style={styles.ErrorView}>
            <Text style={styles.ErrorText}>{Emailerorr}</Text>
          </View>
        </View>
        <View style={styles.textInputpassword}>
          <TextInput
            style={styles.inputPass}
            placeholder="كلمة المرور"
            secureTextEntry={secured_pass}
            maxLength={10}
            value={password}
            onChangeText={value => {
              setPassword(value);
              if (onChangePassword(value)) {
                setPassError('');
              }
            }}
          />
          <TouchableOpacity
            onPress={() => {
              secured_password();
            }}>
            <Entypo
              name={secured_pass ? 'eye-with-line' : 'eye'}
              size={ICONS.mIcon}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.ErrorText}>{passworderorr}</Text>

        <View style={styles.textInputpassword}>
          <TextInput
            style={styles.inputPass}
            placeholder="تأكيد كلمة المرور"
            secureTextEntry={secured_pass1}
            maxLength={10}
            value={passwordconfirm}
            onChangeText={value => {
              setConPass(value);
              if (onChangePassword(value)) {
                setConPassError('');
              }
            }}
          />
          <TouchableOpacity
            onPress={() => {
              secured_Con_password();
            }}>
            <Entypo
              name={secured_pass1 ? 'eye-with-line' : 'eye'}
              size={ICONS.mIcon}
              color={'#aaa'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.ErrorText}>{passwordconfirmerorr}</Text>

        <View style={styles.textInputViewStyle}>
          <Input
            autoCapitalize="none"
            keyboardType="number-pad"
            placeholder="رقم الهاتف"
            value={phone}
            onChangeText={value => {
              setPhone(value);
              if (onChangephone(value)) {
                setPhoneError('');
              }
            }}
          />
          <View style={styles.ErrorView}>
            <Text style={styles.ErrorText}>{phoneerorr}</Text>
          </View>
        </View>
        <View style={styles.buttonViewStyle}>
          <GeneralButton
            onPress={() => {
              signup();
              SendUser();
              navigation.navigate('HomeStack');
            }}
            title="انشاء حساب"
            bgcolor={COLORS.primary}
          />
        </View>
        <View style={styles.buttonViewStyle}>
          <GeneralButton
            onPress={() => {
              setAnimateModal(true), setShowComment(true);
            }}
            title="تحديد النوع"
            bgcolor={COLORS.primary}
          />
        </View>
        <SwipeUpDownModal
          modalVisible={ShowComment}
          PressToanimate={animateModal}
          ContentModal={
            <View style={styles.containerContent}>
              <Text style={[styles.fontModal, {marginBottom: MARGIN.xsMargin}]}>
                حدد نوع المستخدم
              </Text>

              <FlatList
                data={arr}
                renderItem={({item, index}) => (
                  <>
                    <TouchableOpacity
                      style={styles.buttonmodal}
                      onPress={() => {
                        setShowComment(false);
                      }}>
                      <Text style={styles.fontModal}>{item.name}</Text>

                      <AntDesign
                        name="arrowleft"
                        color={COLORS.gray}
                        size={ICONS.lIcon}
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
            setAnimateModal(true), setShowComment(false);
          }}
        />

        <View style={styles.ViewTitle1}>
          <Text style={styles.messageTitleStyle}>هل لديك حساب؟ </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.messageTitleStyle1}>تسجيل دخول</Text>
          </TouchableOpacity>
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
  textInputViewStyle: {},
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
    alignSelf: 'center',
    color: COLORS.black,
  },
  buttonmodal: {
    height: RFValue(height / 19),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: RFValue(width / 1.5),
    padding: PADDING.xsPadding,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.gray,
    marginBottom: MARGIN.xsMargin,
  },
  containerContent: {
    height: RFValue(height),
    marginTop: 30,
  },
  headerContent: {
    height: 50,
  },
  Modal: {
    backgroundColor: COLORS.background,
    height: RFValue(height / 2.5),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: PADDING.mdPadding,
  },
});
