import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import useSystemTheme from '../hooks/useSystemTheme'; 

import PaginaPerfil from '../screens/PaginaPerfil';
import PaginaAjustes from '../screens/PaginaAjustes';
import DetallePelicula from '../screens/DetallePelicula';
import PaginaListado from '../screens/PaginaListado';
import InicioSesion from '../screens/authentication/InicioSesion';
import PaginaInicio from '../screens/PaginaInicio';
import PantallaDespuesLogin from '../screens/authentication/PantallaDespuesLogin';
import RegistroUsuario from '../screens/authentication/RegistroUsuario';
import VerificacionEmail from '../screens/authentication/VerificacionEmail';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import GestorDocumental from '../screens/GestorDocumental';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const ListadoStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Películas" component={PaginaListado} />
    <Stack.Screen name="Detalles" component={DetallePelicula} />
  </Stack.Navigator>
);

const PerfilTopTabs = () => (
  <TopTab.Navigator>
    <TopTab.Screen
      name="PaginaPerfil"
      component={PaginaPerfil}
      options={{ tabBarLabel: 'Summary' }}
    />
    <TopTab.Screen
      name="GestorDocumental"
      component={GestorDocumental}
      options={{ tabBarLabel: 'Documentos' }}
    />
  </TopTab.Navigator>
);

const PaginaPerfilStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PaginaInicio" component={PaginaInicio} />
    <Stack.Screen name="PerfilTopTabs" component={PerfilTopTabs} />
    <Stack.Screen name="InicioSesion" component={InicioSesion} />
    <Stack.Screen name="PantallaDespuesLogin" component={PantallaDespuesLogin} />
    <Stack.Screen name="RegistroUsuario" component={RegistroUsuario} />
    <Stack.Screen name="VerificacionEmail" component={VerificacionEmail} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);

const navigationIcons = {
  Lista: ['list', 'list-outline'],
  Perfil: ['person', 'person-outline'],
  Ajustes: ['options', 'options-outline'],
};

const TabNavigation = () => {
  const navigation = useNavigation();
  const systemTheme = useSystemTheme(); 
  const [theme, setTheme] = React.useState(systemTheme);

  useEffect(() => {
    setTheme(systemTheme);
  }, [systemTheme]);

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = navigationIcons[route.name][focused ? 0 : 1];
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#333333' : 'white',
        },
        tabBarActiveTintColor: theme === 'dark' ? 'white' : 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Lista"
        component={ListadoStack}
        options={{
          tabBarLabel: 'Lista',
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PaginaPerfilStack}
        options={{
          tabBarLabel: 'Perfil',
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={PaginaAjustes}
        options={{
          tabBarLabel: 'Ajustes',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
