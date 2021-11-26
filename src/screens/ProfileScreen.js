import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Avatar} from 'react-native-paper';

import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import {Context as AuthContext} from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import auth from '../api/auth';
import Loader from '../components/Loader';
import {useIsFocused} from '@react-navigation/native';

const ProfileScreen = ({navigation}) => {
  const {
    state: {authData},
    signout,
  } = useContext(AuthContext);

  const [avatar, setAvatar] = useState('AA');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    const getUserData = async () => {
      try {
        await auth
          .get('/evplug/details', {
            headers: {Authorization: 'Bearer ' + authData.token},
          })
          .then(response => {
            if (response.data !== null || response.data.length > 0) {
              console.log(response.data[0]);
              setProfile(response.data[0]);
              const intials = nameToInitials(`${response.data[0].firstName} ${response.data[0].lastName}`);
              setAvatar(intials);
            }
          })
          .catch(err => {
            console.log('in error');
          });
      } catch (err) {
        console.log('in error');
      }
      setLoading(false);
    };
    if (isFocused) {
      getUserData();
    }
  }, [isFocused]);

  const nameToInitials = (fullName) => {
    const namesArray = fullName.trim().split(' ');
    if (namesArray.length === 1) return `${namesArray[0].charAt(0)}`;
    else return `${namesArray[0].charAt(0)}${namesArray[namesArray.length - 1].charAt(0)}`
  }

  const renderProfile = ({profile}) => {
    return (
      <View style={styles.details}>
        <Text
          style={{
            margin: 10,
            fontSize: 20,
            fontWeight: '500',
            color: Colors.black,
          }}>
          <FontAwesome5 name="id-badge" size={18} color={Colors.primary} />{'  '}
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={{
            margin: 10,
            fontSize: 20,
            fontWeight: '500',
            color: Colors.black,
          }}>
          <Ionicons name="call-sharp" size={18} color={Colors.primary} />{'  '}
          {profile.phoneNumber}
        </Text>
        <TouchableOpacity
          style={{backgroundColor: Colors.primary}}
          onPress={() => {
            navigation.navigate('Edit', {profile});
          }}
          style={{padding: 10}}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            <Ionicons name="pencil" size={16} color={Colors.primary} /> Edit
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderBasic = () => {
    return (
      <View
        style={{
          flex: 2,
          backgroundColor: Colors.white,
          marginTop: 10,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 16, fontWeight: '500', color: Colors.black}}>
          {' '}
          You haven't added any details!
        </Text>
        <TouchableOpacity
          style={{backgroundColor: Colors.primary}}
          onPress={() => {
            navigation.navigate('Edit', {
              profile: null,
            });
          }}
          style={{padding: 10}}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            <Ionicons name="add" size={18} color={Colors.primary} /> Add
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      {loading ? <Loader /> : null}
      <View style={styles.profile}>
        <Avatar.Text
          size={100}
          label={avatar}
          color={Colors.primary}
          backgroundColor={Colors.white}
        />
        <Text style={styles.email}>{authData.email}</Text>
      </View>

      {profile !== null ? renderProfile({profile}) : renderBasic()}

      <View style={styles.signout}>
        <TouchableOpacity onPress={signout} style={styles.button}>
          <Text
            style={{
              color: Colors.white,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            <Ionicons name="log-out" size={18} color={Colors.white} /> Log out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flex: 1,
    backgroundColor: Colors.detailsBannerGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  email: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
  details: {
    flex: 2,
    backgroundColor: Colors.white,
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signout: {
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
