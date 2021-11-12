import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';

const Home = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Home.Navigator initialRouteName="Home">
      <Home.Screen name="Home" component={HomeScreen}></Home.Screen>
      <Home.Screen name="Details" component={DetailsScreen}></Home.Screen>
    </Home.Navigator>
  );
};

export default HomeStack;
