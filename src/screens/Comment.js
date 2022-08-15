
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
import RBSheet from "react-native-raw-bottom-sheet";
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
      replay_name: "محمد",
      replay_image: require("../assets/Images/images.png"),
      current_index: "",

      comments: [

        {
          name: "الشاذلى",
          image: require("../assets/Images/images.png"),
          comment: "التقدير خسرنا كتير ",
          replay: []

        },
        {
          name: "عياد",
          image: require("../assets/Images/images.png"),
          comment: "لو انت مش فارق ....يبقى تفارق",
          replay: [],

        },
        {
          name: "مروه",
          image: require("../assets/Images/images.png"),
          comment: "تلاشانى ؟ علشانك مش عشانى",
          replay: [],
        },
        {
          name: "مطحنه",
          image: require("../assets/Images/images.png"),
          comment: "الوشوش هتتقابل بس القلوب موعدكش",
          replay: [],

        }
        ,
        {
          name: "اسراء",
          image: require("../assets/Images/images.png"),
          comment: " الرزق ان يضع الله لك قبولا ف قلب كل من يراك",
          replay: [

          ],

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
      replay: [],

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
    let name = this.state.replay_name
    let item = items[index]

    item.replay.push(comm + "\n")

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

          <View style={{ padding: PADDING.smPadding, }}>


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
                <View style={[styles.container_comment, { borderBottomWidth: index == this.state.comments.length - 1 ? 0 : 1 }]}
                >
                  <View style={{}}>

                    <Image
                      source={comment.image}
                      style={{
                        width: RFValue(40),
                        height: RFValue(40),
                        backgroundColor: "#ccc",
                      }}
                      resizeMode="contain"
                      borderRadius={30}
                    />

                  </View>
                  <View style={{
                    minWidth: "50%",
                    marginLeft: MARGIN.xsMargin,

                  }}>

                    <View style={{
                      backgroundColor: "#fff",
                      minHeight: RFValue(50),
                      paddingHorizontal: PADDING.smPadding,
                      borderRadius: RFValue(10),
                      elevation: 2
                    }}>
                      <Text style={styles.titleStyle}>{comment.name}</Text>
                      <Text style={styles.messageTitleStyle}>{comment.comment}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      {
                        comment.replay == "" ? null : <Image
                          source={this.state.replay_image}
                          style={{
                            width: RFValue(25),
                            height: RFValue(25),
                            marginTop: MARGIN.xsMargin,
                            marginRight: MARGIN.xsMargin,

                          }}
                          resizeMode="contain"
                          borderRadius={20}
                        />}
                      {comment.replay == "" ? null :
                        <View style={{
                          backgroundColor: "#fff",
                          minWidth: "40%",
                          minHeight: RFValue(40),
                          borderRadius: RADIUS.smRadius,
                          paddingHorizontal: PADDING.xsPadding,
                          marginTop: MARGIN.xsMargin,
                          elevation: 2
                        }}>
                          <Text style={[styles.titleStyle, { alignItems: "flex-end" }]}>{this.state.replay_name}</Text>
                          <Text style={{
                            marginLeft: RFValue(20),
                            fontSize: RFValue(15),
                            color: COLORS.black
                          }}>{comment.replay}</Text>

                        </View>}

                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          current_index: index
                        })
                        this.RBSheet.open()
                      }}
                    >
                      <Text style={styles.titleStyle}>الرد</Text>
                    </TouchableOpacity>


                  </View>
                </View>

              ))}

            </ScrollView>

          </View >
        </View >

        <View style={{ justifyContent: "center", alignItems: "center" }}>

        </View>

        <View style={styles.container_add_comment}>

          <TouchableOpacity style={styles.smallButtom}
            disabled={this.state.text == "" ? true : false}
            onPress={() => {
              this.add()
            }}
          >
            <FontAwesome5 name="paper-plane" color={COLORS.error} size={RFValue(ICONS.lIcon)} />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder={"اكتب تعليقك"}
            value={this.state.text}
            onChangeText={(newValue) => {
              this.setState({
                text: newValue

              })
            }}
          />
        </View>


        <View style={[styles.view]}>
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
            <View style={[styles.container_add_comment, {
              flex: 1, marginBottom: 0, marginTop: 0
            }]}>

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
                style={styles.input}
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

  container_comment: {
    flexDirection: "row",
    width: "100%",
    minheight: RFValue(50),
    // alignItems: "center",
    borderBottomWidth: RFValue(0.7),
    borderBottomColor: COLORS.gray,
    paddingBottom: RFValue(PADDING.lgPadding),
    marginTop: RFValue(MARGIN.xsMargin)

  },
  smallButtom: {
    marginRight: RFValue(MARGIN.xsMargin),
    backgroundColor: COLORS.white,
    borderRadius: RFValue(RADIUS.lgRadius),
    width: RFValue(40),
    height: RFValue(40),
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute"
  },
  input: {
    width: "80%",

    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lgRadius,
    height: RFValue(40),
    paddingHorizontal: PADDING.lgPadding,
  },
  container_add_comment: {
    backgroundColor: COLORS.primary,
    marginTop: MARGIN.lgMargin,
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: RFValue(50),
    marginBottom: MARGIN.lgMargin,
  }
});
export default Comment;
