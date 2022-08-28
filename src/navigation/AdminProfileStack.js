import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AdminProfile} from '../screens';
// import {EditprofileScreen} from '../screens';
import {PhotographerSettingScreen} from '../screens';
const Stack = createNativeStackNavigator();

function AdminProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="AdminProfile">
      <Stack.Screen name="AdminProfile" component={AdminProfile} />
      <Stack.Screen
        name="PhotographerSettingScreen"
        component={PhotographerSettingScreen}
      />
    </Stack.Navigator>
  );
}

export default AdminProfileStack;
