import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import Intro from './Intro/Intro';
function SplashScreen({navigation}) {
  useEffect(() => {
    let login = 0;
    setTimeout(() => {
      if (login == 1) navigation.navigate('HomeStack');
      else navigation.navigate('Intro');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photographer</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
