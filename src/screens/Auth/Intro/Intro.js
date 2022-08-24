import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, StatusBar, ScrollView, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import AppIntroSlider from 'react-native-app-intro-slider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS, ICONS, FONTS, PADDING, } from '../../../constants';
const { width, height } = Dimensions.get('window');


function Intro({ navigation }) {
    const [screens, setscreens] = useState(
        [{
            id: 1,
            image: require('../../../assets/Images/moment-r.png'),
            text: "اهلا ومرحبا بك"
        }, {
            id: 2,
            image: require('../../../assets/Images/inttro1-r.png'),
            text: 'لدينا العديد من المصورين'

        }, {
            id: 3,
            image: require('../../../assets/Images/pse-r.png'),
            text: 'يمكنك اختيار مصورك المفضل'

        },])
    const renderIntro = ({ item }) => {
        return (
            <View style={styles.each_screen_container_style}>

                <StatusBar
                    barStyle={'light-content'} backgroundColor={COLORS.primary}
                />
                <View style={styles.each_img_style}>
                    <Image source={item.image} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                </View>
                <View style={styles.view_for_text_under_img_style}>
                    <Text style={styles.text_under_each_img_style}>{item.text}</Text>
                </View>
            </View>

        )
    }
    const rendernextbuttom = () => {
        return (
            <View style={styles.botton_style}>
                <Text style={styles.text_style}>التالي</Text>
            </View>
        )
    }
    const renderdone = () => {
        return (
            <View style={styles.botton_style}
                onPress={() =>
                    //this.set_intro(1),
                    navigation.navigate('Login')
                }
            >
                <Text style={styles.text_style}>تم</Text>
            </View>
        )
    }
    return (
        <AppIntroSlider renderItem={renderIntro}
            data={screens}
            activeDotStyle={styles.slider_active_dot_style}
            renderNextButton={rendernextbuttom}
            renderDoneButton={renderdone}

        />

    )

}


const styles = StyleSheet.create({
    each_screen_container_style: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',

    }, each_img_style: {
        height: '50%',
        width: '95%',
        marginBottom: RFValue(20)
    }, text_under_each_img_style: {
        color: COLORS.primary,
        fontSize: RFValue(FONTS.h3)
    }, slider_active_dot_style: {
        backgroundColor: COLORS.primary,
        width: RFValue(25)
    }, botton_style: {
        //marginTop: RFValue(10),
        padding: RFValue(1),
        backgroundColor: COLORS.primary,
        borderRadius: RFValue(15),
        width: RFValue(70),
        height: RFValue(40),
        alignItems: 'center',
        justifyContent: 'center',

    },
    text_style: {
        color: COLORS.background,
        fontSize: RFValue(20)
    }, view_for_text_under_img_style: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Intro;