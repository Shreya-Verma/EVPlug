import React, {useEffect} from 'react';
import {NavigationContainer , DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import { Provider as PaperThemeProvider, DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';


import {Provider as AuthProvider} from './src/context/AuthContext';
import MainTabsNavigation from './src/routes/MainTabsNavigation';
import AuthNavigation from './src/routes/AuthNavigation';

const App = () => {
  
  useEffect(() => {
    SplashScreen.hide();
  });

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: 'white',
      text: 'black'
    }
  }

  return (
    <AuthProvider>
      <PaperThemeProvider theme={CustomDefaultTheme}>
        <SafeAreaProvider>
          <NavigationContainer theme={CustomDefaultTheme}>
            {false ? <AuthNavigation /> : <MainTabsNavigation/>}
          </NavigationContainer>
        </SafeAreaProvider>
        </PaperThemeProvider>
    </AuthProvider>
  );
};

export default App;
