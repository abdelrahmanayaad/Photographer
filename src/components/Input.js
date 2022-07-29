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
<<<<<<< HEAD
    width: RFValue(300),
=======
    width: "100%",
    // RFValue(300),
>>>>>>> dfc0d3c7ebe557316da398c536316439fd3188f9
    // width: width * 0.9,
    height: RFValue(60),
    // height: height * 0.065,
    borderBottomWidth: RFValue(0.7),
    borderBottomColor: COLORS.gray,
    color: COLORS.black,
    fontSize: RFValue(FONTS.h5),
  },
});
export default Input;
