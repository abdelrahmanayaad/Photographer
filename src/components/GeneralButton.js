import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {RADIUS, COLORS, FONTS} from '../constants';
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
    width: width * 0.8,
    height: height * 0.075,
    borderRadius: RADIUS.xsRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: COLORS.white,
    fontSize: FONTS.h3,
    fontWeight: 'bold',
  },
});
export default GeneralButton;
