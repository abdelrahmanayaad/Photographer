import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, ICONS, RADIUS, PADDING } from './src/constants';
import GeneralButton from './src/components/GeneralButton';
import Input from './src/components/Input';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  ForgetPassword,
  Verification,
  ChangePassword,
  Signup,
  Login,
  LoginWithG,
  SettingsScreen,
  SearchScreen,
  HomeScreen,
  EditprofileScreen,
  ProfileScreen,
  Intro,
  PhotographerSettingScreen,
  AdminProfile,
  Followering,
  Followers,
  Comment
} from './src/screens'
import ProfileInfo from './src/screens/Intro/ProfileInfo';
// import { ForgetPassword, Signup, SettingsScreen, Verification } from './src/screens';
// import LoginWithG from './src/screens/Auth/LoginWithG';


const { width, height } = Dimensions.get('window');
export class App extends Component {
  render() {

    return <ProfileScreen/>;

  }
}
const styles = StyleSheet.create({});
// https://generation3.000webhostapp.com/project/Training/photographer_list.php





export default App;
