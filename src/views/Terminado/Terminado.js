import React from "react";
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Header } from 'react-native-elements';

export default function Terminado({navigation}){
    const toggleSlider = () => {
        setIsSliderVisible(!isSliderVisible);
    };

    return(
        <View>
            <Header
                placement="left"
                backgroundColor="#9088CA"
                leftComponent={{ 
                    icon: 'menu', 
                    color: '#000000',
                    size: 30,
                }}
                rightComponent={{
                text: 'Terminado', 
                    style: { 
                        color: '#000000',
                        fontSize: 24,
                    } 
                }}
            />
            <Text>Hola Terminados</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonImage: {
        width: 5,
        height: 5,
    },
});