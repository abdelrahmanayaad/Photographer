import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet, Dimensions} from 'react-native';
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
    width: width * 0.8,
    height: height * 0.06,
    borderBottomWidth: 0.7,
    borderBottomColor: COLORS.gray,
    color: COLORS.black,
  },
});
export default Input;
