import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SigninScreen from '../Screens/auth/SigninScreen';
import SignupScreen from '../Screens/auth/SignupScreen';


const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
      <AuthStack.Navigator>
          <AuthStack.Screen name="SignIn" component={SigninScreen}></AuthStack.Screen>
          <AuthStack.Screen name="SignUp" component={SignupScreen}></AuthStack.Screen>
      </AuthStack.Navigator>
    )
}

export default AuthNavigation