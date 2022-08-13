import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFValue } from 'react-native-responsive-fontsize';
import AppIntroSlider from 'react-native-app-intro-slider';
const { width, height } = Dimensions.get("screen")

import { COLORS, ICONS, FONTS, } from '../../../constants';

function Intro() {
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
                <Image source={item.image} style={styles.each_img_style} />
                <Text style={styles.text_under_each_img_style}>{item.text}</Text>
            </View>
        )
    }
    return (
        <AppIntroSlider renderItem={renderIntro}
            data={screens}
            activeDotStyle={styles.slider_active_dot_style}
            renderNextButton={() => <View style={styles.view_for_next_style}><Text style={styles.next_button_style}>التالي</Text></View>}
            renderDoneButton={() =>
                <TouchableOpacity style={styles.arrow_botton_style}
                    onPress={() => {
                        /*this.set_intro(1),
                        this.props.navigation.navigate("StackList")*/
                    }}
                >
                    <AntDesign name="arrowleft" color={COLORS.background} size={RFValue(ICONS.xlIcon)} />
                </TouchableOpacity>}

        />

    )

}


const styles = StyleSheet.create({
    each_screen_container_style: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center'

    }, each_img_style: {
        height: RFValue(250),
        width: '95%',
        resizeMode: 'contain'
    }, text_under_each_img_style: {
        color: COLORS.primary,
        fontSize: RFValue(FONTS.h3)
    }, slider_active_dot_style: {
        backgroundColor: COLORS.primary,
        width: RFValue(25)
    }, view_for_next_style: {
        // marginTop: RFValue(15),

    }, next_button_style: {
        color: COLORS.primary,
        fontSize: RFValue(FONTS.h3)
    }, arrow_botton_style: {
        //marginTop: RFValue(12),
        backgroundColor: COLORS.primary,
        borderRadius: RFValue(20),
        width: RFValue(40),
        height: RFValue(40),
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Intro;