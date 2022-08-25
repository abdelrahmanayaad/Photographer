//Tapview library -> switch
// zoom in to picture
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { MARGIN, COLORS, ICONS, FONTS, RADIUS } from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileInfo from './Intro/ProfileInfo';

export class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // postsPageOwner: true,
      likesPage: true,
      savePage: false,
      postsPageUser: true,
      informationUserPage: false,
      posts: [
        {
          id: 1,
          photo: require('../assets/Images/post1.png'),
          likes: 130,
          comments: 20,
          like: false,
          save: false,
        },
        {
          photo: require('../assets/Images/post2.png'),
          likes: 300,
          comments: 120,
          like: false,
          save: false,
        },
        {
          photo: require('../assets/Images/post3.png'),
          likes: 250,
          comments: 60,
          like: false,
          save: false,
        },
      ],
      keys: {
        key1: 1,
        key2: 2,
        key3: 3,
      },
      likes: [],
      saves: [],

      // owner: false,
      // user: true,
      owner: true,
      user: false,
      follow: false,
    };
  }

  putLike(idx) {
    let posts = this.state.posts;
    posts[idx].like = !this.state.posts[idx].like;
    this.setState({ posts: posts });
  }

  putSave(idx) {
    let posts = this.state.posts;
    posts[idx].save = !this.state.posts[idx].save;
    this.setState({ posts: posts });
  }

  posts() {
    return (
      <View style={styles.postsViewStyle}>
        {this.state.posts.map((el, idx) => (
          <View>
            <Image source={el.photo} style={styles.imagePostStyle} />
            <View style={styles.iconPostStyle}>
              <View style={styles.iconTextStyle}>
                <TouchableOpacity
                  onPress={() => {
                    this.putLike(idx);
                    if (el.like == true) {
                      el.likes += 1;
                      this.state.likes.push(this.state.posts[idx]);
                    } else {
                      el.likes -= 1;
                    }
                  }}>
                  <AntDesign
                    name={el.like ? 'heart' : 'hearto'}
                    size={RFValue(ICONS.mIcon)}
                    color={el.like ? COLORS.primary : null}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyleIcons}>{el.likes}</Text>
              </View>
              <View style={styles.iconTextStyle}>
                <TouchableOpacity>
                  <FontAwesome name="comment-o" size={RFValue(ICONS.mIcon)} />
                </TouchableOpacity>
                <Text style={styles.textStyleIcons}>{el.comments}</Text>
              </View>
              <View style={styles.iconTextStyle}>
                <TouchableOpacity
                  onPress={() => {
                    this.putSave(idx);
                    this.state.saves.push(this.state.posts[idx]);
                  }}>
                  <FontAwesome
                    name={el.save ? 'bookmark' : 'bookmark-o'}
                    size={RFValue(ICONS.mIcon)}
                    color={el.save ? COLORS.primary : null}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }

  likes() {
    return (
      <View style={styles.postsViewStyle}>
        {this.state.likes.map((el, idx) => (
          <View>
            <Image source={el.photo} style={styles.imagePostStyle} />
            <View style={styles.iconPostStyle}>
              <View style={styles.iconTextStyle}>
                <TouchableOpacity>
                  <AntDesign
                    name={el.like ? 'heart' : 'hearto'}
                    size={RFValue(ICONS.mIcon)}
                    color={el.like ? COLORS.primary : null}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyleIcons}>{el.likes}</Text>
              </View>
              <View style={styles.iconTextStyle}>
                <TouchableOpacity>
                  <FontAwesome name="comment-o" size={RFValue(ICONS.mIcon)} />
                </TouchableOpacity>
                <Text style={styles.textStyleIcons}>{el.comments}</Text>
              </View>
              <View style={styles.iconTextStyle}>
                <TouchableOpacity>
                  <FontAwesome
                    name={el.save ? 'bookmark' : 'bookmark-o'}
                    size={RFValue(ICONS.mIcon)}
                    color={el.save ? COLORS.primary : null}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }

  savesPost() {
    return (
      <View style={styles.postsViewStyle}>
        {this.state.saves.map((el, idx) => (
          <View>
            <Image source={el.photo} style={styles.imagePostStyle} />
            <View style={styles.iconPostStyle}>
              <View style={styles.iconTextStyle}>
                <TouchableOpacity>
                  <AntDesign
                    name={el.like ? 'heart' : 'hearto'}
                    size={RFValue(ICONS.mIcon)}
                    color={el.like ? COLORS.primary : null}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyleIcons}>{el.likes}</Text>
              </View>
              <View style={styles.iconTextStyle}>
                <TouchableOpacity>
                  <FontAwesome name="comment-o" size={RFValue(ICONS.mIcon)} />
                </TouchableOpacity>
                <Text style={styles.textStyleIcons}>{el.comments}</Text>
              </View>
              <View style={styles.iconTextStyle}>
                <TouchableOpacity
                  onPress={() => {
                    this.state.saves.push(this.state.posts[idx]);
                  }}>
                  <FontAwesome
                    name="bookmark"
                    size={RFValue(ICONS.mIcon)}
                    color={el.save ? COLORS.primary : null}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }

  info() {
    return (
      <View
        style={
          {
            // alignItems: 'center',
            // justifyContent: 'center',
            // height: RFValue(300),
          }
        }>
        <ProfileInfo />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <View style={styles.textViewHeaderStyle}>
            <Text style={styles.textHeaderStyle}>الملف الشخصي</Text>
          </View>
          {this.state.owner ? (
            <TouchableOpacity
            onPress={()=>{
              this.props.navigation.navigate("SettingsScreen")
            }}
            >
              <AntDesign
                name="setting"
                color={COLORS.gray}
                size={RFValue(ICONS.xlIcon)}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <AntDesign
                name="arrowleft"
                color={COLORS.gray}
                size={RFValue(ICONS.xlIcon)}
              />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileDataViewStyle}>
            <View>
              <Image
                resizeMode="contain"
                source={require('../assets/Images/profileImage.jpg')}
                style={styles.imageStyle}
              />
            </View>
            <View>
              <Text style={styles.nameStyle}>عبدالرحمن عياد</Text>
              <View style={{ alignItems: 'flex-start' }}>
                <Text style={styles.emailStyle}>abdelrahmanayad74</Text>
              </View>
              <View style={styles.followingViewStyle}>
                <Text style={styles.followingTextNumbersStyle}>280</Text>
              </View>
              <View style={styles.followingViewStyle}>
                <Text>يتابع</Text>
              </View>
            </View>
          </View>
          {this.state.user ? (
            <TouchableOpacity
              onPress={() => {
                this.setState({ follow: !this.state.follow });
              }}
              style={[
                styles.followButtonStyle,
                {
                  backgroundColor: this.state.follow
                    ? COLORS.gray
                    : COLORS.primary,
                },
              ]}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: FONTS.h4,
                  fontWeight: 'bold',
                }}>
                {this.state.follow ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          ) : null}
          <View style={styles.iconsDeptViewStyle}>
            {this.state.owner ? (
              <>
                {/* <View style={styles.viewIconLine}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        postsPageOwner: true,
                        likesPage: false,
                        savePage: false,
                      });
                    }}>
                    <Entypo
                      name="image"
                      color={this.state.postsPageOwner ? COLORS.primary : null}
                      size={RFValue(ICONS.lIcon)}
                    />
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.lineIconStyle,
                      {
                        backgroundColor: this.state.postsPageOwner
                          ? COLORS.primary
                          : null,
                      },
                    ]}
                  />
                </View> */}
                <View style={styles.viewIconLine}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        postsPageOwner: false,
                        likesPage: true,
                        savePage: false,

                      })

                    }}>
                    <AntDesign
                      name={this.state.likesPage ? 'heart' : 'hearto'}
                      color={this.state.likesPage ? COLORS.primary : null}
                      size={RFValue(ICONS.lIcon)}
                    />
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.lineIconStyle,
                      {
                        backgroundColor: this.state.likesPage
                          ? COLORS.primary
                          : null,
                      },
                    ]}
                  />
                </View>
                <View style={styles.viewIconLine}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        postsPageOwner: false,
                        likesPage: false,
                        savePage: true,
                      });
                    }}>
                    <FontAwesome
                      name={this.state.savePage ? 'bookmark' : 'bookmark-o'}
                      color={this.state.savePage ? COLORS.primary : null}
                      size={RFValue(ICONS.lIcon)}
                    />
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.lineIconStyle,
                      {
                        backgroundColor: this.state.savePage
                          ? COLORS.primary
                          : null,
                      },
                    ]}
                  />
                </View>
              </>
            ) : (
              <>
                <View style={styles.viewIconLine}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        postsPageUser: true,
                        informationUserPage: false,
                      });
                    }}>
                    <Entypo
                      name="image"
                      color={this.state.postsPageUser ? COLORS.primary : null}
                      size={RFValue(ICONS.lIcon)}
                    />
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.lineIconStyle,
                      {
                        backgroundColor: this.state.postsPageUser
                          ? COLORS.primary
                          : null,
                      },
                    ]}
                  />
                </View>
                <View style={styles.viewIconLine}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        postsPageUser: false,
                        informationUserPage: true,
                      });
                    }}>
                    <Ionicons
                      name="md-information-circle-outline"
                      color={
                        this.state.informationUserPage ? COLORS.primary : null
                      }
                      size={RFValue(ICONS.lIcon)}
                    />
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.lineIconStyle,
                      {
                        backgroundColor: this.state.informationUserPage
                          ? COLORS.primary
                          : null,
                      },
                    ]}
                  />
                </View>
              </>
            )}
          </View>
          <View>
            {this.state.owner
              ? this.state.postsPageOwner
                ? // ? this.posts()
                // : this.state.likesPage
                this.likes()
                : this.savesPost()
              : this.state.postsPageUser
                ? this.posts()
                : this.info()}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: MARGIN.xsMargin,
    height: '100%',
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: MARGIN.smMargin,
  },
  textViewHeaderStyle: {
    width: '90%',
  },
  textHeaderStyle: {
    fontSize: FONTS.h2,
    color: COLORS.black,
    fontWeight: 'bold',
    marginLeft: '28%',
  },
  profileDataViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: MARGIN.smMargin,
  },
  imageStyle: {
    width: RFValue(80),
    height: RFValue(80),
    borderRadius: RFValue(40),
    marginRight: RFValue(MARGIN.xsMargin),
  },
  followingViewStyle: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  nameStyle: {
    fontSize: FONTS.h4,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  emailStyle: {
    fontSize: FONTS.h6,
    color: COLORS.gray,
    marginBottom: 5,
  },
  followingTextNumbersStyle: {
    fontWeight: 'bold',
    color: COLORS.black,
  },
  iconsDeptViewStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: MARGIN.lgMargin,
  },
  postsViewStyle: {
    justifyContent: 'center',
  },
  imagePostStyle: {
    width: '100%',
    alignSelf: 'center',
    height: RFValue(200),
    borderRadius: RADIUS.xsRadius,
    marginBottom: MARGIN.xsMargin,
  },
  iconPostStyle: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
    marginBottom: MARGIN.lgMargin,
  },
  iconTextStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyleIcons: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
  followButtonStyle: {
    width: '50%',
    marginLeft: '5%',
    borderRadius: RADIUS.lgRadius,
    height: RFValue(35),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: RFValue(MARGIN.lgMargin),
  },
  lineIconStyle: {
    width: 45,
    height: 1,
    marginTop: RFValue(5),
  },
  viewIconLine: {
    alignItems: 'center',
  },
});

export default ProfileScreen;
