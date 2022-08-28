import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ProfileScreen} from '../screens';
import {SettingsScreen} from '../screens';
import {Following} from '../screens/Following';
const Stack = createNativeStackNavigator();

function SettingStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ProfileScreen">
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="Following" component={Following} />
    </Stack.Navigator>
  );
}

export default SettingStack;
