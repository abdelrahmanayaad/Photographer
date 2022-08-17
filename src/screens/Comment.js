
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
  ImageBackground,
  Button
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Component } from 'react';
import { Input, GeneralButton } from '../components';
import { RFValue } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import RBSheet from "react-native-raw-bottom-sheet";
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

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      visible: true,
      replay_comment: "",
      current_index: "",

      comments: [

        {
          name: "الشاذلى",
          image: require("../assets/Images/secur.png"),
          comment: "التقدير خسرنا كتير ",
          replay: ""
        },
        {
          name: "عياد",
          image: require("../assets/Images/images.png"),
          comment: "لو انت مش فارق ....يبقى تفارق",
          replay: ""

        },
        {
          name: "مروه",
          image: require("../assets/Images/secur.png"),
          comment: "تلاشانى ؟ علشانك مش عشانى",
          replay: ""
        },
        {
          name: "مطحنه",
          image: require("../assets/Images/images.png"),
          comment: "الوشوش هتتقابل بس القلوب موعدكش",
          replay: ""

        }
        ,
        {
          name: "اسراء",
          image: require("../assets/Images/images.png"),
          comment: " الرزق ان يضع الله لك قبولا ف قلب كل من يراك",
          replay: "",

        }



      ],


    };
  }




  add() {
    let list = this.state.comments

    let obj = {
      image: require("../assets/Images/secur.png"),
      name: "الشاذلى",
      comment: this.state.text,
      replay: "",

    }

    list.push(obj)
    this.setState({

      comments: list,
      text: "",


    })

  }
  Add_Replay(index) {
    let items = this.state.comments
    let comm = this.state.replay_comment
    let item = items[index]

    item.replay = comm

    this.setState({

      comments: items,
      replay_comment: ""



    })
  }


  render() {
    return (


      <View style={[{
        flex: 1,
        backgroundColor: COLORS.primary,

      }]}>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}> */}

        <View style={{
          flex: 1,
          backgroundColor: COLORS.background,
          borderBottomLeftRadius: RFValue(40),
          borderBottomRightRadius: RFValue(40),
          paddingBottom: PADDING.lgPadding

        }}>

          <View style={styles.container}>


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

            <ScrollView showsVerticalScrollIndicator={false}>

              {/* map */}
              {this.state.comments.map((comment, index) => (
                <View style={[styles.container_profile, { borderBottomWidth: index == this.state.comments.length - 1 ? 0 : 1 }]}
                >
                  <View style={{ alignItems: "center" }}>

                    <Image
                      source={comment.image}
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
                    paddingHorizontal: RFValue(PADDING.mdPadding),
                    width: "90%"
                  }}>


                    <View style={{}}>
                      <Text style={styles.titleStyle}>{comment.name}</Text>
                      <Text style={styles.messageTitleStyle}>{comment.comment}</Text>

                      {
                        comment.replay == "" ? null : (<Text style={{
                          marginLeft: RFValue(20),
                          fontSize: RFValue(15),
                          color: COLORS.black
                        }}>{comment.replay}</Text>)
                      }


                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            current_index: index
                          })
                          // this.RBSheet.open()
                        }}
                      >
                        <Text style={{ fontSize:RFValue(20) }}>الرد</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{
                      flexDirection: "row",
                      alignItems: "center"
                    }}>

                    </View>
                  </View>
                </View>

              ))}

            </ScrollView>

          </View >
        </View >

        <View style={{ justifyContent: "center", alignItems: "center" }}>

        </View>

        <View style={{

          backgroundColor: COLORS.primary,
          marginTop: MARGIN.lgMargin,
          alignSelf: "center",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: RFValue(50),
          marginBottom: MARGIN.lgMargin,



        }}>

          <TouchableOpacity style={styles.smallButtom}
            disabled={this.state.text == "" ? true : false}
            onPress={() => {
              this.add()

            }}
          >
            <FontAwesome5 name="paper-plane" color={COLORS.error} size={RFValue(ICONS.xlIcon)} />
          </TouchableOpacity>


          <TextInput
            style={{
              width: "80%",
              // borderWidth: 1,
              alignItems: "center",
              backgroundColor: COLORS.white,
              borderRadius: RFValue(RADIUS.lgRadius),
              height: RFValue(40),


              paddingHorizontal:RFValue( PADDING.lgPadding),
            }}
            placeholder={"اكتب تعليقك"}

            value={this.state.text}
            onChangeText={(newValue) => {
              this.setState({
                text: newValue

              })
            }}
          />
        </View>


        {/* <View style={[styles.view]}>
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={200}
            openDuration={250}

            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",

              }
            }}
          >
            <View style={{

              backgroundColor: COLORS.primary,

              alignSelf: "center",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,




            }}>

              <TouchableOpacity style={styles.smallButtom}
                disabled={this.state.replay_comment == "" ? true : false}
                onPress={() => {
                  this.Add_Replay(this.state.current_index)
                  this.RBSheet.close()
                }}
              >
                <FontAwesome5 name="paper-plane" color={COLORS.error} size={ICONS.xlIcon} />
              </TouchableOpacity>


              <TextInput
                style={{
                  width: "80%",
                  // borderWidth: 1,
                  alignItems: "center",
                  backgroundColor: COLORS.white,
                  borderRadius: RADIUS.lgRadius,
                  height: RFValue(40),
                  paddingHorizontal: PADDING.lgPadding,
                }}
                placeholder={"اكتب تعليقك"}
                value={this.state.replay_comment}
                onChangeText={(newValue) => {
                  this.setState({
                    replay_comment: newValue
                  })
                }}
              />
            </View>
          </RBSheet>
        </View> */}

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
    paddingBottom: RFValue(PADDING.lgPadding),
    marginTop:RFValue(MARGIN.xsMargin)

  },
  smallButtom: {
    marginRight:RFValue(MARGIN.xsMargin) ,
    backgroundColor: COLORS.white,
    borderRadius: RFValue(RADIUS.lgRadius),
    width: RFValue(40),
    height: RFValue(40),
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute"
  }
});
export default Comment;
