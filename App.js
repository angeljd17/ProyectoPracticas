import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaInicio from './PaginaInicio';
import PaginaListado from './PaginaListado';
import PaginaPerfil from './PaginaPerfil';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={PaginaInicio} />
        <Stack.Screen name="Listado" component={PaginaListado} />
        <Stack.Screen name="Perfil" component={PaginaPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
