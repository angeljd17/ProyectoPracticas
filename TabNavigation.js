import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaInicio from './PaginaInicio';
import PaginaPerfil from './PaginaPerfil';
import GestionPeliculas from './GestionPeliculas';
import DetallePelicula from './DetallePelicula';
import PaginaListado from './PaginaListado';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ListadoStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Películas" component={PaginaListado} />
    <Stack.Screen name="Detalles" component={DetallePelicula} />
  </Stack.Navigator>
);

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Lista') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Buscador') {
            iconName = focused ? 'search' : 'search-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Inicio" component={PaginaInicio} />
      <Tab.Screen name="Lista" component={ListadoStack} />
      <Tab.Screen name="Perfil" component={PaginaPerfil} />
      <Tab.Screen name="Buscador" component={GestionPeliculas} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
