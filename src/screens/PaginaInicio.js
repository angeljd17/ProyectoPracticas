import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaginaInicio = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Mi Aplicación</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('InicioSesion')}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('RegistroUsuario')}
        style={[styles.buttonContainer, { backgroundColor: 'green' }]}
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
    backgroundColor: '#f0f0f0',
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
    backgroundColor: 'blue',
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
