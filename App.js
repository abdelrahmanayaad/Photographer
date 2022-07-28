import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, ICONS, RADIUS, PADDING} from './src/constants';
import GeneralButton from './src/components/GeneralButton';
import Input from './src/components/Input';
import Entypo from 'react-native-vector-icons/Entypo';
const {width, height} = Dimensions.get('window');
export class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Hello World !</Text>
        <Entypo name="behance" color="red" size={25} />
        {/* <GeneralButton
          title="Sign up"
          bgcolor={COLORS.primary}
          activeOpacity={0.7}
          onPress={() => alert('Hello')}
        /> */}
        {/* <Input placeholder="First Name" style={{width: 150}} />
        <Input placeholder="Last Name" style={{width: 150}} /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: FONTS.h1,
    color: COLORS.black,
    fontWeight: 'bold',
  },
});
export default App;
