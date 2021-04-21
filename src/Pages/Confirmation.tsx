import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';

export function Confirmation() {
    const navigation = useNavigation();

    function handleMoveOn() {
        navigation.navigate('PlantSelect');
    }

    return(
        <SafeAreaView style={styled.container}>
            <View style={styled.content}>
                <Text style={styled.emoji}>
                😁
                </Text>
                <Text style={styled.title}>
                Prontinho
                </Text>
                <Text style={styled.subtitle}>
                Agora vamos começar a cuidar das suas {'\n'}plantinhas com muito cuidado.
                </Text>
                <View style={styled.footer}>
                    <Button text="Começar" onPress={handleMoveOn}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styled = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    content: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    title: {
        fontSize: 30,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15,
    },

    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 16,
        paddingHorizontal: 10,
        color: colors.heading
    },

    emoji: {
        fontSize: 78
    },

    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 30,
    }
});