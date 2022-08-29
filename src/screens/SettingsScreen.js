import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  PADDING,
  IconsView,
  COLORS,
  MARGIN,
  ICONS,
  FONTS,
  RADIUS,
} from '../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Navigation from '../navigation/Navigation';
const {width, height} = Dimensions.get('window');
export default function SettingsScreen({navigation}) {
  const [settings, setSettings] = useState([
    {
      name: 'تعديل الملف الشخصى',
      icon_name: 'arrowleft',
    },
    {
      name: 'تغيير كلمه المرور',
      icon_name: 'arrowleft',
    },
    {
      name: 'الاشعارات',
      icon_name: 'arrowleft',
    },
    {
      name: 'تسجيل الخروج',
      icon_name: 'logout',
    },
  ]);
  const choosenIndex =(index)=>{
    if(index==0){
      navigation.navigate('EditprofileScreen')
    }else if(index==1){
      navigation.navigate('ChangePassword')
    }else if(index==2){
      navigation.navigate('Notification')
    }
  }

  function renderserring() {
    return settings.map((item, index) => {
      return (
        <View style={styles.each_view_in_map_style}>
          <TouchableOpacity style={styles.each_button_style} onPress={()=>choosenIndex(index)}>
            <Text style={styles.each_text_style}>{item.name}</Text>
            <View>
              {index == 6 ? (
                <SimpleLineIcons
                  name={item.icon_name}
                  size={RFValue(ICONS.lIcon)}
                  color={COLORS.gray}
                />
              ) : (
                <AntDesign
                  name={item.icon_name}
                  size={RFValue(ICONS.lIcon)}
                  color={COLORS.gray}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />

      <View style={styles.headerView}>
        <View style={{width:RFValue(15)}}></View>
        <View>
          <Text style={styles.headerTxt}>الاعدادات</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}>
          <AntDesign
            name="arrowleft"
            color={COLORS.gray}
            size={RFValue(ICONS.xlIcon)}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>{renderserring()}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RFValue(PADDING.xsPadding),
  },
  headerView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: RFValue(10),
    marginTop: RFValue(10),
  },
  headerTxt: {
    // marginLeft: '45%',
    color: COLORS.black,
    fontSize: RFValue(FONTS.h3),
    fontWeight: 'bold',
  },
  each_view_in_map_style: {
    // borderBottomWidth: RFValue(1),
    borderColor: COLORS.gray,
    height: RFValue(60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff',
    elevation:3,
    marginVertical:5,
    paddingHorizontal:5,
    borderRadius:3
  },
  each_button_style: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  each_text_style: {
    fontSize: RFValue(FONTS.h4),
    color: COLORS.black,
  },
});
