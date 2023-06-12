import React, {useState} from "react";
import {Text, View, SafeAreaView, TextInput, StyleSheet, Alert,TouchableOpacity} from "react-native";
import { Button } from 'react-native-paper';
import { Header } from 'react-native-elements';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../database/firebase";

export default function Registrarse({navigation}){
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
                            const dataColl = collection(db, "clientes");
                                const trabajador = await addDoc(dataColl,{
                                    nombre: nombre,
                                    usuario: usuario,
                                    contrasena: contrasena,
                                    telefono: telefono,
                                })
                                Alert.alert(
                                    'Registro terminado',
                                    'Se ha registrado correctamente',
                                    [
                                        {
                                            text: 'OK'
                                        },
                                    ],
                                    { cancelable: false }
                                )
                                navigation.navigate('Login')
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
            <Header
                placement="left"
                backgroundColor="#9088CA"
                leftComponent={{ 
                    icon: 'menu', 
                    color: '#000000',
                    size: 30,
                }}
                rightComponent={{
                text: 'Registarse', 
                    style: { 
                        color: '#000000',
                        fontSize: 24,
                    } 
                }}
            />
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
                <TouchableOpacity style={styles.button} onPress={ () => SaveNewTrabajador() }>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
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

    button: {
        backgroundColor: '#8279C3',
        padding: 10,
        borderRadius: 10,
        margin: 40,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
})