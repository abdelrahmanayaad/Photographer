import React, { Component } from 'react';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { COLORS, ICONS, RADIUS, FONTS } from '../../constants';
import { TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFValue } from 'react-native-responsive-fontsize';

GoogleSignin.configure({

    webClientId: '376994443715-4o773Pi7p1beft2e7b08j5661g2oqp.apps.googleuserconent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER

})
function LoginWithG() {


    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };
    return (
        // <GoogleSigninButton
        //     style={{ width: 192, height: 48}}
        //     size={GoogleSigninButton.Size.Wide}
        //     // color='#FF7A7A'
        //     onPress={this.signIn}
        //     // disabled={this.state.isSigninInProgress}
        // />
        <TouchableOpacity style={styles.container} onPress={signIn}>
            <Text style={styles.titleStyle}>تسجيل الدخول بإستخدام</Text>
            <AntDesign name='google' color="#fff" size={RFValue(ICONS.xlIcon)} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: RFValue(200),
        height: RFValue(48),
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        borderRadius: RFValue(RADIUS.xsRadius),
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    titleStyle: {
        color: COLORS.white,
        fontSize: RFValue(FONTS.h5),
        fontWeight: 'bold',
    },
})
export default LoginWithG;