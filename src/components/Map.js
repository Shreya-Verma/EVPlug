import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, {PROVIDER_GOOGLE , Marker, Callout} from 'react-native-maps'
//provider={PROVIDER_GOOGLE} // remove if not using Google Maps

const Map = () => {
    return (
      <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker 
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            pinColor = 'red'
            title="Test Title"
            description="This is the test description"
          >
          </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({
      map: {
        flex: 1,
        height: '100%',
      },
})

export default Map


