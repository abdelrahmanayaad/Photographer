import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  StatusBar,
  ImageBackground,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {COLORS, FONTS, ICONS, PADDING, RADIUS} from '../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {MARGIN} from '../constants';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Comment from './Comment';
import InstaStory from 'react-native-insta-story';

function HomeScreen({navigation}) {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  }, []);

  const story_data = [
    {
      user_id: 1,
      user_image:
        'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
      user_name: 'Esraa Elgiz',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
          swipeText: 'Custom swipe text for this story',
        },
        {
          story_id: 2,
          story_image:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        },
      ],
    },
    {
      user_id: 2,
      user_image:
        'https://i.pinimg.com/564x/83/be/04/83be04afa30772527761d865c9a849d9.jpg',
      user_name: 'Marwa Elsodany',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        },
      ],
    },
    {
      user_id: 3,
      user_image:
        'https://i.pinimg.com/736x/96/8f/42/968f429bdbe0ed5bb5e8efba3ab00921.jpg',
      user_name: 'Ayad',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        },
      ],
    },
    {
      user_id: 4,
      user_image:
        'https://i.pinimg.com/564x/a7/97/48/a797484a09046d5df1491e4e2dc9a386.jpg',
      user_name: 'Mathana',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        },
      ],
    },
    {
      user_id: 5,
      user_image:
        'https://i.pinimg.com/564x/ee/2e/be/ee2ebe8fa461496be850516191dcb08b.jpg',
      user_name: 'Elshazly',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        },
      ],
    },
    {
      user_id: 6,
      user_image:
        'https://i.pinimg.com/564x/c5/2a/ce/c52aced90abb1be8df290ea19a820a03.jpg',
      user_name: 'Ayad',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        },
      ],
    },
    {
      user_id: 7,
      user_image:
        'https://i.pinimg.com/564x/e7/33/70/e73370a7fd094fc8f1939592e88cc312.jpg',
      user_name: 'Esraa',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        },
      ],
    },
  ];

  const [posts, setposts] = useState([
    {
      id: 1,
      profile_img: require('../assets/Images/two.jpg'),
      post_img: require('../assets/Images/ten.jpg'),
      name: 'اسراء الجز',
      email: 'esraaelgiz',
      discribtion: 'صورة',
      favourite: false,
      saved: false,
      likes_number: 130,
      comment_number: 20,
      upload_time: 'منذ دقيقه واحده',
    },
    {
      id: 2,
      profile_img: require('../assets/Images/four.jpg'),
      post_img: require('../assets/Images/five.jpg'),
      name: 'مروه السوداني',
      email: 'marwaelsodany',
      discribtion: '',
      favourite: false,
      saved: false,
      likes_number: 300,
      comment_number: 120,
      upload_time: 'منذ دقيقه واحده',
    },
    {
      id: 3,
      profile_img: require('../assets/Images/five.jpg'),
      post_img: require('../assets/Images/nine.png'),
      name: 'اسراء الجز',
      email: 'esraaelgiz',
      discribtion: '',
      favourite: false,
      saved: false,
      likes_number: 250,
      comment_number: 60,
      upload_time: 'منذ دقيقه واحده',
    },
  ]);
  const [email, setemail] = useState('esraaelgiz@gmail.com');
  const [password, setpassword] = useState('123456');
  const [dialog_visible, setdialog_visible] = useState(false);

  const favouritepress = (item, index) => {
    let posts_arr = [...posts];
    if (email == '' || password == '') {
      setdialog_visible(dialog_visible => true);
    } else if (email != '' && password != '') {
      posts_arr[index].favourite = !posts_arr[index].favourite;
      if (posts_arr[index].favourite == true) {
        posts_arr[index].likes_number = posts_arr[index].likes_number + 1;
      } else if (posts_arr[index].favourite == false) {
        posts_arr[index].likes_number = posts_arr[index].likes_number - 1;
      }
      setposts(posts => posts_arr);
    }
  };

  const savedpress = (item, index) => {
    let posts_arr = [...posts];
    if (email == '' || password == '') {
      setdialog_visible(dialog_visible => true);
    } else if (email != '' && password != '') {
      posts_arr[index].saved = !posts_arr[index].saved;
      setposts(posts => posts_arr);
    }
  };
  const commentpress = (item, index) => {
    let posts_arr = [...posts];
    if (email == '' || password == '') {
      setdialog_visible(dialog_visible => true);
    }
  };
  const notificationpress = () => {
    if (email == '' || password == '') {
      setdialog_visible(dialog_visible => true);
    }
  };

  const renderposts = () => {
    return posts.map((item, index) => {
      return (
        <View style={styles.view_for_each_post_style}>
          <View style={styles.view_for_profilenameandimg_in_each_post}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PhotographerProfile');
              }}
              style={styles.button_of_img_in_the_header_of_each_post_style}>
              <Image
                source={
                  item.profile_img != ''
                    ? item.profile_img
                    : require('../assets/Images/user.png')
                }
                style={styles.img_in_the_header_of_each_post_style}
              />
            </TouchableOpacity>
            <View style={styles.view_for_text_at_header_style}>
              <View>
                <Text style={styles.text_for_header_at_post_style}>
                  {item.name}
                </Text>
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
              <TouchableOpacity onPress={() => favouritepress(item, index)}>
                {item.favourite == false ? (
                  <AntDesign
                    name="hearto"
                    color={COLORS.gray}
                    size={RFValue(ICONS.mIcon)}
                  />
                ) : (
                  <AntDesign
                    name="heart"
                    color={COLORS.primary}
                    size={RFValue(ICONS.mIcon)}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.text_near_each_icon_style}>
                {item.likes_number > 0 ? item.likes_number : ''}
              </Text>
            </View>
            <View style={styles.view_for_each_iconandtext_for_each_post_style}>
              {/* <TouchableOpacity onPress={() => commentpress(item, index)}>  */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Comment');
                }}>
                <Fontisto
                  name="comment"
                  color={COLORS.gray}
                  size={RFValue(ICONS.mIcon)}
                />
              </TouchableOpacity>
              <Text style={styles.text_near_each_icon_style}>
                {item.comment_number > 0 ? item.comment_number : ''}
              </Text>
            </View>
            <View style={styles.view_for_each_iconandtext_for_each_post_style}>
              <TouchableOpacity onPress={() => savedpress(item, index)}>
                <FontAwesome
                  name={item.saved == true ? 'bookmark' : 'bookmark-o'}
                  color={item.saved == true ? COLORS.primary : COLORS.gray}
                  size={RFValue(ICONS.mIcon)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.captionView}>
            <Text style={[styles.nameunderpost, {fontSize: RFValue(12)}]}>
              {item.name}{' '}
              <Text style={[styles.textCaptionStyle, {fontSize: RFValue(12)}]}>
                {item.discribtion}
              </Text>
            </Text>
          </View>
        </View>
      );
    });
  };

  return (
    <View style={styles.main_view_style}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />

      <View style={styles.header}>
        <View style={{paddingLeft: RFValue(25)}}></View>
        <View>
          <Text style={styles.titleStyle}>الصفحة الرئيسية</Text>
        </View>
        <View>
          <TouchableOpacity onPress={notificationpress}>
            <EvilIcons
              name="bell"
              color={COLORS.gray}
              size={RFValue(ICONS.xlIcon)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View>
          <View style={styles.highlight_view_style}>
            {
              <InstaStory
                data={story_data}
                avatarSize={RFValue(50)}
                duration={10}
                unPressedBorderColor={COLORS.primary}
              />
            }
          </View>
          <View>{renderposts()}</View>
        </View>
      </ScrollView>
      <Dialog.Container visible={dialog_visible}>
        <Dialog.Description>يجب ان تقوم بتسجيل الدخول اولا.</Dialog.Description>
        <Dialog.Button
          label="انهاء"
          style={{color: COLORS.primary}}
          onPress={() => setdialog_visible(dialog_visible => false)}
        />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  main_view_style: {
    width: '100%',
    marginBottom: height * 0.06,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: RFValue(PADDING.smPadding),
    height: RFValue(60),
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: RFValue(FONTS.h3),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  highlight_view_style: {
    //width: '100%',
    flexDirection: 'row',
    marginBottom: RFValue(MARGIN.xsMargin),
    marginLeft: RFValue(MARGIN.xsMargin),
    //justifyContent: 'flex-start',
  },
  add_highlight_button_style: {
    width: RFValue(60),
    height: RFValue(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(RADIUS.xlRadius),
    marginLeft: RFValue(MARGIN.xsMargin),
    marginRight: RFValue(5),
    backgroundColor: '#ddd',
  },
  each_highlight_style: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    marginRight: RFValue(5),
  },
  each_img_in_highlight_style: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    borderWidth: RFValue(2),
    borderColor: COLORS.primary,
  },
  view_for_text_at_header_style: {
    alignItems: 'flex-start',
    marginLeft: RFValue(MARGIN.xsMargin),
  },
  text_for_header_at_post_style: {
    fontSize: RFValue(FONTS.h5),
    fontWeight: 'bold',
    color: COLORS.black,
  },
  timedatepost: {
    color: COLORS.gray,
  },
  view_for_each_post_style: {
    //marginTop: RFValue(MARGIN.xsMargin),
    marginRight: RFValue(MARGIN.xsMargin),
    marginLeft: RFValue(MARGIN.xsMargin),
    //height:RFValue(330),
    alignItems: 'flex-start',
  },
  view_for_profilenameandimg_in_each_post: {
    flexDirection: 'row',
    marginBottom: RFValue(MARGIN.xsMargin),
    //alignItems: 'center',
  },
  button_of_img_in_the_header_of_each_post_style: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    // marginRight:'5%'
    //marginRight: RFValue(MARGIN.smMargin)
  },
  img_in_the_header_of_each_post_style: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
  },
  view_for_img_in_post_style: {
    width: '100%',
    maxHeight: RFValue(450),
    //height:'63%',
    marginBottom: RFValue(MARGIN.xsMargin),
    //marginBottom:'4%'
  },
  img_in_post_style: {
    maxHeight: RFValue(450),
    width: '100%',
    borderRadius: RFValue(RADIUS.xsRadius),
  },
  view_for_icons_in_post_style: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RFValue(MARGIN.xsMargin),
  },
  view_for_each_iconandtext_for_each_post_style: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_near_each_icon_style: {
    marginLeft: RFValue(MARGIN.xsMargin),
    fontSize: RFValue(FONTS.h6),
    color: COLORS.black,
  },
  captionView: {
    marginBottom: RFValue(MARGIN.mdMargin),
  },
  exit_buttom_in_story_style: {
    width: RFValue(50),
    height: RFValue(50),
    //backgroundColor: '#eee',
    // margin: RFValue(MARGIN.xsMargin),
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius: RFValue(20),
    // elevation: 2,
  },
  nameunderpost: {
    fontSize: RFValue(FONTS.h6),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  textCaptionStyle: {
    fontSize: RFValue(FONTS.h5),
    color: COLORS.black,
    fontWeight: '100',
  },
});
export default HomeScreen;
