import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, ICONS, RADIUS, PADDING} from './src/constants';
import GeneralButton from './src/components/GeneralButton';
import Input from './src/components/Input';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Signup,
  Login,
  ForgetPassword,
  ChangePassword,
  Verification,
  SettingsScreen,
  EditprofileScreen,
  SearchScreen,
  ProfileScreen,
  HomeScreen,
  Comment,
  Intro,
  PhotographerSettingScreen,
  Followers,
  Followering,
  AdminProfile,
  NewPassword,
} from './src/screens';
// import LoginWithG from './src/screens/Auth/LoginWithG';

const {width, height} = Dimensions.get('window');
export class App extends Component {
  render() {
    return <ForgetPassword />;
  }
}
const styles = StyleSheet.create({});
// https://generation3.000webhostapp.com/project/Training/photographer_list.php

export default App;
