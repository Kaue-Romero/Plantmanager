import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    Alert
} from 'react-native';
import { Header } from '../components/Header';
import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<string>();

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não ❌',
                style: 'cancel'
            },
            {
                text: 'Sim 👍',
                onPress: async () => {
                    try {
                        await removePlant(plant.objectId)

                        setMyPlants((oldData) => (
                            oldData.filter((item) => item.objectId !== plant.objectId)
                        ));
                    } catch (error) {
                        Alert.alert('Não foi possivel remover!')
                    }
                }
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            );
            setNextWaterd(
                `Não esqueça de regar a ${'\n'}${plantsStoraged[0].name}${'\n'}à ${nextTime}.`
            );

            setMyPlants(plantsStoraged);
            setIsLoading(false);

        }

        loadStorageData();
    },[]);

    if(isLoading) {
        return <Load/>
    }

    return(
        <View style={styled.container}>
            <Header/>
            <View style={styled.spotlight}>
                <Image source={waterdrop} style={styled.spotlightImage}/>
                <Text style={styled. spotlightText}>
                    {nextWaterd}
                </Text>
            </View>
            <View style={styled.plants}>
                <Text style={styled.plantsTitle}>
                    Próximas regadas
                </Text>
                <FlatList 
                    data={myPlants}
                    keyExtractor={(item) => String(item.objectId)}
                    renderItem={({item}) => (
                        <PlantCardSecondary 
                        data={item}
                        handleRemove={() => handleRemove(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    />
            </View>
        </View>
    );
}

const styled = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },

    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    spotlightImage: {
        width: 60,
        height: 60,
    },

    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 10,
        textAlign: 'left',
        lineHeight: 23
    },

    plants: {
        flex: 1,
        width: '100%'
    },

    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
});