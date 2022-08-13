import React, { useState, useEffect } from 'react';
import { Dimensions, Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, PermissionsAndroid, YellowBox, StatusBar, Linking, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    PADDING,
    IconsView,
    COLORS,
    MARGIN,
    ICONS,
    FONTS,
    RADIUS,

} from '../constants';
import { GeneralButton, Input } from '../components';
import * as ImagePicker from 'react-native-image-picker';
import ActionSheet from 'react-native-actionsheet';
const { width, height } = Dimensions.get('window');
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';


function PhotographerSettingScreen() {
    const [photo_uri, setphoto_uri] = useState("")
    const [photo_data, setphoto_data] = useState("")
    const [email, setemail] = useState("Esraa@gmail.com")
    const [name, setname] = useState("Esraa Elgiz")
    const [phone, setphone] = useState("01084773226")
    const [addresses, setaddresses] = useState("طنطا شارع المتحف")
    const [services, setservices] = useState("تصوير زفاف")
    const [name_error, setname_error] = useState("")
    const [phon_error, setphon_error] = useState("")
    const [address_error, setaddress_error] = useState("")
    const [services_error, setservices_error] = useState("")
    const [emailErr, setemailErr] = useState("")
    const [ShowComment, setShowComment] = useState(false);
    const [animateModal, setAnimateModal] = useState(false)
    const [arr, setArr] = useState([
        { name: "التقاط صوره", }
        ,
        { name: " اختيار صوره" }
        ,
        { name: "حذف صوره" },
        { name: "الغاء" }
    ]);

    const options = [
        <Text onPress={selectFromGallery}>اختيار صوره</Text>,
        <Text onPress={launchCamera}>التقاط صوره</Text>
    ]

    /*componentDidMount=()=> {
        this.requestCameraPermission();
        YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
    }*/
    useEffect(() => {
        requestCameraPermission();
        YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
    }, []);




    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message: "Cool Photo App needs access to your camera " + "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const selectFromGallery = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary({ options, includeBase64: true }, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {

                setphoto_data(photo_data => res.assets[0])
                setphoto_uri(photo_uri => res.assets[0].uri)
            }
        });
    }
    const launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (res) => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {

                setphoto_data(photo_data => res.assets[0])
                setphoto_uri(photo_uri => res.assets[0].uri)
            }
        });
    }
    const validateEmail = (email) => {
        var em =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return em.test(email);
    }
    const email_error = () => {
        let Email = email.trim();
        if (Email == '') {

            setemailErr(emailErr => 'يرجى ادخال البريد الالكتروني')

        } else if (validateEmail(Email) == false) {
            setemailErr(emailErr => 'تأكد من كتابة البريد الالكترونى بشكل صحيح')

        } else if (Email.length > 70) {

            setemailErr(emailErr => 'البريد الالكترونى يجب ألا يزيد عن 70 حرف ورقم')
        } else {
            setemailErr(emailErr => '')
        }
    }

    const savechangespress = () => {
        if (name == "") {
            setname_error(name_error => "يجب ادخال الاسم")
        } else {
            setname_error(name_error => "")

        }
        if (phone == "") {
            setphon_error(phon_error => "يجب ادخال رقم الهاتف")
        } else {
            setphon_error(phon_error => "")


        }
        if (services == "") {
            setservices_error(services_error => "يجب ادخال الخدمات")
        } else {
            setservices_error(services_error => "")

        }
        if (addresses == "") {
            setaddress_error(address_error => "يجب ادخال العناوين")
        } else {
            setaddress_error(address_error => "")


        }
    }
    const changebuttompress = () => {
        //email_error();
        savechangespress();

    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'} backgroundColor={COLORS.primary} />
            <ScrollView>
                <View style={styles.headerView}>
                    <TouchableOpacity >
                        <AntDesign
                            name="arrowright"
                            color={COLORS.gray}
                            size={RFValue(ICONS.xlIcon)}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTxt}>تعديل الملف الشخصى</Text>
                    </View>
                    <View></View>
                </View>
                <View style={styles.photoContainer}>
                    <View style={styles.photo}>
                        {photo_uri == '' ?
                            (<Entypo name='user' size={RFValue(50)} color='#4b4b4b' />) :
                            (<Image
                                source={{ uri: photo_uri }}
                                style={styles.selectedPhoto}
                                resizeMode='contain'
                            />)}
                    </View>

                    <TouchableOpacity
                        style={styles.editView}
                        onPress={() => setShowComment(ShowComment => true)}>
                        <Entypo name='edit' size={RFValue(ICONS.smIcon)} color='#fff' style={styles.editIcon} />

                        <SwipeUpDownModal
                            modalVisible={ShowComment}
                            //PressToanimate={animateModal}
                            ContentModal={
                                <View style={styles.containerContent}>

                                    <FlatList
                                        data={arr}
                                        renderItem={({ item, index }) => (
                                            <>

                                                <TouchableOpacity
                                                    style={styles.buttonmodal}
                                                    onPress={() => {
                                                        if (index == 0) {
                                                            launchCamera(), setShowComment(false)
                                                        } else if (index == 1) {
                                                            selectFromGallery(), setShowComment(false)
                                                        } else if (index == 2) {
                                                            setphoto_uri(photo_uri => "", setShowComment(false))
                                                        } else if (index == 3) {
                                                            setShowComment(false)
                                                        }

                                                    }}>
                                                    <Text style={styles.fontModal}>{item.name}</Text>

                                                    <AntDesign
                                                        name="arrowleft"
                                                        color={COLORS.gray}
                                                        size={RFValue(ICONS.lIcon)}
                                                    />

                                                </TouchableOpacity>
                                            </>
                                        )}

                                    />
                                </View>
                            }
                            ContentModalStyle={styles.Modal}



                            onClose={() => {
                                //setAnimateModal(true),
                                setShowComment(ShowComment => false)
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: RFValue(MARGIN.mdMargin) }}>
                    <Input
                        placeholder="البريد الالكتروني"
                        keyboardType='email-address'
                        value={email}
                        onChangeText={value => setemail(email => value)}
                        onBlur={email_error}
                    />
                    <Text style={styles.error_text_style}>{emailErr}</Text>
                </View>
                <View>
                    <Input
                        placeholder="الاسم"
                        value={name}
                        onChangeText={value => setname(name => value)}
                    />
                    <Text style={styles.error_text_style}>{name_error}</Text>

                </View>
                <View >
                    <Input
                        placeholder="رقم الهاتف"
                        keyboardType='phone-pad'
                        value={phone}
                        maxLength={11}
                        onChangeText={value => setphone(phone => value)}
                    />
                    <Text style={styles.error_text_style}>{phon_error}</Text>

                </View>
                <View >
                    <Input
                        placeholder="العناوين"
                        value={addresses}
                        onChangeText={value => setaddresses(addresses => value)}
                    />
                    <Text style={styles.error_text_style}>{address_error}</Text>

                </View>
                {/*<View>
                    <Text onPress={()=>{ Linking.openURL('https://www.google.com/maps/place/%D8%AF%D9%87%D8%A8%D8%8C+%D8%B3%D8%A7%D9%86%D8%AA+%D9%83%D8%A7%D8%AA%D8%B1%D9%8A%D9%86%D8%8C+%D8%AC%D9%86%D9%88%D8%A8+%D8%B3%D9%8A%D9%86%D8%A7%D8%A1%E2%80%AD/@28.4956735,34.5354459,13z/data=!3m1!4b1!4m5!3m4!1s0x15ab4b29bfad585f:0xac65238d793319bf!8m2!3d28.5091355!4d34.5136344');}}>
                         تحديد المكان علي الخريطه
                    </Text>
                        </View>*/}
                <View >
                    <Input
                        placeholder="الخدمات"
                        value={services}
                        onChangeText={value => setservices(services => value)}
                    />
                    <Text style={styles.error_text_style}>{services_error}</Text>

                </View>

                <View style={styles.buttonView}>
                    <GeneralButton
                        onPress={changebuttompress}
                        title="حفظ التغييرات"
                        bgcolor={COLORS.primary}
                        activeOpacity={0.7} />
                </View>

            </ScrollView>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        padding: RFValue(PADDING.xsPadding),
    },
    headerView: {
        width: '96%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTxt: {
        color: COLORS.black,
        fontSize: RFValue(FONTS.h4)
    },
    photoContainer: {
        width: RFValue(100),
        alignSelf: 'center',
    },
    photo: {
        backgroundColor: '#cccccc',
        marginTop: RFValue(MARGIN.xlMargin),
        alignSelf: 'center',
        borderWidth: RFValue(1),
        borderColor: COLORS.gray,
        height: RFValue(100),
        width: RFValue(100),
        borderRadius: RFValue(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedPhoto: {
        height: RFValue(100),
        width: RFValue(100),
        borderRadius: RFValue(50)
    },
    editView: {
        padding: RFValue(5),
        backgroundColor: COLORS.primary,
        position: 'absolute',
        bottom: RFValue(7),
        borderRadius: RFValue(RADIUS.smRadius)
    },
    editIcon: {
        position: 'relative',
        zIndex: -1
    },
    buttonView: {
        alignItems: 'center',
        marginVertical: RFValue(MARGIN.lgMargin)
    }, error_text_style: {
        color: COLORS.error
    }, fontModal: {
        fontSize: RFValue(FONTS.h5),
        alignSelf: "center",
        color: COLORS.black,
    }, containerContent: {
        height: RFValue(height),
        marginTop: RFValue(30),



    }, buttonmodal: {
        height: RFValue(40),
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        width: '80%',
        padding: RFValue(PADDING.xsPadding),
        borderWidth: RFValue(1),
        borderRadius: RFValue(12),
        borderColor: COLORS.gray,
        marginBottom: RFValue(MARGIN.xsMargin),
    },
    Modal: {
        backgroundColor: COLORS.background,
        height: RFValue(height / 2.5),
        borderTopLeftRadius: RFValue(30),
        borderTopRightRadius: RFValue(30),
        padding: RFValue(PADDING.xsPadding)

    }

})

export default PhotographerSettingScreen;
