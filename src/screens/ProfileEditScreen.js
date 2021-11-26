import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Context as AuthContext} from '../context/AuthContext';
import Loader from '../components/Loader';
import auth from '../api/auth';
import { useIsFocused } from '@react-navigation/native';


const ProfileEditScreen = ({route, navigation}) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const {profile} = route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    const setUserData = async => {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setPhone(profile.phoneNumber.toString());
    };

    if(profile!== null && isFocused){
      setUserData();
    }
  }, [isFocused]);

  const {
    state: {authData},
  } = useContext(AuthContext);

  const doSubmit = async () => {
    setLoading(true);
    try {
    
    const response = await auth.post('/evplug/update',
                {firstName, lastName, phoneNumber},
                {headers: {Authorization: 'Bearer ' + authData.token}});
      if(response.data){
        console.log(response);
        // setFirstName(profile.firstName);
        // setLastName(profile.lastName);
        // setPhone(profile.phoneNumber.toString());
      }
    } catch (err) {
        console.log('in error', err.error);
       // setErrorMessage(err)
    }

    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      {loading ? <Loader /> : null}
      <View style={styles.box}>
        <TextInput
          mode="outlined"
          placeholder="First Name"
          label="First Name"
          error={errorMessage ? true : false}
          style={styles.textInput}
          value={firstName}
          outlineColor="grey"
          activeOutlineColor={Colors.primary}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setFirstName}
        />
        <TextInput
          mode="outlined"
          placeholder="Last Name"
          label="Last Name"
          error={errorMessage ? true : false}
          style={styles.textInput}
          value={lastName}
          outlineColor="grey"
          activeOutlineColor={Colors.primary}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setLastName}
        />
        <TextInput
          mode="outlined"
          placeholder="Phone Number"
          label="Phone Number"
          error={errorMessage ? true : false}
          style={styles.textInput}
          value={phoneNumber}
          outlineColor="grey"
          activeOutlineColor={Colors.primary}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setPhone}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.save}>
        {errorMessage ? (
          <HelperText style={{color: 'red', margin: 5}}>{errorMessage}</HelperText>
        ) : null}
        <TouchableOpacity onPress={doSubmit} style={styles.button}>
          <Text
            style={{
              color: Colors.white,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    marginTop: 10,
  },
  save: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  button: {
    backgroundColor: Colors.primary,
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
