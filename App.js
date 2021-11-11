import React, {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import { Platform } from 'react-native'
import HomeNavigation from './src/Routes/HomeNavigation'
import AuthNavigation from './src/Routes/AuthNavigation';

const App = () => {
  
  useEffect(() => {
    SplashScreen.hide();
  },[]);

  return (
    <NavigationContainer>
      <AuthNavigation/>
    </NavigationContainer>
    
  )
} 
export default App;
