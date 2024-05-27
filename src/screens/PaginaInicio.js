import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useSystemTheme from '../hooks/useSystemTheme'; // Importa el hook de sincronización del tema

const PaginaInicio = () => {
  const navigation = useNavigation();
  const theme = useSystemTheme(); // Obtén el tema del sistema

  // Color de fondo oscuro grisaceo
  const darkBackgroundColor = '#333333';

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? darkBackgroundColor : 'white' }]}>
      <Text style={[styles.title, { color: theme === 'dark' ? 'white' : 'black' }]}>Para acceder a tu perfil necesitas iniciar sesión</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('InicioSesion')}
        style={[styles.buttonContainer, { backgroundColor: theme === 'dark' ? 'darkblue' : 'blue' }]}
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('RegistroUsuario')}
        style={[styles.buttonContainer, { backgroundColor: theme === 'dark' ? 'darkgreen' : 'green' }]}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PaginaInicio;
