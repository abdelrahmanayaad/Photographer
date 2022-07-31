// import { Button } from "native-ba+++++++++++++se";
import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Modal,
  ImageBackground
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Component } from 'react';
import { Input, GeneralButton } from '../components';
import { RFValue } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OTPInput from 'react-native-otp-inputs';

import {
  PADDING,
  IconsView,
  COLORS,
  MARGIN,
  ICONS,
  FONTS,
  RADIUS,
} from '../constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",

      comments: [

        {
          name: "الشاذلى",
          image: require("../assets/Images/secur.png"),
          comment: "التقدير خسرنا كتير ",
          likes: "",
          replay: {

          }
        },
        {
          name: "عياد",
          image: require("../assets/Images/images.png"),
          comment: "لو انت مش فارق ....يبقى تفارق",
          likes: "",
          replay: {

          }

        },
        {
          name: "مروه",
          image: require("../assets/Images/secur.png"),
          comment: "تلاشانى ؟ علشانك مش عشانى",
          likes: "",
          replay: {

          }
        },
        {
          name: "مطحنه",
          image: require("../assets/Images/images.png"),
          comment: "الوشوش هتتقابل بس القلوب موعدكش",
          likes: "",
          replay: {

          }
        }
        ,
        {
          name: "اسراء",
          image: require("../assets/Images/images.png"),
          comment: " الرزق ان يضع الله لك قبولا ف قلب كل من يراك",
          likes: "",
          replay: {

          }
        }
      ],

    };
  }


  add() {
    let list = this.state.comments

    let obj = {
      image: require("../assets/Images/secur.png"),
      name: "الشاذلى",
      count_likes: "",
      comment: this.state.text,

    }

    list.push(obj)
    this.setState({

      comments: list,
      text: "",


    })

  }


  render() {
    return (


      <View style={[{
        flex: 1,
        backgroundColor: COLORS.primary,

      }]}>

        <View style={{
          flex: 5,
          backgroundColor: COLORS.background,
          borderBottomLeftRadius: RFValue(40),
          borderBottomRightRadius: RFValue(40),
          padding: PADDING.xsPadding
        }}>

          <View style={styles.container}>
            <ScrollView>

              {/* View Header */}
              <View style={styles.view}>

                <TouchableOpacity>
                  <AntDesign name="arrowright" color={COLORS.gray} size={ICONS.xlIcon} />
                </TouchableOpacity>

                <Text style={styles.titleStyle}>التعليقات</Text>

                <TouchableOpacity>
                  <FontAwesome5 name="ellipsis-h" color={COLORS.gray} size={ICONS.lIcon} />
                </TouchableOpacity>

              </View>



              {/* map */}
              {this.state.comments.map((comments, index) => (

                <View style={styles.container_profile}
                >
                  <View style={{ alignItems: "center" }}>

                    <Image
                      source={comments.image}
                      style={{
                        width: RFValue(50),
                        height: RFValue(50),
                        backgroundColor: "#ccc",
                      }}
                      resizeMode="contain"
                      borderRadius={35}
                    />

                  </View>
                  <View style={{
                    paddingHorizontal: PADDING.mdPadding,
                    width: "90%"
                  }}>
                    <View style={{}}>
                      <Text style={styles.titleStyle}>{comments.name}</Text>
                      <Text style={styles.messageTitleStyle}>{comments.comment}</Text>
                    </View>
                    {/* <View style={[styles.view, { width: "20%", marginTop: MARGIN.xsMargin }]}>
                      <TouchableOpacity
                        onPress={(color) => {
                          this.setState({

                          })
                        }}>
                        <Text style={{ color: COLORS.gray, fontWeight: "bold" }}>اعجبنى</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={{ color: COLORS.gray, fontWeight: "bold" }}>الرد</Text>
                      </TouchableOpacity>
                    </View> */}
                  </View>
                </View>

              ))}

            </ScrollView>

          </View>
        </View>
        {/* <ScrollView> */}
        <View style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          marginTop: MARGIN.lgMargin,
          alignSelf: "center",
          width: "95%",
          flexDirection: "row",
          alignItems: "center",
          // borderWidth: 1,

        }}>

          <TouchableOpacity style={styles.smallButtom}
            disabled={this.state.text == "" ? true : false}
            onPress={() => {
              this.add()
            }}
          >
            <FontAwesome5 name="paper-plane" color={COLORS.error} size={ICONS.xlIcon} />
          </TouchableOpacity>

          <Input
            style={{
              alignItems: "center",
              backgroundColor: COLORS.white,
              borderRadius: RADIUS.lgRadius,
              height: RFValue(40),
              width: RFValue(250),
              paddingHorizontal: PADDING.lgPadding,

            }}

            textAlign="right"
            autoCapitalize="none"
            placeholder="اكتب تعليق"
            value={this.state.text}
            onChangeText={value => {
              this.setState({ text: value });
            }}
          />
        </View>

        {/* </ScrollView > */}

      </View >



    );
  }
}
const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    justifyContent: "space-between"
  },
  titleStyle: {
    fontSize: RFValue(FONTS.h5),
    color: COLORS.black,
    fontWeight: 'bold',

  },
  messageTitleStyle: {
    fontSize: RFValue(FONTS.h5),
    color: COLORS.black,

  },
  container: {
    margin: RFValue(MARGIN.xsMargin),
  },
  container_profile: {
    flexDirection: "row",
    width: "100%",
    height: RFValue(80),
    alignItems: "center",
    borderBottomWidth: RFValue(0.7),
    borderBottomColor: COLORS.gray,
  },
  smallButtom: {
    marginRight: MARGIN.xsMargin,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    width: RFValue(40),
    height: RFValue(40),
    alignItems: "center",
    justifyContent: "center"
  }
});
export default SearchScreen;
