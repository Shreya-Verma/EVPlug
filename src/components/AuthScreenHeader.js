import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const AuthScreenHeader = (props) => {
  return (
    <View style={styles.header}>
      <Ionicons name={props.icon} size={40} color={Colors.white} />
      <Text style={styles.text_header}>{props.text}</Text>
    </View>
  );
};

export default AuthScreenHeader;

const styles = StyleSheet.create({
    header:{
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    text_header:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    }
})