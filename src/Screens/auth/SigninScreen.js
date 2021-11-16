import React, {useState,useEffect,useContext} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Colors from '../../constants/Colors';
import AuthScreenHeader from '../../components/AuthScreenHeader';
import AuthForm from '../../components/AuthForm';
import { Context } from '../../context/AuthContext';

const SigninScreen = ({navigation}) => {
  const {state, signin, clearErrorMessage} = useContext(Context);
  useEffect(() => navigation.addListener('blur', clearErrorMessage),[navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <AuthScreenHeader text="Sign In!" icon="person-outline" />
        <AuthForm 
          errorMessage={state.errorMessage}
          submitButtonText='Sign In' 
          onSubmit={signin} 
          text='New to EVPlug? Sign Up!'
          routeName='SignUp'/>
    </SafeAreaView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
