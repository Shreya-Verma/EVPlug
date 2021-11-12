import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {HelperText, TextInput} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../constants/Colors';
import AuthScreenHeader from '../../components/AuthScreenHeader';

const SignupScreen = ({navigation}) => {

  const getValue = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <AuthScreenHeader text="Sign Up!" icon="person-add-outline" />
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <View style={styles.inputBoxesView}>
            <TextInput
              mode="outlined"
              placeholder="john.doe@gmail.com"
              label="Email"
              error={false}
              style={styles.textInput}
              value=""
              outlineColor="grey"
              activeOutlineColor="blue"
              autoCapitalize="none"
              autoCorrect={false}
              right={<TextInput.Icon name="email" />}
              onChangeText={text => setText(text)}
            />
          </View>

          <View style={styles.inputBoxesView}>
            <TextInput
              mode="outlined"
              label="Password"
              secureTextEntry
              error={false}
              style={styles.textInput}
              value=""
              outlineColor="grey"
              activeOutlineColor="blue"
              autoCapitalize="none"
              autoCorrect={false}
              right={<TextInput.Icon name="eye" />}
              onChangeText={text => setText(text)}
            />
          </View>

          <View style={styles.inputBoxesView}>
            <TextInput
              mode="outlined"
              label="Confirm Password"
              error={false}
              style={styles.textInput}
              value=""
              outlineColor="grey"
              activeOutlineColor="blue"
              autoCapitalize="none"
              autoCorrect={false}
              right={<TextInput.Icon name="eye" />}
              onChangeText={text => setText(text)}
            />
          </View>
          
          { true ? (
          <View  style={{alignItems:'center'}}>
            <HelperText>Hello</HelperText>
          </View>
          ) : null }

          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <LinearGradient
                colors={[Colors.buttonGradient1, Colors.buttonGradient2]}
                style={styles.button}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop: 15}} onPress={()=> navigation.navigate('SignIn')}>
              <Text
                style={{
                  color: Colors.primary,
                  marginTop: 15,
                  fontSize: 14,
                  fontWeight: 'normal',
                }}>
               Already have an account? Sign In
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142850',
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputBoxesView: {
    flexDirection: 'row',
    marginTop: 15,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
  },
  buttonView: {
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }
});
