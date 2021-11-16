import React, {useEffect , useState} from 'react';
import { NavigationContainer} from '@react-navigation/native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import {Provider as AuthProvider} from './src/context/AuthContext';
import MainTabsNavigation from './src/routes/MainTabsNavigation';
import AuthNavigation from './src/routes/AuthNavigation';
import auth from '@react-native-firebase/auth';

const App = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log(user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);


  if (initializing) return null;

  return (
    <AuthProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            {!user ? <AuthNavigation /> : <MainTabsNavigation />}
          </NavigationContainer>
        </SafeAreaProvider>
    </AuthProvider>
  );
};

export default App;
