import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {RADIUS, COLORS, FONTS} from '../constants';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');
export class GeneralButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {title, bgcolor, ...rest} = this.props;
    return (
      <TouchableOpacity
        {...rest}
        style={[styles.container, {backgroundColor: bgcolor}]}>
        <Text style={styles.titleStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // width: width * 0.7,
    width: RFValue(230),
    // height: height * 0.065 >= 45 ? height * 0.065 : 40,
    height: RFValue(45),
    borderRadius: RFValue(RADIUS.xsRadius),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: COLORS.white,
    fontSize: RFValue(FONTS.h4),
    fontWeight: 'bold',
  },
});
export default GeneralButton;
