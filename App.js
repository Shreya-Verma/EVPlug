import React, {useEffect} from 'react'
import SplashScreen from 'react-native-splash-screen'
import { Platform } from 'react-native'
import RootNavigation from './src/Routes/RootNavigation'

const App = () => {
  
  useEffect(() => {
    SplashScreen.hide();
  },[]);

  return (
    <RootNavigation/>
  )
} 
export default App;
