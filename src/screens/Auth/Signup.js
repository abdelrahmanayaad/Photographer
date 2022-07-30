import React, { Component } from 'react';
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
} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
export class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameerorr: "",
            Email: "",
            Emailerorr: "",
            phone: "",
            phoneerorr: "",
            password: "",
            passworderorr: "",
            passwordconfirm: "",
            passwordconfirmerorr: "",


        }
    }

    validateEmail = email => {
        let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            return false;
        } else {
            return true;
        }
    };
    signup() {
        let error = 0
        //name

        if (this.state.name.trim() == "") {
            error++
            this.setState({ nameerorr: "لايجب ان يكون هذا الحقل فارغ" })
        }
        else if ((this.state.name.trim()).length < 3) {
            error++
            this.setState({ nameerorr: "ادخل اكثر من 3 احرف" })
        }
        else {
            this.setState({ nameerorr: "" })
        }

        //email
        if (this.state.Email == "") {
            error++
            this.setState({ Emailerorr: "لايجب ان يكون هذا الحقل فارغ" })
        }
        else if (!this.validateEmail(this.state.Email)) {
            error++
            this.setState({ Emailerorr: "أدخل بريد إليكتروني صالح " })
        }
        else {
            this.setState({ Emailerorr: "" })
        }


        //phone
        if (this.state.phone == "") {
            error++
            this.setState({ phoneerorr: "لايجب ان يكون هذا الحقل فارغ" })
        }
        else if (this.state.phone.length != 11 ||
            (
                !this.state.phone.startsWith("015") &&
                !this.state.phone.startsWith("011") &&
                !this.state.phone.startsWith("012") &&
                !this.state.phone.startsWith("010")

            ) ||
            this.state.phone * 0 != 0
        ) {
            error++
            this.setState({ phoneerorr: "أدخل رقم هاتف صالح" })
        }
        else {
            this.setState({ phoneerorr: "" })
        }

        //password
        if (this.state.password.trim() == "") {
            error++
            this.setState({ passworderorr: "لايجب ان يكون هذا الحقل فارغ" })
        }
        else if ((this.state.password.trim()).length < 6) {
            error++
            this.setState({ passworderorr: "ادخل اكثر من 6 احرف" })
        }
        else {
            this.setState({ passworderorr: "" })
        }
        //passwordconfirm
        if (this.state.passwordconfirm.trim() == "") {
            error++
            this.setState({ passwordconfirmerorr: "لايجب ان يكون هذا الحقل فارغ" })
        }
        if (this.state.passwordconfirm != this.state.password) {
            error++
            this.setState({ passwordconfirmerorr: "كلمة المرور غير متطابقة" })
        }
        else if ((this.state.passwordconfirm.trim()).length < 6) {
            error++
            this.setState({ passwordconfirmerorr: "ادخل اكثر من 6 احرف" })
        }
        else {
            this.setState({ passwordconfirmerorr: "كلمة المرور متطابقة" })
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
                        <Text style={styles.titleStyle}>انشاء حساب</Text>
                    </View>
                    <View style={styles.textInputViewStyle}>
                        <Input
                            autoCapitalize="none"
                            keyboardType="default"
                            placeholder="الاسم"
                            value={this.state.name}
                            onChangeText={(value) => { this.setState({ name: value }) }}
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
                            onChangeText={(value) => { this.setState({ Email: value }) }}

                        />
                        <View style={styles.ErrorView}>
                            <Text style={styles.ErrorText}>{this.state.Emailerorr}</Text>
                        </View>

                    </View>
                    <View style={styles.textInputViewStyle}>
                        <Input
                            maxLength={8}
                            autoCapitalize="none"
                            keyboardType="default"
                            placeholder="كلمة المرور"
                            value={this.state.password}
                            onChangeText={(value) => { this.setState({ password: value }) }}
                        />

                        <View style={styles.ErrorView}>
                            <Text style={styles.ErrorText}>{this.state.passworderorr}</Text>
                        </View>

                    </View>
                    <View style={styles.textInputViewStyle}>
                        <Input
                            maxLength={8}
                            autoCapitalize="none"
                            keyboardType="default"
                            placeholder="تأكيد كلمة المرور"
                            value={this.state.passwordconfirm}
                            onChangeText={(value) => { this.setState({ passwordconfirm: value }) }}
                        />
                        <View style={styles.ErrorView}>
                            <Text style={styles.ErrorText}>{this.state.passwordconfirmerorr}</Text>
                        </View>

                    </View>
                    <View style={styles.textInputViewStyle}>
                        <Input
                            autoCapitalize="none"
                            keyboardType="number-pad"
                            placeholder="رقم الهاتف"
                            value={this.state.phone}
                            onChangeText={(value) => { this.setState({ phone: value }) }}

                        />
                        <View style={styles.ErrorView}>
                            <Text style={styles.ErrorText}>{this.state.phoneerorr}</Text>
                        </View>

                    </View>

                    <View style={styles.buttonViewStyle}>
                        <GeneralButton onPress={() => { this.signup() }}
                            title="انشاء حساب" bgcolor={COLORS.primary} />
                    </View>
                    <View style={styles.ViewTitle1}>
                        <Text style={styles.messageTitleStyle}>
                            هل لديك حساب؟
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.messageTitleStyle1}>
                                تسجيل دخول
                            </Text>
                        </TouchableOpacity>
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
        marginBottom: RFValue(MARGIN.smMargin),
    },
    titleStyle: {
        fontSize: RFValue(FONTS.h2),
        color: COLORS.black,
        fontWeight: 'bold',
    },
    ViewTitle: {
        marginBottom: RFValue(MARGIN.xsMargin),
    },
    ViewTitle1: {
        marginBottom: RFValue(MARGIN.xsMargin),
        flexDirection: "row",
        justifyContent: "center",
        marginTop: RFValue(MARGIN.mdMargin),

    },
    messageTitleStyle: {
        fontSize: RFValue(FONTS.h6),
        color: COLORS.gray,
        marginTop: RFValue(MARGIN.xsMargin),
    },
    messageTitleStyle1: {
        fontSize: RFValue(FONTS.h6),
        color: COLORS.black,
        marginTop: RFValue(MARGIN.xsMargin),

    },
    textInputViewStyle: {
        marginBottom: RFValue(MARGIN.xsMargin),
    },
    ErrorView: {
        alignItems: 'flex-start',
        alignSelf: "flex-start",
        justifyContent: 'flex-end'
    },
    ErrorText: {
        fontSize: RFValue(FONTS.h5),
        color: COLORS.error,

    },
    buttonViewStyle: {
        alignSelf: 'center',
        marginTop: RFValue(MARGIN.mdMargin),
    },

});
export default Signup;