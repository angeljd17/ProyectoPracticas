import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa el icono que desees usar
import PaginaInicio from './PaginaInicio';
import PaginaListado from './PaginaListado';
import PaginaPerfil from './PaginaPerfil';
import GestionPeliculas from './GestionPeliculas';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Listado') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Películas') {
            iconName = focused ? 'film' : 'film-outline'; // Ícono de películas
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        // Color de fondo de la barra de navegación, consta del color activo y el color inactivo
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Inicio" component={PaginaInicio} />
      <Tab.Screen name="Listado" component={PaginaListado} />
      <Tab.Screen name="Perfil" component={PaginaPerfil} />
      <Tab.Screen name="Películas" component={GestionPeliculas} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
