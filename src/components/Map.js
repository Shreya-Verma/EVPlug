import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {useNavigation} from '@react-navigation/core';

import Colors from '../constants/Colors';


const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const Map = ({ fetchChargingStations, searchedRegion, chargingStations, currentLocation}) => {
  const navigation = useNavigation();
  const mapRef = useRef(null);

console.log(currentLocation);
const [location, setLocation] = useState({latitude: currentLocation.latitude, longitude:currentLocation.longitude});


const regionChangePoiDetails = data => {
  fetchChargingStations({latitude: data.latitude, longitude: data.longitude});
};


  if (searchedRegion) {
    if (mapRef.current) {
      const newCamera = {
        center: {
          latitude: searchedRegion.latitude,
          longitude: searchedRegion.longitude,
        },
        zoom: 12,
        heading: 0,
        pitch: 0,
        altitude: 5,
      };
      mapRef.current.animateCamera(newCamera, {duration: 2000});
    }
  }

  const mapMarkers = () => {
    return chargingStations.map(details => (
      <Marker
        key={details.ID}
        coordinate={{
          latitude: details.AddressInfo.Latitude,
          longitude: details.AddressInfo.Longitude,
        }}
        pinColor={Colors.primary}>
        <Callout
          tooltip
          onPress={() => {
            navigation.navigate('Details', {
              ocmid: details.ID,
            });
          }}>
          <View>
            <View style={styles.bubble}>
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 5,
                  fontWeight: 'bold',
                  color: Colors.black,
                }}>
                {details.AddressInfo.Title}
              </Text>
              <Text
                style={{
                  color: Colors.primary,
                  fontWeight: '300',
                  fontSize: 10,
                }}>
                OCM-{details.ID}
              </Text>
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
          </View>
        </Callout>
      </Marker>
    ));
  };

  return (
     <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      ref={mapRef}
      showsCompass={true}
      showsUserLocation={true}
      showsMyLocationButton={true}
      onRegionChangeComplete={regionChangePoiDetails}>
      {chargingStations ? mapMarkers() : null}
    </MapView>
   
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
    color: Colors.black,
  },
});

export default Map;
