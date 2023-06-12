import React, { useState, useEffect } from "react";
import {View, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView} from 'react-native';
import { Header } from 'react-native-elements';
import {ListItem, Button} from "@rneui/base";
import Ionicons from '@expo/vector-icons/Ionicons';

import { db } from "../../../database/firebase";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";

export default function Trabajadores({navigation}){
    const [isSliderVisible, setIsSliderVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [trabajadores, setTrabajadores] = useState([])

    const handleAddTrabajador = () => {
        navigation.navigate('AddTrabajador');
    };

    const toggleSlider = () => {
        setIsSliderVisible(!isSliderVisible);
    };

    const getTrabajadores = async() =>{
        const dataColl = collection(db, "trabajadores");
        const docsDB = await getDocs(dataColl);
        const readTrabajadores = [];
        docsDB.forEach((doc)=>{
            const {nombre, usuario, contrasena, telefono} = doc.data();
            readTrabajadores.push({
                id: doc.id,
                nombre, 
                usuario,
                contrasena,
                telefono
            })
        })
        setTrabajadores(readTrabajadores)
        setLoading(false); 
    } //Fin del get

    /* useEffect( ()=>{
        if (trabajadores.length > 0) return;
        setLoading(true);
        getTrabajadores();
    }, [trabajadores]) */
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true);
            getTrabajadores();
        });
    
        return unsubscribe;
    }, [navigation]);

    return(
        <SafeAreaView style={styles.container}>
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
                    text: 'Trabajadores', 
                        style: { 
                            color: '#000000',
                            fontSize: 24,
                        } 
                    }}
                />
        <View>
            {loading ? (
                <Text>Cargando Trabajadores</Text>
            ):(
                <ScrollView>
                    {
                        trabajadores.map((trabajador, index) =>{
                            return(
                                <ListItem key={trabajador.id}
                                    onPress={() => {
                                        navigation.navigate('TrabajadorDetalle', {
                                            id: trabajador.id
                                        });
                                    }}
                                >
                                    <ListItem.Content style={styles.containeritem}>
                                        <ListItem.Title >{`${index + 1}. `}</ListItem.Title>
                                        <ListItem.Title >{trabajador.nombre}</ListItem.Title>
                                        <ListItem.Subtitle>{trabajador.telefono}</ListItem.Subtitle>
                                    </ListItem.Content> 
                                </ListItem>
                            )
                        })
                    }
                </ScrollView>
            )
            }
        </View>
            </View>
            {isSliderVisible && (
                <View>
                    <Text style={{color: 'black'}}>Hola Trabajadores</Text>
                </View>
            )}
            <TouchableOpacity style={styles.button} onPress={handleAddTrabajador}>
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
