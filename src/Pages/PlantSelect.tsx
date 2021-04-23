import React, {useEffect, useState} from 'react';
import { 
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    FlatList,
} from 'react-native';
import colors from '../styles/colors';
import { Header } from '../components/Header';
import fonts from '../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';
import {Load} from '../components/Load';
import axios from 'axios';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

interface EnviromentProps {
    key: string;
    title: string;
    
}

export function PlantSelect() {
    const [isLoading, setIsLoading] = useState(true);
    const [environments, setEnvironments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');

    const navigation = useNavigation();

    function handleEnvironmentSelected(environment : string) {
        setEnvironmentSelected(environment);
        const filtered = plants.filter(plant => plant.environments.includes(environment))

        if(environment === 'all'){
            return setFilteredPlants(plants);
        }
        
        setFilteredPlants(filtered);
        
            
    }

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate('PlantSave', {plant});
    }

    useEffect(() => {
        async function fetchEnvironment() {
            const { data } = await axios.get(`https://parseapi.back4app.com/classes/PlantsEnviroments?order=name`, {
                headers: {
                    'X-Parse-Application-Id': '5FMSLHM2HBKSp5wlamEAstKiffZq4IQbsuA6tvSW',
                    'X-Parse-REST-API-Key': 'fKV96RNqi4zLiFD6jhnMdgTp7OmdGs0GXmvtCE0s' 
                }
                
            });
            setEnvironments([{
                    key: 'all',
                    title:'Todos'
                },
                ...data.results
            ]);
            
        }
        fetchEnvironment();
    }, []);

    useEffect(() => {
        async function fetchPlants() {
            const { data } = await axios.get('https://parseapi.back4app.com/classes/Plants?order=name', {
                headers: {
                    'X-Parse-Application-Id': '5FMSLHM2HBKSp5wlamEAstKiffZq4IQbsuA6tvSW',
                    'X-Parse-REST-API-Key': 'fKV96RNqi4zLiFD6jhnMdgTp7OmdGs0GXmvtCE0s' 
                }
                
            });
            setPlants(data.results);
            setFilteredPlants(data.results);
            setIsLoading(false);
        }
        fetchPlants();
    }, []);

    if(isLoading) {
        return <Load/>
    }
    return(
        <SafeAreaView style={styled.container}>
            <View style={styled.header}>
                <Header />
                <Text style={styled.title}>Em qual ambiente</Text>
                <Text style={styled.subtitle}>você quer colocar sua planta?</Text>
            </View>
            <View>
                <FlatList
                data={environments}
                keyExtractor={(item) => String(item.key)}
                renderItem={({item}) => (
                    <EnviromentButton
                    title={item.title}
                    active={item.key === environmentSelected}
                    onPress={() => handleEnvironmentSelected(item.key)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styled.environmentList}
                />
            </View>
            <View style={styled.plants}>
                    <FlatList
                    keyExtractor={(item) => String(item.objectId)}
                    data={filteredPlants}
                    renderItem={({item})=>(
                        <PlantCardPrimary 
                        data={item}
                        onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={styled.contentContainerStyle}/>
            </View>
        </SafeAreaView>
    );
}

const styled = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    header: {
        paddingHorizontal: 30,
    },

    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },

    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },

    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginVertical: 32,
        marginLeft: 32,
        paddingRight: 32
    },

    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },

    contentContainerStyle: {

    }
});