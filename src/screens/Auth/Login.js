{/*import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { COLORS, PADDING, RADIUS, ICONS } from '../../constants';
import Input from '../../components/Input';
import GeneralButton from '../../components/GeneralButton';
import { RFValue } from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const { width, height } = Dimensions.get('window');
export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            secured_pass: true,
            user_email: '',
            user_password: '',
            error_email: '',
            error_password: ''
        }
    }

    secured_pass() {
        let securedPass = this.state.secured_pass
        securedPass = !securedPass
        this.setState({ secured_pass: securedPass })
    }
    SIGN_IN() {
        let email = this.state.user_email.trim()
        let Password = this.state.user_password
        let email_error = ""
        let password_error = ""


        if (email == "") {
            email_error = "يرجى ادخال البريد الالكتروني"
        } else if (email != 'marwa@gmail.com' && email != '') {
            email_error = "البريد الذي ادخلته غير صحيح"
        } else {
            this.setState({ error_email: '' })
        }


        if (Password == "") {
            password_error = "يجب ادخال كلمه مرور"
        } else if (Password != '123456') {
            password_error = "كلمة المرور التي ادخلتها غير صحيحة"
        } else {
            this.setState({ error_password: '' })
        }

        if (email == "marwa@gmail.com" && Password == "123456") {
            alert("تم التحقق من الايميل وكلمة المرور بنجاح .. مرحبا بك")
        } else {
            alert("يرجى التحقق من ادخال بياناتك بشكل صحيح")
        }

        this.setState({ error_email: email_error, error_password: password_error })
    }

    render() {
        return (
            <View style={{ flex: 1, padding: '5%', backgroundColor: COLORS.background }}>
                <StatusBar backgroundColor={COLORS.background} />
                <View>
                    <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
                        <AntDesign name="arrowright" size={ICONS.xlIcon} color={'#aaa'}/>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 30, fontSize: 30, fontWeight: 'bold',color:COLORS.black }}>تسجيل الدخول</Text>
                    <View style={{ marginTop: 50 }}>
                        <Input
                            style={{ alignSelf: 'center' }}
                            placeholder="البريد الالكترونى"
                            value={this.state.user_email}
                            onChangeText={(value) => { this.setState({ user_email: value }) }} />
                        <Text style={{ alignSelf: 'center', color: COLORS.error }}>{this.state.error_email}</Text>
                        <View style={styles.textInput}>
                            <TextInput placeholder="كلمة المرور" secureTextEntry={this.state.secured_pass} maxLength={10} />
                            <TouchableOpacity onPress={() => { this.secured_pass() }}>
                                <Entypo name={this.state.secured_pass ? 'eye-with-line' : 'eye'} size={ICONS.mIcon} color={'#aaa'}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ alignSelf: 'center', color: COLORS.error }}>{this.state.error_password}</Text>
                        <TouchableOpacity style={{ marginBottom: width * 0.07, alignSelf: 'flex-end', marginRight: 15 }} >
                            <Text style={{ textDecorationLine: 'underline' ,color:COLORS.black}}>نسيت كلمة المرور!</Text>
                        </TouchableOpacity>
                        <GeneralButton
                            style={{ alignSelf: 'center' }}
                            title="تسجيل الدخول"
                            bgcolor={COLORS.primary}
                            activeOpacity={0.7}
                            onPress={() => { this.SIGN_IN() }} />
                        <Text style={{ alignSelf: 'center', padding: 15 }}>او عن طريق </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '98%', paddingVertical: PADDING.xsPadding }}>
                            <TouchableOpacity style={styles.socialButton}>
                                <Text style={{color:COLORS.black}}>فيسبوك</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Text style={{color:COLORS.black}}>انستجرام</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: height * 0.19 }}>
                        <Text>ليس لديك حساب ؟ </Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={{ textDecorationLine: 'underline' }}>انشاء حساب</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    textInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * 0.8,
        height: height * 0.06,
        borderBottomWidth: 0.7,
        borderBottomColor: COLORS.gray,
        color: COLORS.black,
        alignSelf: 'center'
    },
    socialButton: {
        borderWidth: 1,
        borderColor: '#bbb',
        width: width * 0.37,
        paddingVertical: PADDING.smPadding,
        alignItems: 'center',
        borderRadius: RADIUS.xsRadius,
        borderColor:COLORS.black
    }
})
*/}
import * as React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
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
export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            secured_pass: true,
            user_email: '',
            user_password: '',
            error_email: '',
            error_password: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity style={styles.iconStyle}>
                        <AntDesign name="arrowright" color={'#aaa'} size={ICONS.xlIcon} />
                    </TouchableOpacity>
                    <View style={styles.ViewTitle}>
                        <Text style={styles.titleStyle}>تسجيل الدخول</Text>
                    </View>
                    <View >
                        <Input
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="البريد الالكتروني"
                        />
                    </View>


                    <View style={styles.textInputViewStyle}>
                        <Input
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="كلمة المرور"
                        />
                    </View>
                    <Text>{this.state.error_password}</Text>
                    <View style={styles.forgetPassMsg}>
                        <Text style={styles.forgetPassTxt}>هل نسيت كلمةالمرور؟</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonViewStyle}>
                        <GeneralButton title="تسجيل الدخول" bgcolor={COLORS.primary} />
                    </TouchableOpacity>

                    <Text style={{ alignSelf: 'center',paddingVertical:'3%',color:'#aaa' }}>او عن طريق</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '98%', paddingVertical: PADDING.xsPadding }}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={{ color: COLORS.black }}>فيسبوك</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={{ color: COLORS.black }}>انستجرام</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: RFValue(230) }}>
                        <Text>ليس لديك حساب ؟ </Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={{ textDecorationLine: 'underline' }}>انشاء حساب</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View >
        )
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
    textInputViewStyle: {
        marginTop: RFValue(MARGIN.smMargin),
    },
    buttonViewStyle: {
        alignSelf: 'center',
    },
    forgetPassMsg: {
        alignSelf: 'flex-end'
    },
    forgetPassTxt: {
        color: COLORS.primary,
        textDecorationLine: 'underline',
        marginBottom: RFValue(MARGIN.xsMargin),
    },
    socialButton: {
        borderWidth: 1,
        borderColor: COLORS.black,
        width: '40%',
        height: RFValue(40),
        borderRadius: RFValue(RADIUS.xsRadius),
        alignItems: 'center',
        justifyContent: 'center'
    },


})