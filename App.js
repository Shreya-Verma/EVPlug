import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {PERMISSIONS, request} from 'react-native-permissions';


import { Provider as AuthProvider } from './src/context/AuthContext';
import {Provider as LocationProvider} from './src/context/LocationContext';
import {Provider as FavouritesProvider} from './src/context/FavouritesContext';
import RootNavigation from './src/routes/RootNavigation';


const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const getPermission = async () => {
      try {
        const granted = await request(
          Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          }),
        );
      } catch (err) {
        
      }
    };
  getPermission();
  }, [])
 
  
  return (
    <AuthProvider>
      <LocationProvider>
        <FavouritesProvider>
        <SafeAreaProvider>
          <RootNavigation />
        </SafeAreaProvider>
        </FavouritesProvider>
      </LocationProvider>
    </AuthProvider>
  );
};

export default App;
