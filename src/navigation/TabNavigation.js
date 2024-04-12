import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaInicio from '../screens/PaginaInicio';
import PaginaPerfil from '../screens/PaginaPerfil';
import GestionPeliculas from '../screens/GestionPeliculas';
import DetallePelicula from '../screens/DetallePelicula';
import PaginaListado from '../screens/PaginaListado';

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
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
        },
      })}
    >
      <Tab.Screen name="Inicio" component={PaginaInicio} />
      <Tab.Screen name="Lista" component={ListadoStack} />
      <Tab.Screen name="Perfil" component={PaginaPerfil} />
      <Tab.Screen name="Buscador" component={GestionPeliculas} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
