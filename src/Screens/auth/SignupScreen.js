import React, {useContext, useEffect} from 'react';
import { StyleSheet,StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '../../constants/Colors';
import AuthScreenHeader from '../../components/AuthScreenHeader';
import AuthForm from '../../components/AuthForm';
import { Context } from '../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';

const SignupScreen = () => {

  const {state, signup, clearErrorMessage} = useContext(Context);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getFocus = async()=>{
      clearErrorMessage();
    }
    if(isFocused){
      getFocus();
    }
    
},[isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <AuthScreenHeader text="Sign Up!" icon="person-add-outline" />
      <AuthForm 
          errorMessage={state.errorMessage}
          submitButtonText='Sign Up' 
          onSubmit={signup} 
          text='Already have an account? Sign In!'
          routeName='SignIn'/>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  }
});
