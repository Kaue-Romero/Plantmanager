import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function UserIdentification() {
    const navigation = useNavigation();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>('');

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    }

    async function handleSubmit() {
        if(isFilled) {
            try {
                await AsyncStorage.setItem('@plantmanager:user', name);
                navigation.navigate('Confirmation', {
                    title: 'Prontinho',
                    subTitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                    buttonTitle: 'Começar',
                    icon: 'smile',
                    nextScreen: 'PlantSelect'
                });
            } catch {
                Alert.alert('Não consegui salvar seu nome 😢');
            }
            
            
        } else {
            return Alert.alert('Me diz como chamar você 😢')
        }
    }

    return(
         <SafeAreaView style={styled.container}>
            <KeyboardAvoidingView
                style={styled.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styled.content}>
                        <View style={styled.form}>
                            <Text style={styled.emoji}>
                            {isFilled ? '😄' : '😀' }
                            </Text>
                            <Text style={styled.title}>
                            Como podemos {'\n'}
                            chamar você?
                            </Text>
                            <TextInput
                                style={[styled.input,
                                (isFocused || isFilled) && {borderColor: colors.green}]}
                                placeholder="Digite o nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                                maxLength={14}
                            />
                            <View style={styled.footer}>
                            {isFilled ? (
                    <Button
                      text="Confirmar"
                      onPress={handleSubmit}
                    />
                  ) : (
                    <Button
                      text="Confirmar"
                      onPress={handleSubmit}
                      style={styled.buttonDisabled}
                    />
                  )}
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
         </SafeAreaView>
    );
}

const styled = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    content: {
        flex: 1,
        width: '100%'
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    
    emoji: {
        fontSize: 44
    },

    title: {
        fontSize: 24,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32,
        marginTop: 20
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },

    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20,
    },

    footerActive: {
        backgroundColor: colors.gray
    },

    buttonDisabled: {
        backgroundColor: colors.green_light,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }
});