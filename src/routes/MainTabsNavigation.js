import React,{useState,useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';

import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import FavouritesStack from './FavouritesStack';
import Colors from '../constants/Colors';


const Tab = createBottomTabNavigator();

const MainTabsNavigation = () => {



return (
  <Tab.Navigator initialRouteName='HomeStack' screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color }) => {
      let iconName;
      if (route.name === 'HomeStack') {
        iconName = focused ? 'map-sharp' : 'map-outline';
      } else if (route.name === 'FavStack') {
        iconName = focused ? 'star' : 'star-outline';
      }else if(route.name === 'ProfileStack'){
        iconName = focused ? 'person-circle' : 'person-circle-outline';
      }
      return <Ionicons name={iconName} size={24} color={color} />;
    },
    tabBarActiveTintColor: Colors.primary,
    tabBarInactiveTintColor: 'gray',
    tabBarShowLabel: false,
    headerShown: false,
    keyboardHidesTabBar: true
  })}>
    <Tab.Screen name="HomeStack" component={HomeStack}/>
    <Tab.Screen name="FavStack" component={FavouritesStack}/>
    <Tab.Screen name="ProfileStack" component={ProfileStack}/>
  </Tab.Navigator>
);

}

export default MainTabsNavigation;