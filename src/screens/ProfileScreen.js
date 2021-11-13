import React from 'react'
import { View, Text , StatusBar} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constants/Colors'

const ProfileScreen = () => {
    return (
        <SafeAreaView>
             <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            <Text>ProfileScreen</Text>
        </SafeAreaView>
    )
}

export default ProfileScreen
