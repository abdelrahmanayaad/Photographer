import {View, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';
const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
      }}>
      <Text>Photographer</Text>
    </View>
  );
};

export default SplashScreen;
