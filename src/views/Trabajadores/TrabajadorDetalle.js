import React, {useLayoutEffect, useState} from "react";
import { Text, View, ActivityIndicator, Button, StyleSheet} from "react-native";
import { ListItem } from "@rneui/base";

import { db } from "../../../database/firebase";
import { doc, getDoc } from 'firebase/firestore';

const TrabajadorDetalle = ({navigation, route}) => {
    const {id} = route.params;

    const [isloading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const getTrabajadorById = async() =>{
        const docRef = doc(db, "trabajadores", id);
        const docDB = await getDoc(docRef);
        setUser(docDB.data());
        const {nombre, usuario, telefono, estatus, contrasena} = docDB.data();
        const confContrasena = contrasena;
        setLoading(false);
        navigation.setOptions({
            headerRight: ()=>(
                <Button
                    onPress={ ()=>
                        navigation.navigate('TrabajadorEditar', {id, nombre, usuario, telefono, estatus, contrasena, confContrasena})
                    }
                    title="Editar"
                />
            ),
            title: nombre
        })
    }

    useLayoutEffect( ()=>{
        if(user===null){
            getTrabajadorById();
        }
    })

    if(isloading){
        return(
            <View>
                <ActivityIndicator />
                <Text>Cargando trabajador...</Text>
            </View>
        )
    }

    return (
        <View>
            <ListItem key={user.id}
                onPress={() => { navigation.navigate('Trabajadores')}}>
                <ListItem.Content>
                    <Text style={styles.titulos}>Nombre</Text>
                    <ListItem.Title style={styles.textos}>{user.nombre}</ListItem.Title>
                    <Text style={styles.titulos}>Usuario</Text>
                    <ListItem.Subtitle style={styles.textos}>{user.usuario}</ListItem.Subtitle>
                    <Text style={styles.titulos}>Telefono</Text>
                    <ListItem.Subtitle style={styles.textos}>{user.telefono}</ListItem.Subtitle>
                    <Text style={styles.titulos}>Estatus</Text>
                    <ListItem.Subtitle style={styles.textos}>{user.estatus}</ListItem.Subtitle>
                </ListItem.Content> 
            </ListItem>
        </View>
    )
}

export default TrabajadorDetalle;

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
