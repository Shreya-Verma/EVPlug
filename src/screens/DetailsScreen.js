import React, { useState, useEffect, useContext } from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import EncryptedStorage from 'react-native-encrypted-storage';

import Colors from '../constants/Colors';
import OCMApi from '../api/OCMApi';
import Details from '../components/Details';
import { Context as FavouritesContext} from '../context/FavouritesContext';
import Loader from '../components/Loader';

const DetailsScreen = ({route}) => {

  const { ocmid } = route.params;
  const {addToFav, removeFromFav } = useContext(FavouritesContext);
  
  const [ocmDeatils, setOcmDetails] = useState(null);
  const [loading,setLoading] = useState(false);


  useEffect(() => {
    const getDetails = async (ocmid) =>{
      await OCMApi.get(`/poi?chargepointid=${ocmid}&output=json`).then((response)=>{
        setOcmDetails(response.data[0]);
      }).catch((err) => {
        setOcmDetails(null);
      });
    }
    setLoading(true);
    getDetails(ocmid);
    setLoading(false);
  },[])

  
  const renderBasic = () =>{
    return (
      <View style={styles.nodataView}>
      <Text style={{fontSize: 16, fontWeight:'bold', color:Colors.black}}>No Details Available</Text>
    </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      {loading? <Loader/> : null}
      
      {
        ocmDeatils ? <Details details={ocmDeatils}  add={addToFav} remove={removeFromFav}/> : renderBasic()
      
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
