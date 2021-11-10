import React from 'react'
import { SafeAreaView, StyleSheet} from 'react-native'
import EVPlugMap from '../Components/EVPlugMap'
import Icon from 'react-native-vector-icons/Ionicons'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
           {/* <EVPlugMap /> */}
           <Icon name="caret-forward-circle-sharp" size={30} color="black" />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' , 
        backgroundColor: '#ccc'
    }
})
