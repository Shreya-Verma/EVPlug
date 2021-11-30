import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';

import Colors from '../constants/Colors';
import {Context as FavouritesContext} from '../context/FavouritesContext';
import OCMApi from '../api/OCMApi';
import Loader from '../components/Loader';


const FavouritesScreen = () => {
  const {state, getFav , removeFromFav} = useContext(FavouritesContext);

  const [remove, setRemove] = useState(0);
  const [list, setList] = useState([]);
  const [secondaryDBList, setSecondaryDBList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getDBList = async () => {
      setLoading(true);
        await getFav();
        if(!state.errorMessage){
          if(state.dbFavList){
            setSecondaryDBList(state.dbFavList);
          }else{
            setSecondaryDBList([]);
          }
        }else{
          //set error
          setError(state.errorMessage);
        }
      setLoading(false);
    };
    if (isFocused || remove > 0) {
      getDBList();
    }
  }, [isFocused, remove]);

  useEffect(() => {
    const getChargingPointDetails = async () => {
      setLoading(true);
      try {
        const response = await OCMApi.get(`/poi?output=json&chargepointid=${secondaryDBList.join()}`);
        if(response && response.data){
          setList(response.data);
        }
      } catch (err) {
        setError("Error fetching favourites!");
      }
      setLoading(false);
    };

    if (secondaryDBList.length > 0) {
      getChargingPointDetails();
    }else{
      setList([]);
    }
  }, [secondaryDBList]);

  const handlePress = async (id) => {
    setLoading(true);
    await removeFromFav(id);
    if(!state.errorMessage){
      setRemove(id);
    }else{
      // set error
      setError(state.errorMessage);
    }
    setLoading(false);
  };

  const renderBasic = ({error}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
          {error ? error : `No Favourites added`}
        </Text>
      </View>
    );
  };

  const renderList = ({item}) => {
    return (
      <View style={styles.contentFlex} key={item.ID}>
        <View style={{flex: 2}}>
          <Text style={styles.boxHeading}>
            <Ionicons name="location" size={16} color={Colors.primary} />
            {'  '}
            {item.AddressInfo.Title}
          </Text>
          <Text
            style={{
              color: Colors.black,
              fontSize: 12,
              marginLeft: 10,
              marginTop: 5,
            }}>
            {item.AddressInfo.Latitude} {item.AddressInfo.Longitude}
          </Text>
          <Text
            style={{
              color: Colors.black,
              fontSize: 12,
              marginLeft: 10,
              marginTop: 5,
            }}>
            OCM-{item.ID}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <TouchableOpacity
            style={{alignItems: 'flex-end'}}
            onPress={() => handlePress(item.ID)}>
            <Ionicons name="star" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      {loading ? <Loader /> : null}
      {list.length > 0 ? (
        <ScrollView>{list.map(item => renderList({item}))}</ScrollView>
      ) : (
        renderBasic({error})
      )}
    </SafeAreaView>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentFlex: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: 100,
    borderRadius: 10,
    borderColor: Colors.grey,
    borderWidth: 2,
    borderBottomColor: Colors.grey,
    padding: 10,
    margin: 10,
    marginBottom: 1,
  },
  boxHeading: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '500',
    margin: 3,
  },
});