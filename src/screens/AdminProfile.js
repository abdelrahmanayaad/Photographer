import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';
import {Input, GeneralButton} from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {FONTS, RADIUS, COLORS, PADDING, ICONS, MARGIN} from '../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import * as ImagePicker from 'react-native-image-picker';
import ActionSheet from 'react-native-actionsheet';
import axios from 'axios';

export class AdminProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photographers: [],
      visibleModal: false,
      postVisiableModal: false,
      imagePostVisiableModal: false,
      selectedPostImage: '',
      photo_data: '',
      photo_uri: '',
      HighLight_photo_data: '',
      HighLight_photo_uri: '',
      error_text: '',
      postsPin: 0,
      // esraa

      profile_img_for_post: require('../assets/Images/photo.jpg'),
      PostDetails: '',
      modal_visible: false,
      error_text: '',
      highLight: [
        {
          id: 1,
          name: 'one',
          photo: require('../assets/Images/one.jpg'),
        },
        {
          id: 2,
          name: 'Two',
          photo: require('../assets/Images/two.jpg'),
        },
        {
          id: 3,
          name: 'Three',
          photo: require('../assets/Images/three.jpg'),
        },
        {
          id: 4,
          name: 'Four',
          photo: require('../assets/Images/four.jpg'),
        },
        {
          id: 5,
          name: 'Five',
          photo: require('../assets/Images/five.jpg'),
        },
        {
          id: 6,
          name: 'Camera',
          photo: require('../assets/Images/eight.jpg'),
        },
      ],
      posts: [
        {
          profilePhoto: require('../assets/Images/two.jpg'),
          name: 'عبدالرحمن عياد',
          time: '12:00',
          postPhoto: require('../assets/Images/four.jpg'),
          likes: 0,
          comments: 0,
          caption: 'اخر تصوير',
          liked: false,
          details: '',
          pined: false,
        },
        {
          profilePhoto: require('../assets/Images/two.jpg'),
          name: 'عبدالرحمن عياد',
          time: '8:00',
          postPhoto: require('../assets/Images/post2.png'),
          likes: 0,
          comments: 0,
          caption: 'كاميرا ',
          liked: false,
          details: '',
          pined: false,
        },
        {
          profilePhoto: require('../assets/Images/two.jpg'),
          name: 'عبدالرحمن عياد',
          time: '5:00',
          postPhoto: require('../assets/Images/post3.png'),
          likes: 0,
          comments: 0,
          caption: 'صورة',
          liked: false,
          details: '',
          pined: false,
        },
      ],
    };
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

  componentDidMount() {
    this.requestCameraPermission();
  }
  getData = () => {
    axios
      .get(
        'https://generation3.000webhostapp.com/project/Training/photographer_list.php',
      )
      .then(res => {
        if (res.status == 200) {
          this.setState({photographers: res.data});
          // if (res.data == 'error') {
          //   alert('Try again later1');
          // } else if (
          //   'Photogarpher_id' in res.data &&
          //   typeof res.data == typeof {}
          // ) {
          // alert('Data return');
          // } else {
          //   alert('Try again later2');
          // }
        } else {
          alert('Try again later3');
        }
        // console.log(JSON.stringify(res.data));
        // console.log(res.data);
      });
  };
  componentDidMount() {
    this.getData();
  }
  incrementNumLikes(idx) {
    let posts = this.state.posts;
    posts[idx].likes += 1;
    this.setState({posts: posts});
  }
  decrementNumLikes(idx) {
    let posts = this.state.posts;
    posts[idx].likes -= 1;
    this.setState({posts: posts});
  }

  selectFromGallery = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary({options, includeBase64: false}, res => {
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

  selectFromGalleryToHighlight = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary({options, includeBase64: false}, res => {
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
          HighLight_photo_data: res.assets[0],
          HighLight_photo_uri: res.assets[0].uri,
        });
        this.addHighLight();
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

  changeLike(idx) {
    let posts = this.state.posts;
    posts[idx].liked = !this.state.posts[idx].liked;
    this.setState({posts: posts});
  }

  addPost() {
    let post = this.state.posts;
    let newPhoto = this.state.photo_data;
    let newObj = {
      profilePhoto: require('../assets/Images/two.jpg'),
      name: 'عبدالرحمن عياد',
      time: '9:00',
      postPhoto: newPhoto,
      likes: 0,
      comments: 0,
      caption: 'اخر صورة',
      liked: false,
      details: '',
    };
    post.splice(this.state.postsPin, 0, newObj);
    this.setState({posts: post});
  }
  // esraa
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
    posts_arr.splice(this.state.postsPin, 0, post_obj);
    this.setState({
      posts: posts_arr,
      modal_visible: false,
      photo_uri: '',
      details: '',
      error_text: '',
    });
  }

  warn_msg() {
    if (this.state.photo_uri == '') {
      this.setState({error_text: 'يجب اختيار صوره'});
    }
  }
  //
  addHighLight() {
    let highlight = this.state.highLight;
    let photo = this.state.HighLight_photo_data;
    let newObj = {
      name: 'newHigh',
      photo: photo,
    };
    highlight.push(newObj);
    this.setState({highLight: highlight});
  }

  deletePost(idx) {
    let posts = this.state.posts;
    posts.splice(idx, 1);
    this.setState({posts: posts});
  }

  pinIcon(idx) {
    let posts = this.state.posts;
    posts[idx].pined = !this.state.posts[idx].pined;
    this.setState({posts, posts});
  }

  pinPost(idx) {
    let posts = this.state.posts;
    if (posts[idx].pined == true) {
      posts.splice(0, 0, posts[idx]);
      posts.splice(idx + 1, 1);
    } else {
    }
    this.setState({posts: posts});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <TouchableOpacity
            onPress={() => {
              this.setState({modal_visible: true});
            }}
            style={styles.iconStyle}>
            <Feather
              name="camera"
              size={RFValue(ICONS.xlIcon)}
              color={COLORS.gray}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign
              name="setting"
              size={RFValue(ICONS.xlIcon)}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollViewPaddingStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.profileDataViewStyle}>
            <View>
              <Image
                style={styles.profileImageStyle}
                source={require('../assets/Images/two.jpg')}
              />
            </View>
            <View style={styles.nameUserFollowersTextStyle}>
              <Text style={styles.nameTextStyle}>عبدالرحمن عياد</Text>
              <Text style={styles.userTextStyle}>@abdelrahmanayad74 </Text>
              <View style={styles.follwerNumberStyle}>
                <Text style={styles.numberofFollowersTextStyle}> 210</Text>
                <Text style={styles.followertextStyle}>متابع </Text>
              </View>
            </View>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.highLightStyle}>
              <TouchableOpacity
                onPress={() => {
                  this.selectFromGalleryToHighlight();
                  // this.addHighLight();
                }}
                style={styles.addHighLightViewStyle}>
                <Text style={styles.plusIconStyle}>+</Text>
              </TouchableOpacity>
              {this.state.highLight.map((el, idx) => (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      visibleModal: true,
                      selectedHighlight: el.photo,
                    });
                  }}
                  style={styles.highLightStyleViewImage}>
                  <Image
                    resizeMode="contain"
                    style={styles.imageHightLightSyle}
                    source={el.photo}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={styles.viewPostsStyle}>
            <View style={styles.iconPostViewStyel}>
              <Entypo
                name="image"
                color={COLORS.primary}
                size={RFValue(ICONS.lIcon)}
              />
              <View style={styles.linePostIconStyle} />
            </View>
          </View>
          <View style={{width: '100%'}}>
            {this.state.posts.length == 0 ? (
              <Text
                style={{
                  fontSize: FONTS.h5,
                  color: COLORS.black,
                  textAlign: 'center',
                  marginTop: RFValue(150),
                  fontWeight: 'bold',
                }}>
                ليس لديك اي منشور حتي الان
              </Text>
            ) : (
              <FlatList
                data={this.state.posts}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={styles.dataPost}>
                          <View style={styles.imageDataPostViewStyle}>
                            <Image
                              resizeMode="contain"
                              source={item.profilePhoto}
                              style={styles.imageDataPostStyle}
                            />
                          </View>
                          <View style={styles.nameTimeViewStyle}>
                            <Text style={styles.nameDataPost}>{item.name}</Text>
                            <Text style={styles.timeDataPost}>{item.time}</Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity
                            style={{marginRight: RFValue(7)}}
                            onPress={() => {
                              this.pinIcon(index);
                              this.pinPost(index);
                              this.setState({
                                postsPin: this.state.postsPin + 1,
                              });
                              console.log(this.state.postsPin);
                            }}>
                            <AntDesign
                              name={item.pined ? 'pushpin' : 'pushpino'}
                              size={RFValue(ICONS.mIcon)}
                              color={COLORS.black}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              this.deletePost(index);
                            }}>
                            <Feather
                              name="x"
                              size={RFValue(ICONS.lIcon)}
                              color={COLORS.black}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          this.setState({
                            imagePostVisiableModal: true,
                            selectedPostImage: item.postPhoto,
                          });
                        }}
                        style={styles.imagePostView}>
                        <Image
                          style={styles.imagePostStyle}
                          source={item.postPhoto}
                        />
                      </TouchableOpacity>
                      <View style={styles.iconsPostViewStyle}>
                        <View style={styles.heartIconViewStyle}>
                          <TouchableOpacity
                            onPress={() => {
                              this.changeLike(index);
                              item.liked
                                ? this.incrementNumLikes(index)
                                : this.decrementNumLikes(index);
                            }}>
                            <AntDesign
                              name={item.liked ? 'heart' : 'hearto'}
                              color={item.liked ? COLORS.primary : null}
                              size={RFValue(ICONS.mIcon)}
                            />
                          </TouchableOpacity>
                          <Text style={styles.numberOfLikesTextStyle}>
                            {item.likes}
                          </Text>
                        </View>
                        <View style={styles.commentIconViewStyle}>
                          <TouchableOpacity>
                            <Fontisto
                              name="comment"
                              color={COLORS.gray}
                              size={RFValue(ICONS.mIcon)}
                            />
                          </TouchableOpacity>
                          <Text style={styles.numberOfCommentsTextStyle}>
                            {item.comments}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.captionView}>
                        <Text
                          style={[
                            styles.nameDataPost,
                            {fontSize: RFValue(12)},
                          ]}>
                          {item.name}{' '}
                          <Text
                            style={[
                              styles.textCaptionStyle,
                              {fontSize: RFValue(12)},
                            ]}>
                            {this.state.details}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            )}
          </View>
        </ScrollView>
        <Modal
          visible={this.state.visibleModal}
          onRequestClose={() => {
            this.setState({visibleModal: false});
          }}>
          <View>
            <ImageBackground
              resizeMode="cover"
              style={{height: '100%', width: '100%'}}
              source={this.state.selectedHighlight}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({visibleModal: false});
                }}
                style={styles.buttonModelExit}>
                {/* <AntDesign
                  name="arrowright"
                  size={ICONS.lIcon}
                  color={COLORS.black}
                /> */}
                <Feather
                  name="x"
                  size={RFValue(ICONS.lIcon)}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </Modal>
        {/* {POST MODAL AYAD} */}
        <Modal
          visible={this.state.postVisiableModal}
          onRequestClose={() => {
            this.setState({postVisiableModal: false});
          }}>
          <View style={styles.postModalContainer}>
            <View style={styles.headerPostModalStyle}>
              <Text style={styles.TextheaderPostModalStyle}>اضافة صورة</Text>
              <TouchableOpacity
                disabled={this.state.photo_uri == '' ? true : false}
                onPress={() => {
                  this.addPost();
                  this.setState({postVisiableModal: false, photo_uri: ''});
                }}>
                <AntDesign
                  name="check"
                  size={RFValue(ICONS.xlIcon)}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.selectFromGallery();
              }}
              style={styles.addPhotoViewStyle}>
              <AntDesign name="plus" size={ICONS.xlIcon} color={COLORS.black} />
            </TouchableOpacity>
            <View style={styles.newImageViewStyle}>
              <Image
                resizeMode="contain"
                style={styles.newImageStyle}
                source={{uri: this.state.photo_uri}}
              />
            </View>
          </View>
        </Modal>
        {/* {POST MODAL ESRAA} */}
        <Modal visible={this.state.modal_visible}>
          <View style={{margin: RFValue(MARGIN.xsMargin)}}>
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
                <Text style={styles.titleStyle}>اضافه صورة</Text>
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
                      'التقاط صورة',
                      'اختيار صورة',
                      'حذف الصورة',
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
                  placeholder="تفاصيل الصورة"
                  value={this.state.PostDetails}
                  onChangeText={value => {
                    this.setState({PostDetails: value});
                  }}
                />
              </View>
              <View style={styles.buttonView}>
                <GeneralButton
                  disabled={this.state.photo_uri == '' ? true : false}
                  onPress={() => {
                    this.addPost();
                    this.setState({
                      modal_visible: false,
                      photo_uri: '',
                    });
                  }}
                  title="مشاركة"
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
        <Modal
          visible={this.state.imagePostVisiableModal}
          onRequestClose={() => {
            this.setState({imagePostVisiableModal: false});
          }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.setState({imagePostVisiableModal: false});
              }}
              style={styles.buttonModelExit}>
              <Feather
                name="x"
                size={RFValue(ICONS.lIcon)}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="cover"
              style={{width: '100%', maxHeight: RFValue(300)}}
              source={this.state.selectedPostImage}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: RFValue(MARGIN.xsMargin),
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: RFValue(MARGIN.xsMargin),
  },
  scrollViewPaddingStyle: {
    paddingBottom: RFValue(MARGIN.xsMargin),
  },
  iconStyle: {
    marginRight: RFValue(MARGIN.smMargin),
  },
  profileDataViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(MARGIN.smMargin),
  },
  profileImageStyle: {
    width: RFValue(80),
    height: RFValue(80),
    borderRadius: RFValue(40),
  },
  nameTextStyle: {
    fontSize: RFValue(FONTS.h4),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  userTextStyle: {
    fontSize: RFValue(FONTS.h6),
    color: COLORS.gray,
  },
  follwerNumberStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberofFollowersTextStyle: {
    fontSize: RFValue(FONTS.h6),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  followertextStyle: {
    fontSize: RFValue(FONTS.h6),
    color: COLORS.black,
  },
  nameUserFollowersTextStyle: {
    marginLeft: RFValue(MARGIN.xsMargin),
    alignItems: 'center',
  },
  viewPostsStyle: {
    alignItems: 'flex-start',
    marginBottom: RFValue(MARGIN.smMargin),
  },
  lineIconStyle: {
    width: '10%',
    height: RFValue(2),
    backgroundColor: COLORS.primary,
  },
  highLightStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: RFValue(MARGIN.smMargin),
  },
  addHighLightViewStyle: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginRight: RFValue(5),
  },
  plusIconStyle: {
    fontSize: RFValue(FONTS.h3),
    color: COLORS.black,
  },
  highLightStyleViewImage: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    marginRight: RFValue(5),
  },
  imageHightLightSyle: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    borderWidth: RFValue(2),
    borderColor: COLORS.primary,
  },
  iconPostViewStyel: {
    width: '12%',
    alignItems: 'center',
  },
  linePostIconStyle: {
    width: '100%',
    height: RFValue(2),
    backgroundColor: COLORS.primary,
  },
  dataPost: {
    flexDirection: 'row',
    marginBottom: RFValue(MARGIN.xsMargin),
  },
  imageDataPostViewStyle: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
  },
  imageDataPostStyle: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
  },
  nameDataPost: {
    fontSize: RFValue(FONTS.h6),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  timeDataPost: {
    color: COLORS.gray,
  },
  nameTimeViewStyle: {
    alignItems: 'flex-start',
    marginLeft: RFValue(MARGIN.xsMargin),
  },
  imagePostView: {
    width: '100%',
    // minHeight: RFValue(100),
    maxHeight: RFValue(450),
    marginBottom: RFValue(MARGIN.xsMargin),
  },
  imagePostStyle: {
    width: '100%',
    // minHeight: RFValue(100),
    maxHeight: RFValue(450),
    borderRadius: RFValue(RADIUS.xsRadius),
  },
  iconsPostViewStyle: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-between',
    marginBottom: RFValue(MARGIN.xsMargin),
  },
  heartIconViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberOfLikesTextStyle: {
    marginLeft: RFValue(MARGIN.xsMargin),
    fontSize: RFValue(FONTS.h6),
    color: COLORS.black,
  },
  commentIconViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberOfCommentsTextStyle: {
    marginLeft: RFValue(5),
    fontSize: RFValue(FONTS.h6),
    color: COLORS.black,
  },
  captionView: {
    marginBottom: RFValue(MARGIN.mdMargin),
  },
  textCaptionStyle: {
    fontSize: RFValue(FONTS.h5),
    color: COLORS.black,
    fontWeight: '100',
  },
  buttonModelExit: {
    width: 50,
    height: 50,
    backgroundColor: '#eee',
    margin: MARGIN.xsMargin,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 2,
  },
  postModalContainer: {
    margin: RFValue(MARGIN.xsMargin),
  },
  headerPostModalStyle: {
    flexDirection: 'row',
    marginBottom: RFValue(MARGIN.smMargin),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextheaderPostModalStyle: {
    fontSize: RFValue(FONTS.h3),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  addPhotoViewStyle: {
    width: '25%',
    height: RFValue(80),
    backgroundColor: '#ddd',
    borderRadius: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RFValue(MARGIN.smMargin),
  },
  newImageViewStyle: {
    width: '100%',
    height: RFValue(200),
  },
  newImageStyle: {
    width: '100%',
    height: RFValue(200),
    borderRadius: 10,
  },
  ///////////////Modal
  headerView_model: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt_model: {
    color: COLORS.gray,
    fontSize: RFValue(FONTS.h4),
  },
  titleStyle: {
    fontSize: RFValue(FONTS.h5),
    color: COLORS.black,
    fontWeight: 'bold',
    marginLeft: '25%',
  },
  photoContainer: {
    width: '100%',
    minHeight: RFValue(250),
    maxHeight: RFValue(450),
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
    minHeight: RFValue(250),
    maxHeight: RFValue(450),
    borderRadius: RFValue(RADIUS.xsRadius),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPhoto: {
    minHeight: RFValue(250),
    maxHeight: RFValue(450),
    width: '100%',
    borderRadius: RFValue(RADIUS.xsRadius),
  },
  editView: {
    padding: RFValue(8),
    backgroundColor: COLORS.primary,
    position: 'absolute',
    bottom: RFValue(0.1),
    borderRadius: RFValue(RADIUS.smRadius),
  },
  editIcon: {
    // position: 'relative',
    // zIndex: -1,
  },
  inputView: {
    marginTop: RFValue(MARGIN.smMargin),
  },
  buttonView: {
    alignItems: 'center',
    marginVertical: RFValue(MARGIN.lgMargin),
  },
});

export default AdminProfile;
