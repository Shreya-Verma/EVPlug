import React from 'react';
import {TextInput, StyleSheet, SafeAreaView} from 'react-native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const SearchPlaces = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'YOUR API KEY',
        language: 'en',
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default SearchPlaces;
