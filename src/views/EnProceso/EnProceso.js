import React, {useState} from "react";
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { Header } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function EnProceso({navigation}){
    const [isSliderVisible, setIsSliderVisible] = useState(false);


    const toggleSlider = () => {
        setIsSliderVisible(!isSliderVisible);
    };
    
    return(
        <View>
            <Header
                placement="left"
                backgroundColor="#9088CA"
                leftComponent={
                    <TouchableOpacity onPress={toggleSlider}>
                        <Ionicons name="menu-outline" size={28} color="black" />
                    </TouchableOpacity>
                }
                rightComponent={{
                text: 'En Proceso', 
                    style: { 
                        color: '#000000',
                        fontSize: 24,
                    } 
                }}
            />
            <Text>Hola Procesos Activos</Text>
            {isSliderVisible && (
                <View>
                    <Text style={{color: 'black'}}>En Proceso</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    buttonImage: {
        width: 5,
        height: 5,
    },
});