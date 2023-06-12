import React, {useLayoutEffect, useState} from "react";
import { Text, View, ActivityIndicator, Button, StyleSheet} from "react-native";
import { ListItem } from "@rneui/base";

import { db } from "../../../database/firebase";
import { doc, getDoc } from 'firebase/firestore';

const CitaDetalle = ({navigation, route}) => {
    const {id} = route.params;

    const [isloading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const getCitaById = async() =>{
        const docRef = doc(db, "citas", id);
        const docDB = await getDoc(docRef);
        setUser(docDB.data());
        const {fecha, hora, descripcion, estatus, local} = docDB.data();
        setLoading(false);
        navigation.setOptions({
            title: fecha
        })
    }

    useLayoutEffect( ()=>{
        if(user===null){
            getCitaById();
        }
    })

    if(isloading){
        return(
            <View>
                <ActivityIndicator />
                <Text>Cargando Cita...</Text>
            </View>
        )
    }

    return (
        <View>
            <ListItem key={user.id}
                onPress={() => { navigation.navigate('Citas')}}>
                <ListItem.Content>
                    <Text style={styles.titulos}>Fecha</Text>
                    <ListItem.Title style={styles.textos}>{user.fecha}</ListItem.Title>
                    <Text style={styles.titulos}>Hora</Text>
                    <ListItem.Subtitle style={styles.textos}>{user.hora}</ListItem.Subtitle>
                    <Text style={styles.titulos}>Descripcion</Text>
                    <ListItem.Subtitle style={styles.textos}>{user.descripcion}</ListItem.Subtitle>
                    <Text style={styles.titulos}>Local</Text>
                    <ListItem.Subtitle style={styles.textos}>{user.local}</ListItem.Subtitle>
                </ListItem.Content> 
            </ListItem>
        </View>
    )
}

export default CitaDetalle;

const styles = StyleSheet.create({    
    titulos: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },

    textos: {
        marginBottom: 15,
        fontSize: 18,
    }
});
