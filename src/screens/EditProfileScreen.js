import { Text, View, TouchableOpacity, PermissionsAndroid, Image, YellowBox, ScrollView, StyleSheet } from 'react-native';
import React, { Component } from 'react';
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

export class EditprofileScreen extends Component {
  constructor() {
    super();
    this.state = {
      photo_uri: '',
      name: 'Marwa Elsodany',
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
  render() {
    return (
      <View style={{ padding: '4%' }}>
        <ScrollView>
          <View style={styles.headerView}>
            <TouchableOpacity >
              <AntDesign
                name="arrowright"
                color={COLORS.gray}
                size={RFValue(ICONS.xlIcon)}
              />
            </TouchableOpacity>
            <Text style={styles.headerTxt}>تعديل الملف الشخصى</Text>
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
          <View style={{marginVertical:RFValue(20)}}>
            <Input
              placeholder="الاسم"
              value={this.state.name}
              onChangeText={(value) => { this.setState({ name: value }) }}
            />
          </View>
          <View style={styles.buttonView}>
            <GeneralButton
              title="حفظ التغييرات"
              bgcolor={COLORS.primary}
              activeOpacity={0.7} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerView: { 
    width: '96%', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  headerTxt:{
    color:COLORS.gray, 
    fontSize:RFValue(FONTS.h4) 
  },
  photoContainer:{ 
    width: RFValue(100), 
    alignSelf: 'center' 
  },
  photo:{ 
    backgroundColor: '#cccccc', 
    marginTop: RFValue(MARGIN.xlMargin), 
    alignSelf: 'center', 
    borderWidth: 1, 
    borderColor: COLORS.gray, 
    height: RFValue(100), 
    width: RFValue(100), 
    borderRadius: RFValue(50), 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  selectedPhoto:{ 
    height: RFValue(100), 
    width: RFValue(100), 
    borderRadius: RFValue(50) 
  },
  editView:{ 
    padding: 5, 
    backgroundColor: COLORS.primary, 
    position: 'absolute', 
    bottom: RFValue(7), 
    borderRadius: RFValue(RADIUS.smRadius) 
  },
  editIcon:{ 
    position: 'relative', 
    zIndex: -1 
  },
  inputView:{ 
    marginTop: RFValue(MARGIN.smMargin) 
  },
  buttonView:{ 
    alignItems: 'center', 
    marginVertical: RFValue(MARGIN.lgMargin) 
  }
})

export default EditprofileScreen;
