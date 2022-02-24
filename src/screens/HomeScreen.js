import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, StatusBar, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';

import Colors from '../constants/Colors';
import Map from '../components/Map';
import Search from '../components/Search';
import {Context as LocationContext} from '../context/LocationContext';

const HomeScreen = () => {
  const {
    state: {evdetails, searchedLocation},
    fetchPoiData,
    fetchSearchedLocation,
  } = useContext(LocationContext);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getUsersLocation = async () => {
      Geolocation.getCurrentPosition(
        response => {
          const {latitude, longitude} = response.coords;
          setLocation({latitude: latitude, longitude: longitude});
        },
        error => {
          setLocation({latitude: 37.773972, longitude: -122.431297});
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          distanceFilter: 10, //meters
        },
      );
    };
    getUsersLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.darkPrimary}
        barStyle="light-content"
      />
      {location ? (
        <Map
          fetchChargingStations={fetchPoiData}
          chargingStations={evdetails}
          searchedRegion={searchedLocation}
          currentLocation={location}
        />
      ) : null}

      <Search search={fetchSearchedLocation} />
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
