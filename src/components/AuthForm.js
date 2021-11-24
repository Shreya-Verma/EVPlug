import React , {useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet,
    ScrollView
  } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {HelperText, TextInput} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


import Colors from '../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Loader from './Loader';

const AuthForm = ({errorMessage, submitButtonText, onSubmit, text, routeName }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const doSubmit = async () =>{
      setLoading(true);
      await onSubmit({email, password});
      setLoading(false);
  }

    return (
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <View style={styles.inputBoxesView}>
            <TextInput
              mode="outlined"
              placeholder="john.doe@gmail.com"
              label="Email"
              error={errorMessage ? true : false}
              style={styles.textInput}
              value={email}
              outlineColor="grey"
              activeOutlineColor={Colors.primary}
              autoCapitalize="none"
              autoCorrect={false}
              right={<TextInput.Icon name="email" />}
              onChangeText={setEmail}
            />
          </View>
         
          <View style={styles.inputBoxesView}>
            <TextInput
              mode="outlined"
              label="Password"
              secureTextEntry
              error={errorMessage ? true : false}
              style={styles.textInput}
              value={password}
              outlineColor="grey"
              activeOutlineColor={Colors.primary}
              autoCapitalize="none"
              autoCorrect={false}
              right={<TextInput.Icon name="eye" />}
              onChangeText={setPassword}
            />
          </View>
         
          { errorMessage ? (
          <View  style={{alignItems:'center'}}>
            <HelperText style={{color:'red'}}>{errorMessage}</HelperText>
          </View>
          ) : null }

          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={doSubmit}>
              <LinearGradient
                colors={[Colors.buttonGradient1, Colors.buttonGradient2]}
                style={styles.button}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                 { submitButtonText }
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop: 15}} onPress={()=> navigation.navigate(routeName)}>
              <Text
                style={{
                  color: Colors.primary,
                  marginTop: 15,
                  fontSize: 14,
                  fontWeight: 'normal',
                }}>
                {text}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        { loading ? <Loader/> : null}

      </Animatable.View>
    )
}

export default AuthForm

const styles = StyleSheet.create({
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: Colors.white,
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
})
