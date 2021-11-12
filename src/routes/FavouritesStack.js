import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import FavouritesScreen  from '../screens/FavouritesScreen';

const Favourites = createNativeStackNavigator();

const FavouritesStack = () => {
  return (
    <Favourites.Navigator initialRouteName="Favorites">
      <Favourites.Screen name="Favorites" component={FavouritesScreen}></Favourites.Screen>
    </Favourites.Navigator>
  );
};

export default FavouritesStack;
