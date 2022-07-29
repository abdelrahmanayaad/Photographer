import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { COLORS, PADDING, RADIUS } from '../../constants';
import Input from '../../components/Input';
import GeneralButton from '../../components/GeneralButton';
import { RFValue } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
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
                        <AntDesign name='arrowright' size={15} />
                    </TouchableOpacity>
                    <Text style={{ marginTop: 30, fontSize: 30, fontWeight: 'bold' }}>تسجيل الدخول</Text>
                    <View style={{ marginTop: 50 }}>
                        <Input
                            placeholder="البريد الالكترونى"
                            value={this.state.user_email}
                            onChangeText={(value) => { this.setState({ user_email: value }) }} />
                        <Text style={{ alignSelf: 'center', color: COLORS.error }}>{this.state.error_email}</Text>
                        <View style={styles.textInput}>
                            <TextInput placeholder="كلمة المرور" secureTextEntry={this.state.secured_pass} maxLength={10} />
                            <TouchableOpacity onPress={() => { this.secured_pass() }}>
                                <Entypo name={this.state.secured_pass ? 'eye-with-line' : 'eye'} size={15} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ alignSelf: 'center', color: COLORS.error }}>{this.state.error_password}</Text>
                        <TouchableOpacity style={{ marginBottom: width * 0.07, alignSelf: 'flex-end', marginRight: 15 }} >
                            <Text style={{ textDecorationLine: 'underline' }}>نسيت كلمة المرور!</Text>
                        </TouchableOpacity>
                        <GeneralButton
                            style={{ alignSelf: 'center' }}
                            title="تسجيل الدخول"
                            bgcolor={COLORS.primary}
                            activeOpacity={0.7}
                            onPress={() => { this.SIGN_IN() }} />
                        <Text style={{ alignSelf: 'center', padding: PADDING.smPadding }}>او عن طريق </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingVertical: PADDING.xsPadding }}>
                            <TouchableOpacity style={styles.socialButton}>
                                <Text>فيسبوك</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Text>انستجرام</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: height * 0.28 }}>
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
        borderRadius: RADIUS.xsRadius
    },
    doneButton: {
        width: '100%',
        height: 50,
        backgroundColor: "#bbb",
        marginTop: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    }
})