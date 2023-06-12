import React, {useState, useEffect} from "react";
import {Text, View, SafeAreaView, TextInput, StyleSheet, Alert, TouchableOpacity} from "react-native";
import { Button } from 'react-native-paper';
import { getDocs, doc, addDoc, collection } from "firebase/firestore";
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import { db } from "../../../database/firebase";

export default function PendientesAgregar({navigation}){

    const [reparacion, setReparacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [empleado, setEmpleado] = useState(true);

    const [trabajadores, setTrabajadores] = useState([]);
    const [opcionesDropdown, setOpcionesDropdown] = useState([]);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePicker2, setShowDatePicker2] = useState(false);


    const handleOpenDatePicker = () => {
        setShowDatePicker(true);
    };

    const handleOpenDatePicker2 = () => {
        setShowDatePicker2(true);
    };

    const handleDateChange = (_, date) => {
        setShowDatePicker(false);
        setFecha(date.toISOString().split('T')[0]); 
    };

    const handleDateChange2 = (_, date) => {
        setShowDatePicker2(false);
        setFechaEntrega(date.toISOString().split('T')[0]); 
    };

    const getTrabajadores = async () => {
        const dataColl = collection(db, "trabajadores");
        const docsDB = await getDocs(dataColl);
        const readTrabajadores = [];
        docsDB.forEach((doc) => {
            const { nombre } = doc.data();
            readTrabajadores.push(nombre);
        });
        setTrabajadores(readTrabajadores);
    };

    const obtenerOpcionesDropdown = () => {
        const arregloModificado = trabajadores.map((elemento) => {
            if (elemento) {
                return elemento.trim();
            } else {
                return 'No jala';
            }
        });
        setOpcionesDropdown(arregloModificado);
    };

    useEffect(() => {
        getTrabajadores();
    }, []);

    useEffect(() => {
        if (trabajadores.length > 0) {
            obtenerOpcionesDropdown();
        }
    }, [trabajadores]);


    const  SaveNewTrabajador= async ()=> {
        if (reparacion=== ''){
            Alert.alert(
                'Completar reparacion',
                'Por favor introduce el reparacion',
                [
                    {
                        text: 'Ok',
                        style: 'destructive'
                    },
                ],
                {cancelable: false} 
            )
        }

        else if (descripcion === ''){
            Alert.alert(
                    'Completar descripcion',
                    'Por favor introduce el descripcion',
                    [
                        {
                            text: 'Ok',
                            style: 'destructive'
                        },
                    ],
                    {cancelable: false} 
                )
            }

            else if (fecha === ''){
                Alert.alert(
                        'Completar fecha',
                        'Por favor introduce la fecha',
                        [
                            {
                                text: 'Ok',
                                style: 'destructive'
                            },
                        ],
                        {cancelable: false} 
                    )
                }
                else if (fechaEntrega === ''){
                        Alert.alert(
                                'Completar fecha de entrega',
                                'Por favor introduce la fecha de entrega',
                                [
                                    {
                                        text: 'Ok',
                                        style: 'destructive'
                                    },
                                ],
                                {cancelable: false} 
                            )
                        }else if (empleado === ''){
                            Alert.alert(
                                    'Completar empleado',
                                    'Por favor seleccione un empleado',
                                    [
                                        {
                                            text: 'Ok',
                                            style: 'destructive'
                                        },
                                    ],
                                    {cancelable: false} 
                                )
                            }else{
                                const dataColl = collection(db, "pendientes");
                                    const pendiente = await addDoc(dataColl,{
                                        reparacion: reparacion,
                                        descripcion: descripcion,
                                        fechaRep: fecha,
                                        fechaEntrega: fechaEntrega,
                                        empleado: empleado,
                                        estado: 'Pendiente',
                                    })
                                    Alert.alert(
                                        'Pendiente agregado',
                                        'Pendiente agregada correctamente',
                                        [
                                            {
                                                text: 'OK'
                                            },
                                        ],
                                        { cancelable: false }
                                    )
                                    navigation.navigate('Pendientes')
                                }
                
    }//fin save

    return(
        <SafeAreaView style={styles.maincontainer}>
            <View style={styles.from}>
                <Text style={styles.titulos}>
                    Reparación
                </Text>
                <TextInput onChangeText={text=> setReparacion(text)}
                    style={styles.textInput}
                    value={reparacion}
                />
                <Text style={styles.titulos}>
                    Descripción
                </Text>
                <TextInput onChangeText={text=>setDescripcion(text)}
                    style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                    value={descripcion}
                    multiline={true}
                />
                <Text style={styles.titulos}>
                    Fecha Reparación
                </Text>
                <TouchableOpacity onPress={handleOpenDatePicker} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={[styles.textInput, { backgroundColor: '#f2f2f2', width:'87%' }]} 
                        value={fecha}
                        editable={false} 
                    />
                    <MaterialCommunityIcons name="calendar" size={35} color="black" style={styles.icon} />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                <Text style={styles.titulos}>
                    Fecha Entrega
                </Text>
                <TouchableOpacity onPress={handleOpenDatePicker2} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={[styles.textInput, { backgroundColor: '#f2f2f2', width:'87%' }]} 
                        value={fechaEntrega}
                        editable={false} 
                    />
                    <MaterialCommunityIcons name="calendar" size={35} color="black" style={styles.icon} />
                </TouchableOpacity>
                {showDatePicker2 && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={handleDateChange2}
                    />
                )}
                <Text style={styles.titulos}>
                    Empleado asignado
                </Text>
                {opcionesDropdown.length > 0 ? (
                    <View>
                        <SelectDropdown
                            buttonStyle={{ 
                                width: '100%',
                            }}
                            data={opcionesDropdown}
                            defaultButtonText="Selecciona una empleado"
                            onSelect={(selectedItem, index) => {
                                setEmpleado(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />
                    </View>
                ) : (
                    <Text style={styles.titulos}>
                        Cargando
                    </Text>
                )}
                {/* <Text style={styles.titulos}>
                    Imagen
                </Text>
                <View>
                    <Button title="Seleccionar imagen" onPress={selectImage} />
                    {selectedImage && (
                        <Image source={selectedImage} style={{ width: 200, height: 200 }} />
                    )}
                </View> */}
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