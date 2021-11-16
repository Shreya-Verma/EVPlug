import React, {useState} from 'react';
import {
    StyleSheet, 
    Dimensions
  } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import CONFIG from '../../env.config';
import Colors from '../constants/Colors';
//provider={PROVIDER_GOOGLE}
const Map = ({latitude, longitude}) => {
  
  const [region, setRegion] = useState();

  return (
      <MapView
        style={styles.map}
        initialRegion={{
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
           {/* {this.state.markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))} */}
      </MapView>
  );
};

const styles = StyleSheet.create({
  map: { 
    ...StyleSheet.absoluteFillObject,
      position: 'absolute'
  },
  
});

export default Map;