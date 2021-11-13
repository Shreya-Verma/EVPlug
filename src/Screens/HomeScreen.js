import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import Colors from '../constants/Colors';
import Map from '../components/Map';
import SearchPlaces from '../components/SearchPlaces';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <Map/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'black'
  },
});
export default HomeScreen;
