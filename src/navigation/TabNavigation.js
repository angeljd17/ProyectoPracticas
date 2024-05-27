import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaPerfil from '../screens/PaginaPerfil';
import GestionPeliculas from '../screens/GestionPeliculas';
import DetallePelicula from '../screens/DetallePelicula';
import PaginaListado from '../screens/PaginaListado';
import InicioSesion from '../screens/authentication/InicioSesion';
import PaginaInicio from '../screens/PaginaInicio';
import PantallaDespuesLogin from '../screens/authentication/PantallaDespuesLogin';
import RegistroUsuario from '../screens/authentication/RegistroUsuario';
import VerificacionEmail from '../screens/authentication/VerificacionEmail';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import useSystemTheme from '../hooks/useSystemTheme'; 
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ListadoStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Películas" component={PaginaListado} />
    <Stack.Screen name="Detalles" component={DetallePelicula} />
  </Stack.Navigator>
);

const PaginaPerfilStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PaginaInicio" component={PaginaInicio} />
    <Stack.Screen name="PaginaPerfil" component={PaginaPerfil} />
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
  Buscador: ['search', 'search-outline'],
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
          tabBarOnPress: (e) => {
            // Navegar a la página de inicio al presionar el tab de perfil
            e.preventDefault(); // Prevenir la acción predeterminada del tab
            navigation.navigate('PaginaInicio');
          },
        }}
      />
      <Tab.Screen
        name="Buscador"
        component={GestionPeliculas}
        options={{
          tabBarLabel: 'Buscador',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
