import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VerificacionEmail = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const handleInicioSesion = () => {
    navigation.navigate('InicioSesion');
  };

  const isDarkMode = colorScheme === 'dark';
  const containerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: isDarkMode ? '#333333' : 'white', // Color de fondo basado en el modo
  };
  const titleStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: isDarkMode ? 'white' : 'black', // Color del texto basado en el modo
  };
  const messageStyle = {
    marginBottom: 30,
    textAlign: 'center',
    color: isDarkMode ? 'lightgray' : 'black', // Color del texto basado en el modo
  };
  const buttonStyle = {
    backgroundColor: isDarkMode ? '#007AFF' : '#007AFF', // Cambia el color del botón según el modo
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  };
  const buttonText = {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  };

  return (
    <View style={containerStyle}>
      <Text style={[titleStyle, styles.title]}>Verificación de Correo Electrónico</Text>
      <Text style={[messageStyle, styles.message]}>
        Se ha enviado un enlace de verificación a tu correo electrónico.
        Por favor, verifica tu cuenta accediendo al enlace en el correo.
      </Text>
      <TouchableOpacity onPress={handleInicioSesion} style={[buttonStyle, styles.button]}>
        <Text style={[buttonText, styles.buttonText]}>Ir a Iniciar Sesión</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerificacionEmail;
