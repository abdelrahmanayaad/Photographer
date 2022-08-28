import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from '../screens';
import {Comment} from '../screens';
import {PhotographerProfile} from '../screens/PhotographerProfile';
import {Followers} from '../screens';
const Stack = createNativeStackNavigator();

function CommentStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Comment" component={Comment} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen
        name="PhotographerProfile"
        component={PhotographerProfile}
      />
    </Stack.Navigator>
  );
}

export default CommentStack;
