import React, { useState, useEffect }  from "react";
import {View, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView} from 'react-native';
import { Header } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import {ListItem, Button} from "@rneui/base";

import { db } from "../../../database/firebase";
import { getDocs, collection, query, orderBy } from "firebase/firestore";


export default function Pendientes({navigation}){
    const [isSliderVisible, setIsSliderVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pendientes, setPendientes] = useState([])
    
    const toggleSlider = () => {
        setIsSliderVisible(!isSliderVisible);
    };

    const handleAddPendiente = () => {
        navigation.navigate('PendientesAgregar');
    };

    const getPendientes = async () => {
        const dataColl = collection(db, "pendientes");
        const queryy = query(dataColl, orderBy("fechaEntrega"));
        const querySnapshot = await getDocs(queryy);
        const readPendientes = [];
    
        querySnapshot.forEach((doc) => {
            const { reparacion, fechaEntrega } = doc.data();
            readPendientes.push({
                id: doc.id,
                reparacion,
                fechaEntrega,
            });
        });

        setPendientes(readPendientes);
        setLoading(false);
    };      

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true);
            getPendientes();
        });
    
        return unsubscribe;
    }, [navigation]);

    return(
        <SafeAreaView style={styles.container}>
            <Header
                placement="left"
                backgroundColor="#9088CA"
                leftComponent={
                    <TouchableOpacity onPress={toggleSlider}>
                        <Ionicons name="menu-outline" size={28} color="black" />
                    </TouchableOpacity>
                }
                rightComponent={{
                text: 'Pendientes', 
                    style: { 
                        color: '#000000',
                        fontSize: 24,
                    } 
                }} 
            />
            {loading ? (
                <Text>Cargando Pendientes</Text>
                    ):(
                        <ScrollView>
                            {
                                pendientes.map((pendiente, index) =>{
                                    return(
                                        <ListItem key={pendiente.id}
                                            onPress={() => {
                                                navigation.navigate('PendientesDetalle', {
                                                    id: pendiente.id
                                                });
                                            }}
                                        >
                                            <ListItem.Content style={styles.containeritem}>
                                                <ListItem.Title >{`Pendiente: ${index + 1} `}</ListItem.Title>
                                                <ListItem.Title style={{ textAlign: 'left' }}>{pendiente.reparacion}</ListItem.Title>
                                                <ListItem.Title>{pendiente.fechaEntrega}</ListItem.Title>
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
                    <Text style={{color: 'black'}}>Hola Pendientes</Text>
                </View>
            )}
            <TouchableOpacity style={styles.button} onPress={handleAddPendiente}>
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
        justifyContent: 'space-between',
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
