import React from 'react'
import { Text, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constants/Colors'

const FavouritesScreen = () => {
    return (
        <SafeAreaView>
             <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            <Text>FavouritesScreen</Text>
        </SafeAreaView>
    )
}

export default FavouritesScreen
