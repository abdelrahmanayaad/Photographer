import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  PADDING,
  IconsView,
  COLORS,
  MARGIN,
  ICONS,
  FONTS,
} from '../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
const { width, height } = Dimensions.get('window');
export class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: [{
        name: "تعديل الملف الشخصى",
        icon_name: 'arrowleft'
      }, {
        name: "تغيير كلمه المرور",
        icon_name: 'arrowleft'
      }, {
        name: "الاشعارات",
        icon_name: 'arrowleft'
      }, {
        name: "احصل علي المساعده",
        icon_name: 'arrowleft'
      }, {
        name: "الابلاغ عن مشكله",
        icon_name: 'arrowleft'
      }, {
        name: "تعليمات الاستخدام",
        icon_name: 'arrowleft'
      }, {
        name: "تسجيل الخروج",
        icon_name: 'logout'
      }
      ]


    }
  }

  renderserring() {
    return this.state.settings.map((item, index) => {
      return (
        <View style={styles.each_view_in_map_style}>
          <TouchableOpacity style={styles.each_button_style}>
            <Text style={styles.each_text_style}>{item.name}</Text>
            <View>
              {index == 6 ? <SimpleLineIcons name={item.icon_name} size={RFValue(ICONS.lIcon)} color={COLORS.gray} /> : <AntDesign name={item.icon_name} size={RFValue(ICONS.lIcon)} color={COLORS.gray} />
              }
            </View>
          </TouchableOpacity>
        </View>
      )

    })

  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />

        <View style={styles.headerView}>
          <TouchableOpacity  >
            <AntDesign
              name="arrowright"
              color={COLORS.gray}
              size={RFValue(ICONS.xlIcon)}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTxt}>الاعدادات</Text>
          </View>
          <View></View>
        </View>
        <ScrollView>

          <View>
            {this.renderserring()}
          </View>
        </ScrollView>



      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RFValue(PADDING.xsPadding),


  }, headerView: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: RFValue(20)

  }, headerTxt: {
    color: COLORS.black,
    fontSize: RFValue(FONTS.h3),
    fontWeight: 'bold'
  }, each_view_in_map_style: {
    borderBottomWidth: RFValue(1),
    borderColor: COLORS.gray,
    height: RFValue(70),
    alignItems: 'center',
    justifyContent: 'center'
  }, each_button_style: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  }, each_text_style: {
    fontSize: RFValue(FONTS.h4),
    color: COLORS.black
  }


});

export default SettingsScreen;
