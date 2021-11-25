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
import EncryptedStorage from 'react-native-encrypted-storage';

import Colors from '../constants/Colors';
import {Context as FavouritesContext} from '../context/FavouritesContext';
import OCMApi from '../api/OCMApi';
import auth from '../api/auth';
import Loader from '../components/Loader';

const FavouritesScreen = () => {
  const {removeFromFav} = useContext(FavouritesContext);
  const [remove, setRemove] = useState(0);
  const [list, setList] = useState([]);
  const [dbList, setDBList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getDBList = async () => {
      setLoading(true);
      try {
        const token = await EncryptedStorage.getItem('token');
        await auth
          .get('/evplug/getFav', {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(resp => {
            
            setDBList(resp.data[0].fav);
          })
          .catch(err => {
            setError(true);
          });
      } catch (err) {
        setError(true);
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
        await OCMApi.get(`/poi?output=json&chargepointid=${dbList.join()}`)
          .then(resp => {
            setList(resp.data);
          })
          .catch(error => {
            setError(true);
          });
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    if (dbList.length > 0) {
      getChargingPointDetails();
    }
  }, [dbList]);

  const handlePress = async id => {
    setLoading(true);
    await removeFromFav(id)
      .then(response => {
        setRemove(id);
      })
      .catch(error => {
        setError(true);
      });
    setLoading(false);
  };

  const renderBasic = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
          No Favourites added
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
        renderBasic()
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
