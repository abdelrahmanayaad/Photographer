import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  PermissionsAndroid,
  YellowBox,
  Modal,
  StatusBar,
} from 'react-native';
import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {COLORS, FONTS, ICONS, PADDING, RADIUS, IconsView} from '../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {MARGIN} from '../constants';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Input, GeneralButton} from '../components';
import * as ImagePicker from 'react-native-image-picker';
import ActionSheet from 'react-native-actionsheet';

const options = [
  <Text
    onPress={() => {
      this.selectFromGallery();
    }}>
    اختيار صوره
  </Text>,
  <Text
    onPress={() => {
      this.launchCamera();
    }}>
    التقاط صوره
  </Text>,
];

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlights: [
        {
          id: 1,
          img: require('../assets/Images/photo.jpg'),
        },
        {
          id: 2,
          img: require('../assets/Images/photo.jpg'),
        },
        {
          id: 3,
          img: require('../assets/Images/photo.jpg'),
        },
        {
          id: 4,
          img: require('../assets/Images/photo.jpg'),
        },
        {
          id: 5,
          img: require('../assets/Images/photo.jpg'),
        },
        {
          id: 6,
          img: require('../assets/Images/photo.jpg'),
        },
        {
          id: 7,
          img: require('../assets/Images/photo.jpg'),
        },
      ],
      posts: [
        {
          id: 1,
          profile_img: require('../assets/Images/photo.jpg'),
          post_img: require('../assets/Images/post.jpg'),
          name: 'اسراء الجز',
          email: 'esraaelgiz',
          discribtion: '',
          favourite: false,
          saved: false,
        },
        {
          id: 2,
          profile_img: require('../assets/Images/photo.jpg'),
          post_img: require('../assets/Images/post2.jpg'),
          name: 'مروه السوداني',
          email: 'marwaelsodany',
          discribtion: '',
          favourite: false,
          saved: false,
        },
        {
          id: 3,
          profile_img: require('../assets/Images/photo.jpg'),
          post_img: require('../assets/Images/post.jpg'),
          name: 'اسراء الجز',
          email: 'esraaelgiz',
          discribtion: '',
          favourite: false,
          saved: false,
        },
      ],

      profile_img_for_post: require('../assets/Images/photo.jpg'),
      photo_uri: '',
      photo_data: '',
      details: '',
      modal_visible: false,
      error_text: '',
    };
  }
  warn_msg() {
    if (this.state.photo_uri == '') {
      this.setState({error_text: 'يجب اختيار صوره'});
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
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
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
      },
    };
    ImagePicker.launchImageLibrary({options, includeBase64: true}, res => {
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
  };
  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, res => {
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
          photo_uri: res.assets[0].uri,
        });
      }
    });
  };
  favouritepress(item, index) {
    let posts_arr = this.state.posts;
    let fav = posts_arr[index].favourite;
    posts_arr[index].favourite = !posts_arr[index].favourite;
    this.setState({fav: !fav});
  }
  savedpress(item, index) {
    let posts_arr = this.state.posts;
    let save = posts_arr[index].saved;
    posts_arr[index].saved = !posts_arr[index].saved;
    this.setState({save: !save});
  }
  renderhighlights() {
    return this.state.highlights.map((item, index) => {
      return (
        <TouchableOpacity
          style={{
            width: RFValue(60),
            height: RFValue(60),
            borderRadius: RFValue(RADIUS.xlRadius),
            marginHorizontal: RFValue(5),
          }}>
          <Image
            source={item.img}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: RFValue(RADIUS.xlRadius),
            }}
          />
        </TouchableOpacity>
      );
    });
  }
  addpost() {
    let post_details = this.state.details;
    let posts_arr = this.state.posts;
    let selected_img_for_post = this.state.photo_data;
    let post_obj = {
      profile_img: this.state.profile_img_for_post,
      post_img: selected_img_for_post,
      name: 'اسراء الجز',
      email: 'esraaelgiz',
      favourite: false,
      saved: false,
      discribtion: post_details,
    };

    posts_arr.splice(0, 0, post_obj);
    this.setState({
      posts: posts_arr,
      modal_visible: false,
      photo_uri: '',
      details: '',
      error_text: '',
    });
  }
  renderposts() {
    return this.state.posts.map((item, index) => {
      return (
        <View style={styles.view_for_each_post_style}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={COLORS.primary}
          />

          <View style={styles.view_for_profilenameandimg_in_each_post}>
            <TouchableOpacity
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
            <View>
              <View>
                <Text style={{fontSize: FONTS.h4, fontWeight: 'bold'}}>
                  {item.name}
                </Text>
              </View>
              <View>
                <Text>منذ دقيقه واحدة</Text>
              </View>
            </View>
          </View>

          <View style={styles.view_for_img_in_post_style}>
            <Image source={item.post_img} style={styles.img_in_post_style} />
          </View>
          <View style={styles.view_for_icons_in_post_style}>
            <TouchableOpacity
              onPress={() => {
                this.favouritepress(item, index);
              }}>
              {item.favourite == false ? (
                <AntDesign
                  name="hearto"
                  color={COLORS.gray}
                  size={ICONS.lIcon}
                />
              ) : (
                <AntDesign
                  name="heart"
                  color={COLORS.primary}
                  size={ICONS.lIcon}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome
                name="comment-o"
                color={COLORS.gray}
                size={ICONS.lIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.savedpress(item, index);
              }}>
              <FontAwesome
                name="bookmark"
                color={item.saved == true ? COLORS.primary : COLORS.gray}
                size={ICONS.lIcon}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text>{item.discribtion}</Text>
          </View>
        </View>
      );
    });
  }
  render() {
    return (
      <View style={styles.main_view_style}>
        <View style={styles.header}>
          <View style={{width: '12%', backgroundColor: '#0f0'}}></View>
          <View
            style={{
              width: '65%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.titleStyle}>الصفحة الرئيسية</Text>
          </View>
          <View
            style={{
              width: '18%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginRight: RFValue(MARGIN.xsMargin),
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({modal_visible: true});
              }}>
              <EvilIcons
                name="camera"
                color={COLORS.gray}
                size={ICONS.xlIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <EvilIcons name="heart" color={COLORS.gray} size={ICONS.xlIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View>
            <ScrollView horizontal={true}>
              <View style={styles.highlight_view_style}>
                <TouchableOpacity style={styles.add_highlight_button_style}>
                  <AntDesign name="plus" size={ICONS.mIcon} />
                </TouchableOpacity>

                {this.renderhighlights()}
              </View>
            </ScrollView>

            <View>{this.renderposts()}</View>
          </View>
        </ScrollView>

        <Modal visible={this.state.modal_visible}>
          <View style={{padding: '4%'}}>
            <ScrollView>
              <View style={styles.headerView_model}>
                <TouchableOpacity
                  model_visible={this.state.modal_visible}
                  onPress={() => {
                    this.setState({modal_visible: false});
                  }}>
                  <AntDesign
                    name="arrowright"
                    color={COLORS.gray}
                    size={RFValue(ICONS.xlIcon)}
                  />
                </TouchableOpacity>
                <Text style={styles.titleStyle}>اضافه صوره</Text>
                <View></View>
              </View>
              <View style={styles.photoContainer}>
                <View style={styles.photo_model}>
                  {this.state.photo_uri == '' ? (
                    <Entypo name="image" size={RFValue(50)} color="#4b4b4b" />
                  ) : (
                    <Image
                      source={{uri: this.state.photo_uri}}
                      style={styles.selectedPhoto}
                    />
                  )}
                </View>
                <TouchableOpacity
                  style={styles.editView}
                  onPress={() => {
                    this.ActionSheet.show();
                  }}>
                  <Entypo
                    name="edit"
                    size={RFValue(ICONS.smIcon)}
                    color="#fff"
                    style={styles.editIcon}
                  />
                  <ActionSheet
                    ref={o => (this.ActionSheet = o)}
                    options={[
                      'التقاط صوره',
                      'اختيار صوره',
                      'حذف الصوره',
                      'الغاء',
                    ]}
                    cancelButtonIndex={3}
                    destructiveButtonIndex={3}
                    onPress={index => {
                      if (index == 0) {
                        this.launchCamera();
                      } else if (index == 1) {
                        this.selectFromGallery();
                      } else if (index == 2) {
                        this.setState({photo_uri: ''});
                      }
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Input
                  placeholder="التفاصيل(اختياري)"
                  details={this.state.details}
                  onChangeText={value => {
                    this.setState({details: value});
                  }}
                />
              </View>

              <View style={styles.buttonView}>
                <GeneralButton
                  onPress={() => {
                    this.state.photo_uri != ''
                      ? this.addpost()
                      : this.warn_msg();
                  }}
                  title="نشر"
                  bgcolor={COLORS.primary}
                  activeOpacity={0.7}
                />
                <Text style={{color: COLORS.error}}>
                  {this.state.error_text}
                </Text>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main_view_style: {
    width: '100%',
    marginBottom: height * 0.1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    margin: RFValue(MARGIN.xsMargin),
    marginBottom: RFValue(20),
  },
  titleStyle: {
    fontSize: RFValue(FONTS.h3),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  highlight_view_style: {
    width: '100%',
    flexDirection: 'row',
    //marginBottom:RFValue(MARGIN.xsMargin)
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
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(RADIUS.xlRadius),
    marginHorizontal: RFValue(5),
  },
  each_img_in_highlight_style: {
    width: '100%',
    height: '100%',
    borderRadius: RFValue(RADIUS.xlRadius),
  },
  view_for_each_post_style: {
    marginTop: RFValue(MARGIN.xsMargin),
    marginRight: RFValue(MARGIN.xsMargin),
    marginLeft: RFValue(MARGIN.xsMargin),
    //height:RFValue(330),
  },
  view_for_profilenameandimg_in_each_post: {
    flexDirection: 'row',
    marginBottom: RFValue(10),
    alignItems: 'center',
  },
  button_of_img_in_the_header_of_each_post_style: {
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(RADIUS.xlRadius),
    marginRight: '5%',
  },
  img_in_the_header_of_each_post_style: {
    width: '100%',
    height: '100%',
    borderRadius: RFValue(RADIUS.xlRadius),
  },
  view_for_img_in_post_style: {
    width: '100%',
    height: RFValue(200),
    //height:'63%',
    marginBottom: RFValue(MARGIN.xsMargin),
    //marginBottom:'4%'
  },
  img_in_post_style: {
    height: '100%',
    width: '100%',
    borderRadius: RFValue(RADIUS.xsRadius),
  },
  view_for_icons_in_post_style: {
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ///////////////Modal
  headerView_model: {
    width: '96%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTxt_model: {
    color: COLORS.gray,
    fontSize: RFValue(FONTS.h4),
  },
  photoContainer: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: RFValue(MARGIN.mdMargin),
  },
  photo_model: {
    backgroundColor: '#cccccc',
    marginTop: RFValue(MARGIN.xlMargin),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray,
    width: '100%',
    height: RFValue(200),
    borderRadius: RFValue(RADIUS.xsRadius),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPhoto: {
    height: RFValue(200),
    width: '100%',
    borderRadius: RFValue(RADIUS.xsRadius),
  },
  editView: {
    padding: 5,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    bottom: RFValue(7),
    borderRadius: RFValue(RADIUS.smRadius),
  },
  editIcon: {
    position: 'relative',
    zIndex: -1,
  },
  inputView: {
    marginTop: RFValue(MARGIN.smMargin),
  },
  buttonView: {
    alignItems: 'center',
    marginVertical: RFValue(MARGIN.lgMargin),
  },
});
export default HomeScreen;
