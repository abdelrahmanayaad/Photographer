import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SearchScreen} from '../screens';
import {PhotographerProfile} from '../screens/PhotographerProfile';

const Stack = createNativeStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SearchScreen">
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen
        name="PhotographerProfile"
        component={PhotographerProfile}
      />
    </Stack.Navigator>
  );
}

export default SearchStack;
