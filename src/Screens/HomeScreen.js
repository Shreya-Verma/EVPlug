import React, {useState, useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import Map from '../components/Map';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, RESULTS , request} from 'react-native-permissions';
import Search from '../components/Search';


const HomeScreen = ({navigation}) => {
  const [userLocation, setUserLocation] = useState();
  const [hasPermission, setHasPermission] = useState(null);
  const [city, setCity] = useState('');

  useEffect(()=>{
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    ).then(res => {
        if (res == 'granted') {
          setHasPermission(true);
        }else if(res === 'blocked'){
          console.log("Error erequesting permissions")  
        }else if (res === 'denied'){
          console.log("Error erequesting permissions")
        }
      })
      .catch(error => {
        console.log("Error erequesting permissions")
      });
  },[]);



  if (hasPermission) {
    Geolocation.getCurrentPosition(info => console.log(info));
  }else{

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkPrimary} barStyle="light-content" />
        <Map region/>
        <Search handleCity={setCity}/>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
export default HomeScreen;
