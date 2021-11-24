import React, { useState, useEffect, useContext } from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import OCMApi from '../api/OCMApi';
import Details from '../components/Details';
import { Context as FavouritesContext} from '../context/FavouritesContext';



const DetailsScreen = ({route, navigation}) => {

  const { ocmid } = route.params;
  const {addToFav, removeFromFav } = useContext(FavouritesContext);
  
  const [ocmDeatils, setOcmDetails] = useState(null);
  
  useEffect(() => {
    getDetails(ocmid);
  },[])

  const getDetails = async (ocmid) =>{
    await OCMApi.get(`/poi?chargepointid=${ocmid}&output=json`).then((response)=>{
      setOcmDetails(response.data[0]);
    }).catch((err) => {
      setOcmDetails(null);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      {
        ocmDeatils ? <Details details={ocmDeatils}  add={addToFav} remove={removeFromFav} /> : 
        <View style={styles.nodataView}>
          <Text style={{fontSize: 16, fontWeight:'bold', color:Colors.black}}>No Details Available</Text>
        </View>
      }
      
    </SafeAreaView>
  );
};

export default DetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nodataView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white
  }
 
});
