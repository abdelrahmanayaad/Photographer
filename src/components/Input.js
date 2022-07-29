import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS, COLORS} from '../constants';
const {width, height} = Dimensions.get('window');
export class Input extends Component {
  render() {
    const {placeholder, TextInputWidth, style, ...rest} = this.props;
    return (
      <View>
        <TextInput
          {...rest}
          style={[styles.container, style]}
          placeholder={placeholder}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // width: RFValue(600),
    width: width * 0.9,
    // height: RFValue(40),
    height: height * 0.065,
    borderBottomWidth: RFValue(0.7),
    borderBottomColor: COLORS.gray,
    color: COLORS.black,
    fontSize: RFValue(FONTS.h5),
  },
});
export default Input;
