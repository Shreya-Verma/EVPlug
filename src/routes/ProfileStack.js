import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import ProfileScreen from '../screens/ProfileScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';

const Profile = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Profile.Navigator initialRouteName="Profile">
      <Profile.Screen name="Profile" component={ProfileScreen}></Profile.Screen>
      <Profile.Screen name="Edit" component={ProfileEditScreen}></Profile.Screen>
    </Profile.Navigator>
  );
};

export default ProfileStack;
