import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeScreen} from '../screens';
import {SearchScreen} from '../screens';
import {AdminProfile} from '../screens';
import {COLORS} from '../constants';
import {ProfileScreen} from '../screens';
const Tab = createMaterialBottomTabNavigator();

export default HomeStack = () => {
  return (
    <Tab.Navigator barStyle={{backgroundColor: COLORS.primary}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <View>
                <AntDesign name="home" color={color} size={20} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <View>
                <AntDesign name="search1" size={20} color={color} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarColor: 'red',
          tabBarIcon: ({color}) => {
            return (
              <View>
                <Ionicons name="person-outline" color={color} size={24} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
