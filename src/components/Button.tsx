import React from 'react';
import {Text, TouchableOpacity, StyleSheet, TouchableOpacityProps} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    text: string;
}

export function Button({ text, ...rest }: ButtonProps) {
    return( 
        <TouchableOpacity style={styled.container}{...rest}>
            <Text style={styled.text}>
                { text }
            </Text>
        </TouchableOpacity>
    );
}

const styled = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
     }
});