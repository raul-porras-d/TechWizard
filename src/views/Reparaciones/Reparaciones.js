import React from "react";
import {Text, View, TouchableOpaciti} from 'react-native';
import { Header } from 'react-native-elements';

export default function Reparaciones({navigation}){
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
                text: 'Reparaciones', 
                    style: { 
                        color: '#000000',
                        fontSize: 24,
                    } 
                }}
            />
            <Text>Hola Reparaciones</Text>
        </View>
    )
}