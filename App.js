import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import { Provider as AuthProvider } from './src/context/AuthContext';
import {Provider as LocationProvider} from './src/context/LocationContext';
import {Provider as FavouritesProvider} from './src/context/FavouritesContext';
import RootNavigation from './src/routes/RootNavigation';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);


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
