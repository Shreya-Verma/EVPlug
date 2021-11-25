import React from 'react';
import { View, StyleSheet , ActivityIndicator} from 'react-native';

const Loader = () =>{
        return(
            <View style={styles.loading}>
                <ActivityIndicator size='large' />
            </View>
        )
}

export default Loader;

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5
    }
})
