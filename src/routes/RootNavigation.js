import React, {useEffect, useState, useContext} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {NavigationContainer} from '@react-navigation/native';

import MainTabsNavigation from './MainTabsNavigation';
import AuthNavigation from './AuthNavigation';
import Loader from '../components/Loader';
import {Context as AuthContext} from '../context/AuthContext';

const RootNavigation = () => {

  const {state:{authData}, restoreToken} = useContext(AuthContext);
  const [initializing, setInitalizing] = useState(true);
 
  useEffect(() => {
    const onAuthStateChanged = async () => {
      await EncryptedStorage.getItem('authData')
        .then(resp => {
          if (resp) {
            restoreToken(JSON.parse(resp));
          }
          setInitalizing(false);
        })
        .catch(err => {
          setInitalizing(false);
        });
    };
    onAuthStateChanged();
  }, [authData.token]);

  if (initializing) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      {!authData.token ? <AuthNavigation /> : <MainTabsNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;