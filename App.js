import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, ICONS, RADIUS, PADDING} from './src/constants';
<<<<<<< HEAD
// import GeneralButton from './src/components/GeneralButton';
// import Input from './src/components/Input';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {ForgetPassword} from './src/screens';
import {Signup} from './src/screens';

=======
import GeneralButton from './src/components/GeneralButton';
import Input from './src/components/Input';
import Entypo from 'react-native-vector-icons/Entypo';
import {ForgetPassword, Verification} from './src/screens';
>>>>>>> 97c6d0b5b7579ac80ea0ebb20a6c4540e6e3d4a9
const {width, height} = Dimensions.get('window');
export class App extends Component {
  render() {
    return <Signup />;
  }
}
const styles = StyleSheet.create({});
export default App;
