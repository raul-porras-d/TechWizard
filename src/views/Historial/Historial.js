import React from "react";
import {Text, View} from 'react-native';
import { Header } from 'react-native-elements';

export default function Historial({navigation}){
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
                text: 'Historial', 
                    style: { 
                        color: '#000000',
                        fontSize: 24,
                    } 
                }}
            />
            <Text>Hola Historial</Text>
        </View>
    )
}