import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { format, isBefore } from 'date-fns';
import DataTimePicker, {Event} from '@react-native-community/datetimepicker';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import { SvgFromUri } from 'react-native-svg';
import waterDrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantProps, savePlant } from '../libs/storage';

interface Params {
    plant: PlantProps
}

export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDataPicker, setShowDataPicker] = useState(false);
    const route = useRoute();
    const { plant } = route.params as Params;
    const navigation = useNavigation();

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if(Platform.OS === 'android') {
            setShowDataPicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰');
        }
        
        if(dateTime) {
            setSelectedDateTime(dateTime);
        } 
    }

    async function handleSave() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subTitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants'
            });
        } catch  {
            Alert.alert('Não foi possivel salvar. 😪');
        }
    }

    return(
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styled.container}
        >
            <View style={styled.container}>
                <View style={styled.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />
                    <Text style={styled.plantName}>
                        {plant.name}
                    </Text>

                    <Text style={styled.plantAbout}>
                        {plant.about}
                    </Text>
                </View>

                <View style={styled.controllers}>
                    <View style={styled.tipContainer}>
                        <Image source={waterDrop} style={styled.tipImage}/>
                        <Text style={styled.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>
                    <Text style={styled.alertLabel}>
                        Escolha o melhor horário para ser lembrado:
                    </Text>

                    {showDataPicker && (
                        <DataTimePicker
                        value={selectedDateTime}
                        mode='time'
                        onChange={handleChangeTime}
                        />
                    )}  

                    {   Platform.OS === 'android' && (
                        <TouchableOpacity onPress={() => setShowDataPicker(oldState => !oldState)} style={styled.button}>
                            <Text style={styled.dateTimePickerText}>
                                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                            </Text>
                        </TouchableOpacity>
                    )

                    } 


                    <Button text="Cadastrar planta" onPress={() => handleSave()}/>
                </View>
            </View>
        </ScrollView>
    );
}

const styled = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },

    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },

    controllers: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: getBottomSpace() || 20
    },

    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },

    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },

    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 10
    },

    tipImage: {
        width: 56,
        height: 56
    },

    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },

    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },

    button: {
        alignItems: 'center',
        width: '100%',
        paddingVertical: 40,
        borderRadius: 20
    },

    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
});