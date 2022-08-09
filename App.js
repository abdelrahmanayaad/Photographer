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
  SettingsScreen,
  SearchScreen,
  Comment,
  HomeScreen,
  EditprofileScreen,
  ProfileScreen,


} from './src/screens';
import { Followers } from "./src/screens/Followers"
// import { Comment } from './src/screens/Comment';

const { width, height } = Dimensions.get('window');
export class App extends Component {
  render() {
    return <Comment />;
  }
}
const styles = StyleSheet.create({});
export default App;
