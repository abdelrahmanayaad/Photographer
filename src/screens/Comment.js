
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
import axios from 'axios';

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      visible: true,
      current_replay: {
        replay_comment: "",
        replay_name: "",
        replay_image: "",
      },
      current_comment: "",

      comments: [

        {
          name: "الشاذلى",
          image: require("../assets/Images/images.png"),
          comment_content: "التقدير خسرنا كتير ",
          replays: [{
            replay_comment: "خلصانه",
            replay_name: "محمد",
            replay_image: require("../assets/Images/images.png"),
          }]

        },
        {
          name: "عياد",
          image: require("../assets/Images/images.png"),
          comment_content: "لو انت مش فارق ....يبقى تفارق",
          replays: [

          ],

        },
        {
          name: "مروه",
          image: require("../assets/Images/images.png"),
          comment_content: "تلاشانى ؟ علشانك مش عشانى",
          replays: [

          ],
        },
        {
          name: "مطحنه",
          image: require("../assets/Images/images.png"),
          comment_content: "الوشوش هتتقابل بس القلوب موعدكش",
          replays: [

          ],

        }
        ,
        {
          name: "اسراء",
          image: require("../assets/Images/images.png"),
          comment_content: " الرزق ان يضع الله لك قبولا ف قلب كل من يراك",
          replays: [

          ],

        }



      ],

      replay_comment: ''

    };
  }

  get_comments() {
    let data_to_send = {
      user_id: 1,
      post_id: 2
    }

    axios.post('https://generation3.000webhostapp.com/project/Training/Comments.php', data_to_send).then(res => {
      if (res.status == 200) {
        if (res.data == 'Not Valid Parametar Value') {
          console.log('not valid');
        } else if (typeof (res.data) == "object") {
          console.log("success");
          console.log(res.data);
          this.setState({ comments: res.data })
        } else ("use not found")
      }
    }).catch(err => {
      console.log(err);
    })

    // axios.get('').then(res => {
    //   if (res.status == 200) {
    //     // .....
    //   }
    // }).catch(err => {
    //   console.log(err);
    // })

  }

  componentDidMount() {
    this.get_comments()
  }



  add() {
    let list = this.state.comments

    let obj = {
      image: require("../assets/Images/secur.png"),
      name: "الشاذلى",
      comment_content: this.state.text,
      replays: [],

    }

    list.push(obj)
    this.setState({

      comments: list,
      text: "",


    })

  }
  Add_Replay(text) {
    let comment = this.state.current_comment;
    const reply = {
      replay_comment: text.trim(),
      replay_name: "محمد",
      replay_image: require("../assets/Images/images.png"),
    }

    comment.replays.push(reply);

    this.setState({

      replay_comment: "",
      comments: this.state.comments


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
          borderBottomLeftRadius: RFValue(30),
          borderBottomRightRadius: RFValue(30),
          paddingBottom: 40

        }}>

          <View style={{ padding: PADDING.smPadding, }}>


            {/* View Header */}
            <View
            // style={styles.view}
            >



              <Text style={[styles.titleStyle, { alignSelf: "center" }]}>التعليقات</Text>

              {/* <TouchableOpacity >
                <AntDesign name="arrowleft" color={COLORS.gray} size={ICONS.xlIcon} />
              </TouchableOpacity> */}

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
                      <Text style={styles.messageTitleStyle}>{comment.comment_content}</Text>
                    </View>
                    {comment.replays.map((replay, index) => (
                      <View style={{ flexDirection: "row" }}>
                        {
                          comment.replays == "" ? null : <Image
                            source={replay.replay_image}
                            style={{
                              width: RFValue(25),
                              height: RFValue(25),
                              marginTop: MARGIN.xsMargin,
                              marginRight: MARGIN.xsMargin,

                            }}
                            resizeMode="contain"
                            borderRadius={20}
                          />}
                        {comment.replays == "" ? null :
                          <View style={{
                            backgroundColor: "#fff",
                            minWidth: "40%",
                            minHeight: RFValue(40),
                            borderRadius: RADIUS.smRadius,
                            paddingHorizontal: PADDING.xsPadding,
                            marginTop: MARGIN.xsMargin,
                            elevation: 2
                          }}>
                            <Text style={[styles.titleStyle, { alignItems: "flex-end" }]}>{replay.replay_name}</Text>
                            <Text style={{
                              marginLeft: RFValue(20),
                              fontSize: RFValue(15),
                              color: COLORS.black
                            }}>{replay.replay_comment}</Text>

                          </View>}

                      </View>
                    ))}

                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          current_comment: comment
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
                  this.Add_Replay(this.state.replay_comment)
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
