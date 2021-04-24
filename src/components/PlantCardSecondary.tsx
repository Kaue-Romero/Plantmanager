import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated
} from 'react-native';
import { RectButton, RectButtonProps} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { SvgFromUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    };
    handleRemove: () => void;
}

export const PlantCardSecondary = ({data, handleRemove, ...rest} : PlantProps) => {
    return(
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton style={styled.buttonRemove} onPress={handleRemove}>
                            <Feather name="trash" size={32} color={colors.white}/>
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton style={styled.container} {...rest}>
                <SvgFromUri uri={data.photo} width={50} height={50}/>
                <Text style={styled.title}>
                        {data.name}
                    </Text>
                <View style={styled.details}>
                    <Text style={styled.timeLabel}>
                        Regas as
                    </Text>
                    <Text style={styled.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    );
}

const styled = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,
    },

    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading
    },

    details: {
        alignItems: 'flex-end',
    },

    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.blue_light
    },

    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },

    buttonRemove: {
        width: 100,
        height: 95,
        backgroundColor: colors.red,
        marginTop: 8,
        borderRadius: 20,
        position: 'relative',
        right: 25,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 15,
    }
});