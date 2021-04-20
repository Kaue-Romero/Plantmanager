import React from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import { Button } from '../components/Button';

export function Welcome() {
    return(
        <SafeAreaView style={styled.container}>
            <StatusBar style='auto' translucent={false} backgroundColor="#fff"/>
            <Text style={styled.title}>
                Gerencie {'\n'}
                suas plantas {'\n'}
                de forma fácil
            </Text>
            <Image source={wateringImg} style={styled.image}/>
            <Text style={styled.subTitle}>
            Não esqueça mais de regar suas plantas. {'\n'}
            Nós cuidamos de lembrar você sempre que precisar.
            </Text>
            <Button title=">"/>
        </SafeAreaView>
    );
}

const styled = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },

    subTitle: {
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 20,
        color: colors.heading
    },

    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        paddingHorizontal: 10
    },

    buttonText:{
        color: colors.white,
        fontSize: 24,
    },

    image: {
        width: 292,
        height: 284
    }
});