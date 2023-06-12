import React, {useState, useLayoutEffect } from "react";
import {Text, View, TouchableOpacity, Image, StyleSheet, TextInput, Alert} from 'react-native';
import { db } from "../../database/firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';


/* import { CheckBox } from 'react-native-elements' */

export default function Login({navigation}){

    const [txtUser, setUser] = useState('');
    const [txtPass, setPass] = useState('');

    const handleUserChange = (inputText) => {
        setUser(inputText);
    };
    
    const handlePasswordChange = (inputText) => {
        setPass(inputText);
    };

    /* const [checked, setChecked] = useState(false);

    const handleCheckboxToggle = () => {
        setChecked(!checked);
    }; */

    const handleLogin = async () => {
        if (txtUser === ''){
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

        else if (txtUser === ''){
            Alert.alert(
                    'Completar contraseña',
                    'Por favor introduce la contraseña',
                    [
                        {
                            text: 'Ok',
                            style: 'destructive'
                        },
                    ],
                    {cancelable: false} 
                )
            }else{
                try {
                    const querySnapshot = await getDocs(
                        query(
                            collection(db, 'trabajadores'),
                            where('usuario', '==', txtUser),
                            where('contrasena', '==', txtPass)
                        )
                    );

                    const querySnapshotClie = await getDocs(
                        query(
                            collection(db, 'clientes'),
                            where('usuario', '==', txtUser),
                            where('contrasena', '==', txtPass)
                        )
                    );

                    if (!querySnapshot.empty) {
                        navigation.navigate('Opciones');
                        
                    } else if(!querySnapshotClie.empty){
                        navigation.navigate('OpcionesCliente');
                        
                    } else {
                        Alert.alert(
                            'Error',
                            'Credenciales incorrectas',
                            [
                                {
                                    text: 'OK'
                                },
                            ],
                            { cancelable: false }
                        )
                    }
                } catch (error) {
                    Alert.alert('Error de conexión', error.message);
                }
            }
    };

    const handlePressRegistro = () => {
        navigation.navigate('Registrarse')
    };

    return(
        <View style={styles.container}>
            <Image
                source={require('../img/LogoTech.png')}
                style={styles.imagen}
            />
            <Text style={styles.title}>Iniciar Sesión</Text>
            
            <TextInput
                    style={styles.textInput}
                    placeholder="Ingrese su usuario"
                    onChangeText={handleUserChange}
                    value={txtUser}
            />

            <TextInput
                    style={styles.textInput}
                    placeholder="Ingrese su contraseña"
                    onChangeText={handlePasswordChange}
                    value={txtPass}
                    secureTextEntry={true} 
            />

            {/* <CheckBox
                title="Recordar Contraseña"
                checked={checked}
                onPress={handleCheckboxToggle}
                size={25} 
            /> */}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handlePressRegistro}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    imagen:{
        alignContent: "center",
        width: 250, 
        height: 250,
        margin: 20,
    },

    textInput: {
        height: 40,
        width: '65%',
        borderColor: 'black',
        borderWidth: 1.7,
        paddingHorizontal: 10,
        fontSize: 16,
        margin: 20,
        color: 'black',
        borderRadius: 5,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        margin: 30
    },

    button: {
        backgroundColor: '#8279C3',
        padding: 10,
        borderRadius: 10,
        margin: 15,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    
    buttonContainer: {
        marginTop: 50,
        flexDirection: 'row',
    },
})

