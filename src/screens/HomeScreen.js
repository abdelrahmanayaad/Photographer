import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, StatusBar, ImageBackground } from 'react-native';
import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');
import {
  COLORS,
  FONTS,
  ICONS,
  PADDING,
  RADIUS,
  IconsView,
} from '../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { MARGIN } from '../constants';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Dialog from "react-native-dialog";
import Fontisto from 'react-native-vector-icons/Fontisto'


export class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      highlights: [{
        id: 0,
        img: require('../assets/Images/photo.jpg'),
        story: require('../assets/Images/post.jpg'),

      }, {
        id: 1,
        img: require('../assets/Images/photo.jpg'),
        story: require('../assets/Images/post2.jpg')

      }, {
        id: 2,
        img: require('../assets/Images/photo.jpg'),
        story: require('../assets/Images/photo.jpg')

      }, {
        id: 3,
        img: require('../assets/Images/photo.jpg'),
        story: require('../assets/Images/post.jpg'),

      }, {
        id: 4,
        img: require('../assets/Images/photo.jpg'),
        story: require('../assets/Images/post.jpg'),

      }, {
        id: 5,
        img: require('../assets/Images/photo.jpg'),
        story: require('../assets/Images/post.jpg'),

      }, {
        id: 6,
        img: require('../assets/Images/photo.jpg'),
        story: "",
      }, {
        id: 7,
        img: require('../assets/Images/photo.jpg'),
        story: require('../assets/Images/post.jpg'),

      }, {
        id: 8,
        img: require('../assets/Images/photo.jpg'),
        story: require('../assets/Images/post.jpg'),

      }, {
        id: 9,
        img: require('../assets/Images/photo.jpg'),
        story: require('../assets/Images/post.jpg'),

      }
      ], posts: [{
        id: 1,
        profile_img: require('../assets/Images/photo.jpg'),
        post_img: require('../assets/Images/post.jpg'),
        name: "اسراء الجز",
        email: "esraaelgiz",
        discribtion: "صوره للطبيعه",
        favourite: false,
        saved: false,
        likes_number: 130,
        comment_number: 20,
        upload_time: "منذ دقيقه واحده"

      }, {
        id: 2,
        profile_img: require('../assets/Images/photo.jpg'),
        post_img: require('../assets/Images/post2.jpg'),
        name: "مروه السوداني",
        email: "marwaelsodany",
        discribtion: "",
        favourite: false,
        saved: false,
        likes_number: 300,
        comment_number: 120,
        upload_time: "منذ دقيقه واحده"
      }, {
        id: 3,
        profile_img: require('../assets/Images/photo.jpg'),
        post_img: require('../assets/Images/post.jpg'),
        name: "اسراء الجز",
        email: "esraaelgiz",
        discribtion: "",
        favourite: false,
        saved: false,
        likes_number: 250,
        comment_number: 60,
        upload_time: "منذ دقيقه واحده"
      }
      ],
      email: "esraaelgiz@gmail.com",
      password: "123456",
      dialog_visible: false,
      stories_modal_visible: false,
      arr: []


    }
  }

  favouritepress(item, index) {
    let posts_arr = this.state.posts
    if (this.state.email == "" || this.state.password == "") {
      this.setState({ dialog_visible: true })
    } else if (this.state.email != "" && this.state.password != "") {
      posts_arr[index].favourite = !posts_arr[index].favourite
      if (posts_arr[index].favourite == true) {
        posts_arr[index].likes_number = (posts_arr[index].likes_number) + 1
      } else if (posts_arr[index].favourite == false) {
        posts_arr[index].likes_number = (posts_arr[index].likes_number) - 1

      }
      this.setState({ posts: posts_arr })
    }



  }
  savedpress(item, index) {
    let posts_arr = this.state.posts
    if (this.state.email == "" || this.state.password == "") {
      this.setState({ dialog_visible: true })
    } else if (this.state.email != "" && this.state.password != "") {
      posts_arr[index].saved = !posts_arr[index].saved
      this.setState({ posts: posts_arr })
    }
  }
  commentpress(item, index) {
    let posts_arr = this.state.posts
    if (this.state.email == "" || this.state.password == "") {
      this.setState({ dialog_visible: true })
    }

  }
  notificationpress() {
    if (this.state.email == "" || this.state.password == "") {
      this.setState({ dialog_visible: true })
    }

  }
  renderhighlights() {
    return this.state.highlights.map((item, index) => {
      return (
        item.story != "" ?
          <TouchableOpacity onPress={() => { this.state.arr.push(item), this.setState({ stories_modal_visible: true }) }} style={styles.each_highlight_style}>
            <Image source={item.img} style={styles.each_img_in_highlight_style} />
          </TouchableOpacity> : null
      )

    })
  }
  storiespress() {
    return this.state.arr.map((item, index) => {
      return (

        <ImageBackground source={item.story} style={{ width: '100%', height: "100%" }} resizeMode="cover" >

          <TouchableOpacity onPress={() => { this.setState({ stories_modal_visible: false }), this.state.arr.pop() }}
            style={styles.exit_buttom_in_story_style}>
            <Feather name="x" size={RFValue(ICONS.lIcon)} color={COLORS.black} />
          </TouchableOpacity>
        </ImageBackground>

      )

    })



  }

  renderposts() {
    return this.state.posts.map((item, index) => {
      return (
        <View style={styles.view_for_each_post_style}>

          <View style={styles.view_for_profilenameandimg_in_each_post}>
            <TouchableOpacity style={styles.button_of_img_in_the_header_of_each_post_style}>
              <Image source={item.profile_img != "" ? item.profile_img : require('../assets/Images/user.png')} style={styles.img_in_the_header_of_each_post_style} />
            </TouchableOpacity>
            <View style={styles.view_for_text_at_header_style}>
              <View>
                <Text style={styles.text_for_header_at_post_style}>{item.name}</Text>
              </View>
              <View>
                <Text style={styles.timedatepost}>{item.upload_time}</Text>
              </View>


            </View>
          </View>

          <View style={styles.view_for_img_in_post_style}>
            <Image source={item.post_img} style={styles.img_in_post_style} />
          </View>
          <View style={styles.view_for_icons_in_post_style}>
            <View style={styles.view_for_each_iconandtext_for_each_post_style}>
              <TouchableOpacity onPress={() => { this.favouritepress(item, index) }} >
                {item.favourite == false ? <AntDesign name="hearto" color={COLORS.gray} size={RFValue(ICONS.mIcon)} /> : <AntDesign name="heart" color={COLORS.primary} size={RFValue(ICONS.mIcon)} />}
              </TouchableOpacity>
              <Text style={styles.text_near_each_icon_style}>{item.likes_number > 0 ? item.likes_number : ""}</Text>
            </View>
            <View style={styles.view_for_each_iconandtext_for_each_post_style}>
              <TouchableOpacity onPress={() => { this.commentpress(item, index) }} >
                <Fontisto name="comment" color={COLORS.gray} size={RFValue(ICONS.mIcon)} />
              </TouchableOpacity>
              <Text style={styles.text_near_each_icon_style}>{item.comment_number > 0 ? item.comment_number : ""}</Text>
            </View>
            <View style={styles.view_for_each_iconandtext_for_each_post_style}>
              <TouchableOpacity onPress={() => { this.savedpress(item, index) }}>
                <FontAwesome name="bookmark" color={item.saved == true ? COLORS.primary : COLORS.gray} size={RFValue(ICONS.mIcon)} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.captionView}>
            <Text
              style={[styles.nameunderpost, { fontSize: RFValue(12) }]}>
              {item.name}{' '}
              <Text
                style={[
                  styles.textCaptionStyle,
                  { fontSize: RFValue(12) },
                ]}>
                {item.discribtion}
              </Text>
            </Text>
          </View>


        </View>

      )
    })
  }
  render() {
    return (

      <View style={styles.main_view_style}>
        <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />


        <View style={styles.header}>

          <View style={{ paddingLeft: RFValue(25) }}></View>
          <View >
            <Text style={styles.titleStyle}>الصفحة الرئيسية</Text>
          </View>
          <View >
            <TouchableOpacity onPress={() => { this.notificationpress() }} >
              <EvilIcons name="bell" color={COLORS.gray} size={RFValue(ICONS.xlIcon)} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.highlight_view_style}>


                {this.renderhighlights()}

              </View>
            </ScrollView>

            <View>
              {this.renderposts()}
            </View>

          </View>
        </ScrollView>
        <Dialog.Container visible={this.state.dialog_visible}>
          <Dialog.Description>
            يجب ان تقوم بتسجيل الدخول اولا.
          </Dialog.Description>
          <Dialog.Button label="انهاء" style={{ color: COLORS.primary }} onPress={() => { this.setState({ dialog_visible: false }) }} />
        </Dialog.Container>
        <Modal visible={this.state.stories_modal_visible}>
          {this.storiespress()}

        </Modal>


      </View>


    );
  }
}
const styles = StyleSheet.create({
  main_view_style: {
    width: '100%'
    , marginBottom: height * .1

  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: RFValue(PADDING.smPadding),
    marginBottom: RFValue(30),
    justifyContent: 'space-between',

  },
  titleStyle: {
    fontSize: RFValue(FONTS.h3),
    color: COLORS.black,
    fontWeight: 'bold',
  }, highlight_view_style: {
    //width: '100%',
    flexDirection: 'row',
    marginBottom: RFValue(MARGIN.xsMargin),
    marginLeft: RFValue(MARGIN.xsMargin),
    justifyContent: 'flex-start'
  }, add_highlight_button_style: {
    width: RFValue(60),
    height: RFValue(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(RADIUS.xlRadius),
    marginLeft: RFValue(MARGIN.xsMargin),
    marginRight: RFValue(5),
    backgroundColor: "#ddd",
  }, each_highlight_style: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    marginRight: RFValue(5)
  }, each_img_in_highlight_style: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    borderWidth: RFValue(2),
    borderColor: COLORS.primary
  }, view_for_text_at_header_style: {
    alignItems: 'flex-start',
    marginLeft: RFValue(MARGIN.xsMargin)
  },
  text_for_header_at_post_style: {
    fontSize: RFValue(FONTS.h4),
    fontWeight: 'bold',
    color: COLORS.black

  },
  timedatepost: {
    color: COLORS.gray
  },
  view_for_each_post_style: {
    //marginTop: RFValue(MARGIN.xsMargin),
    marginRight: RFValue(MARGIN.xsMargin),
    marginLeft: RFValue(MARGIN.xsMargin),
    //height:RFValue(330),
    alignItems: 'flex-start',


  }, view_for_profilenameandimg_in_each_post: {
    flexDirection: 'row',
    marginBottom: RFValue(MARGIN.xsMargin),
    //alignItems: 'center',

  }, button_of_img_in_the_header_of_each_post_style: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    // marginRight:'5%'
    //marginRight: RFValue(MARGIN.smMargin)
  }, img_in_the_header_of_each_post_style: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
  }, view_for_img_in_post_style: {
    width: '100%',
    maxHeight: RFValue(450)
    //height:'63%',
    , marginBottom: RFValue(MARGIN.xsMargin),
    //marginBottom:'4%'


  }, img_in_post_style: {
    maxHeight: RFValue(450),
    width: "100%",
    borderRadius: RFValue(RADIUS.xsRadius)
  }, view_for_icons_in_post_style: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RFValue(MARGIN.xsMargin),


  }, view_for_each_iconandtext_for_each_post_style: {
    flexDirection: 'row',
    alignItems: 'center'
  }, text_near_each_icon_style: {
    marginLeft: RFValue(MARGIN.xsMargin),
    fontSize: RFValue(FONTS.h6),
    color: COLORS.black
  },
  captionView: {
    marginBottom: RFValue(MARGIN.mdMargin),
  },
  exit_buttom_in_story_style: {
    width: RFValue(50),
    height: RFValue(50),
    backgroundColor: '#eee',
    margin: RFValue(MARGIN.xsMargin),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(20),
    // elevation: 2,

  }, nameunderpost: {
    fontSize: RFValue(FONTS.h6),
    color: COLORS.black,
    fontWeight: 'bold',
  }, textCaptionStyle: {
    fontSize: RFValue(FONTS.h5),
    color: COLORS.black,
    fontWeight: '100',
  },

});
export default HomeScreen;
