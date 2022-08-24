import React, { useState, useEffect } from 'react';
import { Dimensions, Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, PermissionsAndroid, YellowBox, StatusBar, FlatList, Modal, AsyncStorage } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather'
import {
    PADDING,
    COLORS,
    MARGIN,
    ICONS,
    FONTS,
    RADIUS,

} from '../constants';
import { GeneralButton, Input } from '../components';
import axios from 'axios'
import * as ImagePicker from 'react-native-image-picker';
const { width, height } = Dimensions.get('window');
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import MapView, { Marker } from 'react-native-maps';
navigator.geolocation = require('@react-native-community/geolocation');
const LATITUDE = 0
const LONGITUDE = 0
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;



function PhotographerSettingScreen() {

    const [photo_uri, setphoto_uri] = useState("")
    const [photo_data, setphoto_data] = useState("")
    const [name, setname] = useState("Esraa Elgiz")
    const [brandname, setbrandname] = useState("")
    const [brand_name_error, setbrand_name_error] = useState("")
    const [details, setdetails] = useState("")
    const [name_error, setname_error] = useState("")
    const [ShowComment, setShowComment] = useState(false);
    const [arr, setArr] = useState([
        { name: "التقاط صوره", }
        ,
        { name: " اختيار صوره" }
        ,
        { name: "حذف صوره" },
        { name: "الغاء" }
    ]);
    const [phonenumbersarr, setphonenumbersarr] = useState([]);
    const [phonenumersaddmodelvisible, setphonenumbersaddmodelvisible] = useState(false)
    const [phonemodal, setphonemodal] = useState("")
    const [phonemodaltexterror, setphonemodaltexterror] = useState("")
    const [additionaladdressesarr, setadditionaladdressesarr] = useState([
        /*{
        address_decription: "طنطا شارع المتحف",
        address_latitude: 30.794073,
        address_longitude: 31.000166,
        address_title: ""
    }*/])
    const [additional_address_modal_visible, setadditional_address_modal_visible] = useState(false)
    const [additional_address_error, setadditional_address_error] = useState("")
    const [additinal_address_value, setadditinal_address_value] = useState("")
    const [facelink, setfacelink] = useState("")
    const [whatsapplink, setwhatsapplink] = useState("")
    const [instalink, setinstalink] = useState("")
    const [phone_under_bottom_error, setphone_under_bottom_error] = useState("")
    const [address_under_bottom_error, setaddress_under_bottom_error] = useState("")
    //map
    const [mapmodalvisible, setmapmodalvisible] = useState(false)
    const [bottomMargin, setBottomMargin] = useState(RFValue(1))
    const [region, setRegion] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    })
    //
    //map functions
    async function SaveLoction(latitude, longitude) {
        await AsyncStorage.setItem("latitude", latitude + "")
        await AsyncStorage.setItem("longitude", longitude + "")
    }
    function onRegionChange() {
        let Region = region
        SaveLoction(Region.latitude, Region.longitude)
    }
    async function _findMe() {
        watchID = await navigator.geolocation.watchPosition(
            ({ coords }) => {
                const { latitude, longitude } = coords
                ///console.log(JSON.stringify(coords))

                setRegion({
                    ...region,
                    latitude,
                    longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                })
            });
        await navigator.geolocation.getCurrentPosition(
            (position) => {
                //console.log(JSON.stringify(position))
                setRegion({
                    ...region,
                    latitude: position["coords"].latitude,
                    longitude: position["coords"].longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                })
            },
            (error) => console.log(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }
    const select_location_onmap_press = () => {
        _findMe();
        setmapmodalvisible(mapmodalvisible => true);
        return () => {
            navigator.geolocation.clearWatch(watchID);

        }
    }

    ///
    const delete_address=(addressid)=>{
        let data_to_send={
            address_id:addressid
        };
        axios.post("https://generation3.000webhostapp.com/project/Training/delete_address.php",data_to_send).then((res)=>{
            if(res.status==200){
                //console.log(res.data)
                alert(res.data)
               
            }else{
                alert("حدث خطا اثناء الاتصال بالخادم من فضلك حاول مجددا")
            }
        }).catch((err)=>{
            console.log(err)
        })

    }
    const get_photographer_data=()=>{
        let data_to_send={
            user_id:"15"
        };
        axios.post("https://generation3.000webhostapp.com/project/Training/brand_details.php",data_to_send).then((res)=>{
            if(res.status==200){
                //console.log(res.data.Photogarpher_brand_phone_num)
                //console.log(res.data)
                setphoto_uri(photo_uri=>res.data.Photogarpher_brand_img)
                setphoto_data(photo_data=>res.data.Photogarpher_brand_img)
                setbrandname(brandname=>res.data.Photogarpher_brand_name)
               setdetails(details=>res.data.Photogarpher_details)
              setfacelink(facelink=>res.data.Photogarpher_face_link)
              setinstalink(instalink=>res.data.Photogarpher_insta_link)
              setwhatsapplink(whatsapplink=>res.data.Photogarpher_whats_link)
                setphonenumbersarr(phonenumbersarr=>res.data.Photogarpher_brand_phone_num)
                setadditionaladdressesarr(additionaladdressesarr=>res.data.brand_addresses)
            }else{
                alert("حدث خطا اثناء الاتصال بالخادم من فضلك حاول مجددا")
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    const send_photographer_data = () => {
        let data_to_send = {
            user_id: "15",
            brand_name: brandname,
            user_details: details,
            brand_phone_num: phonenumbersarr,
            brand_img: photo_data,
            face_link: facelink,
            insta_link: instalink,
            whats_link: whatsapplink,
            addresses: additionaladdressesarr

        };

        axios.post("https://generation3.000webhostapp.com/project/Training/insert_brand_details.php", data_to_send).then((res) => {
            if (res.status == 200) {

                // res.data => Success ==> added | Error ==> error | Empty ==> data_to_send is empty
                // console.log(res.data)
                if (res.data == "successful") {
                    //this.setState({ color: '#0f0' })

                    // alert("user added");
                    alert("done")
                } else if (res.data == 'user not found') {
                    //alert('data_to_send is empty')
                    //this.setState({ color: '#f00' })
                    alert("user not found")


                } else {
                    alert(res.data)
                    // this.setState({ color: '#f00' })

                }

            } else {
                alert("حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا")
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    const renderphonenumbers = () => {
        return phonenumbersarr.map((item, index) => {
            return (
                <View style={styles.each_additinal_phone_number_view_style}>
                    <TouchableOpacity style={{ width: '10%', padding: RFValue(1) }}
                        onPress={() => deletephonenumber(index)}>
                        <Feather name="x" size={RFValue(ICONS.lIcon)} color={COLORS.black} />
                    </TouchableOpacity>
                    <View style={{ width: '90%' }}>
                        <Text style={{ color: COLORS.black, fontSize: RFValue(FONTS.h5) }}>{item}</Text>
                    </View>

                </View>
            )
        })
    }
    const render_additional_addresses = () => {
        return additionaladdressesarr.map((item, index) => {
            return (
                <View style={styles.each_additinal_phone_number_view_style}>

                    <View style={{ width: '90%' }}>
                        <Text style={{ color: COLORS.black, fontSize: RFValue(FONTS.h5) }}>{item.address_decription}</Text>
                    </View>
                    <TouchableOpacity style={{ width: '10%', padding: RFValue(1) }}
                        onPress={() => {deleteaddress(index);delete_address(item.address_id)}}>
                        <Feather name="x" size={RFValue(ICONS.lIcon)} color={COLORS.black} />
                    </TouchableOpacity>

                </View>
            )

        })

    }


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
        get_photographer_data();
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


    const savechangespress = () => {
        if (name == "") {
            setname_error(name_error => "يجب ادخال الاسم")
        } else {
            setname_error(name_error => "")

        }
        if (brandname == "") {
            setbrand_name_error(brand_name_error => "يجب ادخال اسم العلامه التجاريه")
        } else {
            setbrand_name_error(brand_name_error => "")
        }
        if (phonenumbersarr.length == 0) {
            setphone_under_bottom_error(phone_under_bottom_error => "يجب ادخال رقم الهاتف")
        } else {
            setphone_under_bottom_error(phone_under_bottom_error => "")

        }
        if (additionaladdressesarr.length == 0) {
            setaddress_under_bottom_error(address_under_bottom_error => "يجب ادخال العنوان")
        } else {
            setaddress_under_bottom_error(address_under_bottom_error => "")

        } if (name != "" && brandname != "" && phonenumbersarr.length != 0 && additionaladdressesarr.length != 0) {

            send_photographer_data()
            //console.log(phonenumbersarr)
            // console.log(additionaladdressesarr)
        }


    }
    const changebuttompress = () => {
        savechangespress();

    }
    const addnewmobilenumberinmodal = () => {
        let newphonearr = [...phonenumbersarr]

        if (phonemodal == "") {
            setphonemodaltexterror(phonemodaltexterror => "يجب ادخال رقم الهاتف")
        } else {
            setphonemodaltexterror(phonemodaltexterror => "")
            newphonearr.push(phonemodal)
            setphonenumbersarr(phonenumbersarr => newphonearr)
            setphonenumbersaddmodelvisible(phonenumersaddmodelvisible => false)
            setphonemodal(phonemodal => "")

        }
    }
    const deletephonenumber = (index) => {
        let arr = [...phonenumbersarr]
        arr.splice(index, 1)
        setphonenumbersarr(phonenumbersarr => arr)

    }

    const confirm_add_address = () => {
        let location = { ...region }
        let additional_addresses_arr = [...additionaladdressesarr]
        let obj = {
            address_decription: additinal_address_value,
            address_latitude: region.latitude,
            address_longitude: region.longitude,
            address_title: ""
        }
        if (additinal_address_value == "") {
            setadditional_address_error(additional_address_error => "يجب ادخال تفاصيل العنوان")
        } if (location.latitude == 0 && location.longitude == 0) {
            alert("يجب تحديد العنوان علي الخريطه")
        } else if (additinal_address_value != "" && location.latitude != 0 && location.longitude != 0) {
            additional_addresses_arr.push(obj)
            setadditionaladdressesarr(additionaladdressesarr => additional_addresses_arr)
            setadditinal_address_value(additinal_address_value => "")
            setadditional_address_error(additional_address_error => "")

            setadditional_address_modal_visible(additional_address_modal_visible => false)
            setRegion({ ...region, latitude: 0, longitude: 0 })


        }

    }
    const deleteaddress = (index) => {
        let arr = [...additionaladdressesarr]
        arr.splice(index, 1)
        setadditionaladdressesarr(additionaladdressesarr => arr)
        //console.log(additionaladdressesarr)

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
                        <ScrollView>
                            <SwipeUpDownModal
                                modalVisible={ShowComment}
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
                                                                setphoto_uri(photo_uri => ""), setShowComment(false), setphoto_data(photo_data => "")
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
                                    setShowComment(ShowComment => false)
                                }}
                            />
                        </ScrollView>
                    </TouchableOpacity>
                </View>

                <View>
                    <Input
                        placeholder="الاسم"
                        value={name}
                        onChangeText={value => setname(name => value)}
                    />
                    <Text style={styles.error_text_style}>{name_error}</Text>

                </View>
                <View>
                    <Input
                        placeholder="اسم العلامه التجاريه"
                        value={brandname}
                        onChangeText={value => setbrandname(brandname => value)}
                    />
                    <Text style={styles.error_text_style}>{brand_name_error}</Text>

                </View>

                <View>
                    <Input
                        placeholder="التفاصيل"
                        value={details}
                        onChangeText={value => setdetails(details => value)}
                    />
                    <Text></Text>

                </View>

                <View>
                    <Input
                        placeholder="رابط الفيسبوك"
                        value={facelink}
                        onChangeText={value => setfacelink(facelink => value)}
                    />
                    <Text></Text>


                </View>
                <View>
                    <Input
                        placeholder="رابط الانستجرام"
                        value={instalink}
                        onChangeText={value => setinstalink(instalink => value)}
                    />
                    <Text></Text>

                </View>
                <View>
                    <Input
                        placeholder="رابط الواتس اب"
                        value={whatsapplink}
                        onChangeText={value => setwhatsapplink(whatsapplink => value)}
                    />
                    <Text></Text>


                </View>

                <View>
                    {renderphonenumbers()}
                </View>
                <View style={styles.buttonView}>
                    <GeneralButton
                        onPress={() => setphonenumbersaddmodelvisible(phonenumersaddmodelvisible => true)}
                        title="اضافه رقم هاتف "
                        bgcolor={COLORS.primary}
                        activeOpacity={0.7} />
                    <Text style={styles.error_text_style}>{phone_under_bottom_error}</Text>
                </View>

                <View>
                    {render_additional_addresses()}
                </View>
                <View style={styles.buttonView}>
                    <GeneralButton
                        onPress={() => setadditional_address_modal_visible(additional_address_modal_visible => true)}
                        title="اضافه عنوان"
                        bgcolor={COLORS.primary}
                        activeOpacity={0.7} />
                    <Text style={styles.error_text_style}>{address_under_bottom_error}</Text>
                </View>

                <View style={styles.buttonView}>
                    <GeneralButton
                        onPress={changebuttompress}
                        title="حفظ التغييرات"
                        bgcolor={COLORS.primary}
                        activeOpacity={0.7} />
                </View>

            </ScrollView>
            <Modal visible={phonenumersaddmodelvisible}>
                <View style={styles.addphonemodalcontainerstyle}>
                    <View style={[styles.headerView, { marginBottom: RFValue(60) }]}>
                        <TouchableOpacity onPress={() => setphonenumbersaddmodelvisible(phonenumersaddmodelvisible => false)}>
                            <AntDesign
                                name="arrowright"
                                color={COLORS.gray}
                                size={RFValue(ICONS.xlIcon)}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.headerTxt}>اضافه رقم هاتف</Text>
                        </View>
                        <View></View>
                    </View>
                    <View >
                        <Input
                            placeholder="رقم الهاتف"
                            keyboardType='phone-pad'
                            maxLength={11}
                            onChangeText={value => setphonemodal(phonemodal => value)}
                        />

                        <Text style={styles.error_text_style}>{phonemodaltexterror}</Text>


                    </View>
                    <View style={styles.buttonView}>
                        <GeneralButton
                            onPress={addnewmobilenumberinmodal}
                            title="اضافه"
                            bgcolor={COLORS.primary}
                            activeOpacity={0.7} />
                    </View>
                </View>

            </Modal>

            <Modal visible={mapmodalvisible} >
                <View style={styles.mapcontainer}>


                    <MapView
                        style={[styles.map, { width: width }]}
                        region={region}
                        onRegionChangeComplete={onRegionChange}
                        onMapReady={() => setBottomMargin(RFValue(0))} // this will fire once onReady
                        followsUserLocation={true}
                        showsMyLocationButton={true}
                        containerStyle={{ backgroundColor: 'white', borderColor: '#BC8B00' }}
                        onPress={(Reg) => {
                            const { latitude, longitude } = Reg.nativeEvent.coordinate
                            setRegion({
                                ...region,
                                latitude,
                                longitude,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            })


                        }}
                    >
                        <Marker
                            coordinate={region}
                            title="موقعك الحالي"
                            description=" اضغط  لاختيار المكان"
                            onPress={(Reg) => {
                                const { latitude, longitude } = Reg.nativeEvent.coordinate
                                setRegion({
                                    ...region,
                                    latitude,
                                    longitude,
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,

                                })


                            }}
                        />
                    </MapView>
                    <TouchableOpacity
                        style={styles.bottom_on_map_style}
                        onPress={() => setmapmodalvisible(mapmodalvisible => false)}
                    >
                        <AntDesign
                            name="arrowright"
                            color={COLORS.white}
                            size={RFValue(ICONS.xlIcon)}
                        />
                    </TouchableOpacity>
                    {/* <Text>{region.latitude}</Text>
                    <Text>{region.longitude}</Text>
                    <Text>{region.latitudeDelta}</Text>
                    <Text>{region.longitudeDelta}</Text>*/}
                </View>

            </Modal>
            <Modal visible={additional_address_modal_visible} >
                <View style={{ padding: RFValue(PADDING.xsPadding) }}>
                    <View style={[styles.headerView, { marginBottom: RFValue(60) }]}>
                        <TouchableOpacity
                            onPress={() => setadditional_address_modal_visible(additional_address_modal_visible => false)}

                        >
                            <AntDesign
                                name="arrowright"
                                color={COLORS.gray}
                                size={RFValue(ICONS.xlIcon)}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.headerTxt}>اضافه عنوان</Text>
                        </View>
                        <View></View>
                    </View>
                    <View >
                        <Input
                            placeholder="تفاصيل العنوان"
                            onChangeText={value => setadditinal_address_value(additinal_address_value => value)}

                        />
                        <Text style={styles.error_text_style}>{additional_address_error}</Text>

                    </View>
                    <View style={styles.buttonView}>
                        <GeneralButton
                            title="تحديد علي الخريطه"
                            onPress={select_location_onmap_press}
                            bgcolor={COLORS.primary}
                            activeOpacity={0.7} />
                    </View>
                    <View style={styles.buttonView}>
                        <GeneralButton
                            onPress={confirm_add_address}
                            title="اضافه"
                            bgcolor={COLORS.primary}
                            activeOpacity={0.7} />
                    </View>
                </View>

            </Modal>


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
        // marginBottom:RFValue(50)
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
        marginVertical: RFValue(MARGIN.xsMargin)
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

    }, addphonemodalcontainerstyle: {
        padding: RFValue(PADDING.xsPadding)

    }, each_additinal_phone_number_view_style: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        //paddingRight: RFValue(5),
        marginTop: RFValue(MARGIN.xsMargin),
        //height: RFValue(50),
        paddingVertical: RFValue(10),
        borderBottomWidth: RFValue(0.7),
        borderBottomColor: COLORS.gray,
        color: COLORS.black,
        fontSize: RFValue(FONTS.h5),

    }, mapcontainer: {
        flex: 1,
        padding: RFValue(PADDING.xsPadding),
        //marginTop:RFValue(20)
    },
    map: {

        ...StyleSheet.absoluteFillObject,

    }, bottom_on_map_style: {
        backgroundColor: COLORS.gray,
        width: RFValue(50),
        height: RFValue(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RFValue(20)

    },///DROP DOWN STYLE
    dropdowncontainer: {
        width: '100%',
        //padding:RFValue(16)
        paddingVertical: RFValue(16)
    }, dropdown: {
        height: RFValue(50),
        borderColor: COLORS.gray,
        borderWidth: RFValue(1),
        borderRadius: RFValue(8),
        paddingHorizontal: RFValue(8),
    }, placeholderStyle: {
        fontSize: RFValue(16),
    },
    selectedTextStyle: {
        fontSize: RFValue(16),
    },
    inputSearchStyle: {
        height: RFValue(40),
        fontSize: RFValue(16),
    },
    //////

})

export default PhotographerSettingScreen;
