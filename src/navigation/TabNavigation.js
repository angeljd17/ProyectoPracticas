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

const navigationIcons = {
  Inicio: ['home', 'home-outline'],
  Lista: ['list', 'list-outline'],
  Perfil: ['person', 'person-outline'],
  Buscador: ['search', 'search-outline'],
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = navigationIcons[route.name][focused ? 0 : 1];

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
