import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, ICONS, RADIUS, PADDING} from './src/constants';
import GeneralButton from './src/components/GeneralButton';
import Input from './src/components/Input';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationContainer} from '@react-navigation/native';
import ProfileInfo from './src/screens/Intro/ProfileInfo';
import Navigation from './src/navigation/Navigation';
// import { ForgetPassword, Signup, SettingsScreen, Verification } from './src/screens';
import {
  Signup,
  Login,
  ForgetPassword,
  ChangePassword,
  Otp,
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
import AuthStack from './src/navigation/AuthStack';
import HomeStack from './src/navigation/HomeStack';
import SplashScreen from './src/screens/Auth/SplashScreen';
// import LoginWithG from './src/screens/Auth/LoginWithG';


const {width, height} = Dimensions.get('window');
export class App extends Component {
  render() {
    return (
      <Signup/>
      // <NavigationContainer>
      //   <AuthStack />
      // </NavigationContainer>
      // <ProfileInfo/>
    );
  }
}
const styles = StyleSheet.create({});
// https://generation3.000webhostapp.com/project/Training/photographer_list.php

export default App;
