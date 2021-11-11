import React from 'react'
import { SafeAreaView, View, StyleSheet} from 'react-native'


const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
           {/* <EVPlugMap /> */}
          
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
