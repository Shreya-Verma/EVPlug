import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import ProfileScreen from '../screens/ProfileScreen';

const Profile = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Profile.Navigator initialRouteName="Profile">
      <Profile.Screen name="Profile" component={ProfileScreen}></Profile.Screen>
    </Profile.Navigator>
  );
};

export default ProfileStack;
