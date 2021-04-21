import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import { RectButton, RectButtonProps} from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { SvgFromUri } from 'react-native-svg';

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
    }
}

export const PlantCardPrimary = ({data, ...rest} : PlantProps) => {
    return(
        <RectButton style={styled.container} {...rest}>
            <SvgFromUri uri={data.photo} width={100} height={100}/>
            <Text style={styled.text}>
                {data.name}
            </Text>
        </RectButton>
    );
}

const styled = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 28,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10,
    },

    text: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginVertical: 16,
    }
});