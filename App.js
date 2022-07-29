import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, ICONS, RADIUS, PADDING} from './src/constants';
import { pass_icon } from './src/assets';
import GeneralButton from './src/components/GeneralButton';
import Input from './src/components/Input';
import Entypo from 'react-native-vector-icons/Entypo';
import ChangePassword from './src/screens/Auth/ChangePassword'
import Verification from './src/screens/Auth/Verification'
import Login from './src/screens/Auth/Login';
import ForgetPassword from './src/screens/Auth/ForgetPassword';
const {width, height} = Dimensions.get('window');
export class App extends Component {
  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.textStyle}>Hello World !</Text>
      //   {/* <Image source={require(pass_icon)}/> */}
      //   {/* <Entypo name="behance" color="red" size={25} /> */}
      //   {/* <GeneralButton
      //     title="Sign up"
      //     bgcolor={COLORS.primary}
      //     activeOpacity={0.7}
      //     onPress={() => alert('Hello')}
      //   /> */}
      //   {/* <Input placeholder="First Name" style={{width: 150}} />
      //   <Input placeholder="Last Name" style={{width: 150}} /> */}
      // </View>
      <View>
      <Login/>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
export default App;
