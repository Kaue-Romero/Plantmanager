import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import UserImg from '../assets/perfil.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
    return(
        <View style={styled.container}>
            <View>
                <Text style={styled.greeting}>Ola,</Text>
                <Text style={styled.userName}>Kaue</Text>
            </View>
            <Image source={UserImg} style={styled.image}/>
        </View>
    );
}

const styled = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
    },

    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },

    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40,
    }
}); 