import React, {useLayoutEffect, useState} from "react";
import { Text, View, ActivityIndicator, StyleSheet} from "react-native";
import { ListItem } from "@rneui/base";
import { Button } from 'react-native-paper';


import { db } from "../../../database/firebase";
import { doc, getDoc } from 'firebase/firestore';

const PendientesDetalle = ({navigation, route}) => {
    const {id} = route.params;

    const [isloading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const getPendienteById = async() =>{
        const docRef = doc(db, "pendientes", id);
        const docDB = await getDoc(docRef);
        setUser(docDB.data());
        const {reparacion, descripcion, fechaRep,fechaEntrega, empleado} = docDB.data();
        setLoading(false);
        navigation.setOptions({
            title: reparacion
        })
    }

    const  IniciarReparacion= async ()=> {
        navigation.navigate('EnProceso');
    }

    useLayoutEffect( ()=>{
        if(user===null){
            getPendienteById();
        }
    })

    if(isloading){
        return(
            <View>
                <ActivityIndicator />
                <Text>Cargando pendiente...</Text>
            </View>
        )
    }

    return (
        <View>
            <ListItem key={user.id}
                onPress={() => { navigation.navigate('Pendientes')}}>
                <ListItem.Content>
                    <Text style={styles.titulos}>Reparacion</Text>
                    <ListItem.Title style={styles.textos}>{user.reparacion}</ListItem.Title>
                    <Text style={styles.titulos}>Descripción</Text>
                    <ListItem.Subtitle style={styles.textos}>{user.descripcion}</ListItem.Subtitle>
                    <Text style={styles.titulos}>Fecha Reparación</Text>
                    <ListItem.Subtitle style={styles.textos}>{user.fechaRep}</ListItem.Subtitle>
                    <Text style={styles.titulos}>Fecha Entrega</Text>
                    <ListItem.Subtitle style={styles.textos}>{user.fechaEntrega}</ListItem.Subtitle>
                    <Text style={styles.titulos}>Empleado Asignado</Text>
                    <ListItem.Subtitle style={styles.textos}>{user.empleado}</ListItem.Subtitle>
                    <Text style={styles.titulos}>Estatus</Text>
                    <ListItem.Subtitle style={styles.textos}>{user.estado}</ListItem.Subtitle>
                    <Button
                        style={{
                            marginHorizontal:0,
                            marginVertical: 40,
                            width:'100%',
                        }}
                        mode="contained"
                        onPress={ () => IniciarReparacion() }
                    >
                        Iniciar Reparacion
                    </Button>
                </ListItem.Content> 
            </ListItem>
        </View>
    )
}

export default PendientesDetalle;

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
