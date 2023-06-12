import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/views/Login';
import Registrarse from './src/views/Registrarse';

import Citas from './src/views/Citas/Citas';
import CitaAgregar from './src/views/Citas/CitaAgregar';
import CitaDetalle from './src/views/Citas/CitaDetalle';

import Trabajadores from './src/views/Trabajadores/Trabajadores';
import TrabajadorAgregar from './src/views/Trabajadores/TrabajadorAgregar';
import TrabajadorDetalle from './src/views/Trabajadores/TrabajadorDetalle';
import TrabajadorEditar from './src/views/Trabajadores/TrabajadorEditar';

import Pendientes from './src/views/Pendientes/Pendientes';
import PendientesAgregar from './src/views/Pendientes/PendientesAgregar';
import PendientesDetalle from './src/views/Pendientes/PendientesDetalle';

import EnProceso from './src/views/EnProceso/EnProceso';
import Terminado from './src/views/Terminado/Terminado';
import Reparaciones from './src/views/Reparaciones/Reparaciones';
import Historial from './src/views/Historial/Historial';

const Stack = createNativeStackNavigator();
const  LibraryStack = createBottomTabNavigator();


function LibraryStackScreen() {
  return (
        <LibraryStack.Navigator 
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#9088CA',
            },
            tabBarActiveTintColor: '#000000',
            tabBarInactiveTintColor: '#604466',
          }}
        >
          <LibraryStack.Screen
            name="Citas"
            component={Citas}
            options={{ 
              headerShown: false,
            }}
          />
          
          <LibraryStack.Screen
            name="Pendientes"
            component={Pendientes}
            options={{ 
              headerShown: false
            }}
          />

          <LibraryStack.Screen
            name="EnProceso"
            component={EnProceso}
            options={{ headerShown: false }}
          />

        <LibraryStack.Screen
            name="Terminado"
            component={Terminado}
            options={{ headerShown: false }}
          />

          <LibraryStack.Screen
            name="Trabajadores"
            component={Trabajadores}
            options={{ headerShown: false }}
          />

        </LibraryStack.Navigator>
  )
}

function LibraryStackScreenCliente() {
  return (
        <LibraryStack.Navigator 
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#9088CA',
            },
            tabBarActiveTintColor: '#000000',
            tabBarInactiveTintColor: '#604466',
          }}
        >
          
          <LibraryStack.Screen
            name="Citas"
            component={Citas}
            options={{ 
              headerShown: false
            }}
          />

          <LibraryStack.Screen
            name="Reparaciones"
            component={Reparaciones}
            options={{ 
              headerShown: false
            }}
          />

          <LibraryStack.Screen
            name="Historial"
            component={Historial}
            options={{ 
              headerShown: false
            }}
          />

        </LibraryStack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ='Login' component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name ='Registrarse' component={Registrarse} options={{ headerShown: false }}/>
        <Stack.Screen name ='OpcionesCliente' component={LibraryStackScreenCliente} options={{ headerShown: false }}/>
        <Stack.Screen name ='Opciones' component={LibraryStackScreen} options={{ headerShown: false }}/>

        <Stack.Screen name ='AddTrabajador' component={TrabajadorAgregar} options={{title: 'Agregar Trabajador'}}/>
        <Stack.Screen name = 'TrabajadorDetalle' component={TrabajadorDetalle} options={{title: 'Detalle del trabajador'}} />
        <Stack.Screen name = 'TrabajadorEditar' component={TrabajadorEditar} options={{title: 'Editar trabajador'}} />
      
        <Stack.Screen name = 'CitaAgregar' component={CitaAgregar} options={{title: 'Agregar Cita'}} />
        <Stack.Screen name = 'CitaDetalle' component={CitaDetalle} options={{title: 'Detalle de la Cita'}} />

        <Stack.Screen name = 'PendientesAgregar' component={PendientesAgregar} options={{title: 'Agregar Pendientes'}} />
        <Stack.Screen name = 'PendientesDetalle' component={PendientesDetalle} options={{title: 'Detalles del pendiente'}} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
