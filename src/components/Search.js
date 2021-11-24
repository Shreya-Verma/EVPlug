import React, { useState } from 'react'
import { StyleSheet , View, KeyboardAvoidingView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import CONFIG from "../../env.config";
import Colors from '../constants/Colors';
import LocationContext from '../context/LocationContext';

const Search = ({search}) => {

    return (
      <KeyboardAvoidingView style={styles.container}>
        <GooglePlacesAutocomplete
        styles={styles.searchbar}
        
        placeholder="Search"
        query={{
          key: CONFIG.GOOGLE_API_KEY,
          language: 'en',
          components: "country:us"
        }}
        fetchDetails={true}
        renderLeftButton={() => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons name="location-sharp" color={Colors.primary} size={24} />
          </View>
        )}
        onPress={(data, details) => {
          search({latitude:details.geometry.location.lat , longitude:details.geometry.location.lng});
        }}
        enablePoweredByContainer={false}
      />
      </KeyboardAvoidingView>
    )
}

export default Search

const styles = StyleSheet.create({
    container:{
      marginTop: 15, 
      flexDirection: "row",
    },
    searchbar: {

        
        description: {
          fontWeight: 'bold',
          color: Colors.primary
        },
        predefinedPlacesDescription: {
          color: Colors.primary,
        },
        textInputContainer: {
          backgroundColor: Colors.white,
          borderRadius: 50,
          flexDirection: "row",
          alignItems: "center",
          marginRight: 10,
          marginLeft: 10,
          color: Colors.primary
        },
        textInput: {
          backgroundColor: Colors.white,
          borderRadius: 20,
          fontWeight: 'normal',
          color: Colors.primary,
        
        },
        listView: {
          top: 2,
          backgroundColor: Colors.white,
          borderRadius: 10,
          flexDirection: "row",
          marginRight: 15,
          marginLeft: 15
        },
      }
})

