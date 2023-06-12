import React, {useState} from "react";
import { View, Button, TextInput, ScrollView, StyleSheet, Alert, Text} from "react-native";
import { setDoc, doc } from "firebase/firestore";
import { RadioButton } from 'react-native-paper';
import { db } from "../../../database/firebase";

const TrabajadorEditar = ({navigation, route}) => {
    const {id, nombre, usuario, telefono, estatus, contrasena, confContrasena} = route.params;

    const [editNombre, setNombre] = useState(nombre);
    const [editUsuario, setUsuario] = useState(usuario);
    const [editContrasena, setContrasena] = useState(contrasena);
    const [editConfContrasena, setConfContrasena] = useState(confContrasena);
    const [editTelefono, setTelefono] = useState(telefono);
    const [editEstatus, setEstatus] = useState(estatus);

    const handleOptionChange = (option) => {
        setEstatus(option);
    };

    const editTrabajador = async ()=>{
        if (editNombre === ''){
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

        else if (editUsuario === ''){
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

            else if (editContrasena === ''){
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
                else if (editConfContrasena === ''){
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
                    }else if (editTelefono === ''){
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
                        }else if (editContrasena === editConfContrasena){
                            await setDoc(
                                doc(db, "trabajadores", id),
                                {
                                    nombre: editNombre,
                                    usuario: editUsuario,
                                    contrasena: editContrasena,
                                    telefono: editTelefono,
                                    estatus: editEstatus
                                },
                                {
                                    merge: true
                                }
                            )
                            Alert.alert(
                                'Trabajador actualizado',
                                'Trabajador actualizado correctamente en la base de datos',
                                [
                                    {
                                        text: 'OK'
                                    },
                                ],
                                {cancelable: false}
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
        
    } //Fin del editTrabajador

    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titulos}>
                    Nombre
                </Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Nombre del usuario"
                    onChangeText={ text => setNombre(text)}
                    value={editNombre}
                />
                <Text style={styles.titulos}>
                    Usuario
                </Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="usuario del usuario"
                    onChangeText={ text => setUsuario(text)}
                    value={editUsuario}
                />
                <Text style={styles.titulos}>
                    Contraseña
                </Text>
                <TextInput onChangeText={text=>setContrasena(text)}
                    style={styles.textInput}
                    value={editContrasena}
                    secureTextEntry={true}
                />
                <Text style={styles.titulos}>
                    Confirmar Contraseña
                </Text>
                <TextInput onChangeText={text=>setConfContrasena(text)}
                    style={styles.textInput}
                    value={editConfContrasena}
                    secureTextEntry={true}
                />
                <Text style={styles.titulos}>
                    Telefono
                </Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Telefono del usuario"
                    onChangeText={ text => setTelefono(text)}
                    value={editTelefono}
                />
                <Text style={styles.titulos}>
                    Estatus
                </Text>
                <View>
                    <RadioButton.Item
                        label="Activo"
                        value="Activo"
                        status={editEstatus === 'Activo' ? 'checked' : 'unchecked'}
                        onPress={() => handleOptionChange('Activo')}
                    />
                    <RadioButton.Item
                        label="Inactivo"
                        value="Inactivo"
                        status={editEstatus === 'Inactivo' ? 'checked' : 'unchecked'}
                        onPress={() => handleOptionChange('Inactivo')}
                    />
                </View>
            </View>
            <View style={{marginTop:40}}>
                <Button 
                    title="Guardar Cambios"
                    onPress={ ()=> editTrabajador()}
                />
            </View>
        </ScrollView>
    )
}

export default TrabajadorEditar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});