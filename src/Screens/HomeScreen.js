import React, {useState, useEffect, useContext, useRef} from 'react';
import {StyleSheet, StatusBar, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Colors from '../constants/Colors';
import Map from '../components/Map';
import Search from '../components/Search';
import {Context as LocationContext} from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const HomeScreen = () => {
 
  const {state:{
    evdetails, searchedLocation
  },fetchPoiData, fetchSearchedLocation,fetchCurrentLocation} = useContext(LocationContext);

  const [err] = useLocation(fetchCurrentLocation);
  if(err){
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.darkPrimary}
        barStyle="light-content"
      />
      
      <Map fetchChargingStations={fetchPoiData} chargingStations={evdetails} searchedRegion={searchedLocation}/>
      <Search search={fetchSearchedLocation}/>

    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
