import React from 'react';
import { StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import loadAnimation from '../assets/load.json';

export function Load() {
    return(
        <View style={styled.container}>
            <LottieView
                source={loadAnimation}
                autoPlay
                loop
                style={styled.animation}
            />
        </View>
    );
}

const styled = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    animation: {
        backgroundColor: 'transparent',
        width: 200,
        height: 200
    }   
});
