import React, { useState, useEffect } from "react";
import {View, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView} from 'react-native';
import { Header } from 'react-native-elements';
import {ListItem, Button} from "@rneui/base";
import Ionicons from '@expo/vector-icons/Ionicons';

import { db } from "../../../database/firebase";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";

export default function Citas({navigation}){
    const [isSliderVisible, setIsSliderVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [citas, setCitas] = useState([])

    const handleAddCita = () => {
        navigation.navigate('CitaAgregar');
    };

    const toggleSlider = () => {
        setIsSliderVisible(!isSliderVisible);
    };

    const getCitas = async() =>{
        const dataColl = collection(db, "citas");
        const docsDB = await getDocs(dataColl);
        const readCitas = [];
        docsDB.forEach((doc)=>{
            const {fecha, hora, descripcion, local} = doc.data();
            readCitas.push({
                id: doc.id,
                fecha, 
                hora,
                descripcion,
                local
            })
        })
        setCitas(readCitas)
        setLoading(false); 
    } //Fin del get

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true);
            getCitas();
        });
    
        return unsubscribe;
    }, [navigation]);

    return(
        <SafeAreaView style={styles.container}>
                <Header
                    placement="left"
                    backgroundColor="#9088CA"
                    leftComponent={{ 
                        icon: 'menu', 
                        color: '#000000',
                        size: 30,
                    }}
                    rightComponent={{
                    text: 'Citas', 
                        style: { 
                            color: '#000000',
                            fontSize: 24,
                        } 
                    }}
                />
                {loading ? (
                <Text>Cargando Citas</Text>
                    ):(
                        <ScrollView>
                            {
                                citas.map((cita, index) =>{
                                    return(
                                        <ListItem key={cita.id}
                                            onPress={() => {
                                                navigation.navigate('CitaDetalle', {
                                                    id: cita.id
                                                });
                                            }}
                                        >
                                            <ListItem.Content style={styles.containeritem}>
                                                <ListItem.Title >{`${index + 1}. `}</ListItem.Title>
                                                <ListItem.Title style={{ textAlign: 'left' }}>{cita.fecha}</ListItem.Title>
                                                <ListItem.Subtitle>{cita.descripcion.slice(0, 20)}{cita.descripcion.length > 20 ? '...' : ''}</ListItem.Subtitle>
                                            </ListItem.Content> 
                                        </ListItem>
                                    )
                                })
                            }
                        </ScrollView>
                    )
                }
                {isSliderVisible && (
                    <View>
                        <Text style={{color: 'black'}}>Hola Citas</Text>
                    </View>
                )}
                
                <TouchableOpacity style={styles.button} onPress={handleAddCita}>
                        <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    button: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#9088CA',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    buttonText: {
        fontSize: 40,
        color: '#FFF',
    },

    buttonImage: {
        width: 5,
        height: 5,
    },

    containeritem: {
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1.2,
        borderRadius: 20
    },
    
    textos: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    }
});
