import React, {useState} from "react";
import {Text, View, SafeAreaView, TextInput, StyleSheet, Alert} from "react-native";
import { Button } from 'react-native-paper';
import { addDoc, collection } from "firebase/firestore";

import { db } from "../../../database/firebase";

export default function TrabajadorAgregar({navigation}){

    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confContrasena, setConfContrasena] = useState('');
    const [telefono, setTelefono] = useState('');


    const  SaveNewTrabajador= async ()=> {
        if (nombre=== ''){
            Alert.alert(
                'Completar nombre',
                'Por favor introduce el nombre',
                [
                    {
                        text: 'Ok',
                        style: 'destructive'
                    },
                ],
                {cancelable: false} 
            )
        }

        else if (usuario === ''){
            Alert.alert(
                    'Completar usuario',
                    'Por favor introduce el usuario',
                    [
                        {
                            text: 'Ok',
                            style: 'destructive'
                        },
                    ],
                    {cancelable: false} 
                )
            }

            else if (contrasena === ''){
                Alert.alert(
                        'Completar contrasena',
                        'Por favor introduce la contraseña',
                        [
                            {
                                text: 'Ok',
                                style: 'destructive'
                            },
                        ],
                        {cancelable: false} 
                    )
                }
                else if (confContrasena === ''){
                    Alert.alert(
                            'Completar confirmar contraseña',
                            'Por favor introduce la confirmación de la contraseña',
                            [
                                {
                                    text: 'Ok',
                                    style: 'destructive'
                                },
                            ],
                            {cancelable: false} 
                        )
                    }else if (telefono === ''){
                        Alert.alert(
                                'Completar telefono',
                                'Por favor introduce el telefono',
                                [
                                    {
                                        text: 'Ok',
                                        style: 'destructive'
                                    },
                                ],
                                {cancelable: false} 
                            )
                        }else if (contrasena === confContrasena){
                            const dataColl = collection(db, "trabajadores");
                                const trabajador = await addDoc(dataColl,{
                                    nombre: nombre,
                                    usuario: usuario,
                                    contrasena: contrasena,
                                    telefono: telefono,
                                    estatus: 'Activo'
                                })
                                Alert.alert(
                                    'Trabajador agregado',
                                    'Trabajador agregado correctamente a la base de datos',
                                    [
                                        {
                                            text: 'OK'
                                        },
                                    ],
                                    { cancelable: false }
                                )
                                navigation.navigate('Trabajadores')
                            }else{
                                Alert.alert(
                                    'Contraseñas Distintas',
                                    'Por favor introduce la misma contraseña',
                                    [
                                        {
                                            text: 'Ok',
                                            style: 'destructive'
                                        },
                                    ],
                                    {cancelable: false} 
                                )
                            }
                
    }//fin save

    return(
        <SafeAreaView style={styles.maincontainer}>
            <View style={styles.from}>
                <Text style={styles.titulos}>
                    Nombre
                </Text>
                <TextInput onChangeText={text=> setNombre(text)}
                    style={styles.textInput}
                    value={nombre}
                />
                <Text style={styles.titulos}>
                    Usuario
                </Text>
                <TextInput onChangeText={text=>setUsuario(text)}
                    style={styles.textInput}
                    value={usuario}
                />
                <Text style={styles.titulos}>
                    Contraseña
                </Text>
                <TextInput onChangeText={text=>setContrasena(text)}
                    style={styles.textInput}
                    value={contrasena}
                    secureTextEntry={true}
                />
                <Text style={styles.titulos}>
                    Confirmar Contraseña
                </Text>
                <TextInput onChangeText={text=>setConfContrasena(text)}
                    style={styles.textInput}
                    value={confContrasena}
                    secureTextEntry={true}
                />
                <Text style={styles.titulos}>
                    Telefono
                </Text>
                <TextInput onChangeText={text=>setTelefono(text)}
                    style={styles.textInput}
                    value={telefono}
                />
                <Button
                    style={{
                        marginHorizontal:5,
                        marginVertical: 40,
                    }}
                    mode="contained"
                    onPress={ () => SaveNewTrabajador() }
                >
                    Agregar
                </Button>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    maincontainer:{
        flex: 1, 
    },

    from:{
        paddingHorizontal: 16,
    },

    textInput: {
        height: 32,
        borderColor: 'black',
        borderWidth: 1.5,
        borderRadius: 10,
        margin: 5,
        color: 'black',
        fontSize: 16,
        paddingHorizontal: 5,
    },

    titulos: {
        color: 'black',
        fontSize: 18,
        marginLeft: 5,
        marginTop: 10,
    },
})