import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, PermissionsAndroid, YellowBox, StatusBar } from 'react-native';
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

const options = [
    <Text onPress={() => { this.selectFromGallery() }}>اختيار صوره</Text>,
    <Text onPress={() => { this.launchCamera() }}>التقاط صوره</Text>
]

export class PhotographerSettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo_uri: '',
            email: 'Esraa@gmail.com',
            name: 'Esraa Elgiz',
            phone: '01084773226',
            addresses: "طنطا شارع المتحف",
            services: "تصوير زفاف ",
            name_error: "",
            phon_error: "",
            address_error: "",
            services_error: ""

        }
    }
    componentDidMount() {
        this.requestCameraPermission();
        YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
    }
    requestCameraPermission = async () => {
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
    selectFromGallery = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
                emailErr: '',
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

                this.setState({
                    photo_data: res.assets[0],
                    photo_uri: res.assets[0].uri,
                });
            }
        });
    }
    launchCamera = () => {
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
                this.setState({
                    photo_data: res.assets[0],
                    photo_uri: res.assets[0].uri
                });
            }
        });
    }
    validateEmail(email) {
        var em =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return em.test(email);
    }
    email_error() {
        let email = this.state.email.trim();
        if (email == '') {
            this.setState({ emailErr: 'يرجى ادخال البريد الالكتروني' });
        } else if (this.validateEmail(email) == false) {
            this.setState({ emailErr: 'تأكد من كتابة البريد الالكترونى بشكل صحيح' });
        } else if (email.length > 70) {
            this.setState({ emailErr: 'البريد الالكترونى يجب ألا يزيد عن 70 حرف ورقم' });
        } else {
            this.setState({ emailErr: '' });
        }
    }

    savechangespress() {
        if (this.state.name == "") {
            this.setState({ name_error: "يجب ادخال الاسم" })
        } else {
            this.setState({ name_error: "" })

        }
        if (this.state.phone == "") {
            this.setState({ phon_error: "يجب ادخال رقم الهاتف" })
        } else {
            this.setState({ phon_error: "" })

        }
        if (this.state.services == "") {
            this.setState({ services_error: "يجب ادخال الخدمات" })
        } else {
            this.setState({ services_error: "" })

        }
        if (this.state.addresses == "") {
            this.setState({ address_error: "يجب ادخال العناوين" })
        } else {
            this.setState({ address_error: "" })

        }
    }
    

    render() {
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
                            {this.state.photo_uri == '' ?
                                (<Entypo name='user' size={RFValue(50)} color='#4b4b4b' />) :
                                (<Image
                                    source={{ uri: this.state.photo_uri }}
                                    style={styles.selectedPhoto}
                                    resizeMode='contain'
                                />)}
                        </View>
                        <TouchableOpacity
                            style={styles.editView}
                            onPress={() => { this.ActionSheet.show() }}>
                            <Entypo name='edit' size={RFValue(ICONS.smIcon)} color='#fff' style={styles.editIcon} />
                            <ActionSheet
                                ref={o => this.ActionSheet = o}
                                options={['التقاط صوره', 'اختيار صوره', 'حذف الصوره', 'الغاء']}
                                cancelButtonIndex={3}
                                destructiveButtonIndex={3}
                                onPress={(index) => {
                                    if (index == 0) { this.launchCamera() }
                                    else if (index == 1) { this.selectFromGallery() }
                                    else if (index == 2) { this.setState({ photo_uri: '' }) }
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: RFValue(MARGIN.mdMargin)}}>
                        <Input
                            placeholder="البريد الالكتروني"
                            keyboardType='email-address'
                            value={this.state.email}
                            onChangeText={(value) => { this.setState({ email: value }) }}
                        //onBlur={() => { this.email_error() }}
                        />
                        <Text style={styles.error_text_style}>{this.state.emailErr}</Text>
                    </View>
                    <View>
                        <Input
                            placeholder="الاسم"
                            value={this.state.name}
                            onChangeText={(value) => { this.setState({ name: value }) }}
                        />
                        <Text style={styles.error_text_style}>{this.state.name_error}</Text>

                    </View>
                    <View >
                        <Input
                            placeholder="رقم الهاتف"
                            keyboardType='phone-pad'
                            value={this.state.phone}
                            maxLength={11}
                            onChangeText={(value) => { this.setState({ phone: value }) }}
                        />
                        <Text style={styles.error_text_style}>{this.state.phon_error}</Text>

                    </View>
                    <View >
                        <Input
                            placeholder="العناوين"
                            value={this.state.addresses}
                            onChangeText={(value) => { this.setState({ addresses: value }) }}
                        />
                        <Text style={styles.error_text_style}>{this.state.address_error}</Text>

                    </View>
                    <View >
                        <Input
                            placeholder="الخدمات"
                            value={this.state.services}
                            onChangeText={(value) => { this.setState({ services: value }) }}
                        />
                        <Text style={styles.error_text_style}>{this.state.services_error}</Text>

                    </View>

                    <View style={styles.buttonView}>
                        <GeneralButton
                            onPress={() => { this.email_error(), this.savechangespress() }}
                            title="حفظ التغييرات"
                            bgcolor={COLORS.primary}
                            activeOpacity={0.7} />
                    </View>

                </ScrollView>
            </View>
        )
    }
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
        borderWidth:RFValue(1) ,
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
    }

})

export default PhotographerSettingScreen;
