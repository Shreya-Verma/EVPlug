import React, {useContext, useEffect, useState} from 'react';
import {Text, StatusBar, StyleSheet, ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Context as FavouritesContext} from '../context/FavouritesContext';

const FavouritesScreen = () => {
  const {state} = useContext(FavouritesContext);

  useEffect(() => {
    if (state.dbList.length > 0) {
        getFavourite(state.dbList);
    }
  }, [state.dbList]);

  const renderBasic = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'black'}}>No favs</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <ScrollView style={styles.scrollFlex}>
        {state.favList.length > 0
          ? state.favList.map(item => (
              <View style={styles.contentFlex} key={item.ID}>
                <Text style={styles.boxHeading}>
                  <Ionicons
                    name="information-circle-sharp"
                    size={16}
                    color={Colors.primary}
                  />
                  {'  '}
                  Additional Information
                </Text>
              </View>
            ))
          : renderBasic()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollFlex: {
    flex: 2,
    margin: 5,
  },
  contentFlex: {
    backgroundColor: Colors.white,
    height: 'auto',
    borderRadius: 4,
    borderColor: Colors.grey,
    borderWidth: 1,
    marginBottom: 1,
    borderBottomColor: Colors.grey,
    padding: 10,
  },
  boxHeading: {
    color: Colors.lightGrey,
    fontSize: 16,
    fontWeight: 'bold',
    margin: 3,
  },
});
