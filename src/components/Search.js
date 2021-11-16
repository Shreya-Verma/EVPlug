import React from 'react'
import { StyleSheet , Dimensions, Platform , View} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CONFIG from '../../env.config';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Search = (props) => {

    return (
      <View style={{ marginTop: 15, flexDirection: "row" }}>
        <GooglePlacesAutocomplete
        styles={styles.searchbar}
        placeholder="Search"
        query={{
          key: CONFIG.GOOGLE_API_KEY,
          language: 'en',
        }}
        renderLeftButton={() => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        onPress={(data, details = null) => {
          console.log(data);
        }}
      />
      </View>
    )
}
export default Search

const styles = StyleSheet.create({
    searchbar: {
        description: {
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: Colors.primary,
        },
        textInputContainer: {
          backgroundColor: "white",
          borderRadius: 50,
          flexDirection: "row",
          alignItems: "center",
          marginRight: 10,
          marginLeft: 10
        },
        textInput: {
          backgroundColor: "white",
          borderRadius: 20,
          fontWeight: 'normal',
          
        },
        listView: {
          top: 2,
          backgroundColor: "white",
          borderRadius: 10,
          flexDirection: "row",
          marginRight: 15,
          marginLeft: 15
        },
      },
})
