import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
// provider={PROVIDER_GOOGLE} // remove if not using Google Maps
const Map = () => {
  return (
    <View>
      <MapView
       
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          pinColor="red"
          title="Test Title"
          description="This is the test description"></Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

export default Map;
