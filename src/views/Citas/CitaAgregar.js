import React, {useState} from "react";
import {Text, View, SafeAreaView, TextInput, StyleSheet, Alert, TouchableOpacity} from "react-native";
import { Button } from 'react-native-paper';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../database/firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function CitaAgregar({navigation}){

    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleOpenDatePicker = () => {
        setShowDatePicker(true);
    };

    const handleDateChange = (_, date) => {
        setShowDatePicker(false);
        setFecha(date.toISOString().split('T')[0]); 
    };

    const handleOpenTimePicker = () => {
        setShowTimePicker(true);
    };

    const handleTimeChange = (_, selectedTime) => {
        setShowTimePicker(false);
        
        if (selectedTime) {
            const hours = selectedTime.getHours();
            const minutes = selectedTime.getMinutes();
            const horaString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        setHora(horaString);
        }
    };

    const  SaveNewCita= async ()=> {
        if (fecha === ''){
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

        else if (hora === ''){
            Alert.alert(
                    'Completar fecha',
                    'Por favor introduce la hora',
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
                        'Por favor introduce la descripcion',
                        [
                            {
                                text: 'Ok',
                                style: 'destructive'
                            },
                        ],
                        {cancelable: false} 
                    )
                }
                else{
                    const dataColl = collection(db, "citas");
                        const cita = await addDoc(dataColl,{
                            fecha: fecha,
                            hora: hora,
                            descripcion: descripcion,
                            local: "Direccion de demostracin #129",
                        })
                        Alert.alert(
                            'Cita agregado',
                            'Cita agregada correctamente',
                            [
                                {
                                    text: 'OK'
                                },
                            ],
                            { cancelable: false }
                        )
                        navigation.navigate('Citas')
                    }
                
    }//fin save

    return(
        <SafeAreaView style={styles.maincontainer}>
            <View style={styles.from}>
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>
                        Recuerde que solo atendemos de lunes a viernes de 9:00 am a 7:00 pm
                    </Text>
                </View>
                <Text style={styles.titulos}>
                    Fecha
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
                    Hora
                </Text>
                <TouchableOpacity onPress={handleOpenTimePicker} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput 
                        style={[styles.textInput, { backgroundColor: '#f2f2f2', width:'87%' }]} 
                        value={hora}
                        editable={false} 
                    />
                    <MaterialCommunityIcons name="clock" size={35} color="black" />
                </TouchableOpacity>
                {showTimePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={handleTimeChange}
                        />
                )}
                <Text style={styles.titulos}>
                    Descripción
                </Text>
                <TextInput onChangeText={text=>setDescripcion(text)}
                    style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]}
                    value={descripcion}
                    multiline={true}
                />
                <Text style={styles.titulos}>
                    Local
                </Text>
                <TextInput onChangeText={text=>setTelefono(text)}
                    style={styles.textInput}
                    value={"Direccion de demostracin #129"}
                    editable={false} 
                />
                <Button
                    style={{
                        marginHorizontal:5,
                        marginVertical: 40,
                    }}
                    mode="contained"
                    onPress={ () => SaveNewCita() }
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

    message: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    messageContainer: {
        backgroundColor: '#86AAFC',
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
    },
})