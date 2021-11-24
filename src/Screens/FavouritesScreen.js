import React, {useContext, useEffect, useState} from 'react';
import {Text, StatusBar, StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import Colors from '../constants/Colors';
import {Context as FavouritesContext} from '../context/FavouritesContext';
import OCMApi from '../api/OCMApi';
import Loader from '../components/Loader';

const FavouritesScreen = () => {
  const {state, getDBList, removeFromFav} = useContext(FavouritesContext);
  const [remove, setRemove] = useState(false);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getDBList();
      if (state.dbList && state.dbList.length > 0 || remove) {
        console.log(' inside if use effect');
        await OCMApi.get(
          `/poi?output=json&chargepointid=${state.dbList.join()}`,
        )
          .then(resp => {
            setList(resp.data);
          })
          .catch(error => {
            setError(true);
          });
      }
      setLoading(false);
    };
    if (isFocused || remove) {
      fetchData();
    }
  }, [isFocused, remove]);


  const handlePress = async (id) =>{
     await removeFromFav(id).then((response)=>{
        setRemove(true);
     }).catch((error)=>{
        setError(true);
     })
  }

  const renderBasic = () => {
    return (
      <View style={{flex:1, flexDirection: 'column',justifyContent:'center', alignItems: 'center'}}>
        <Text style={{color: 'black', fontSize: 16, fontWeight:'bold'}}>No favs</Text>
      </View>
    );
  };


  const renderList = ({item}) => {
    return (
      <View style={styles.contentFlex} key={item.ID}>
       
        <View style={{flex:2}}>
        <Text style={styles.boxHeading}>
          <Ionicons
            name="location"
            size={16}
            color={Colors.primary}
          />
          {'  '}
          {item.AddressInfo.Title}
        </Text>
        <Text style={{color: Colors.black, fontSize: 12, marginLeft: 10, marginTop: 5}}>
          {item.AddressInfo.Latitude} {item.AddressInfo.Longitude} 
        </Text>
        <Text style={{color: Colors.black, fontSize: 12, marginLeft: 10, marginTop: 5}}>
            OCM-{item.ID}
        </Text>
        </View>
        <View style={{flex:1, flexDirection: 'column'}}>
          <TouchableOpacity style={{alignItems:'flex-end'}} onPress={()=> handlePress(item.ID)}>
            <Ionicons name="star" size={20} color={Colors.primary}/>
          </TouchableOpacity>
        </View>
       
    </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      {loading ? <Loader /> : null}
      <ScrollView>
        {list.length > 0 ? list.map(item => renderList({item})) : renderBasic()}
      </ScrollView>
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
    height: 110,
    borderRadius: 10,
    borderColor: Colors.grey,
    borderWidth: 2,
    borderBottomColor: Colors.grey,
    padding: 10,
    margin: 10,
    marginBottom: 1
  },
  boxHeading: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '500',
    margin: 3,
  },
});
