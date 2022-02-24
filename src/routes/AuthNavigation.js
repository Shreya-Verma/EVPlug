import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SigninScreen from '../screens/auth/SigninScreen';
import SignupScreen from '../screens/auth/SignupScreen';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        options={{headerShown: false}}
        component={SigninScreen}></AuthStack.Screen>
      <AuthStack.Screen
        name="SignUp"
        options={{headerShown: false}}
        component={SignupScreen}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
