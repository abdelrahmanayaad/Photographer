import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';
import { Input, GeneralButton } from '../../components';
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
import { Colors } from 'react-native/Libraries/NewAppScreen';
const { width, height } = Dimensions.get('window');
export class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: [
        {
          name: "تعديل الحساب",
          ICON:"arrowright"
        },
        {
          name: "تغيير كلمه المرور",
          ICON:"arrowright"

        },
        {
          name: "الاشعارات",
          ICON:"arrowright"

        },
        {
          name: "اللغة",
          ICON:"arrowright"

        },
        {
          name: "الحصول علي المساعدة",
          ICON:"arrowright"

        },
        {
          name: "الابلاغ عن مشكلة",
          ICON:"arrowright"

        },
        {
          name: "شروط الاستخدام",
          ICON:"arrowright"

        },
        {
          name: "تسجيل الخروج",
          ICON:"logout"

        },



      ]

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <TouchableOpacity  >
            <AntDesign
              name="arrowright"
              color={COLORS.gray}
              size={ICONS.xlIcon}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderName}>الاعدادات</Text>

          <View>
          </View>



        </View>
        {this.state.setting.map(item => (
          <TouchableOpacity style={styles.ToView}>

            <TouchableOpacity >
              <AntDesign
                name={item.ICON}
                color={COLORS.gray}
                size={ICONS.xlIcon}
              />
            </TouchableOpacity>

            <Text style={styles.adress}>{item.name}</Text>


          </TouchableOpacity>
        ))}


      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding:MARGIN.xsMargin
  },
  Header: {
    height: RFValue(height / 12),
    width: RFValue(330),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  HeaderName: {
    fontSize: RFValue(FONTS.h4),
    fontWeight: "bold",
    color: COLORS.black

  },

  ToView: {
    height: RFValue(height / 12),
    width: RFValue(330),
    borderBottomWidth: 0.5,
    borderColor: COLORS.gray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

},
adress: {
  fontSize: RFValue(FONTS.h5),
  fontWeight: "bold",
  color: COLORS.black

}


});

export default SettingsScreen;
