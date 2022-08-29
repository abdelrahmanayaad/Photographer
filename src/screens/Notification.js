import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    ScrollView,
    Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import AppIntroSlider from 'react-native-app-intro-slider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS, ICONS, FONTS, PADDING } from '../constants';
const { width, height } = Dimensions.get('window');

function Notification({ navigation }) {

    return (
        <View style={styles.container_style}>
            <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />

            <View style={styles.headerView_notification}>
                <View style={{ width: RFValue(35) }}></View>

                <View >
                    <Text style={styles.headerTxt}>الاشعارات</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <AntDesign
                        name="arrowleft"
                        color={COLORS.gray}
                        size={RFValue(ICONS.xlIcon)}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: '95%' }}>
                <Text style={{ color: COLORS.black, fontSize: RFValue(FONTS.h4) }}>لا توجد اشعارات</Text>

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container_style: {
        padding: RFValue(PADDING.xsPadding),
        height: '100%',
        width: "100%",
    }, headerView_notification: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }, headerTxt: {
        color: COLORS.black,
        fontSize: RFValue(FONTS.h4)
    },

});
export default Notification;
