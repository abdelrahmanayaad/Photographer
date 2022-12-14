import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {MARGIN, COLORS, ICONS, FONTS, RADIUS, PADDING} from '../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Dialog from 'react-native-dialog';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import axios from 'axios';

function ProfileInfo() {
  useEffect(() => {
    about();
  }, []);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      profile_img: '',
      name: 'اسراء رضا',
      email: 'EsraaReda53',
      rate: 1,
      opinion: 'good',
    },
    {
      id: 2,
      profile_img: '',
      name: 'عبدالرحمن عياد',
      email: 'abdelrahmanayad74',
      rate: 4,
      opinion: 'very talanted',
    },
    {
      id: 3,
      profile_img: '',
      name: 'محمد مطحنه',
      email: 'Mohamed70',
      rate: 3,
      opinion: 'he do a great job',
    },
    {
      id: 3,
      profile_img: '',
      name: 'عبدالرحمن الشازلى',
      email: 'abdelrahman37',
      rate: 2,
      opinion: 'he do a great job',
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(0);
  const [profile_img, setProfile_img] = useState('');
  const [name, setName] = useState('مروه السودانى');
  const [email, setEmail] = useState('MarwaElsodany89');
  const [rate, setRate] = useState(0);
  const [opinion, setOpenion] = useState('');
  const [stars, setStars] = useState([
    {
      id: 1,
      color: '#000',
      icon: 'staro',
      selected: false,
    },
    {
      id: 2,
      color: '#000',
      icon: 'staro',
      selected: false,
    },
    {
      id: 3,
      color: '#000',
      icon: 'staro',
      selected: false,
    },
    {
      id: 4,
      color: '#000',
      icon: 'staro',
      selected: false,
    },
    {
      id: 5,
      color: '#000',
      icon: 'staro',
      selected: false,
    },
  ]);
  const [phoneNums, set_phoneNums] = useState([]);
  const [whatsLink, set_whatsLink] = useState('');
  const [faceLink, set_faceLink] = useState('');
  const [instaLink, set_instaLink] = useState('');
  const [address, set_address] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const about = () => {
    let data_to_send = {
      user_id: '15',
      search_user_type:"مصور"

    };
    axios
      .post(
        'https://generation3.000webhostapp.com/project/Training/brand_details.php',
        data_to_send,
      )
      .then(res => {
        if (res.status == 200) {
          // console.log(res.data)
          setLoading(true);
          set_phoneNums(phoneNums => res.data.Photogarpher_brand_phone_num);
          set_whatsLink(whatsLink => res.data.Photogarpher_whats_link);
          set_faceLink(faceLink => res.data.Photogarpher_face_link);
          set_instaLink(instaLink => res.data.Photogarpher_insta_link);
          // console.log(res.data.brand_addresses)
          set_address(address => res.data.brand_addresses);
          // console.log(address)
        } else {
          alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const addReview = () => {
    let my_id = id;
    let my_img = profile_img;
    let my_name = name;
    let my_email = email;
    let my_rate = rate;
    let my_opinion = opinion;
    let obj = {};
    my_id = reviews.length + 1;
    obj = {
      id: my_id,
      profile_img: my_img,
      name: my_name,
      email: my_email,
      rate: my_rate,
      opinion: my_opinion,
    };
    let arr = [...reviews];
    arr.push(obj);
    setReviews(reviews => arr);
    setRate(rate => 0);
  };
  const rating_fun = index => {
    let arr = [...stars];
    for (let i = 0; i < arr.length; i = i + 1) {
      arr[i].selected = false;
    }
    for (let i = 0; i < index; i = i + 1) {
      arr[i].selected = true;
    }
    setStars(stars => arr);
  };
  const render_rating = () => {
    return stars.map((item, index) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setRate(rate => index + 1), rating_fun(index + 1);
          }}>
          <AntDesign
            name={item.selected ? 'star' : 'staro'}
            size={20}
            color={item.selected ? '#FDCC0D' : '#000'}
          />
        </TouchableOpacity>
      );
    });
  };
  const render_phoneNum = () => {
    return phoneNums.map((item, index) => {
      return (
        <View style={styles.infoContainer}>
          <AntDesign name="phone" size={RFValue(17)} />
          <Text
            selectable={true}
            style={[
              styles.headerTxt,
              {color: COLORS.success, fontSize: RFValue(FONTS.h5)},
            ]}>
            {item}
          </Text>
        </View>
      );
    });
  };
  const render_addresses = () => {
    return address.map((item, index) => {
      return (
        <View style={styles.infoContainer}>
          <AntDesign name="enviromento" size={RFValue(17)} />
          <Text
            selectable={true}
            onPress={() => {
              Linking.openURL(item.address_link);
            }}
            style={styles.infoTxt}>
            {item.address_decription}
          </Text>
        </View>
      );
    });
  };

  const reviewsMap = () => {
    return reviews.map((item, index) => {
      return (
        <View style={styles.review_container}>
          <View style={styles.photo_name_rate}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.photoView}>
                {/* <Image
                                resizeMode="contain"
                                source={require('../assets/Images/profileImage.jpg')}
                                style={styles.imageStyle}
                                /> */}
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: RFValue(12),
                    fontWeight: 'bold',
                    color: '#313131',
                  }}>
                  {item.name}
                </Text>
                <View style={{alignItems: 'flex-start'}}>
                  <Text style={{fontSize: RFValue(10)}}>{item.email}</Text>
                </View>
              </View>
            </View>
            {item.rate == 0 ? (
              <View style={styles.stars}>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
              </View>
            ) : item.rate == 1 ? (
              <View style={styles.stars}>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
              </View>
            ) : item.rate == 2 ? (
              <View style={styles.stars}>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
              </View>
            ) : item.rate == 3 ? (
              <View style={styles.stars}>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
              </View>
            ) : item.rate == 4 ? (
              <View style={styles.stars}>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="staro" size={RFValue(18)} color="#313131" />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: RFValue(PADDING.xsPadding),
                }}>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
                <View>
                  <AntDesign name="star" size={RFValue(18)} color="#FDCC0D" />
                </View>
              </View>
            )}
          </View>
          <View style={{height: RFValue(80), justifyContent: 'center'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={{fontSize: RFValue(15), color: '#313131'}}>
                {item.opinion}
              </Text>
            </ScrollView>
          </View>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={40} color={COLORS.primary} />
      ) : (
        <View style={{marginRight: RFValue(20)}}>
          <Text style={styles.headerTxt}>حـول </Text>
          {render_phoneNum()}
          {whatsLink != '' ? (
            <View style={styles.infoContainer}>
              <Fontisto name="whatsapp" size={RFValue(17)} />
              <Text
                style={[styles.infoTxt, {textDecorationLine: 'none'}]}
                onPress={() => {
                  Linking.openURL(whatsLink);
                }}>
                إرسال رسالة
              </Text>
            </View>
          ) : null}
          {faceLink != '' ? (
            <View style={styles.infoContainer}>
              <AntDesign name="facebook-square" size={RFValue(17)} />
              <Text
                selectable={true}
                onPress={() => {
                  Linking.openURL(faceLink);
                }}
                style={styles.infoTxt}>
                فيس بوك
              </Text>
            </View>
          ) : null}
          {instaLink != '' ? (
            <View style={styles.infoContainer}>
              <AntDesign name="instagram" size={RFValue(17)} />
              <Text
                selectable={true}
                onPress={() => {
                  Linking.openURL(instaLink);
                }}
                style={styles.infoTxt}>
                انستجرام
              </Text>
            </View>
          ) : null}
          {render_addresses()}
        </View>
      )}
      <View style={{height: RFValue(235)}}>
        <Text style={styles.headerTxt}>الآراء </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.review_container,
              {
                backgroundColor: '#eee',
                justifyContent: 'center',
                borderColor: '#eee',
              },
            ]}
            onPress={() => {
              setVisible(visible => true);
            }}>
            <Text style={{fontSize: RFValue(30), fontWeight: 'bold'}}>+</Text>
          </TouchableOpacity>
          <Dialog.Container visible={visible}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              {render_rating()}
            </View>
            <Dialog.Input
              placeholder="ادخل رأيك عنا"
              style={{marginTop: 10, width: RFValue(250)}}
              // multiline={true}
              value={opinion}
              onChangeText={value => {
                setOpenion(opinion => value);
              }}
            />
            <Dialog.Button
              label="تم"
              onPress={() => {
                addReview(),
                  setVisible(visible => false),
                  rating_fun(0),
                  setOpenion(opinion => '');
              }}
            />
          </Dialog.Container>
          {reviewsMap()}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  review_container: {
    alignItems: 'center',
    marginHorizontal: RFValue(5),
    padding: RFValue(20),
    width: RFValue(270),
    height: RFValue(170),
    // borderWidth: RFValue(1),
    backgroundColor: '#fff',
    borderColor: COLORS.primary,
    borderRadius: RADIUS.smRadius,
    elevation: 3,
  },
  container: {
    flex: 1,
  },
  photo_name_rate: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    // justifyContent: 'flex-start',
  },
  photoView: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(20),
    marginRight: RFValue(10),
    borderWidth: RFValue(1),
  },
  headerTxt: {
    color: COLORS.black,
    margin: RFValue(MARGIN.xsMargin),
    fontSize: RFValue(18),
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(MARGIN.xsMargin),
    marginLeft: RFValue(MARGIN.xsMargin),
  },
  infoTxt: {
    textDecorationLine: 'underline',
    color: '#71a8fb',
    padding: RFValue(PADDING.xsPadding),
    fontSize: RFValue(FONTS.h5),
  },
  stars: {
    flexDirection: 'row',
    paddingVertical: RFValue(PADDING.xsPadding),
    alignItems: 'center',
    // backgroundColor:'#0f0',
    // width: RFValue(125),
    // justifyContent: 'center'
  },
});
export default ProfileInfo;
